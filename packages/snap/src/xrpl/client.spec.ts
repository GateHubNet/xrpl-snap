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
  });
});
