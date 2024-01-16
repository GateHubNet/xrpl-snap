import { divider, heading, text } from '@metamask/snaps-ui';
import { NotImplementedError } from '../types/errors';
import { PaymentTransaction, TransactionData } from '../types';
import { TransactionDialog } from './transaction-dialog';

import { TransactionFactory } from './transaction.factory';
import { Payment } from './payment';

describe('TransactionDialog', () => {
  let paymentData: PaymentTransaction;
  beforeAll(() => {
    paymentData = {
      Account: 'rAddress',
      Destination: 'rDestination',
      TransactionType: 'Payment',
      Amount: '100',
      Fee: '12'
    };
  });

  describe('GenerateDialogFooter()', () => {
    it('should return correct components', () => {
      const data = [
        text('**Please check that all of the above fields are correct.**'),
        text(
          '_All transactions are final, and we are unable to revert any transaction that was signed and/or submitted_',
        ),
      ];

      expect(TransactionDialog['GenerateDialogFooter']()).toMatchObject(data);
    });
  });

  describe('GenerateDialogHeader()', () => {
    it('should return correct component header', () => {
      const origin = 'localhost:3000';
      const data = [
        heading('Sign XRPL Transaction'),
        text(`Got a request from ${origin} to sign following transaction`),
      ];

      expect(TransactionDialog['GenerateDialogHeader'](origin)).toMatchObject(
        data,
      );
    });
  });

  describe('GenerateDialog', () => {
    it('should return correct components', () => {
      TransactionDialog['GenerateDialogHeader'] = jest
        .fn()
        .mockReturnValueOnce(['header']);

      TransactionDialog['GenerateDialogBody'] = jest
        .fn()
        .mockReturnValueOnce(['body']);

      TransactionDialog['GenerateDialogFooter'] = jest
        .fn()
        .mockReturnValueOnce(['footer']);

      expect(TransactionDialog.GenerateDialog('', paymentData)).toMatchObject([
        'header',
        divider(),
        'body',
        divider(),
        'footer',
      ]);
    });
  });

  describe('GenerateNotImplementErrorDialog', () => {
    it('should return correct components', () => {
      const data = [
        text(
          "We haven't implemented pretty output for this kind of transaction",
        ),
        text('Here is the raw transaction for you to check'),
        text(JSON.stringify(paymentData, undefined, 4)),
      ];

      expect(
        TransactionDialog['GenerateNotImplementErrorDialog'](paymentData),
      ).toMatchObject(data);
    });
  });
});
