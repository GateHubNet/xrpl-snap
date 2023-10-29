import { Transaction } from '../xrpl/transaction';
import { SubmitTransaction } from './submit-transaction';

describe('SubmitTransaction', () => {
  it('should return correct RPC Method name', () => {
    expect(SubmitTransaction.RPCMethod()).toBe('xrpl_submit');
  });

  it('should pass blob to submit it to network', () => {
    const mockedBlob = 'myBlob';
    Transaction.submit = jest.fn().mockImplementation((blob) => {
      expect(blob).toBe(mockedBlob);
    });

    const submitTransactionInstance = new SubmitTransaction();
    submitTransactionInstance.handler('', { blob: mockedBlob });
  });

  it('should return submit result from the submit function', async () => {
    const mockedResult = 'result';
    Transaction.submit = jest.fn().mockResolvedValue(mockedResult);

    const submitTransactionInstance = new SubmitTransaction();
    const result = await submitTransactionInstance.handler('', { blob: '' });

    expect(result).toBe(mockedResult);
  });
});
