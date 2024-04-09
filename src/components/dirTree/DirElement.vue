<template>
    <div class="directory">
        <div class="comand-line">
        <button class="directory__expand"  @click="isExpand = !isExpand">
            <img src="@/assets/icons/closed.svg" class="expand-button" :class="{rotated:isExpand}"/>
        </button>
        <input v-if="isRename" type="text" v-model="newName" class="inputName" />
        <span v-else class="directory__name">
            {{ directory.name }}
        </span>
        <button v-if="isRename" @click="renameHandler">
            <img src="@/assets/icons/apply.svg"/><div class="tooltip">Применить</div>
        </button>
        <button v-else @click="isRename = true" class="directory__rename">
            <img src="@/assets/icons/edit.svg"/><div class="tooltip">Переименовать</div>
        </button>
        
        <div class="buttons" :class="{expand:isExpand}">

            <button @click=" addNewFile(props.directory.id)" class="add-file-button">
                <img src="@/assets/icons/addFile.svg"/><div class="tooltip">Добавить файл</div>
            </button>
            <button @click="addNewFolder(props.directory.id)" class="add-folder-button">
                <img src="@/assets/icons/addFolder.svg"/><div class="tooltip">Добавить папку</div>
            </button> 
        </div>
        <button @click="deleteFileById(props.directory.id)" class="delete-button">
            <img src="@/assets/icons/delete.svg"/><div class="tooltip">Удалить</div>
        </button>

        </div>
        <div class="wraper" :class="{expand:isExpand}">

            <DirElement v-for="dir in dirs" :directory="dir" :key="dir.id" />
            <FileElement v-for="file in files" :file="file" :key="file.id" />
        </div>
            
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
const isExpand = ref(false)
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
const renameHandler = function () {
    setNewNameById(props.directory.id, newName.value)
    isRename.value = false
}

</script>
<style lang="scss" scoped>
.expand-button{
    transform: rotate(0deg);
    transition: 300ms;
}
.rotated{
    transform: rotate(90deg);
    transition:300ms;
}
.wraper{
    .expand{
      display: none;
      }
        position: relative;
        width: 100%;
        border-left: 2px solid rgba(255, 0, 0, 0.3);
    }

.directory, .file{
    
    img{
        width: 30px;
        height: 30px;
    }
    button{
        position: relative;
        &:hover{
            cursor: pointer;
            .tooltip{
                display: block;
                opacity: 0.7;
                transition: 500ms
            }
        }
        background-color: transparent;
        border: none;
        .tooltip{
            
            background-color: wheat;
            padding: 5px;
            position: absolute;
            width: fit-content;
            left: 100%;
            bottom: 100%;
            z-index: 2;
            display: none;
            opacity: 0;
                transition: 500ms
        }
    }
    .comand-line{
    display: flex;
    flex-direction: row;
    
    width: 100%;
}
    font-size: 24px;
    
    display: flex;
    flex-direction: row;
    row-gap: 5px;
    width: 350px;
    flex-wrap: wrap;
    padding-left: 10px;
    
    .inputName{
        max-width: 100px;
        border: 2px solid black;
    }
    &__name{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>