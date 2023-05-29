<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Config from "./Config";

  const dispatch = createEventDispatcher();

  // let username: string = generateRandomString(); // debug
  let username: string = "";
  let loginError: string;
  let banner: string =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNCtDwzLIt3DFc_Ntzeat4AtN03BNJDICEJw&usqp=CAU";

  // Randomly generates a three-letter string using alphabetic characters
  function generateRandomString(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet[randomIndex];
    }

    return randomString;
  }

  function onUsernameChange(event) {
    // Remove non-alphabetic characters using a regular expression
    username = event.target.value.replace(/[^A-Za-z]/g, "");

    // max 10 chars
    username = username.slice(0, 10);

    // Convert the input to uppercase
    username = username.toUpperCase();
  }

  async function onLogin() {
    if (!username || username.trim() === "") return;
    // Send POST request to http://localhost/login with the username
    const res = await fetch(`${Config.origin}/user/login`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 400) {
      loginError = await res.text();
      return;
    }

    loginError = null;

    dispatch("isAuthenticatedChanged", res.status === 200);
  }
</script>

<div
  class="rounded-lg h-auto bg-gray-700 border m-5 p-5 grid grid-cols-1 gap-5"
>
  <div class="flex justify-center items-center">
    <img class="rounded-full" src={banner} alt="Banner" />
  </div>

  {#if loginError}
    <p class="text-red-500">{loginError}</p>
  {/if}
  <p class="text-lg">Mafia de Cuba</p>
  <div class="grid grid-cols-2 items-center">
    <label for="username" class="text-sm">Username</label>
    <input
      type="text"
      class="rounded-lg p-2 text-gray-700"
      bind:value={username}
      on:input={onUsernameChange}
    />
  </div>
  <div class="">
    <button
      class="bg-blue-500 text-white font-bold p-2 rounded-lg"
      on:click={onLogin}>Login</button
    >
  </div>
</div>
