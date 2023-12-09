/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/require-description */
import { Component, text } from '@metamask/snaps-ui';
import { PaymentTransaction } from '../types';
import { Payment } from './payment';

describe('Payment', () => {
  it('should implement ITransaction', () => {
    const paymentInstance = new Payment();
    expect('generateTransactionSpecificDialog' in paymentInstance).toBeTruthy();
  });

  describe('GetTransactionType()', () => {
    it('should return correct transaction type', () => {
      expect(Payment.GetTransactionType()).toBe('Payment');
    });
  });

  describe('generateTransactionSpecificDialog', () => {
    function prepare(destinationTag: boolean) {
      const transactionData: PaymentTransaction = {
        TransactionType: 'Payment',
        Account: 'rMyAddress',
        Destination: 'rDestination',
        Amount: {
          value: '30',
          currency: 'USD',
          issuer: 'usdIssuer',
        },
        Fee: '10',
      };

      if (destinationTag) {
        transactionData['DestinationTag'] = 13371;
      }

      return transactionData;
    }

    it('should return correct components with destination tag', () => {
      const transactionData = prepare(true);

      const data: Component[] = [
        text(`**TransactionType:** ${transactionData.TransactionType}`),
        text(`✅ **From:** ${transactionData.Account}`),
        text(`✅ **Destination:** ${transactionData.Destination}`),
        text(`**Destination Tag:** ${transactionData.DestinationTag}`),
        text(`**Amount:** 30 USD`),
        text(`**Fee:** 0.00001 XRP`),
      ];

      const paymentInstance = new Payment();
      expect(
        paymentInstance.generateTransactionSpecificDialog(transactionData, {
          status: 0,
        }),
      ).toMatchObject(data);
    });

    it('should return correct components without destination tag', () => {
      const transactionData = prepare(false);

      const data: Component[] = [
        text(`**TransactionType:** ${transactionData.TransactionType}`),
        text(`✅ **From:** ${transactionData.Account}`),
        text(`✅ **Destination:** ${transactionData.Destination}`),
        text(`**Amount:** 30 USD`),
        text(`**Fee:** 0.00001 XRP`),
      ];

      const paymentInstance = new Payment();
      expect(
        paymentInstance.generateTransactionSpecificDialog(transactionData, {
          status: 0,
        }),
      ).toMatchObject(data);
    });
  });
});
