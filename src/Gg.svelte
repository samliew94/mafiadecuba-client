<script lang="ts">
  export let data;

  import Config from "./Config";
  import Icon from "@iconify/svelte";

  async function playAgain() {
    const res = await fetch(`${Config.origin}/game/tolobby`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
</script>

<div
  class="grid grid-cols-1 items-center border bg-gray-700 m-5 rounded-lg p-4"
>
  {#if data["isWin"]}
    <p class="text-2xl text-green-500">You Win!</p>
  {:else}
    <p class="text-2xl text-red-500">You Lose!</p>
  {/if}

  <div class="grid grid-cols-3 gap-4 flex justify-center items-center m-4">
    {#each Object.entries(data["players"]) as [k, v], index (k)}
      <p>{k}</p>
      <p class="{v["isCaught"] ? "line-through decoration-auto italic" : ""} {v["roleColor"]}">{v["roleName"]}</p>
      {#if v["roleCode"] === "T"}
        <div class="grid grid-cols-2 items-center">
          <p>{v["diamondsStolen"]}x</p>
          <div class="w-6 text-blue-300 px-1">
            <Icon width="28" icon="ion:diamond" />
          </div>
        </div>
      {:else}
        <div />
      {/if}
    {/each}
  </div>

  <div class="grid grid-cols-10 gap-4 text-xs m-2">
    {#each data["logs"] as log, index}
      <div class="col-span-1"><p>{index + 1}. </p></div>
      <div class="col-span-9 text-left"><p>{log}</p></div>
    {/each}
  </div>

  {#if data["isHost"]}
    <div>
      <button on:click={playAgain} class="bg-blue-500 rounded-lg p-2"
        >Play Again</button
      >
    </div>
  {/if}
</div>
