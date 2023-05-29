<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import Lobby from "./Lobby.svelte";
  import Settings from "./Settings.svelte";
  import WaitingFor from "./WaitingFor.svelte";
  import RemoveDiamonds from "./RemoveDiamonds.svelte";
  import RemoveToken from "./RemoveToken.svelte";
  import TakeFromBox from "./TakeFromBox.svelte";
  import Accusation from "./Accuse.svelte";
  import Gg from "./Gg.svelte";
  import Config from "./Config";

  let socket: WebSocket;
  let screen: String;
  let data: any; //json

  const dispatch = createEventDispatcher();

  async function websocketConnect() {
    socket = new WebSocket(`ws://${Config.hostName}/websocket`);

    socket.onopen = () => {
      console.log("websocket connected...");
    };

    socket.onclose = () => {
      dispatch("isAuthenticatedChanged", false);
      console.log("websocket closed xxx");
    };

    socket.onmessage = (event) => {
      console.log(`received ${JSON.stringify(JSON.parse(event.data))}`);
      data = JSON.parse(event.data);
      screen = data["screen"];
    };
  }

  async function restartGame() {
    const res = await fetch(`${Config.origin}/game/tolobby`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  onMount(websocketConnect);
</script>

<div>
  {#if data && data["isHost"]}
    {#if !(screen === "lobby" || screen === "GG")}
    <button class="m-2 p-2 rounded-lg border bg-blue-500" on:click={restartGame}
      >Restart Game</button
    >
      
    {/if}
  {/if}

  {#if screen === "lobby"}
    <Lobby bind:data />
  {:else if screen === "settings"}
    <Settings bind:data />
  {:else if screen === "waitingfor"}
    <WaitingFor bind:data />
  {:else if screen === "removediamonds"}
    <RemoveDiamonds bind:data />
  {:else if screen === "removetoken"}
    <RemoveToken bind:data />
  {:else if screen === "takefrombox"}
    <TakeFromBox bind:data />
  {:else if screen === "accuse"}
    <Accusation bind:data />
  {:else if screen === "GG"}
    <Gg bind:data />
  {/if}
</div>
