<template>
    <div class="file">
        <span class="file__name">
          {{props.file.name}}
        </span>

    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  file:object
}>()
</script>