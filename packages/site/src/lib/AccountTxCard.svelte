<script lang="ts">
  import { onDestroy } from "svelte";
  import { accountTxHistory, snapState } from "./state";
  import { getAccountTransactions } from "./xrpl-rpc";
  import type { AccountTxResponse } from './types';
  import { rippleTimeToDateString } from "./helpers";
  import { EXPLORER_ENDPOINTS } from "./config";

  let accountTxLoading = true;
  let accountTxInfo: AccountTxResponse = null;
  let txHistory = [];
  let explorerEndpoint = undefined;

  const snapStateSub = snapState.subscribe((state) => {
    const activeServer = state.servers.find((server) => server.use)
    if (!activeServer) {
      return;
    }
    if (activeServer.livenet) {
      explorerEndpoint = EXPLORER_ENDPOINTS.mainnet;
    }
    else {
      explorerEndpoint = EXPLORER_ENDPOINTS.testnet;
    }
  })

  const accountTxSub = accountTxHistory.subscribe((history) => {
    accountTxInfo = history;
    txHistory = accountTxInfo?.transactions || [];
    if (history !== null) {
      accountTxLoading = false;
    }
    console.log(accountTxInfo);
  });

  const updateAccountTxHistory = async () => {
    if (accountTxLoading) {
      return;
    }
    accountTxLoading = true;
    await getAccountTransactions();
    accountTxLoading = false;
  }

  const txIsoString = (rippleTime: number) => {
    return rippleTimeToDateString(rippleTime);
  }

  const openTxInExplorer = (hash: string) => {
    if (!explorerEndpoint) {
      return;
    }
    window.open(`${explorerEndpoint}/${hash}`)
  }

  onDestroy(() => {
    accountTxSub();
    snapStateSub();
  });
</script>

<div class="card mb-8 card-bordered">
  <div class="card-header">
    <h3 class="card-title">Account tx history</h3>
    <div class="card-toolbar">
      <button type="button" class="btn btn-sm btn-secondary"
        on:click={updateAccountTxHistory}
        disabled={accountTxLoading}>{accountTxLoading ? 'Loading' : 'Refresh'}</button>
    </div>
  </div>
  <div class="card-body">


<div class="table-responsive">
  <table class="table table-rounded table-hover table-striped border gx-3 gy-2">
    <thead>
      <tr class="fw-bold fs-6 text-gray-800">
        <th>Sequence</th>
        <th>Type</th>
        <th>Status</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {#each txHistory as transaction }
      <tr class="pointer" on:click={() => openTxInExplorer(transaction.tx.hash)}>
        <td>#{ transaction.tx.Sequence }</td>
        <td>{ transaction.tx.TransactionType }</td>
        <td>{ transaction.meta.TransactionResult }</td>
        <td>{ txIsoString(transaction.tx.date) }</td>
      </tr>
      {/each}
    </tbody>
    </table>
  </div>


  </div>
</div>

<style lang="scss"></style>
