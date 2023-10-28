import { IRPCHandler } from './rpc.interface';
import { SignTransaction } from './sign-transaction';
import { SubmitTransaction } from './submit-transaction';

// TODO: remove this method. implement sign method with submit: true
export class SignSubmitTransaction implements IRPCHandler {
  static RPCMethod(): string {
    return 'xrpl_signAndSubmit';
  }

  async handler(origin: string, params: any) {
    const signHandler = new SignTransaction();
    const submitHandler = new SubmitTransaction();

    const { signedTransaction } = await signHandler.handler(origin, params);
    return submitHandler.handler(origin, { blob: signedTransaction });
  }
}
