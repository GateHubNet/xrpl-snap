<script lang="ts">
  import { onDestroy } from "svelte";
  import type { StateServer } from "../../../snap/src/types";
  import { getActiveServer } from "./helpers";
  import { snapState } from "./state";
  import type { SnapState } from "./types";
  import { setSnapServers } from "./xrpl-rpc";

  let servers: StateServer[] = [];
  let activeIndex = 0;
  let activeServer: StateServer = null;
  const snapStateSub = snapState.subscribe(val => {
    servers = val.servers;

    activeIndex = servers.findIndex(s => s.use);
    activeServer = servers[activeIndex];
  });

  const setServer = (serverIndex: number) => {
    console.log('set server', serverIndex);
    activeServer.use = false;
    servers[serverIndex].use = true;

    setSnapServers(servers);
  }

  onDestroy(() => {
    snapStateSub();
  });

  $: activeServerUrl = activeServer?.url || 'n/a';

</script>

<h3 class="mb-4">Settings</h3>

<div class="card card-bordered">
  <div class="card-header">
      <h3 class="card-title">XRPL Node</h3>
  </div>
  <div class="card-body">
    <p class="lead d-inline">Active server: {activeServerUrl}</p>

    <p>Switch server: {activeIndex}</p>
    {#each servers as server, i}
    <label class="d-block my-3">
      <input type="radio" bind:group={activeIndex} on:change={() => setServer(i)} name="servers" value={i}>
      {server.url}
      {#if server.livenet}
      <span class="badge badge-info">Livenet</span>
      {/if}
    </label>
  {/each}
  </div>
</div>

<style lang="scss"></style>
