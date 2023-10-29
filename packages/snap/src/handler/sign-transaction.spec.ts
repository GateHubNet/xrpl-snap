import { SignTransaction } from './sign-transaction';

describe('SignTransaction', () => {
  describe('RPCMethod()', () => {
    it('should return correct RPC method name', () => {
      expect(SignTransaction.RPCMethod()).toBe('xrpl_sign');
    });
  });

  describe('handler()', () => {
    it('should call sign helper with correct parameters', () => {
      const mockedOrigin = 'mockedOrigin';
      const mockedData = 'mockedDate';
      SignTransaction.SignHelper = jest
        .fn()
        .mockImplementation((origin, data) => {
          expect(origin).toBe(mockedOrigin);
          expect(data).toBe(mockedData);
        });

      const signTransactionInstance = new SignTransaction();
      signTransactionInstance.handler(mockedOrigin, { data: mockedData });
    });
  });
});
