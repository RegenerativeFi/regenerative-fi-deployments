import { Task, TaskMode } from '@src';

export type StakelessGaugeCheckpointerDeployment = {
  GaugeAdder: string;
  AuthorizerAdaptorEntrypoint: string;
};

const GaugeAdder = new Task('20241209-regenerative-gauge-adder-v4', TaskMode.READ_ONLY);
const AuthorizerAdaptorEntrypoint = new Task('20221124-authorizer-adaptor-entrypoint', TaskMode.READ_ONLY);

export default {
  GaugeAdder,
  AuthorizerAdaptorEntrypoint,
};
