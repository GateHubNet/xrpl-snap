import type { State, StateServer } from '../../../snap/src/types';
import { SNAP_ENDPOINT } from './config';
import { accountInfo, accountTxHistory, snapState } from './state';
import type { AccountInfo } from './types';

export const getSnapState = async () => {
  console.log('get state', SNAP_ENDPOINT);
  try {
    const response: State = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ENDPOINT,
        request: {
          method: 'xrpl_getState'
        }
      }

    });

    snapState.set({
      snapAvailable: true,
      servers: response.servers,
    });

    return response;
  } catch (error) {
    console.error(error);
    snapState.set({
      snapAvailable: false,
      servers: [],
    });
    throw error;
  }
};

export const setSnapServers = async (
  servers: StateServer[],
): Promise<State> => {
  console.log('set snap state', servers);
  try {
    const response: State = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ENDPOINT,
        request: {
          method: 'xrpl_setServers',
          params: { servers }
        },
      },
    });

    console.log('Update response', response);

    snapState.set({
      snapAvailable: true,
      servers: response.servers,
    });

    return response;
  } catch (error) {
    console.error(error);
    snapState.set({
      snapAvailable: false,
      servers: [],
    });
    throw error;
  }
};

export const getAccountInfo = async (
  address?: string,
): Promise<AccountInfo> => {
  console.log('get account info', address, SNAP_ENDPOINT);
  try {
    const response = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ENDPOINT,
        request: {
          method: 'xrpl_accountInfo'
        }
      },
    });

    // only update store for own account
    if (!address) {
      accountInfo.set(response);
    }

    return response;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const sendXrps = async (payment: {
  destination: string;
  amount: string;
}) => {
  console.log('send xrps', payment, SNAP_ENDPOINT);

  const { destination, amount } = payment;
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: SNAP_ENDPOINT,
      request: {
        method: 'xrpl_signAndSubmit',
        params: {
          data: {
            TransactionType: "Payment",
            Destination: destination,
            Amount: `${amount}`
          }
        }
      }
    }
  });
};

export const getAccountTransactions = async (data?: {
  address?: string;
  limit?: number;
  marker?: any;
}) => {
  console.log('get account txs', data, SNAP_ENDPOINT);
  try {
    const params: any = {}
    if (data?.address) {
      params.address = data.address;
    }
    if (data?.limit) {
      params.limit = data.limit;
    }
    if (data?.marker) {
      params.marker = data.marker;
    }

    const response = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId: SNAP_ENDPOINT,
        request: {
          method: 'xrpl_accountTransactions',
          params: {}
        }
      }
    });

    // only update store for own account
    if (!data?.address) {
      // todo: handle marker pages (append to array?)
      accountTxHistory.set(response);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
