<template>
    <div class="mainRoot">
        <DirElement v-for="item,index in files" :key="index"/>
    </div>
</template>
<script setup lang="ts">
import {useTreeStore} from '@/stores/FileTree'
import DirElement from './DirElement.vue';
const tree = useTreeStore()
const files = tree.tree.consist

</script>