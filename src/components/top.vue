<template>
    <div class="toplabel" @click="myclick">
        <span class="iconfont iconjiantou" @click="$router.back()"></span>
        <strong>{{ centerText }}</strong>
        <span class="iconfont iconshouye" @click="$router.push('/')"></span>
    </div>
</template>

<script>
export default {
    props:['centerText'],
    methods:{
        myclick(){
            this.$emit('myclick');
        }
    }
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