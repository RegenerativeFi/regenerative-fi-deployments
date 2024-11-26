import { Task, TaskRunOptions } from '@src';
import { TestRegenerativeTokenDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as TestRegenerativeTokenDeployment;

  for (const token of input.Tokens) {
    const args = [input.Admin, token.Name, token.Symbol];
    await task.deployAndVerify('TestBalancerToken', args, from, true, token.Symbol);
  }
};
