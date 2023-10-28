import { Component } from '@metamask/snaps-ui/dist';
import { TransactionData } from '../types';

export type ITransaction = {
  generateTransactionSpecificDialog(
    transactionData: TransactionData,
  ): Component[];
};
