/* eslint-disable jsdoc/require-jsdoc */
import { writable } from 'svelte/store';
import type {
  AccountInfo,
  AccountTxResponse,
  MetamaskClient,
  SnapState,
} from './types';

export const metamaskState = writable<MetamaskClient>({
  metamaskAvailable: false,
  metamaskClient: null,
});
export const snapState = writable<SnapState>({
  snapAvailable: false,
  servers: [],
});

export const accountInfo = writable<AccountInfo>(null);
export const accountTxHistory = writable<AccountTxResponse>(null);

export const errorState = writable<string>(null);

export const clearState = () => {
  // todo: disconnect from metamask if possible
  snapState.update((state) => ({
    ...state,
    snapAvailable: false,
  }));
  accountInfo.set(null);
  accountTxHistory.set(null);
};
