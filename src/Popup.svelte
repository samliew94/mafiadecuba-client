<!-- Popup.svelte -->
<script>
    export let message;
    export let onClose;
  </script>
  
  <div class="popup-overlay">
    <div class="popup-content">
      <span>{message}</span>
      <button on:click={onClose}>Close</button>
    </div>
  </div>
  
  <style>
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .popup-content {
      background-color: black;
      padding: 20px;
      border-radius: 5px;
      text-align: center;
    }
  </style>