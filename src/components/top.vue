<template>
    <div class="toplabel">
        <span class="iconfont iconjiantou" @click="$router.back()"></span>
        <strong>{{ centerText }}</strong>
        <span class="iconfont iconshouye" @click="$router.push('/')" v-if="showIcon == 0 "></span>
        <span class="iconfont iconshouye" @click="$router.push('/')" v-if="showIcon == 1 " style="opacity: 0;"></span>
    </div>
</template>

<script>
export default {
    props:['centerText','showIcon']
}
</script>

<style lang="less" scoped>
.toplabel{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5 / 360 * 100vw;
    span{
        font-size: 20 / 360 * 100vw;
    }
}
</style>