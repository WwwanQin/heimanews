<template>
    <div class="label-item" @click="myclick">
        <span>{{ label }}</span>
        <span>{{ tips }}<span class="iconfont iconjiantou1"></span></span>
    </div>
</template>

<script>
export default {
    props:['label','tips','method'],
    methods:{
        myclick(){
            this.$emit(this.method ? this.method : '');
        }
    }
}
</script>

<style lang="less" scoped>
    .label-item{
        display: flex;
        justify-content: space-between;
        height: 25/360 * 100vh;
        border-bottom: 1px solid #ccadad;
        line-height: 25/360 * 100vh;
        font-size: 14px;
        :nth-child(2){
            color: gray;
            font-size: 13px;
            font-family: 微软雅黑;
        }
    }
</style>