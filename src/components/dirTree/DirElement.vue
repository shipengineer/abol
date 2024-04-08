
<template>
    <div class="directory">
        <button class="directory__expand">

        </button>
        <span class="directory__name">
            {{ }}
        </span>
       
        <File v-for="file,index in files" :file = file :key="index"/>

    </div>
</template>
<script  lang="ts">
export default{
    name:'DirElement',
    props:{
        dir:Object,
        files:Array,
    }
    
}

</script>