
<script lang="ts">
  import { checkMetamaskAvailability } from "./lib/metamask";
  import Header from "./lib/Header.svelte";
  import Dev from "./lib/Dev.svelte";
  import navaid from 'navaid';
  import Dashboard from "./lib/Dashboard.svelte";
  import { getAccountInfo, getAccountTransactions, getSnapState } from "./lib/xrpl-rpc";
  import { snapState } from "./lib/state";
  import type { AccountInfo } from "./lib/types";
  import { onDestroy } from "svelte";
  import Settings from "./lib/Settings.svelte";

  const isMetamaskAvailable = checkMetamaskAvailability();
  let accountInfo: AccountInfo = null;

  const snapStateSub = snapState.subscribe(async(state) => {
    if (!accountInfo && state.snapAvailable) {
      console.log('Trigger initial account data fetch');
      accountInfo = await getAccountInfo();
      console.log('Trigger initial account tx history fetch');
      await getAccountTransactions();
    }
  })

  if (isMetamaskAvailable) {
    console.log('initial snap state fetch');
    getSnapState();
  }

  let page = Dashboard;
  console.log(import.meta);
  const router = navaid(
		(import.meta as any).env.BASE_URL,
		() => page = Dashboard
  );
  router.on('/', () => page = Dashboard)
  router.on('settings', () => page = Settings);

  if ((import.meta as any).env.DEV) {
    console.log('DEV env, enable /dev route.');
    router.on('/dev', () => page = Dev);
  }

  onDestroy(() => snapStateSub());

  router.listen();
</script>

<div class="app-wrapper">
  <Header></Header>
  <div class="container">
    <svelte:component this={page} />
  </div>
</div>

<style lang="scss">
  .container {
    margin-top: 4rem;
  }
</style>
