import type { StateServer } from '../../../snap/src/types';
import type { SnapState } from './types';

const RIPPLE_EPOCH_DIFF = 0x386d4380;

export function rippleTimeToUnix(rpEpoch: number): number {
  return (rpEpoch + RIPPLE_EPOCH_DIFF) * 1000;
}

export function rippleTimeToDateString(rippleTime: number) {
  return new Date(rippleTimeToUnix(rippleTime)).toISOString();
}

export function getActiveServer(
  servers: SnapState['servers'] = [],
): StateServer {
  return servers.find((server) => server.use);
}
