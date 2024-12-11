import { Task, TaskMode } from '@src';

export type RegenerativeTokenAdminDeployment = {
  BAL: string;
  Vault: string;
};

const TestBALTask = new Task('20220325-test-balancer-token', TaskMode.READ_ONLY);
const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);

export default {
  Vault,
  mainnet: {
    BAL: '0xba100000625a3754423978a60c9317c58a424e3D',
  },
  sepolia: {
    BAL: TestBALTask.output({ network: 'sepolia' }).TestBalancerToken,
  },
  celoAlfajores: {
    BAL: '0x68DF333c5F5835A186AA8bCe4a704432006fDF49',
  },
};
