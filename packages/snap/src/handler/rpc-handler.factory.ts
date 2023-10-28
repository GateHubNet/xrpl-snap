import { AccountInformation } from './account-information';
import { AccountTransactions } from './account-transactions';
import { GetState } from './get-state';
import { IRPCHandler } from './rpc.interface';
import { SignSubmitTransaction } from './sign-submit-transaction';
import { SignTransaction } from './sign-transaction';
import { SubmitTransaction } from './submit-transaction';
import { UpdateState } from './update-state';

export class RPCHandlerFactory {
  static handlers = {
    [GetState.RPCMethod()]: () => new GetState(),
    [UpdateState.RPCMethod()]: () => new UpdateState(),
    [SignTransaction.RPCMethod()]: () => new SignTransaction(),
    [SubmitTransaction.RPCMethod()]: () => new SubmitTransaction(),
    [AccountInformation.RPCMethod()]: () => new AccountInformation(),
    [AccountTransactions.RPCMethod()]: () => new AccountTransactions(),
    [SignSubmitTransaction.RPCMethod()]: () => new SignSubmitTransaction(),
  };

  static create(rpcMethod: string): IRPCHandler {
    if (!Object.keys(RPCHandlerFactory.handlers).includes(rpcMethod)) {
      throw new Error('Method not found');
    }

    try {
      const rpcMethodInstance = this.handlers[rpcMethod]();
      return rpcMethodInstance;
    } catch (err) {
      throw new Error(`RPC call ${rpcMethod} failed: ${err}`);
    }
  }
}
