<template>
  <div class="file">
    <input v-if="isRename" type="text" v-model="newName" class="file__nameinput"/>
        <span v-else class="file__name">
            {{ file.name }}
        </span>
        <button v-if="isRename" @click="renameHandler" class="rename-button"><img src="@/assets/icons/edit.svg"/></button>
        <button v-else @click="isRename = true" class="apply-button"><img src="@/assets/icons/edit.svg"/><div class="tooltip">Переименовать</div></button>
        <button @click="deleteHandler" class="delete-button"><img src="@/assets/icons/delete.svg"/><div class="tooltip">Удалить</div></button>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useTreeStore } from '@/stores/FileTree';
const store = useTreeStore();
const { setNewNameById, deleteFileById, } = store
const props = defineProps(['file'])
const isRename=ref(false)
const newName = ref(`${props.file.name}`)
const renameHandler = function () {
    setNewNameById(props.file.id, newName.value)
    isRename.value = false
}
const deleteHandler = function () {
  
    deleteFileById(props.file.id)
}
</script>
<style>
.file {
  position: relative;
  left: 20px;
  font-size: 24px;
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
}
</style>