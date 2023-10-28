import type { State } from '../../../snap/src/types';

export type AccountInfo = {
  Account: string;
  Balance: string;
  Flags: number;
  LedgerEntryType: string;
  OwnerCount: number;
  PreviousTxnID: string;
  PreviousTxnLgrSeq: number;
  Sequence: number;
  index: string;
};

export type SnapState = State & { snapAvailable: boolean };

export type MetamaskClient = {
  metamaskAvailable: boolean;
  metamaskClient: string;
};

export type AccountTxResponse = {
  ledger_index_min: number;
  ledger_index_max: number;
  limit: number;
  marker: string;
  transactions: any[];
  validated: boolean;
};

// UI Types
export type AlertType = 'primary' | 'success' | 'info' | 'danger' | 'warning';
