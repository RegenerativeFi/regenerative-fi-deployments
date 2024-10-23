import { fp } from '@helpers/numbers';
import { Task, TaskMode } from '@src';
import { BigNumber } from 'ethers';

export type ProtocolFeePercentagesProviderDeployment = {
  Vault: string;
  maxYieldValue: BigNumber;
  maxAUMValue: BigNumber;
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);
const maxYieldValue = fp(1);
const maxAUMValue = fp(1);

export default {
  Vault,
  maxYieldValue,
  maxAUMValue,
};
