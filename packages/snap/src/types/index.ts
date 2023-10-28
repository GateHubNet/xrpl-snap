export type StateServer = {
  url: string;
  livenet: boolean;
  network: number;
  use: boolean;
};

export type State = {
  servers: StateServer[];
};

export type XrplRequestData = {
  method: string;
  params: Record<string, unknown>[];
};

export type MemoObj = {
  MemoType: string;
  MemoData: string;
};

export type Memo = {
  Memo: MemoObj;
};

export type BasicTransaction = {
  Account: string;
  TransactionType: string;
  Fee?: string;
  Sequence?: number;
  AccountTxnID?: string;
  Flags?: number;
  LastLedgerSequence?: number;
  Memos?: Memo[];
  Signers?: Record<string, unknown>[];
  SourceTag?: number;
  SigningPubKey?: string;
  TicketSequence?: number;
  TxnSignature?: string;
};

export type NonXRPAmount = {
  value: string;
  currency: string;
  issuer: string;
};

export type Amount = string | NonXRPAmount;

export type PaymentTransaction = BasicTransaction & {
  Amount: Amount;
  Destination: string;
  DestinationTag?: number;
  InvoiceID?: string;
  Paths?: Record<string, unknown>[];
  SendMax?: Amount;
  DeliverMin?: Amount;
};

export type TrustSetTransaction = BasicTransaction & {
  QualityIn: number;
  QualityOut: number;
  LimitAmount: NonXRPAmount;
};

export type OfferCreateTransaction = BasicTransaction & {
  Expiration: number;
  OfferSequence: number;
  TakerGets: Amount;
  TakerPays: Amount;
};

export type OfferCancelTransaction = BasicTransaction & {
  OfferSequence: number;
};

export type TransactionData =
  | PaymentTransaction
  | TrustSetTransaction
  | OfferCreateTransaction
  | OfferCancelTransaction;
