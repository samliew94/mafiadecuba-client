<script lang="ts">
  export let data;

  import FaChevronCircleUp from "svelte-icons/fa/FaChevronCircleUp.svelte";
  import FaChevronCircleDown from "svelte-icons/fa/FaChevronCircleDown.svelte";
  import GiCutDiamond from "svelte-icons/gi/GiCutDiamond.svelte";
  import Icon from "@iconify/svelte";

  import Config from "./Config";

  let selectedRoleCode: string;
  let diamondsStolen: number = Math.floor(Math.random() * 31) - 15;
  let maxDiamonds: number = data["remainingDiamonds"];
  let refRolesData: any = data["refRoleData"];
  let remainingTokens: any = data["remainingTokens"];
  let kkTokens: number = remainingTokens["KK"]["remainingTokens"];
  let mTokens: number = remainingTokens["M"]["remainingTokens"];
  let dTokens: number = remainingTokens["D"]["remainingTokens"];
  let isLastPlayer: boolean = data["isLastPlayer"];

  let roleName: string = "";
  let roleColor: string = "";
  let isBtnNextVisible: boolean;

  $: {
    isBtnNextVisible = false;

    if (isLastPlayer) {
      if (diamondsStolen >= 0 && diamondsStolen <= maxDiamonds) {
        isBtnNextVisible = true;
      }
    } else {
      if (diamondsStolen > 0 && diamondsStolen <= maxDiamonds) {
        isBtnNextVisible = true;
      } else if (selectedRoleCode) {
        isBtnNextVisible = true;
      } else if (
        kkTokens === 0 &&
        mTokens === 0 &&
        dTokens === 0 &&
        maxDiamonds === 0
      ) {
        isBtnNextVisible = true;
      }
    }
  }

  $: {
    if (diamondsStolen > 0) {
      roleName = refRolesData["T"]["roleName"];
      roleColor = refRolesData["T"]["roleColor"];
    } else if (kkTokens === 0 && mTokens === 0 && dTokens === 0) {
      roleName = refRolesData["ST"]["roleName"];
      roleColor = refRolesData["ST"]["roleColor"];
    } else if (selectedRoleCode) {
      roleName = refRolesData[selectedRoleCode]["roleName"];
      roleColor = refRolesData[selectedRoleCode]["roleColor"];
    } else {
      if (kkTokens > 0 || mTokens > 0 || dTokens > 0) {
        roleName = refRolesData["ST"]["roleName"];
        roleColor = refRolesData["ST"]["roleColor"];
      } else {
        roleName = "Select a Role";
        roleColor = "text-white-500";
      }
    }
  }

  async function next() {
    const res = await fetch(`${Config.origin}/game/takefrombox`, {
      method: "POST",
      body: JSON.stringify({
        diamondsStolen: diamondsStolen,
        selectedRoleCode: selectedRoleCode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  function incrDecrDiamond(incr: boolean) {
    diamondsStolen = incr ? diamondsStolen + 1 : diamondsStolen - 1;
    diamondsStolen = diamondsStolen > 15 ? 15 : diamondsStolen;
    diamondsStolen = diamondsStolen < -15 ? -15 : diamondsStolen;

    if (diamondsStolen < 0 || diamondsStolen > 0) selectedRoleCode = null;
  }

  function onSelectRoleCode(theSelectedRoleCode: string) {
    if (remainingTokens[theSelectedRoleCode]["remainingTokens"] === 0) {
      return;
    }

    if (diamondsStolen < 0 || diamondsStolen > 0) {
      selectedRoleCode = null;
      return;
    }

    selectedRoleCode = theSelectedRoleCode;
  }
</script>

<div
  class="grid grid-cols-1 gap-2 items-center m-5 p-4 border bg-gray-700 rounded-lg"
>
  <p class="{roleColor} text-4xl py-4">
    {roleName}
  </p>
  <div class="grid grid-cols-2 text-2xl place-items-center">
    <div class="grid grid-cols-1 place-items-center">
      <p>Steal</p>
      <div class="flex">
        <p>{diamondsStolen}</p>
        <p>/{maxDiamonds}</p>
      </div>
    </div>
    <div
      class="text-blue-300 grid grid-cols-5 h-full m-2 p-2 w-full border place-items-center rounded-lg"
    >
      {#if diamondsStolen >= 0}
        {#each Array(diamondsStolen > maxDiamonds ? maxDiamonds : diamondsStolen) as _, index}
          <Icon width=32 icon="ion:diamond" />
        {/each}
      {/if}
    </div>
  </div>
  <div class="grid grid-cols-2 place-items-center">
    <button on:click={() => incrDecrDiamond(true)}>
      <Icon width="72" color="#4CAF50" icon="zondicons:add-solid" />
    </button>
    <button on:click={() => incrDecrDiamond(false)}>
      <Icon width="72" color="#EF4444" icon="zondicons:minus-solid" />
    </button>
  </div>
  <div class="grid grid-cols-1">
    {#each Object.entries(remainingTokens) as [k, v], index (k)}
      <button
        class="rounded-lg text-sm {selectedRoleCode === k
          ? 'bg-blue-500'
          : 'bg-transparent'} border m-1 py-2 px-4"
        on:click={() => onSelectRoleCode(k)}
      >
        <div class="grid grid-cols-2 items-center">
          <p class="text-right">{v["roleName"]}</p>
          <p>x {v["remainingTokens"]}</p>
        </div>
      </button>
    {/each}
  </div>

  <div>
    <button
      on:click={next}
      class="{isBtnNextVisible ? '' : 'hidden'} rounded-lg bg-blue-500 p-2"
      >Next</button
    >
  </div>
</div>
