import { Task, TaskRunOptions } from '@src';
import { RegenerativeTokenAdminDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as RegenerativeTokenAdminDeployment;

  const args = [input.Vault, input.BAL];
  await task.deployAndVerify('MockBalancerTokenAdmin', args, from, force);
};
