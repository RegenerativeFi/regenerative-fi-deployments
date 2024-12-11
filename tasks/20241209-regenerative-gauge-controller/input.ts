import { Task, TaskMode } from '@src';

export type GaugeSystemDeployment = {
  VotingEscrow: string;
  TokenAdmin: string;
  AuthorizerAdaptor: string;
};

const AuthorizerAdaptor = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY);
const VotingEscrow = new Task('20241125-regenerative-voting-escrow', TaskMode.READ_ONLY);

export default {
  AuthorizerAdaptor,
  VotingEscrow,
  celoAlfajores: {
    TokenAdmin: '0x63CBAea259d07Dd82040D4c5AFA09F3aC9969931',
  },
};
