/* eslint-disable jsdoc/require-jsdoc */
import { createHash } from 'crypto';
import { sign } from 'ripple-keypairs';
import * as binary from '@xrpl-snap/ripple-binary-codec';

const HASH_SIZE = 64;

export function computeSignature(tx: any, privateKey: string) {
  const signingData = binary.encodeForSigning(tx);
  return sign(signingData, privateKey);
}

enum HashPrefix {
  // transaction plus signature to give transaction ID 'TXN'
  TRANSACTION_ID = 0x54584e00,

  // transaction plus metadata 'TND'
  TRANSACTION_NODE = 0x534e4400,

  // inner node in tree 'MIN'
  INNER_NODE = 0x4d494e00,

  // leaf node in tree 'MLN'
  LEAF_NODE = 0x4d4c4e00,

  // inner transaction to sign 'STX'
  TRANSACTION_SIGN = 0x53545800,

  // inner transaction to sign (TESTNET) 'stx'
  TRANSACTION_SIGN_TESTNET = 0x73747800,

  // inner transaction to multisign 'SMT'
  TRANSACTION_MULTISIGN = 0x534d5400,

  // ledger 'LWR'
  LEDGER = 0x4c575200,
}

function sha512Half(hex: string): string {
  return createHash('sha512')
    .update(Buffer.from(hex, 'hex'))
    .digest('hex')
    .toUpperCase()
    .slice(0, HASH_SIZE);
}

export function hashSignedTx(tx: any): string {
  let txBlob: string;
  let txObject: any;
  if (typeof tx === 'string') {
    txBlob = tx;
    /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Required until updated in binary codec. */
    txObject = binary.decode(tx) as any;
  } else {
    txBlob = binary.encode(tx);
    txObject = tx;
  }

  if (txObject.TxnSignature === undefined && txObject.Signers === undefined) {
    throw new Error('The transaction must be signed to hash it.');
  }

  const prefix = HashPrefix.TRANSACTION_ID.toString(16).toUpperCase();
  return sha512Half(prefix.concat(txBlob));
}
