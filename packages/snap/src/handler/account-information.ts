import { XrplClient } from '../xrpl/client';
import { Wallet } from '../xrpl/wallet';
import { IRPCHandler } from './rpc.interface';

export class AccountInformation implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_accountInfo';
  }

  async handler(_?: any) {
    const wallet = await Wallet.get();

    try {
      const data = await XrplClient.getAccountInfo(wallet.address);
      if (data) {
        if (!data.account_data) {
          return { Account: wallet.address };
        }
        return data.account_data;
      }
    } catch (err) {
      throw new Error(``);
    }

    throw new Error('Unknown error while trying to get account information');
  }
}
