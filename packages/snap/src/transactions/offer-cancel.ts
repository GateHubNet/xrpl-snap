import { Component, text } from '@metamask/snaps-ui/dist';
import { OfferCancelTransaction } from '../types';
import { generateAmountText } from '../helpers';
import { ITransaction } from './transaction.interface';
import { XRPlorerTransactionResponse } from './transaction-dialog';

export class OfferCancel implements ITransaction {
  public static GetTransactionType(): string {
    return 'OfferCancel';
  }

  public generateTransactionSpecificDialog(
    transactionData: OfferCancelTransaction,
    _risk: XRPlorerTransactionResponse,
  ): Component[] {
    return [
      text(`**TransactionType:** ${transactionData.TransactionType}`),
      text(`⚠️ **From:** ${transactionData.Account}`),
      text(`**SequenceNumber:** ${transactionData.OfferSequence}`),
      text(`**Fee:** ${generateAmountText(transactionData.Fee!)}`),
    ];
  }
}
