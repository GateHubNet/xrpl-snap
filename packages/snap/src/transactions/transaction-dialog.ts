import { divider, heading, text, Component } from '@metamask/snaps-ui/dist';
import { TransactionData } from '../types';
import { NotImplementedError } from '../types/errors';
import { TransactionFactory } from './transaction.factory';

export class TransactionDialog {
  private static GenerateDialogHeader(origin: string): Component[] {
    const headerDialog: Component[] = [heading('Sign XRPL Transaction')];

    if (Boolean(origin) && origin.length > 0) {
      headerDialog.push(
        text(`Got a request from ${origin} to sign following transaction`),
      );
    } else {
      text(`Got a request to sign following transaction`);
    }

    return headerDialog;
  }

  private static GenerateNotImplementErrorDialog(
    transactionData: TransactionData,
  ): Component[] {
    return [
      text("We haven't implemented pretty output for this kind of transaction"),
      text('Here is the raw transaction for you to check'),
      text(JSON.stringify(transactionData, undefined, 4)),
    ];
  }

  private static GenerateDialogBody(
    transactionData: TransactionData,
  ): Component[] {
    try {
      const transactionInstance = TransactionFactory.create(transactionData);
      return transactionInstance.generateTransactionSpecificDialog(
        transactionData,
      );
      return [];
    } catch (err) {
      if (err instanceof NotImplementedError) {
        return TransactionDialog.GenerateNotImplementErrorDialog(
          transactionData,
        );
      }
      throw err;
    }
  }

  private static GenerateDialogFooter(): Component[] {
    const footerDialog: Component[] = [
      text('**Please check that all of the above fields are correct.**'),
      text(
        '_All transactions are final, and we are unable to revert any transaction that was signed and/or submitted_',
      ),
    ];

    return footerDialog;
  }

  public static GenerateDialog(
    origin: string,
    transactionData: TransactionData,
  ): Component[] {
    return TransactionDialog.GenerateDialogHeader(origin)
      .concat([divider()])
      .concat(TransactionDialog.GenerateDialogBody(transactionData))
      .concat([divider()])
      .concat(TransactionDialog.GenerateDialogFooter());
  }
}
