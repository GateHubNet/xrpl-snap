import { TransactionData } from '../types';
import { NotImplementedError } from '../types/errors';
import { OfferCancel } from './offer-cancel';
import { OfferCreate } from './offer-create';
import { Payment } from './payment';
import { ITransaction } from './transaction.interface';
import { TrustSet } from './trustset';

export class TransactionFactory {
  static handlers = {
    [Payment.GetTransactionType()]: () => new Payment(),
    [TrustSet.GetTransactionType()]: () => new TrustSet(),
    [OfferCreate.GetTransactionType()]: () => new OfferCreate(),
    [OfferCancel.GetTransactionType()]: () => new OfferCancel(),
  };

  static create(transactionData: TransactionData): ITransaction {
    const transactionType = transactionData.TransactionType;
    if (!Object.keys(TransactionFactory.handlers).includes(transactionType)) {
      throw new NotImplementedError('Transaction dialog not yet implemented');
    }

    try {
      const transactionInstance = this.handlers[transactionType]();
      return transactionInstance;
    } catch (err) {
      throw new Error(
        `Failed to generate transaction instance for ${transactionType} transaction: ${err}`,
      );
    }
  }
}
