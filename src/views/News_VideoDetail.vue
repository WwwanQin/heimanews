<template>
    <div class="videodetail">
        视频详情
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        console.log(1);
        console.log(this.$route.params.id);
    }
}
</script>

<style lang="less" scoped>
    .videodetail{
        margin: 15 / 360 * 100vw;
    }
</style>