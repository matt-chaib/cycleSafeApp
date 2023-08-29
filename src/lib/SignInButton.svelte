<script lang="ts">
  export let provider: any
</script>

<form action={provider.signinUrl} method="POST">
  {#if provider.callbackUrl}
    <input type="hidden" name="callbackUrl" value={provider.callbackUrl} />
  {/if}
  <button on:click={() => console.log("provider", provider)}>
  </button>
  <button type="submit" class="button">
    <slot>Sign in with... {provider.name}</slot>
  </button>
</form>
