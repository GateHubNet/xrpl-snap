import { AccountInformation } from './account-information';
import { AccountTransactions } from './account-transactions';
import { GetState } from './get-state';
import { RPCHandlerFactory } from './rpc-handler.factory';
import { SignSubmitTransaction } from './sign-submit-transaction';
import { SignTransaction } from './sign-transaction';
import { SubmitTransaction } from './submit-transaction';
import { UpdateState } from './update-state';

describe('RPCHandlerFactory', () => {
  describe('create()', () => {
    it('should throw error if RPC method is not supported', () => {
      const t = () => {
        return RPCHandlerFactory.create('xrpl_test');
      };

      expect(t).toThrowError();
    });

    it('should return GetState instance', () => {
      const response = RPCHandlerFactory.create('xrpl_getState');
      expect(response).toBeInstanceOf(GetState);
    });

    it('should return UpdateState instance', () => {
      const response = RPCHandlerFactory.create('xrpl_setServers');
      expect(response).toBeInstanceOf(UpdateState);
    });

    it('should return SignTransaction instance', () => {
      const response = RPCHandlerFactory.create('xrpl_sign');
      expect(response).toBeInstanceOf(SignTransaction);
    });

    it('should return SubmitTransaction instance', () => {
      const response = RPCHandlerFactory.create('xrpl_submit');
      expect(response).toBeInstanceOf(SubmitTransaction);
    });

    it('should return AccountInformation instance', () => {
      const response = RPCHandlerFactory.create('xrpl_accountInfo');
      expect(response).toBeInstanceOf(AccountInformation);
    });

    it('should return AccountTransactions instance', () => {
      const response = RPCHandlerFactory.create('xrpl_accountTransactions');
      expect(response).toBeInstanceOf(AccountTransactions);
    });

    it('should return SignSubmitTransaction instance', () => {
      const response = RPCHandlerFactory.create('xrpl_signAndSubmit');
      expect(response).toBeInstanceOf(SignSubmitTransaction);
    });

    it('should throw error if cannot create instance of IRPCHandler', () => {
      RPCHandlerFactory.handlers = {
        [GetState.RPCMethod()]: () => {
          throw new Error('test');
        },
      };

      const t = () => {
        return RPCHandlerFactory.create(GetState.RPCMethod());
      };

      expect(t).toThrowError();
    });
  });
});
