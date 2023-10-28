import { State } from '../types';

export class StateHelper {
  static async update(state: State) {
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: state,
      },
    });
  }

  static async get() {
    let data = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    });

    if (!data) {
      data = {
        servers: [
          {
            url: 'https://testnet.xrpl-labs.com',
            use: true,
            livenet: false,
            network: 1,
          },
          {
            url: 'https://xrplcluster.com',
            use: false,
            livenet: true,
            network: 0,
          },
        ],
      } as State;

      await StateHelper.update(data as State);
    }

    return data;
  }
}
