<template>
  <div class="comment">
      <div class="left-label">
          <input type="text" placeholder="写跟帖">
      </div>
      <div class="right-label">
          <span class="iconfont iconpinglun-">
              <i>{{ data.comment_length }}</i>
          </span>
          <span class="iconfont iconshoucang"
          :style="{color:(data.has_star ? 'red' : 'black')}"
          @click="checkLike">
          </span>
          <span class="iconfont iconfenxiang"></span>
      </div>
  </div>
</template>

<script>
export default {
    props:['data'],
    methods:{
        checkLike(){
            this.$emit('handlelike')
        }
    }
}
</script>

<style scoped lang="less">
    .comment{
        margin-left: -15 / 360 * 100vw;
        position: fixed;
        bottom: 0;
        display: flex;
        height: 60 / 360 * 100vw;
        align-items: center;
        background-color: rgb(255, 255, 255);
        border-top: 1px solid #efeded;
        width: 100%;
        .left-label{
            width: 220 / 360 * 100vw;
            height: 40 / 360 * 100vw;
            margin-left: 15 / 360 * 100vw;
            input{
                width: 100%;
                height: 90%;
                outline: none;
                border: 0;
                background: rgb(243, 243, 243);
                border-radius: 50px;
                padding-left: 20 / 360 * 100vw;
                box-sizing: border-box;
                color: black;
            }
        }
        .right-label{
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            .iconpinglun-{
                position: relative;
                i{
                    text-decoration: none;
                    position: absolute;
                    width: 40 / 360 * 100vw;
                    height: 20 / 360 * 100vw;
                    line-height: 20 / 360 * 100vw;
                    background-color: red;
                    bottom: 18px;
                    right: -18px;
                    border-radius: 10px;
                    font-size: medium;
                    text-align: center;
                    color: white;
                }
            }
            span{
                font-size: 25px;
            }
        }
    }
</style>