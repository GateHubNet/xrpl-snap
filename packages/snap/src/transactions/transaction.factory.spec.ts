import {
  OfferCancelTransaction,
  OfferCreateTransaction,
  PaymentTransaction,
  TrustSetTransaction,
} from '../types';
import { OfferCancel } from './offer-cancel';
import { OfferCreate } from './offer-create';
import { Payment } from './payment';
import { TransactionFactory } from './transaction.factory';
import { TrustSet } from './trustset';

describe('TransactionFactory', () => {
  describe('create()', () => {
    let paymentData: PaymentTransaction;
    let trustSetData: TrustSetTransaction;
    let offerCreate: OfferCreateTransaction;
    let offerCancel: OfferCancelTransaction;
    beforeAll(() => {
      paymentData = {
        Account: 'rAddress',
        Destination: 'rDestination',
        TransactionType: 'Payment',
        Amount: '100',
        Fee: '12'
      };

      trustSetData = {
        TransactionType: 'TrustSet',
        Account: 'rMyAddress',
        LimitAmount: {
          issuer: 'rIssuer',
          currency: 'FOO',
          value: '1000',
        },
        QualityIn: 10,
        QualityOut: 10,
        Fee: '10',
      };

      offerCreate = {
        TransactionType: 'OfferCreate',
        Account: 'rMyAddress',
        Expiration: 1,
        OfferSequence: 10,
        TakerGets: '10',
        TakerPays: {
          currency: 'USD',
          value: '30',
          issuer: 'issuer',
        },
        Fee: '10',
      };

      offerCancel = {
        TransactionType: 'OfferCancel',
        Account: 'myAccount',
        OfferSequence: 1,
        Fee: '10',
      };
    });

    it('should throw not implemented error if transaction type is not implemented', () => {
      const p = {
        ...paymentData,
        TransactionType: 'Test',
      };
      const t = () => {
        return TransactionFactory.create(p);
      };

      expect(t).toThrow({
        name: 'NotImplementedError',
        message: 'Transaction dialog not yet implemented',
      });
    });

    it('should return payment instance', () => {
      expect(TransactionFactory.create(paymentData)).toBeInstanceOf(Payment);
    });

    it('should return trustset instance', () => {
      expect(TransactionFactory.create(trustSetData)).toBeInstanceOf(TrustSet);
    });

    it('should return offercreate instance', () => {
      expect(TransactionFactory.create(offerCreate)).toBeInstanceOf(
        OfferCreate,
      );
    });

    it('should return offercancel instance', () => {
      expect(TransactionFactory.create(offerCancel)).toBeInstanceOf(
        OfferCancel,
      );
    });
  });
});
