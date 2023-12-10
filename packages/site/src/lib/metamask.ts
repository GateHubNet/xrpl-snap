import { SNAP_ENDPOINT } from './config';
import { metamaskState } from './state';
import { getSnapState } from './xrpl-rpc';

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type GetSnapsResponse = Record<string, Snap>;

// eslint-disable-next-line jsdoc/require-jsdoc
export async function checkMetamaskAvailability(requireFlask = true) {
  console.log('checkMetamaskAvailability');
  const provider = (window as any).ethereum;

  try {
    const clientVersion = await provider?.request({
      method: 'web3_clientVersion',
    });

    console.log('isMetamaskFlaskAvailable', clientVersion);

    const flaskCheckOk =
      !requireFlask || (clientVersion as string[])?.includes('flask');
    const isMetamaskAvailable = Boolean(provider && flaskCheckOk);

    metamaskState.set({
      metamaskAvailable: isMetamaskAvailable,
      metamaskClient: clientVersion,
    });

    return isMetamaskAvailable;
  } catch {
    metamaskState.set({
      metamaskAvailable: false,
      metamaskClient: null,
    });

    return false;
  }
}

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  console.log('get snaps');
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = SNAP_ENDPOINT,
  params: Record<'version' | string, unknown> = {},
) => {
  console.log('Connect snap', snapId, params);
  try {
    const response = await window.ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {
          version: '^0.3.2',
          ...params,
        }
      }
    });

    // todo: maybe move this to App flow handler
    getSnapState();

    return response;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  console.log('Get own snap', version);
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === SNAP_ENDPOINT && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
