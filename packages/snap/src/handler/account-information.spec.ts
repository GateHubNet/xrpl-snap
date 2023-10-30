import { XrplClient } from '../xrpl/client';
import { Wallet } from '../xrpl/wallet';
import { AccountInformation } from './account-information';

describe('AccountInformation', () => {
  describe('RPCMethod()', () => {
    it('should return correct RPC Method name', () => {
      expect(AccountInformation.RPCMethod()).toBe('xrpl_accountInfo');
    });
  });

  describe('handler()', () => {
    it('should return account if no account info', async () => {
      const address = 'rAddress';

      XrplClient.getAccountInfo = jest.fn().mockResolvedValueOnce({});
      Wallet.get = jest.fn().mockResolvedValueOnce({ address });

      const accountInformationInstance = new AccountInformation();
      expect(await accountInformationInstance.handler('')).toMatchObject({
        Account: address,
      });
    });

    it('should return account address if no account data', async () => {
      const address = 'rAddress';

      XrplClient.getAccountInfo = jest
        .fn()
        .mockResolvedValueOnce({ test: address });
      Wallet.get = jest.fn().mockResolvedValueOnce({ address });

      const accountInformationInstance = new AccountInformation();
      expect(await accountInformationInstance.handler('')).toMatchObject({
        Account: address,
      });
    });

    it('should return account data', async () => {
      const address = 'rAddress';

      XrplClient.getAccountInfo = jest
        .fn()
        .mockRejectedValueOnce(new Error('This is one test error.'));
      Wallet.get = jest.fn().mockResolvedValueOnce({ address });

      const accountInformationInstance = new AccountInformation();
      const t = async () => {
        return accountInformationInstance.handler('');
      };

      expect(t).rejects.toThrowError({
        name: 'Error',
        message: 'Error: This is one test error.',
      });
    });
  });
});
