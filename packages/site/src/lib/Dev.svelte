<script lang="ts">
  import { onDestroy } from "svelte";
  import { checkMetamaskAvailability, connectSnap, getSnap, getSnaps } from "./metamask";
  import { getAccountInfo, sendXrps, getAccountTransactions, getSnapState } from './xrpl-rpc'
  import { accountInfo, metamaskState, snapState } from "./state";
  import type { AccountInfo, MetamaskClient, SnapState } from "./types";
  import { getActiveServer } from "./helpers";

  let _metamaskState: MetamaskClient = null;
  let _accountData: AccountInfo = null;
  let _snapState: SnapState = null;
  let response: string;

  const metamaskSub = metamaskState.subscribe(val => _metamaskState = val);
  const snapStateSub = snapState.subscribe(val => _snapState = val);
  const accountDataSub = accountInfo.subscribe(val => _accountData = val);

  onDestroy(() => {
    metamaskSub();
    accountDataSub();
    snapStateSub();
  });

  const checkMetamaskClientHandler = async () => response = JSON.stringify(await checkMetamaskAvailability(true));
  const getSnapsHandler = async () => response = JSON.stringify(await getSnaps());
  const connectSnapHandler = async () => response = JSON.stringify(await connectSnap());
  const getOwnSnapHandler = async () => response = JSON.stringify(await getSnap());
  const getSnapStateHandler = async () => response = JSON.stringify(await getSnapState());
  const getAccountInfoHandler = async () => response = JSON.stringify(await getAccountInfo());

  const sendXrpsHandler = async () => response = JSON.stringify(await sendXrps({
    destination: "rBvTkVQikhuZBoC7p3zdVbnPr1JscUsuA1",
    amount: "10"
  }))
  const getAccountTransactionsHandler = async () => response = JSON.stringify(await getAccountTransactions());

  const getActiveServerUrl = (): string => {
    if (!_snapState) {
      return 'n/a';
    }

    return getActiveServer(_snapState.servers)?.url;
  }
</script>

<h3 class="mb-4">Developer panel</h3>

<div class="card card-bordered">
  <div class="card-header">
      <h3 class="card-title">Store data</h3>
  </div>
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item">metamaskAvailable: {_metamaskState?.metamaskAvailable}</li>
      <li class="list-group-item">metamaskClient: {_metamaskState?.metamaskClient}</li>
      <li class="list-group-item">NODE: {getActiveServerUrl()}</li>
      <li class="list-group-item">Account Address: {_accountData?.Account}</li>
      <li class="list-group-item">Account Balance: {_accountData?.Balance}</li>
      <li class="list-group-item">Account Flags: {_accountData?.Flags}</li>
    </ul>
  </div>
</div>

<div class="card card-bordered">
  <div class="card-header">
      <h3 class="card-title">Trigger actions</h3>
  </div>
  <div class="card-body">
    <button class="btn btn-primary" on:click={checkMetamaskClientHandler}>Refresh metamask client</button>
    <button class="btn btn-primary" on:click={connectSnapHandler}>Connect snap</button>
    <button class="btn btn-primary" on:click={getSnapsHandler}>Get installed snaps</button>
    <button class="btn btn-primary" on:click={getOwnSnapHandler}>Get local snap</button>
    <button class="btn btn-primary" on:click={getSnapStateHandler}>Get Snap State</button>
    <button class="btn btn-primary" on:click={getAccountInfoHandler}>Account Info</button>
    <button class="btn btn-primary" on:click={sendXrpsHandler}>Send XRP</button>
    <button class="btn btn-primary" on:click={getAccountTransactionsHandler}>Account Transactions</button>
  </div>
</div>



<div class="card card-dashed">
  <div class="card-header">
      <h3 class="card-title">RPC response</h3>
  </div>
  <div class="card-body">
      {response}
  </div>
</div>


<style lang="scss">
  .card {
    margin-bottom: 2rem;
  }

  .card-body .btn {
    margin-right: .2rem;
    margin-bottom: 1rem;
  }
</style>
