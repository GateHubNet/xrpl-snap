import { Component, text } from '@metamask/snaps-ui/dist';
import { OfferCreateTransaction } from '../types';
import { generateAmountText } from '../helpers';
import { ITransaction } from './transaction.interface';
import { XRPlorerTransactionResponse } from './transaction-dialog';

export class OfferCreate implements ITransaction {
  public static GetTransactionType(): string {
    return 'OfferCreate';
  }

  public generateTransactionSpecificDialog(
    transactionData: OfferCreateTransaction,
    _risk: XRPlorerTransactionResponse,
  ): Component[] {
    return [
      text(`**TransactionType:** ${transactionData.TransactionType}`),
      text(`⚠️ **From:** ${transactionData.Account}`),
      text(`**TakerPays:** ${generateAmountText(transactionData.TakerPays)}`),
      text(`**TakerGets:** ${generateAmountText(transactionData.TakerGets)}`),
      text(`**Fee:** ${generateAmountText(transactionData.Fee)}`),
    ];
  }
}
