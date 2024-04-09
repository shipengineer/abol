<template>
    <div class="mainRoot">

        <DirElement v-for="dir in dirs" :mTree="dir" :id="dir.id" :key="dir.id" />
        <FileElement v-for="file in files" :file="file" :key="file.id" />
    </div>
</template>
<script lang="ts">
import { useTreeStore } from '@/stores/FileTree'
import DirElement from './DirElement.vue';
import FileElement from './FileElement.vue';
import { Item } from '@/types/Item';

export default {
    components: {
        DirElement,
        FileElement
    },

    data() {
        return {
            tree: useTreeStore(),

        }
    },
    computed: {
        childrens() {
            return this.tree.tree.consist
        },
        dirs(): Array<Item> {
            return this.childrens?.filter((elem: { type: string; }) => elem.type === 'dir')
        },
        files(): Array<Item> {
            return this.childrens?.filter((elem: { type: string; }) => elem.type === 'file')
        }
    }
}


</script>
<style lang="scss">
.mainRoot {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>