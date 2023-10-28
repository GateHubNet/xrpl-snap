
<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import type { AlertType } from "./types";

  export let type: AlertType = 'primary';
  export let dismissible = true;
  export let header = '';
  export let body = '';
  export let visible = true;

  onMount(() => {
		console.log("mount name:", body);
	})

	afterUpdate(() => {
		console.log("after update name:", body);
	})

  const dismiss = () => visible = false;
</script>

{#if visible}
  <div class="alert alert-{type} d-flex align-items-center mb-10 {dismissible ? 'alert-dismissible' : ''}">
    <div class="d-flex flex-column">
        <h4 class="mb-1 text-{type}">{header}</h4>
        <span>{body}<span>
    </div>
    {#if dismissible}
    <button type="button" class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" on:click={dismiss}>
      <span class="svg-icon svg-icon-2x svg-icon-light">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor"></rect>
          <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor"></rect>
        </svg>
      </span>
    </button>
    {/if}
  </div>

{/if}

<style lang="scss"></style>
