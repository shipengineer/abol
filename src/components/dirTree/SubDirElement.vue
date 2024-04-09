<template>
    <div class="directory">


        <span class="directory__name">
            {{ directory.name }}
        </span>
        <button @click="rename" class="directory__rename">переименовать</button>
        <button class="directory__expand">
            раскрыть
        </button>
        <DirElement v-for="dir in dirs" :directory="dir" :key="dir.id" />
        <FileElement v-for="file in files" :file='file' :key="file.id" />

    </div>
</template>
<script setup lang="ts">
import FileElement from './FileElement.vue';
import DirElement from './DirElement.vue';
import { Item } from '@/types/Item';
import { computed, defineProps } from 'vue';
import { useTreeStore } from '@/stores/FileTree';
const store = useTreeStore();
const { getTreeElementById } = store
const props = defineProps(['directory'])
const getedFiles = computed(() => {
    const result: Array<Item> = []
    if (props.directory.children) {
        props.directory.children.forEach((dir: string) => result.push(getTreeElementById(dir)))
    }
    return result
})
const dirs = computed(() => {
    if (getedFiles.value.length !== 0) {
        return getedFiles.value.filter(elem => elem.type === 'dir')
    }
    return []
})
const files = computed(() => {
    if (getedFiles.value.length !== 0) {
        return getedFiles.value.filter(elem => elem.type === 'file')
    }
    return []

})
const rename = function () {
    console.log(1);
}
</script>
<style>
.directory {
    position: relative;
    left: 20px;
}
</style>