import { Task, TaskMode } from '@src';

export type VotingEscrowDeployment = {
  Symbol: string;
  Name: string;
  AuthorizerAdaptor: string;
  MaxTime: string;
  Token: string;
};

const AuthorizerAdaptor = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY);
// const TestBalancerToken = new Task('20220325-test-balancer-token', TaskMode.READ_ONLY);

export default {
  AuthorizerAdaptor,
  // TestBalancerToken,
  // celo: {
  //   Symbol: 'veTREFI',
  //   Name: 'Vote Escrowed Test REFI',
  //   MaxTime: '31536000', // 1 year in seconds
  // },
  celo: {
    Symbol: 'veREFI',
    Name: 'Vote Escrowed REFI',
    MaxTime: '62899200', // 2 years in seconds
    Token: '0x946ED42472e2523c30074B919b0242B23909CDA6',
  },
};
