<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from 'svelte/transition';
  import { Big } from 'big.js';
  import { accountInfo } from "./state";
  import type { AccountInfo } from "./types";
  import { getAccountInfo } from "./xrpl-rpc";
  let accountDataLoading = true;
  let accountData: AccountInfo = null;

  // todo: add big.js
  $: accountBalance = accountData?.Balance
    ? new Big(accountData.Balance).div(1000000).toString()
    : '0';
  $: accountBalanceCompact = accountData?.Balance
    ? new Big(accountData.Balance).div(1000000).toFixed(2, 0)
    : '0';


  const accountTxSub = accountInfo.subscribe((account) => {
    accountData = account;
    if (account !== null) {
      accountDataLoading = false;
    }
    console.log(accountData);
  });

  const updateAccountInfo = async () => {
    if (accountDataLoading) {
      return;
    }
    accountDataLoading = true;
    await getAccountInfo();
    console.log(accountInfo);
    accountDataLoading = false;
  }

  const copyAddress = () => {
    if (!accountData?.Account) {
      return;
    }
    navigator.clipboard.writeText(accountData.Account).then(function() {
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  onDestroy(() => accountTxSub());
</script>

<div class="card mb-8 card-bordered">
  <div class="card-header">
    <h3 class="card-title">
      Account Data
    </h3>
    <div class="card-toolbar">
      <button type="button" class="btn btn-sm btn-secondary"
        on:click={updateAccountInfo}
        disabled={accountDataLoading}>{accountDataLoading ? 'Loading' : 'Refresh'}</button>
    </div>
  </div>
  <div class="card-body">
    <div class="mb-4">
      <p class="lead d-inline">{accountData?.Account || '...'}</p>
      {#if accountData?.Account}
      <button class="btn btn-icon btn-muted btn-sm" on:click={copyAddress}>
        <span class="svg-icon svg-icon-muted"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.5" d="M18 2H9C7.34315 2 6 3.34315 6 5H8C8 4.44772 8.44772 4 9 4H18C18.5523 4 19 4.44772 19 5V16C19 16.5523 18.5523 17 18 17V19C19.6569 19 21 17.6569 21 16V5C21 3.34315 19.6569 2 18 2Z" fill="currentColor"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7857 7.125H6.21429C5.62255 7.125 5.14286 7.6007 5.14286 8.1875V18.8125C5.14286 19.3993 5.62255 19.875 6.21429 19.875H14.7857C15.3774 19.875 15.8571 19.3993 15.8571 18.8125V8.1875C15.8571 7.6007 15.3774 7.125 14.7857 7.125ZM6.21429 5C4.43908 5 3 6.42709 3 8.1875V18.8125C3 20.5729 4.43909 22 6.21429 22H14.7857C16.5609 22 18 20.5729 18 18.8125V8.1875C18 6.42709 16.5609 5 14.7857 5H6.21429Z" fill="currentColor"/>
          </svg>
        </span>
      </button>
      {/if}
    </div>

    <p class="lead text-muted">
      BALANCE:
    </p>
    {#key accountBalance}
    <p class="display-6" in:fade title={accountBalance}>{accountBalanceCompact} XRP</p>
    {/key}
  </div>
  <div class="card-footer">
    <button class="btn btn-sm btn-icon-white btn-secondary me-2 mb-1">
      <span class="svg-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z" fill="currentColor"/>
        <path opacity="0.3" d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z" fill="currentColor"/>
        </svg>
      </span>
      Send XRP
    </button>
    <button class="btn btn-sm btn-icon-white btn-secondary me-2 mb-1">
      <span class="svg-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"/>
        <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor"/>
        </svg>
      </span>
      Set trust
    </button>
  </div>
</div>

<style lang="scss"></style>
