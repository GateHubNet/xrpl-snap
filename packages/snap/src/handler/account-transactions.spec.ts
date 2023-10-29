import { XrplClient } from '../xrpl/client';
import { Wallet } from '../xrpl/wallet';
import { AccountTransactions } from './account-transactions';

describe('AccountTransactions', () => {
  describe('RPCMethod()', () => {
    it('should return correct RPC Method name', () => {
      expect(AccountTransactions.RPCMethod()).toBe('xrpl_accountTransactions');
    });
  });

  describe('handleLimitParameter()', () => {
    let accountTransactionInstance: AccountTransactions;
    beforeEach(() => {
      accountTransactionInstance = new AccountTransactions();
    });

    it('should return 0 if limit less than 0', () => {
      expect(accountTransactionInstance['handleLimitParameter'](-100)).toBe(0);
    });

    it('should return 50 if limit more than 50', () => {
      expect(accountTransactionInstance['handleLimitParameter'](100)).toBe(50);
    });

    it('should return limit number if limit is between 0 and 50', () => {
      for (let i = 0; i <= 50; i++) {
        expect(accountTransactionInstance['handleLimitParameter'](i)).toBe(i);
      }
    });
  });

  describe('handler()', () => {
    it('should call getAccountTransaction with proper parameters', () => {
      const limit = 12;
      const mockedAddress = 'myAddress';

      Wallet.get = jest.fn().mockResolvedValue({ address: mockedAddress });
      XrplClient.getAccountTransactions = jest
        .fn()
        .mockImplementation((address, marker, l) => {
          expect(address).toBe(mockedAddress);
          expect(l).toBe(limit);
          expect(marker).toBeUndefined();
        });

      const accountTransactionInstance = new AccountTransactions();
      accountTransactionInstance.handler('', { limit });
    });

    it('should return result from getAccountTransaction rest call', async () => {
      const limit = 12;
      const mockedAddress = 'myAddress';
      const mockedResolvedValue = 'test';

      Wallet.get = jest.fn().mockResolvedValue({ address: mockedAddress });
      XrplClient.getAccountTransactions = jest
        .fn()
        .mockResolvedValue(mockedResolvedValue);

      const accountTransactionInstance = new AccountTransactions();
      const handlerResult = await accountTransactionInstance.handler('', {
        limit,
      });

      expect(handlerResult).toBe(mockedResolvedValue);
    });
  });
});
