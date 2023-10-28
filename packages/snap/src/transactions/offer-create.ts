import { Component, text } from '@metamask/snaps-ui/dist';
import { OfferCreateTransaction } from '../types';
import { generateAmountText } from '../helpers';
import { ITransaction } from './transaction.interface';

export class OfferCreate implements ITransaction {
  public static GetTransactionType(): string {
    return 'OfferCreate';
  }

  public generateTransactionSpecificDialog(
    transactionData: OfferCreateTransaction,
  ): Component[] {
    return [
      text(`**TransactionType:** ${transactionData.TransactionType}`),
      text(`⚠️ **From:** ${transactionData.Account}`),
      text(`**TakerGets:** ${generateAmountText(transactionData.TakerPays)}`),
      text(`**TakerGets:** ${generateAmountText(transactionData.TakerGets)}`),
      text(`**Fee:** ${generateAmountText(transactionData.Fee!)}`),
    ];
  }
}
