import { Task, TaskMode } from '@src';

export type L2VotingEscrowDelegationProxyDeployment = {
  Vault: string;
  VotingEscrow: string;
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);
const VotingEscrow = new Task('20241125-regenerative-voting-escrow', TaskMode.READ_ONLY);

export default {
  Vault,
  VotingEscrow,
};
