import { Transaction } from '../xrpl/transaction';
import { IRPCHandler } from './rpc.interface';

export class SubmitTransaction implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_submit';
  }

  handler(_origin: string, params: any) {
    const { blob } = params;

    return Transaction.submit(blob);
  }
}
