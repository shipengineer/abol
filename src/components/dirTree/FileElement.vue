<template>
  <div class="file">
    <span class="file__name">
      {{ file?.name }}
    </span>

  </div>
</template>
<script lang="ts">
export default {
  name: "FileElement",
  props: {
    file: Object
  }
}
</script>
<style>
.file {
  position: relative;
  left: 20px;
}
</style>