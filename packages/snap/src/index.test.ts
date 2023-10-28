import { installSnap } from '@metamask/snaps-jest';
import { describe, expect } from '@jest/globals';

// TODO: add tests for xrpl_sign method.
// currently we get error saying "Timed out waiting for snap interface to be shown."
// need to deep dive into it!
describe('onRpcRequest', () => {
  let defaultState: any;
  let stateUseLivenet: any;
  beforeEach(() => {
    defaultState = {
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
    };

    stateUseLivenet = {
      servers: [
        {
          url: 'https://testnet.xrpl-labs.com',
          use: false,
          livenet: false,
          network: 1,
        },
        {
          url: 'https://xrplcluster.com',
          use: true,
          livenet: true,
          network: 0,
        },
      ],
    };
  });

  describe('xrpl_getState', () => {
    it('should return default rippled servers', async () => {
      const { request } = await installSnap();
      const { response } = await request({
        method: 'xrpl_getState',
      });

      const state = (response as any).result;
      expect(state).toMatchObject(defaultState);
    });
  });

  describe('xrpl_setServers', () => {
    it('should update rippled servers', async () => {
      const { request } = await installSnap();

      const servers = defaultState.servers.map((server: any) => {
        return {
          ...server,
          use: server.livenet === true,
        };
      });

      const { response } = await request({
        method: 'xrpl_setServers',
        params: { servers },
      });

      expect((response as any).result).toMatchObject(stateUseLivenet);
    });
  });

  describe('xrpl_accountInfo', () => {
    it('should return wallet account', async () => {
      const { request } = await installSnap();

      const { response } = await request({
        method: 'xrpl_accountInfo',
      });

      expect((response as any).result).toBeDefined();
      expect(Object.keys((response as any).result)).toStrictEqual(['Account']);
    });

    it('should always return same wallet account', async () => {
      const { request } = await installSnap();

      const [account1, account2] = await Promise.all([
        request({ method: 'xrpl_accountInfo' }),
        request({ method: 'xrpl_accountInfo' }),
      ]);

      expect(account1.response).toMatchObject(account2.response);
    });

    it('should return different wallet account for testnet and livenet', async () => {
      const { request } = await installSnap();

      const testnetAccount = await request({
        method: 'xrpl_accountInfo',
      });

      // update state
      const servers = defaultState.servers.map((server: any) => ({
        ...server,
        use: server.livenet === true,
      }));

      await request({
        method: 'xrpl_setServers',
        params: { servers },
      });

      const livenetAccount = await request({
        method: 'xrpl_accountInfo',
      });

      expect(livenetAccount.response).not.toMatchObject(
        testnetAccount.response,
      );
    });
  });
});
