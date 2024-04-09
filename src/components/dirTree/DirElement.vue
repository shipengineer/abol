<template>
    <div class="directory">


        <span class="directory__name">
            {{ directory.name }}
        </span>
        <button class="directory__expand">
            раскрыть
        </button>
        <button @click="rename" class="directory__rename">переименовать</button>
        <SubDirElement v-for="dir in dirs" :directory="dir" :key="dir.id" />
        <FileElement v-for="file in files" :file="file" :key="file.id" />

    </div>
</template>
<script setup lang="ts">
import FileElement from './FileElement.vue';
import SubDirElement from './SubDirElement.vue';
import { Item } from '@/types/Item';
import { computed, defineProps } from 'vue';
import { useTreeStore } from '@/stores/FileTree';
const store = useTreeStore();
const { getTreeElementById } = store
const props = defineProps(['directory'])
const getedFiles = computed(() => {
    const result: Array<Item> = []
    if (props.directory) {
        props.directory.children.forEach((dir: string) => result.push(getTreeElementById(dir)))
    }
    return result
})
const dirs = computed(() => {
    return getedFiles.value.filter(elem => elem.type === 'dir')
})
const files = computed(() => {
    return getedFiles.value.filter(elem => elem.type === 'file')
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