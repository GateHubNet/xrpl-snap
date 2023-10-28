import { XrplClient } from '../xrpl/client';
import { Wallet } from '../xrpl/wallet';
import { IRPCHandler } from './rpc.interface';

export class AccountTransactions implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_accountTransactions';
  }

  private handleLimitParameter(limit: number): number {
    if (limit < 0) {
      return 0;
    }

    if (limit > 50) {
      return 50;
    }

    return limit;
  }

  async handler(_: string, params: any) {
    const marker = params.marker;
    const limit = this.handleLimitParameter(params.limit || 10);
    
    let wallet = await Wallet.get();

    return XrplClient.getAccountTransactions(wallet.address, marker, limit);
  }
}
