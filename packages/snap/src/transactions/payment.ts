import { Component, text } from '@metamask/snaps-ui/dist';
import { PaymentTransaction } from '../types';
import { generateAmountText } from '../helpers';
import { ITransaction } from './transaction.interface';

export class Payment implements ITransaction {
  public static GetTransactionType(): string {
    return 'Payment';
  }

  public generateTransactionSpecificDialog(
    transactionData: PaymentTransaction,
  ): Component[] {
    const dialog: Component[] = [
      text(`**TransactionType:** ${transactionData.TransactionType}`),
      text(`⚠️ **From:** ${transactionData.Account}`),
      text(`✅ **Destination:** ${transactionData.Destination}`),
    ];

    if (transactionData.DestinationTag) {
      dialog.push(
        text(`**Destination Tag:** ${transactionData.DestinationTag}`),
      );
    }

    return dialog.concat([
      text(`**Amount:** ${generateAmountText(transactionData.Amount)}`),
      text(`**Fee:** ${generateAmountText(transactionData.Fee!)}`),
    ]);
  }
}
