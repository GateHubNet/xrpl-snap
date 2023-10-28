import { StateServer, XrplRequestData } from '../types';
import { StateHelper } from './state';

/**
 * Call RippleD with a request and return response to caller function.
 *
 * @param data - Method and params to use for RippleD API Call.
 * @param opts - Optional object where server that we need to call is specified.
 * @param opts.server - RippleD server to call.
 */
export async function postData(
  data: XrplRequestData,
  opts?: { server: string },
) {
  const fetchedServer = await getServer();
  if (!fetchedServer) {
    throw new Error(
      'Cannot find any server. Please update state with new server.',
    );
  }
  const server = opts?.server ?? fetchedServer.url;

  return fetch(server, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => response.result);
}

/**
 * Get all rippled servers from state and return one that we need to use.
 *
 * @returns Default url of a rippled server.
 */
export async function getServer(): Promise<StateServer | undefined> {
  const state = await StateHelper.get();

  if (!state.servers) {
    return undefined;
  }

  return state.servers.find((s: StateServer) => Boolean(s.use));
}
