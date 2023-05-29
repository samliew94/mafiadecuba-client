<script lang="ts">
  export let data;

  import GiCrownCoin from "svelte-icons/gi/GiCrownCoin.svelte";
  import FaChevronCircleUp from "svelte-icons/fa/FaChevronCircleUp.svelte";
  import FaChevronCircleDown from "svelte-icons/fa/FaChevronCircleDown.svelte";

  import Config from "./Config";

  async function changeGodfather(username: String) {
    // only host can change godFather
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/changegodfather`, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  async function toremovediamonds() {
    // only host can call this method
    if (!data["isHost"]) return;

    const res = await fetch(`${Config.origin}/game/toremovediamonds`, {
      method: "POST",
      // body: JSON.stringify({ username: username }),
      // headers: {
      //   "Content-Type": "application/json",
      // },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 bg-gray-700 m-5 p-4 rounded-lg border gap-4 h-auto">
  <div
    class="grid grid-cols-2 border rounded-lg p-4 text-sm gap-4 items-center bg-gray-600"
  >
    <div>Loyal Kakia:</div>
    <div>{data["numKakia"]}</div>
    <div class="text-blue-500">Mata:</div>
    <div>{data["numMata"]}</div>
    <div class="text-green-500">Driver:</div>
    <div>{data["numDriver"]}</div>
    <div>Joker:</div>
    <div>{data["numJoker"]}</div>
  </div>

  <p class="text-2xl">Select Godfather</p>

  <div class="grid grid-cols-1 gap-2">
    {#each data["players"] as player, index}
      {#if player === data["godfather"]}
        <button class="m-1 p-1 bg-blue-500 border rounded-lg">{player}</button>
      {:else}
        <button
          on:click={() => changeGodfather(player)}
          class="m-1 p-1 bg-neutral-700 border rounded-lg"
        >
          {player}
        </button>
      {/if}
    {/each}
  </div>

  <!-- only host can see the Next button -->
  {#if data["isHost"]}
    <div>
      <button class="m-2 p-2 bg-blue-500 rounded-lg" on:click={toremovediamonds}
        >Next</button
      >
    </div>
  {/if}
</div>
