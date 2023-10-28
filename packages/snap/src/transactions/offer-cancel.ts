import { Component, text } from '@metamask/snaps-ui/dist';
import { OfferCancelTransaction } from '../types';
import { generateAmountText } from '../helpers';
import { ITransaction } from './transaction.interface';

export class OfferCancel implements ITransaction {
  public static GetTransactionType(): string {
    return 'OfferCancel';
  }

  public generateTransactionSpecificDialog(
    transactionData: OfferCancelTransaction,
  ): Component[] {
    return [
      text(`**TransactionType:** ${transactionData.TransactionType}`),
      text(`⚠️ **From:** ${transactionData.Account}`),
      text(`**SequenceNumber:** ${transactionData.OfferSequence}`),
      text(`**Fee:** ${generateAmountText(transactionData.Fee!)}`),
    ];
  }
}
