import { divider, heading, text, Component } from '@metamask/snaps-ui/dist';
import { TransactionData } from '../types';
import { NotImplementedError } from '../types/errors';
import { TransactionFactory } from './transaction.factory';

export type XRPlorerTransactionResponse = {
  status: number;
  domain?: string;
  address?: string;
};

export class TransactionDialog {
  private static GenerateDialogHeader(origin: string): Component[] {
    const headerDialog: Component[] = [heading('Sign XRPL Transaction')];

    headerDialog.push(
      text(`Got a request from ${origin} to sign following transaction`),
    );

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
    risk: XRPlorerTransactionResponse,
  ): Component[] {
    try {
      const transactionInstance = TransactionFactory.create(transactionData);
      return transactionInstance.generateTransactionSpecificDialog(
        transactionData,
        risk,
      );
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

  private static RiskLevel(
    transactionRisk: XRPlorerTransactionResponse,
  ): Component[] {
    if (transactionRisk.status > 0) {
      const riskDialog = [
        text(`⚠️ **Destination address was previously reported as risky!** ⚠️`),
        text(`⚠️ **Status (0-3): ${transactionRisk.status}** ⚠️`),
      ];

      if (transactionRisk.domain) {
        riskDialog.push(text(`⚠️ Domain: ${transactionRisk.domain} ⚠️`));
      }

      return riskDialog;
    }

    return [
      text(`⚠️ **We were unable to perform destination address risk check!** ⚠️`),
      text(`⚠️ **Be absolutely sure that you know the recipient!** ⚠️`)
    ]
  }

  public static GenerateDialog(
    origin: string,
    transactionData: TransactionData,
    transactionRiskLevel?: XRPlorerTransactionResponse,
  ): Component[] {
    let dialog = TransactionDialog.GenerateDialogHeader(origin).concat([
      divider(),
    ]);

    if (transactionRiskLevel && transactionRiskLevel.status !== 0) {
      dialog = dialog
        .concat(TransactionDialog.RiskLevel(transactionRiskLevel))
        .concat([divider()]);
    }

    const risk = { status: 0 };
    if (transactionRiskLevel) {
      risk.status = transactionRiskLevel.status;
    }

    return dialog
      .concat(TransactionDialog.GenerateDialogBody(transactionData, risk))
      .concat([divider()])
      .concat(TransactionDialog.GenerateDialogFooter());
  }
}
