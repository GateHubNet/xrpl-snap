/* eslint-disable lines-between-class-members */
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import * as xal from 'xrpl-accountlib';
import { str2ab } from '../helpers';
import { getServer } from '../helpers/api';
import { StateServer } from '../types';

export class Wallet {
  public readonly address: string;
  public readonly publicKey: string;
  public readonly privateKey: string;

  public constructor(account: xal.XRPL_Account) {
    if (!account?.address || !account?.keypair?.publicKey || !account?.keypair?.privateKey) {
      throw new Error("We were unable to generate XRPL Address for you.");
    }
    
    this.address = account.address;

    this.publicKey = account.keypair.publicKey;
    this.privateKey = account.keypair.privateKey;
  }

  public serialize() {
    return { address: this.address };
  }

  private static walletDeriverIndex(srv: StateServer): number {
    if (srv.livenet) {
      // reserved 0 - 4
      if (srv.network === 0) {
        // xrpl mainnet
        return 0;
      }

      // xahau
      return 4;
    }

    if (srv.network === 1) {
      // xrpl testnet
      return 5;
    }

    // xahau
    return 9;
  }

  public static async get() {
    const xrplNode = await snap.request({
      method: 'snap_getBip44Entropy',
      params: {
        coinType: 144,
      },
    });

    const deriveXrpAddress = await getBIP44AddressKeyDeriver(xrplNode);

    const server = await getServer();
    if (!server) {
      throw new Error(
        'Do not have any server in state. Update state and add new server.',
      );
    }

    const addressKey0 = await deriveXrpAddress(Wallet.walletDeriverIndex(server));

    const data = str2ab(addressKey0.privateKey as string);
    const familySeedData = xal.generate.familySeed({
      entropy: data,
    });

    const xrpWallet = new Wallet(familySeedData);
    return xrpWallet;
  }
}
