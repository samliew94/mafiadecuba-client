<script lang="ts">
  export let data;
</script>

<div class="grid grid-cols-1 gap-2 border rounded-lg m-5 p-4 bg-gray-700">
  <p class="">Waiting For</p>
  <p class="text-3xl">{data["waitingFor"]}</p>
</div>
