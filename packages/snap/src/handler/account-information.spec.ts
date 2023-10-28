import { AccountInformation } from './account-information';

describe('AccountInformation', () => {
  it('should return correct RPC Method name', () => {
    expect(AccountInformation.RPCMethod()).toBe('xrpl_accountInfo');
  });
});
