<script lang="ts">
  import { onMount } from "svelte";
  import Config from "./Config";
  import Game from "./Game.svelte";
  import Login from "./Login.svelte";
  import Debugger from "./Debugger.svelte";
  import RemoveDiamonds from "./RemoveDiamonds.svelte";
  import RemoveToken from "./RemoveToken.svelte";
  import TakeFromBox from "./TakeFromBox.svelte";
  import Accusation from "./Accuse.svelte";
  import Gg from "./Gg.svelte";
  import Lobby from "./Lobby.svelte";
  import Settings from "./Settings.svelte";
  import Accuse from "./Accuse.svelte";
  import WaitingFor from "./WaitingFor.svelte";
  import Connecting from "./lib/Connecting.svelte";

  let isAuthenticated:boolean = false;
  let isConnected:boolean = false

  async function getPrincipal() {
    const uri = `${Config.origin}/user/principal`;
    console.log(uri);

    const res = await fetch(`${Config.origin}/user/principal`, {
      credentials: "include",
    });

    if (res.status === 200) {
      isAuthenticated = true;
    } else if (res.status === 401) {
      isAuthenticated = false;
    }
  }

  onMount(getPrincipal);

  function onIsAuthenticatedChanged(e): void {
    console.log(`isAuthenticated = ${e.detail}`);
    
    isAuthenticated = e.detail;
  }

  let debugMsg: string;
  function onDebugMsg(e): void {
    debugMsg = e.detail;
  }
</script>

<main
  class="bg-neutral-700 h-full min-h-screen place-items-center grid grid-cols-1 text-center text-white  "
>
  {#if isAuthenticated}
    <Game on:isAuthenticatedChanged={onIsAuthenticatedChanged}/>
  {:else}
    <Login
      on:isAuthenticatedChanged={onIsAuthenticatedChanged}
      on:loginMsg={onDebugMsg}
    />
  {/if}

  <!-- debug mode -->
  <!-- <Login /> -->
  <!-- <Lobby
    data={{
      isHost: true,
      players: [
        { username: "FOO", isHost: true, hostUsername: "FOO" },
        { username: "BAR", isHost: false, hostUsername: "FOO" },
        { username: "BAZ", isHost: false, hostUsername: "FOO" },
        { username: "QUZ", isHost: false, hostUsername: "FOO" },
        { username: "QUX", isHost: false, hostUsername: "FOO" },
        { username: "FAZ", isHost: false, hostUsername: "FOO" },
      ],
    }}
  /> -->
   <!-- <Settings
    data={{
      isHost: true,
      numKakia: 1,
      numDriver: 1,
      numMata: 1,
      numJoker: 0,
      godfather: "FOO",
      players: ["FOO", "BAR", "BAZ", "QUZ", "FUZ", "BUZ"],
    }}
  /> -->
  <!-- <RemoveDiamonds data={{

  }}/> -->
  <!-- <RemoveToken
    data={{
      removableTokens: {
        "": "None",
        KK: "Loyal Kakia",
        D: "Driver",
      },
    }}
  /> -->
  <!-- <TakeFromBox
    data={{
      remainingDiamonds: 15,
      refRoleData: {
        T: {
          roleName: "Thief",
          roleColor: "text-red-500",
        },
        ST: {
          roleName: "Street Thief",
          roleColor: "text-red-500",
        },
      },
      remainingTokens: {
        KK: {
          roleName: "Loyal Kakia",
          remainingTokens: 1,
        },
        M: {
          roleName: "Mata",
          remainingTokens: 1,
        },
        D: {
          roleName: "Driver",
          remainingTokens: 1,
        },
      },
      isLastPlayer: true,
    }}
  /> -->
  <!-- <Accuse
    data={{
      isGodfather: true,
      diamonds: 5,
      initialDiamonds: 15,
      lastAccusation: "foo bar baz quz muz qux fal far",
      accused: "foo",
      players: ["FOO", "BAR", "BAZ", "QUX", "FUX", "LUX", "DUE"],
    }}
  /> -->
  <!--<WaitingFor data={{ waitingFor: "FOOBAR" }} />
  <Gg
    data={{
      isHost: true,
      isWin: false,
      players: {
        FOO: {
          roleName: "Godfather",
          roleColor: "text-white-500",
        },
        BAR: {
          roleName: "Thief",
          roleColor: "text-red-500",
          diamondsStolen: 5,
        },
        BAZ: {
          roleName: "Mata",
          roleColor: "text-blue-500",
        },
        QUZ: {
          roleName: "Driver",
          roleColor: "text-green-500",
        },
      },
      logs: [
        "Lorem",
        "Ipsum",
        "Tomato",
        "Potato",
        "Lorem",
        "Ipsum",
        "Tomato",
        "Potato",
        "Lorem",
        "Ipsum",
        "Tomato",
        "Potato",
      ],
    }}
  /> -->
</main>
