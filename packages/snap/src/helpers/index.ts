import { BigNumber } from 'bignumber.js';
import { Amount } from '../types';

/**
 * Convert string to Uint8Array.
 *
 * @param str - String to convert.
 * @returns String converted into Uint8Array.
 */
export function str2ab(str: string): Uint8Array {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return bufView;
}

/**
 * Generate text amount. Amount can be string or object, so this function will handle both.
 *
 * @param amount - directly from the transaction, can be either string, representing drops or object, representing IOUs.
 * @returns String representing transaction amount
 */
export function generateAmountText(amount: string | Amount): string {
  if (typeof amount === 'string') {
    const amountInDrops = new BigNumber(amount);
    const xrpAmount = amountInDrops.dividedBy(1000000);
    return `${xrpAmount.toString()} XRP`;
  }

  return `${amount.value} ${amount.currency}`;
}
