import * as api from '../helpers/api';
import { XrplRequestData } from '../types';
import { XrplClient } from './client';

describe('XrplClient', () => {
  describe('submit()', () => {
    it('should call postData with correct parameters', () => {
      const blob = 'blob';
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('submit');
          expect(data.params).toMatchObject([
            {
              tx_blob: blob,
            },
          ]);
          return {};
        },
      );

      XrplClient.submit(blob);
    });

    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.submit('blob');
      expect(data).toBe(mockedResolvedValue);
    });
  });

  describe('getLedgerFee()', () => {
    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.getLedgerFee();
      expect(data).toBe(mockedResolvedValue);
    });

    it('should call post data with correct parameters', () => {
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('fee');
          expect(data.params).toMatchObject([{}]);
          return {};
        },
      );

      XrplClient.getLedgerFee();
    });
  });

  describe('getAccountNfts', () => {
    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.getAccountNfts('');
      expect(data).toBe(mockedResolvedValue);
    });

    it('should call postData with correct parameters', () => {
      const address = 'rAddress';
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('account_nfts');
          expect(data.params).toMatchObject([
            {
              account: address,
              ledger: 'current',
            },
          ]);
          return {};
        },
      );

      XrplClient.getAccountNfts(address);
    });
  });

  describe('getAccountInfo', () => {
    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.getAccountInfo('');
      expect(data).toBe(mockedResolvedValue);
    });

    it('should call postData with correct parameters', () => {
      const address = 'rAddress';
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('account_info');
          expect(data.params).toMatchObject([
            {
              account: address,
              ledger: 'current',
            },
          ]);
          return {};
        },
      );

      XrplClient.getAccountInfo(address);
    });
  });

  describe('getTransactionInfo', () => {
    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.getTransactionInfo('');
      expect(data).toBe(mockedResolvedValue);
    });

    it('should call postData with correct parameters', () => {
      const transactionHash = 'transactionHash';
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('tx');
          expect(data.params).toMatchObject([
            {
              transaction: transactionHash,
              binary: false,
            },
          ]);
          return {};
        },
      );

      XrplClient.getTransactionInfo(transactionHash);
    });
  });

  describe('raw', () => {
    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.raw('', {});
      expect(data).toBe(mockedResolvedValue);
    });

    it('should call postData with correct parameters', () => {
      const method = 'xrplMethod';
      const params = { test: method };
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe(method);
          expect(data.params).toMatchObject(params);
          return {};
        },
      );

      XrplClient.raw(method, params);
    });
  });

  describe('getAccountTransactions', () => {
    it('should return data from postData', async () => {
      const mockedResolvedValue = 'test';
      const spy = jest.spyOn(api, 'postData');
      spy.mockResolvedValue(mockedResolvedValue);

      const data = await XrplClient.getAccountTransactions('', '');
      expect(data).toBe(mockedResolvedValue);
    });

    it('should call postData with correct parameters and default limit', () => {
      const account = 'rAddress';
      const marker = 'marker';
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('account_tx');
          expect(data.params).toMatchObject([
            {
              limit: 10,
              marker,
              account,
              binary: false,
            },
          ]);
          return {};
        },
      );

      XrplClient.getAccountTransactions(account, marker);
    });

    it('should call postData with correct parameters and custom limit', () => {
      const account = 'rAddress';
      const marker = 'marker';
      const limit = 42;
      const spy = jest.spyOn(api, 'postData');
      spy.mockImplementationOnce(
        async (data: XrplRequestData, _?: { server: string }) => {
          expect(data.method).toBe('account_tx');
          expect(data.params).toMatchObject([
            {
              limit,
              marker,
              account,
              binary: false,
            },
          ]);
          return {};
        },
      );

      XrplClient.getAccountTransactions(account, marker, limit);
    });
  });
});
