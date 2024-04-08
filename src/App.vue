<template>
 <MainLayout>
  <MainRoot/>
 </MainLayout>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainLayout from "@/layouts/MainLayout.vue"
import MainRoot from './components/dirTree/MainRoot.vue';

@Options({
  components: {
    MainLayout,
    MainRoot
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">

</style>
