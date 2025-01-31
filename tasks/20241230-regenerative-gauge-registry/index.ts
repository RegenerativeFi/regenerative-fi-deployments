import { Task, TaskRunOptions } from '@src';
import { RegenerativeGaugeRegistryDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as RegenerativeGaugeRegistryDeployment;

  await task.deployAndVerify('RegenerativeGaugeRegistry', [input.Vault], from, force);
};
