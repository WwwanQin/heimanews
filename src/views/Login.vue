<template>
  <div>
    <p class="title">{{ msg }}</p>
  </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'登录页面'
        }
    }
}
</script>

<style lang="less" scoped>
    .title{
        font-size: 17px;
        font-weight: 700;
    }
</style>