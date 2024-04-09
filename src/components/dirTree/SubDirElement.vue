<template>
    <div class="directory">
        <button class="directory__expand">
            раскрыть
        </button>

        <span class="directory__name">
            {{ mTree?.name }}
        </span>
        <DirElement v-for="dir in dirs" :mTree="dir" :key="dir.id" />
        <FileElement v-for="file in files" :file="file" :key="file.id" />

    </div>
</template>
<script lang="ts">
import { Options } from 'vue-class-component';
import DirElement from './DirElement.vue';
import FileElement from './FileElement.vue';
import { Item } from '@/types/Item';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubDirElement',

    props: {
        mTree: Object
    },
    computed: {
        dirs(): Array<Item> {
            return this.mTree?.consist.filter((elem: { type: string; }) => elem.type === 'dir')
        },
        files(): Array<Item> {
            return this.mTree?.consist.filter((elem: { type: string; }) => elem.type === 'file')
        }
    },
    components: {
        DirElement,
        FileElement
    }

})

</script>
<style>
.directory {
    position: relative;
    left: 20px;
}
</style>