import { Component, text } from '@metamask/snaps-ui/dist';
import { TrustSetTransaction } from '../types';
import { generateAmountText } from '../helpers';
import { ITransaction } from './transaction.interface';

export class TrustSet implements ITransaction {
  public static GetTransactionType(): string {
    return 'TrustSet';
  }

  public generateTransactionSpecificDialog(
    transactionData: TrustSetTransaction,
  ): Component[] {
    return [
      text(`**TransactionType:** ${transactionData.TransactionType}`),
      text(`⚠️ **From:** ${transactionData.Account}`),
      text(`✅ **To:** ${transactionData.LimitAmount.issuer}`),
      text(`**Limit:** ${generateAmountText(transactionData.LimitAmount)}`),
      text(`**Fee:** ${generateAmountText(transactionData.Fee!)}`),
    ];
  }
}
