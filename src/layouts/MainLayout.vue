<template>
    <div class="main">
        <slot/>
    </div>
</template>
<style lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.main{
    position: relative;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at 100% 100%, rgba(0, 255, 235, 1) 21%, rgba(7, 58, 187, 1) 91%);
}
</style>