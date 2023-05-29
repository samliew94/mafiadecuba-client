<script lang="ts">
  export let data;

  import Config from "./Config";

  async function next() {
    if (!data["accused"]) return;

    const res = await fetch(`${Config.origin}/game/accuse`, {
      method: "POST",
      body: JSON.stringify({
        accused: data["accused"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  async function onAccuse(username: string) {
    if (!data["isGodfather"]) {
      return;
    }

    const res = await fetch(`${Config.origin}/game/accuseplayer`, {
      method: "POST",
      body: JSON.stringify({
        accused: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
</script>

<div class="grid grid-cols-1 gap-5 text-center items-center p-4 bg-gray-700 m-5 border rounded-lg">
  <p class="text-5xl">谁是贼 ?</p>
  {#if data["isGodfather"]}
    <p class="italic text-sm">
      {data["diamonds"]}/{data["initialDiamonds"]} diamonds recovered
    </p>
  {/if}
  {#if data["lastAccusation"]}
    <p class="italic text-xs">{data["lastAccusation"]}</p>
  {/if}
  <div class="grid grid-cols-1 gap-2">
    {#each data["players"] as player, index}
      <button
        on:click={() => onAccuse(player)}
        class="rounded-lg p-2 border {data['accused'] === player
          ? 'bg-blue-500'
          : 'blue-neutral-700'} text-lg">{player}</button
      >
    {/each}
  </div>

  {#if data["isGodfather"]}
    <div>
      <button
        on:click={next}
        class="{data['accused']
          ? 'bg-blue-500'
          : 'bg-gray-500'} rounded-lg m-2 p-2">Next</button
      >
    </div>
  {/if}
</div>
