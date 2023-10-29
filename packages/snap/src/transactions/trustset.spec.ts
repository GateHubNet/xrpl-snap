import { text } from '@metamask/snaps-ui/dist/builder';
import { TrustSetTransaction } from '../types';
import { TrustSet } from './trustset';

describe('TrustSet', () => {
  it('should implement ITransaction', () => {
    const trustSetInstance = new TrustSet();
    expect(
      'generateTransactionSpecificDialog' in trustSetInstance,
    ).toBeTruthy();
  });

  describe('GetTransactionType()', () => {
    it('should return correct transaction type', () => {
      expect(TrustSet.GetTransactionType()).toBe('TrustSet');
    });
  });

  describe('generateTransactionSpecificDialog', () => {
    it('should return correct components', () => {
      const transactionData: TrustSetTransaction = {
        TransactionType: 'TrustSet',
        Account: 'rMyAddress',
        LimitAmount: {
          issuer: 'rIssuer',
          currency: 'FOO',
          value: '1000',
        },
        Fee: '10',
      };

      const data = [
        text(`**TransactionType:** ${transactionData.TransactionType}`),
        text(`⚠️ **From:** ${transactionData.Account}`),
        text(`✅ **To:** ${transactionData.LimitAmount.issuer}`),
        text(`**Limit:** 1000 FOO`),
        text(`**Fee:** 0.00001 XRP`),
      ];

      const trustsetInstance = new TrustSet();
      expect(
        trustsetInstance.generateTransactionSpecificDialog(transactionData)
      ).toMatchObject(data);
    });
  });
});
