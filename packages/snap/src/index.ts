import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { RPCHandlerFactory } from './handler/rpc-handler.factory';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.request - A validated JSON-RPC request object.
 * @param args.origin - Caller of this RPC method
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  const rpcHandler = RPCHandlerFactory.create(request.method);
  return rpcHandler.handler(origin, request.params);
};
