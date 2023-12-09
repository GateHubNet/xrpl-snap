import { panel } from '@metamask/snaps-ui';
import { Transaction } from '../xrpl/transaction';
import { Wallet } from '../xrpl/wallet';
import {
  TransactionDialog,
  XRPlorerTransactionResponse,
} from '../transactions/transaction-dialog';
import { PaymentTransaction } from '../types';
import { IRPCHandler } from './rpc.interface';

export class SignTransaction implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_sign';
  }

  private static TransactionRisk(address: string) {
    return fetch(
      `https://europe-west3-xrpl-snap-366820.cloudfunctions.net/proxy-to-xrpl-forensics?address=${address}`,
      {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
      },
    ).then((response) => response.json());
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

    let xrplorerTransactionRisk: XRPlorerTransactionResponse | undefined;
    if (transaction.Data.TransactionType.toLowerCase() === 'payment') {
      const payment: PaymentTransaction =
        transaction.Data as PaymentTransaction;
      try {
        xrplorerTransactionRisk = await SignTransaction.TransactionRisk(
          payment.Destination,
        );
      } catch (err) {}
    }

    const signPrompt = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: panel(
          TransactionDialog.GenerateDialog(
            origin,
            transaction.Data,
            xrplorerTransactionRisk,
          ),
        ),
      },
    });

    if (!signPrompt) {
      throw new Error('User declined to sign transaction');
    }

    return transaction.sign(await Wallet.get());
  }

  handler(origin: string, params: any) {
    const { data } = params;

    return SignTransaction.SignHelper(origin, data);
  }
}
