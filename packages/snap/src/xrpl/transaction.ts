import * as binary from '@xrpl-snap/ripple-binary-codec';

import { TransactionData } from '../types';
import { XrplClient } from './client';
import { computeSignature, hashSignedTx } from './utils';
import { Wallet } from './wallet';
import { heading, panel, spinner } from '@metamask/snaps-ui'

export class Transaction {
  private readonly tx: TransactionData;

  public constructor(data: TransactionData) {
    this.tx = Object.assign({}, data);
  }

  public get Data() {
    return this.tx;
  }

  public async autofill() {
    const [accountDataResponse, feeResponse] = await Promise.all([
      XrplClient.getAccountInfo(this.tx.Account),
      XrplClient.getLedgerFee(),
    ]);

    if (accountDataResponse.error_message) {
      throw new Error(accountDataResponse.error_message);
    }

    if (feeResponse.error_message) {
      throw new Error(feeResponse.error_message);
    }

    this.tx.Fee = feeResponse.drops.open_ledger_fee;
    this.tx.Sequence = accountDataResponse.account_data.Sequence;
  }

  // TODO: implement multisig - probably need to wait for support for forms for snaps
  public async sign(wallet: Wallet) {
    // must be without signers or already signed
    if (this.tx.TxnSignature || this.tx.Signers) {
      throw new Error('Transaction must not contain TxnSignature or Signers');
    }

    this.tx.SigningPubKey = wallet.publicKey;

    this.tx.TxnSignature = computeSignature(this.tx, wallet.privateKey);

    const serialized = binary.encode(this.tx);
    return {
      signedTransaction: serialized,
      hash: hashSignedTx(serialized),
    };
  }

  public static async submit(blob: string) {
    // show spinner
    snap.request({
      method: 'snap_dialog',
      params: {
        type: 'alert',
        content: panel([heading('Submitting transaction...'), spinner()])
      },
    });

    return XrplClient.submit(blob);
  }
}
