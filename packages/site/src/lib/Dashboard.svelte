<script lang="ts">
  import AccountDataCard from './AccountDataCard.svelte';
  import AccountTxCard from './AccountTxCard.svelte';
  import SendXrpCard from './SendXrpCard.svelte';
</script>

<h3 class="mb-4">XRPL Dashboard</h3>

<div class="dashboard-content">
  <div class="container p-0">
    <div class="row">
      <div class="col-md-6 col-12">
        <AccountDataCard></AccountDataCard>
      </div>
      <div class="col-md-6 col-12">
        <AccountTxCard></AccountTxCard>
      </div>
    </div>
    <SendXrpCard></SendXrpCard>
  </div>
</div>

<style lang="scss"></style>
