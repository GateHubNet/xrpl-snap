import { Component } from '@metamask/snaps-ui/dist';
import { TransactionData } from '../types';
import { XRPlorerTransactionResponse } from './transaction-dialog';

export type ITransaction = {
  generateTransactionSpecificDialog(
    transactionData: TransactionData,
    transactionRisk: XRPlorerTransactionResponse,
  ): Component[];
};
