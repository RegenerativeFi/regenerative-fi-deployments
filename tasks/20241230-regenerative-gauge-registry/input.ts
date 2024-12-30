import { Task, TaskMode } from '@src';

export type RegenerativeGaugeRegistryDeployment = {
  L2BalancerPseudoMinter: string;
  ChildChainLiquidityGaugeFactory: string;
};

const L2BalancerPseudoMinter = new Task('20230316-l2-balancer-pseudo-minter', TaskMode.READ_ONLY);
const ChildChainLiquidityGaugeFactory = new Task(
  '20241209-regenerative-rewards-only-gauge-factory',
  TaskMode.READ_ONLY
);

export default {
  L2BalancerPseudoMinter,
  ChildChainLiquidityGaugeFactory,
};
