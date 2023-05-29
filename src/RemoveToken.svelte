<script lang="ts">
  export let data;

  import GiCrownCoin from "svelte-icons/gi/GiCrownCoin.svelte";
  import FaChevronCircleUp from "svelte-icons/fa/FaChevronCircleUp.svelte";
  import FaChevronCircleDown from "svelte-icons/fa/FaChevronCircleDown.svelte";

  import Config from "./Config";

  let roleCode: string = "";

  async function next() {
    const res = await fetch(`${Config.origin}/game/removetoken`, {
      method: "POST",
      body: JSON.stringify({ roleCode: roleCode }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  function setToken(theRoleCode: string) {
    roleCode = theRoleCode;
  }
</script>

<div class="grid grid-cols-1 border rounded-lg bg-gray-700 m-5 p-4">
  <h2 class="text-2xl">Remove One Role</h2>
  <div class="grid grid-cols-1 gap-2 flex justify-center items-center m-2 p-2">
    {#each Object.entries(data["removableTokens"]) as [k, v], index (k)}
      <button
        class="{roleCode === k
          ? 'bg-blue-500'
          : 'bg-neutral-700'} text-lg border rounded-lg m-1 p-3"
        on:click={() => setToken(k)}>{v}</button
      >
    {/each}
  </div>
  <div>
    <button on:click={next} class="p-2 rounded-lg bg-blue-500">Next</button>
  </div>
</div>
