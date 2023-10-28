import { panel } from '@metamask/snaps-ui';
import { Transaction } from '../xrpl/transaction';
import { Wallet } from '../xrpl/wallet';
import { TransactionDialog } from '../transactions/transaction-dialog';
import { IRPCHandler } from './rpc.interface';

export class SignTransaction implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_sign';
  }

  static async SignHelper(origin: string, data: any) {
    const wallet = await Wallet.get();

    // Override transaction account if it was provided ... if not, just add it
    const transactionData = {
      ...data,
      Account: wallet.address,
    };

    const transaction = new Transaction(transactionData);
    await transaction.autofill();

    const signPrompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel(
          TransactionDialog.GenerateDialog(origin, transaction.Data),
        ),
      },
    });

    if (!signPrompt) {
      throw new Error('User declined to sign transaction');
    }

    return transaction.sign(await Wallet.get());
  }

  handler(_origin: string, params: any) {
    const { data } = params;

    return SignTransaction.SignHelper(origin, data);
  }
}
