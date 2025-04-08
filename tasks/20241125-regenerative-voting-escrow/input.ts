import { Task, TaskMode } from '@src';

export type VotingEscrowDeployment = {
  Symbol: string;
  Name: string;
  AuthorizerAdaptor: string;
  MaxTime: string;
  TestBalancerToken: string;
};

const AuthorizerAdaptor = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY);
const TestBalancerToken = new Task('20220325-test-balancer-token', TaskMode.READ_ONLY);

export default {
  AuthorizerAdaptor,
  TestBalancerToken,
  celo: {
    Symbol: 'veTREFI',
    Name: 'Vote Escrowed Test REFI',
    MaxTime: '31536000', // 1 year in seconds
  },
};
