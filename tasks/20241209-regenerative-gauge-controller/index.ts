import { Task, TaskRunOptions } from '@src';
import { GaugeSystemDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as GaugeSystemDeployment;

  const gaugeControllerArgs = [input.VotingEscrow, input.AuthorizerAdaptor];
  const gaugeController = await task.deploy('GaugeController', gaugeControllerArgs, from, force);

  const minterArgs = [input.TokenAdmin, gaugeController.address];
  await task.deploy('BalancerMinter', minterArgs, from, force);
};