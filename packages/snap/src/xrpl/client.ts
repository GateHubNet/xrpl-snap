import { postData } from '../helpers/api';

export class XrplClient {
  public static raw(method: string, params: any) {
    return postData({ method, params });
  }

  public static getAccountTransactions(
    account: string,
    marker: any,
    limit = 10,
  ) {
    return postData({
      method: 'account_tx',
      params: [
        {
          limit,
          marker,
          account,
          binary: false,
        },
      ],
    });
  }

  public static getTransactionInfo(hash: string) {
    return postData({
      method: 'tx',
      params: [
        {
          transaction: hash,
          binary: false,
        },
      ],
    });
  }

  public static getAccountInfo(account: string) {
    return postData({
      method: 'account_info',
      params: [
        {
          account,
          ledger: 'current',
        },
      ],
    });
  }

  public static getAccountNfts(account: string) {
    return postData({
      method: 'account_nfts',
      params: [
        {
          account,
          ledger: 'current',
        },
      ],
    });
  }

  public static getLedgerFee() {
    return postData({
      method: 'fee',
      params: [{}],
    });
  }

  public static submit(blob: string) {
    return postData({
      method: 'submit',
      params: [
        {
          tx_blob: blob,
        },
      ],
    });
  }
}
