<template>
  <div class="comment">
      <div class="left-label">
          <input type="button" value="写跟帖" @click="commentsPage">
      </div>
      <div class="right-label">
          <span class="iconfont iconpinglun-" @click="commentsPage">
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
        },
        commentsPage(){
            this.$emit('handleComment');
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
                box-sizing: border-box;
                color: #898282;
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
                    width: 35 / 360 * 100vw;
                    height: 20 / 360 * 100vw;
                    line-height: 20 / 360 * 100vw;
                    background-color: red;
                    bottom: 15px;
                    right: -22px;
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