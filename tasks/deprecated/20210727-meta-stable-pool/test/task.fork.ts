import hre from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';

import * as expectEvent from '@helpers/expectEvent';
import { bn, fp } from '@helpers/numbers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { calculateInvariant } from '@helpers/models/pools/stable/math';
import { expectEqualWithError } from '@helpers/relativeError';
import { MAX_UINT256, ZERO_ADDRESS } from '@helpers/constants';
import { StablePoolEncoder } from '@helpers/models/pools/stable/encoder';
import { SwapKind } from '@helpers/models/types/types';

import { describeForkTest, getSigner, getForkedNetwork, Task, TaskMode, impersonate } from '@src';

describeForkTest.skip('MetaStablePoolFactory', 'mainnet', 14850000, function () {
  let owner: SignerWithAddress, whale: SignerWithAddress;
  let pool: Contract, factory: Contract, vault: Contract, usdc: Contract, dai: Contract;

  let task: Task;

  const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f';
  const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

  const tokens = [DAI, USDC];
  const cacheDurations = [0, 0];
  const rateProviders = [ZERO_ADDRESS, ZERO_ADDRESS];
  const oracleEnabled = true;
  const amplificationParameter = bn(400);
  const swapFeePercentage = fp(0.01);
  const initialBalanceDAI = fp(1e6);
  const initialBalanceUSDC = fp(1e6).div(1e12); // 6 digits
  const initialBalances = [initialBalanceDAI, initialBalanceUSDC];

  const LARGE_TOKEN_HOLDER = '0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503';

  before('run task', async () => {
    task = new Task('20210727-meta-stable-pool', TaskMode.TEST, getForkedNetwork(hre));
    await task.run({ force: true });
    factory = await task.deployedInstance('MetaStablePoolFactory');
  });

  before('load signers', async () => {
    owner = await getSigner();
    whale = await impersonate(LARGE_TOKEN_HOLDER);
  });

  before('load vault and tokens', async () => {
    const vaultTask = new Task('20210418-vault', TaskMode.READ_ONLY, getForkedNetwork(hre));
    vault = await vaultTask.instanceAt('Vault', await factory.getVault());
    dai = await task.instanceAt('ERC20', DAI);
    usdc = await task.instanceAt('ERC20', USDC);
  });

  it('deploy a meta stable pool', async () => {
    const tx = await factory.create(
      'MSP',
      'MSPT',
      tokens,
      amplificationParameter,
      rateProviders,
      cacheDurations,
      swapFeePercentage,
      oracleEnabled,
      owner.address
    );

    const event = expectEvent.inReceipt(await tx.wait(), 'PoolCreated');
    pool = await task.instanceAt('StablePool', event.args.pool);
    expect(await factory.isPoolFromFactory(pool.address)).to.be.true;

    const poolId = pool.getPoolId();
    const [registeredAddress] = await vault.getPool(poolId);
    expect(registeredAddress).to.equal(pool.address);
  });

  it('can initialize a meta stable pool', async () => {
    await dai.connect(whale).approve(vault.address, MAX_UINT256);
    await usdc.connect(whale).approve(vault.address, MAX_UINT256);

    const poolId = await pool.getPoolId();
    const userData = StablePoolEncoder.joinInit(initialBalances);
    await vault.connect(whale).joinPool(poolId, whale.address, owner.address, {
      assets: tokens,
      maxAmountsIn: initialBalances,
      fromInternalBalance: false,
      userData,
    });

    const expectedInvariant = calculateInvariant([initialBalanceDAI, initialBalanceDAI], amplificationParameter);
    expectEqualWithError(await pool.balanceOf(owner.address), expectedInvariant, 0.001);
  });

  it('can swap in a meta stable pool', async () => {
    const amount = fp(500);
    await dai.connect(whale).transfer(owner.address, amount);
    await dai.connect(owner).approve(vault.address, amount);
    const previousUSDC = await usdc.balanceOf(owner.address);

    const poolId = await pool.getPoolId();
    await vault
      .connect(owner)
      .swap(
        { kind: SwapKind.GivenIn, poolId, assetIn: DAI, assetOut: USDC, amount, userData: '0x' },
        { sender: owner.address, recipient: owner.address, fromInternalBalance: false, toInternalBalance: false },
        0,
        MAX_UINT256
      );

    // Assert pool swap
    const expectedUSDC = previousUSDC.add(amount.div(1e12));
    expectEqualWithError(await dai.balanceOf(owner.address), 0, 0.0001);
    expectEqualWithError(await usdc.balanceOf(owner.address), expectedUSDC, 0.1);
  });
});
