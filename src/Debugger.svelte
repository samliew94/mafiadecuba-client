<script lang="ts">
  import Config from "./Config";
  import { createEventDispatcher, onMount } from "svelte";
  let dispatch = createEventDispatcher();

  async function onLogout() {
    const res = await fetch(`${Config.origin}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    dispatch("isAuthenticatedChanged", res.status !== 200);
  }
</script>

<button on:click={onLogout}>Logout (DEBUG)</button>
