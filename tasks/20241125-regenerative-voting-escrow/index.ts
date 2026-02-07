import { Task, TaskRunOptions } from '@src';
import { VotingEscrowDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as VotingEscrowDeployment;

  const veREFIArgs = [
    input.Token,
    input.Name,
    input.Symbol,
    input.AuthorizerAdaptor,
    input.AuthorizerAdaptor,
    input.AuthorizerAdaptor,
    input.MaxTime,
  ];

  console.log(veREFIArgs);

  await task.deploy('VotingEscrow', veREFIArgs, from, force);
};
