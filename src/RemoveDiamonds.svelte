<script lang="ts">
  export let data;

  import Icon from "@iconify/svelte";

  import Config from "./Config";

  // user sees 10 - 15
  let totalDiamonds: number = Math.floor(Math.random() * 6) + 10;

  async function next() {
    const res = await fetch(`${Config.origin}/game/initdiamonds`, {
      method: "POST",
      body: JSON.stringify({ totalDiamonds: totalDiamonds }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  function incrDecrDiamond(incr: boolean) {
    totalDiamonds = incr ? totalDiamonds + 1 : totalDiamonds - 1;
    totalDiamonds = totalDiamonds > 15 ? 15 : totalDiamonds;
    totalDiamonds = totalDiamonds < 10 ? 10 : totalDiamonds;
  }
</script>

<div class="grid grid-cols-1 gap-2 m-5 p-4 border bg-gray-700 rounded-lg">
  <p class="text-2xl my-2">GODFATHER</p>
  <p class="text-sm my-4">Secretly place 10-15 Diamonds in the box</p>
  <p class="">Total Diamonds:</p>
  <p>{totalDiamonds} / 15</p>
  <div class="grid grid-cols-2 m-5 gap-2 place-items-center">
    <button on:click={() => incrDecrDiamond(true)}>
      <Icon width="72" color="#4CAF50" icon="zondicons:add-solid" />
    </button>
    <button on:click={() => incrDecrDiamond(false)}>
      <Icon width="72" color="#EF4444" icon="zondicons:minus-solid" />
    </button>
  </div>
  <div>
    <button on:click={next} class="rounded-lg bg-blue-500 p-2">Next</button>
  </div>
</div>
