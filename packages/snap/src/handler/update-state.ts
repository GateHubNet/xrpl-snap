import { StateHelper } from '../helpers/state';
import { IRPCHandler } from './rpc.interface';

export class UpdateState implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_setServers';
  }

  async handler(_origin: string, params: any) {
    await StateHelper.update({
      servers: params.servers,
    });

    return await StateHelper.get();
  }
}
