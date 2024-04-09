<template>
    <div class="directory">
        <input v-if="isRename" type="text" v-model="newName" />
        <span v-else class="directory__name">
            {{ directory.name }}
        </span>
        <button class="directory__expand">
            <img src="@/assets/icons/closed.svg"/>
        </button>
        <button v-if="isRename" @click="rename"><img src="@/assets/icons/apply.svg"/></button>
        <button v-else @click="isRename = true" class="directory__rename"><img src="@/assets/icons/edit.svg"/></button>
        <button @click=" deleteFileById(props.directory.id)"><img src="@/assets/icons/delete.svg"/></button>
        <button @click=" addNewFile(props.directory.id)"><img src="@/assets/icons/addFile.svg"/></button>
        <button @click="addNewFolder(props.directory.id)"><img src="@/assets/icons/addFolder.svg"/></button> 
        

        <DirElement v-for="dir in dirs" :directory="dir" :key="dir.id" />
        <FileElement v-for="file in files" :file="file" :key="file.id" />

    </div>
</template>
<script setup lang="ts">
import FileElement from './FileElement.vue';
import { Item } from '@/types/Item';
import { computed, defineProps, ref } from 'vue';
import { useTreeStore } from '@/stores/FileTree';
const store = useTreeStore();
const { getTreeElementById, setNewNameById, deleteFileById,addNewFile,addNewFolder } = store
const props = defineProps(['directory'])
const isRename = ref(false)
const newName = ref(`${props.directory.name}`)
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
    setNewNameById(props.directory.id, newName.value)
    isRename.value = false
}


// const addNewFolder = function () {

// }

</script>
<style>
.directory {
    position: relative;
    left: 20px;
}
</style>