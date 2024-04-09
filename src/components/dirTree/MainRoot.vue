<template>
    <div class="mainRoot">

        <DirElement v-for="dir in dirs" :directory="dir" :key="dir.id" />
        <FileElement v-for="file in files" :file="file" :key="file.id" />
    </div>
</template>
<script setup lang="ts">
import { useTreeStore } from '@/stores/FileTree'
import DirElement from './DirElement.vue';
import { Item } from '@/types/Item';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import FileElement from './FileElement.vue';
const store = useTreeStore()
const { tree } = storeToRefs(store)

const dirs = computed(() => {
    const result: Array<Item> = []
    tree.value.forEach(value => {
        if (value.type === 'dir' && value.parent == 'root') { result.push(value) }
    })
    return result
})
const files = computed(() => {
    const result: Array<Item> = []
    tree.value.forEach(value => {
        if (value.type === 'file' && value.parent == 'root') { result.push(value) }
    })
    return result
})




</script>
<style lang="scss">
.mainRoot {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>