<script lang="ts">
  export let data;

  import GiCrownCoin from "svelte-icons/gi/GiCrownCoin.svelte";
  import FaChevronCircleUp from "svelte-icons/fa/FaChevronCircleUp.svelte";
  import FaChevronCircleDown from "svelte-icons/fa/FaChevronCircleDown.svelte";
  import GiTrashCan from "svelte-icons/gi/GiTrashCan.svelte";

  import Config from "./Config";

  async function tosettings() {
    const res: any = await fetch(`${Config.origin}/game/tosettings`, {
      method: "POST",
      credentials: "include",
    });
  }

  async function move(username: String, dir: boolean) {
    console.log("clicked on move");

    const res = await fetch(`${Config.origin}/game/move`, {
      method: "POST",
      body: JSON.stringify({ username: username, dir: dir }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  async function kick(username: String) {
    const res = await fetch(`${Config.origin}/game/kick`, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 p-4 text-white text-center">
  <div
    class="bg-gray-700 grid grid-cols-3 border p-2 rounded-lg flex justify-center items-center"
  >
    {#each data["players"] as player, index}
      <div class="text-lg">{index + 1}.</div>
      <div class="text-lg">{player["username"]}</div>
      <div class="grid grid-cols-4 gap-1 p-1 flex justify-center items-center">
        {#if player["isHost"]}
          <div class="text-yellow-400"><GiCrownCoin /></div>
        {:else}
          <div class="" />
        {/if}

        {#if data["isHost"]}
          <button
            class=" bg-transparent rounded-full text-green-500 p-0"
            on:click={() => move(player["username"], true)}
          >
            <FaChevronCircleUp />
          </button>
          <button
            class="bg-transparent rounded-full text-red-500 p-0"
            on:click={() => move(player["username"], false)}
          >
            <FaChevronCircleDown />
          </button>
          <button
            class="{player['hostUsername'] === player['username']
              ? 'hidden'
              : ''} bg-transparent rounded-full text-red-300 p-0"
            on:click={() => kick(player["username"])}
          >
            <GiTrashCan />
          </button>
        {:else}
          <div />
          <div />
          <div />
        {/if}
      </div>
    {/each}
  </div>

  <div class="p-4">
    {#if data["players"].length < 6}
      <p>
        Need {6 - data["players"].length} more players
      </p>
    {:else if data["isHost"]}
      <button class="bg-blue-500 py-2 px-4 rounded-lg" on:click={tosettings}
        >Next</button
      >
    {:else}
      <p class="m-2">Waiting for Host to continue</p>
    {/if}
  </div>
</div>
