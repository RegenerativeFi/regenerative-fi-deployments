import { Task, TaskMode } from '@src';

export type ChildChainLiquidityGaugeFactoryDeployment = {
  VotingEscrowDelegationProxy: string;
  AuthorizerAdaptor: string;
  L2BalancerPseudoMinter: string;
  FactoryVersion: string;
  ProductVersion: string;
};

const VotingEscrowDelegationProxy = new Task('20230316-l2-ve-delegation-proxy', TaskMode.READ_ONLY);
const AuthorizerAdaptor = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY);
const L2BalancerPseudoMinter = new Task('20230316-l2-balancer-pseudo-minter', TaskMode.READ_ONLY);
const BaseVersion = { version: 2, deployment: '20250128-no-token-admin-gauge-factory-v2' };

export default {
  VotingEscrowDelegationProxy,
  AuthorizerAdaptor,
  L2BalancerPseudoMinter,
  FactoryVersion: JSON.stringify({ name: 'NoTokenAdminGaugeFactory', ...BaseVersion }),
  ProductVersion: JSON.stringify({ name: 'NoTokenAdminGauge', ...BaseVersion }),
};
