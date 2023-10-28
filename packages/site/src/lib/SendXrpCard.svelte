<script lang="ts">
  import Alert from "./Alert.svelte";
  import type { AlertType } from "./types";
  import { getAccountInfo, sendXrps } from "./xrpl-rpc";

  let sendAmount: '';
  let sendDestination: '';

  let submitInProgress = false;
  let alert: { type: AlertType, header: string, message: string } = null;

  const submitForm = async () => {
    if (submitInProgress) {
      return;
    }
    try {
      if (Number.parseFloat(sendAmount) === NaN) {
        return;
      }
      if (!sendDestination?.trim().length) {
        return;
      }

      submitInProgress = true;
      const response = await sendXrps({
        amount: sendAmount,
        destination: sendDestination
      });

      console.log(response);
      getAccountInfo();

      setSuccessMessage(response.engine_result_message);
      submitInProgress = false;
      clearForm();

    } catch (error) {
      submitInProgress = false;
      setErrorMessage(error.message)
    }

  }

  const clearForm = () => {
    sendAmount = '';
    sendDestination = '';
  }

  function setErrorMessage(message: string) {
    alert = {
      type: 'danger',
      header: 'Failed to submit the transaction',
      message
    }
  }
  function setSuccessMessage(message: string) {
    alert = {
      type: 'success',
      header: 'Transaction submitted successfully',
      message
    }
  }
</script>

<form class="card mb-8 card-bordered" on:submit|preventDefault={submitForm}>
  <div class="card-header">
    <h3 class="card-title">Send XRP</h3>
  </div>
  <div class="card-body">
    {#if alert}
    <Alert type={alert.type} header={alert.header} body={alert.message} dismissible={true}></Alert>
    {/if}
    <div>
      <div class="mb-7">
        <label class="form-label" for="amount-input">XRP Amount</label>
        <input class="form-control" type="number" id="amount-input" placeholder="0.00" step=".000001" bind:value={sendAmount} />
      </div>
      <div class="mb-7">
        <label class="form-label" for="amount-destination">Destination Account</label>
        <input class="form-control" id="amount-destination" placeholder="r...." bind:value={sendDestination} />
      </div>
    </div>
  </div>
  <div class="card-footer text-end">
    <button type="button" class="btn btn-secondary me-3" on:click={clearForm} disabled={submitInProgress}>Clear</button>
    <button type="submit" class="btn btn-success" disabled={submitInProgress}>
      { submitInProgress ? 'Processing transaction' : 'Submit Payment' }
    </button>
  </div>
</form>

<style lang="scss"></style>
