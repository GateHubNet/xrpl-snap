import { Component, text } from '@metamask/snaps-ui';
import { OfferCreateTransaction } from '../types';
import { OfferCreate } from './offer-create';

describe('OfferCreate', () => {
  it('should implement ITransaction', () => {
    const offerCreateInstance = new OfferCreate();
    expect(
      'generateTransactionSpecificDialog' in offerCreateInstance,
    ).toBeTruthy();
  });

  describe('GetTransactionType', () => {
    it('should return correct transaction type', () => {
      expect(OfferCreate.GetTransactionType()).toBe('OfferCreate');
    });
  });

  describe('generateTransactionSpecificDialog', () => {
    it('should return correct components', () => {
      const transactionData: OfferCreateTransaction = {
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

      const data: Component[] = [
        text(`**TransactionType:** ${transactionData.TransactionType}`),
        text(`⚠️ **From:** ${transactionData.Account}`),
        text(`**TakerPays:** 30 USD`),
        text(`**TakerGets:** 0.00001 XRP`),
        text(`**Fee:** 0.00001 XRP`),
      ];

      const offerCreateInstance = new OfferCreate();
      expect(
        offerCreateInstance.generateTransactionSpecificDialog(transactionData),
      ).toMatchObject(data);
    });
  });
});
