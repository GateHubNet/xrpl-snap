import { Component, text } from '@metamask/snaps-ui';
import { OfferCancel } from './offer-cancel';

describe('OfferCancel', () => {
  it('should implement ITransaction', () => {
    const offerCancelInstance = new OfferCancel();
    expect(
      'generateTransactionSpecificDialog' in offerCancelInstance,
    ).toBeTruthy();
  });

  describe('GetTransactionType()', () => {
    it('should return correct transaction type', () => {
      expect(OfferCancel.GetTransactionType()).toBe('OfferCancel');
    });
  });

  describe('generateTransactionSpecificDialog', () => {
    it('should return correct components', () => {
      const transactionData = {
        TransactionType: 'OfferCancel',
        Account: 'myAccount',
        OfferSequence: 1,
        Fee: '10',
      };

      const data: Component[] = [
        text(`**TransactionType:** ${transactionData.TransactionType}`),
        text(`⚠️ **From:** ${transactionData.Account}`),
        text(`**SequenceNumber:** ${transactionData.OfferSequence}`),
        text(`**Fee:** 0.00001 XRP`),
      ];

      const offerCancelInstance = new OfferCancel();
      expect(
        offerCancelInstance.generateTransactionSpecificDialog(transactionData, {
          status: 0,
        }),
      ).toMatchObject(data);
    });
  });
});
