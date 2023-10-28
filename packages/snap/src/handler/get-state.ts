import { StateHelper } from '../helpers/state';
import { IRPCHandler } from './rpc.interface';

export class GetState implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_getState';
  }

  async handler(_origin: string, _params: any) {
    const state = await StateHelper.get();

    return state;
  }
}
