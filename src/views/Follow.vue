<template>
  <div class="follow">
    <top centerText="我的关注" showIcon="1"></top>
    <div class="followLabel">
      <div class="follow-item" v-for="(item,index) in follows" :key="index">
        <div class="follow-img">
          <img :src="$axios.defaults.baseURL + (item.head_img ? item.head_img : '/uploads/image/default_avatar.jpg')">
        </div>
        <div class="follow-text">
          <p>{{ item.nickname }}</p>
          <p>{{ moment(item.create_date).format('YYYY-MM-DD') }}</p>
        </div>
        <div class="follow-end">
          <div @click="cancelFollow(item.id)">取消关注</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import top from '@/components/top'
import moment from 'moment'
export default {
  data(){
    return {
      follows:[],
      moment
    }
  },
  methods:{
    initfollows(){
      let {token,user:{id}} = JSON.parse(localStorage.getItem('news_User_Data'))
      this.$axios({
        url:'/user_follows',
        method:'get',
        headers:{
            Authorization:token
        },
      }).then(res => {
        let {data:{data}} = res
        this.follows = data
      })
    },
    cancelFollow(id){
      let {token,user:{userId}} = JSON.parse(localStorage.getItem('news_User_Data'))
      this.$axios({
        url:`/user_unfollow/${id}`,
        method:'get',
        headers:{
          Authorization:token
        }
      }).then(res => {
        let {data:{data}} = res
        this.initfollows();
      })
    }
  },
  components: {
    top
  },
  mounted(){
    this.initfollows();
  }
}
</script>

<style lang="less" scoped>
  .follow{
    margin: 4.16666667vw;
    .followLabel{
      .follow-img{
        flex: 1;
      }
      .follow-item{
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #808080;
        height: 75 / 360 * 100vw;
        margin-top: 8 / 360 * 100vw;
        .follow-img{
          img{
            border-radius: 50%;
            height: 40/360 * 100vw;
            width: 40/360 * 100vw;
            object-fit: cover;
          } 
        }
        .follow-text{
          text-align: center;
          flex:  0 0 38%;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 120 / 360 * 100vw;
            margin-left: 15 / 360 * 100vw;
          }
          :nth-child(1){
            text-align: left;
          }
          :nth-child(2){
            color: gray;
            text-align: left;
            font-size: 12 / 360 * 100vw;
            padding-top: 5 / 360 * 100vw;
          }
        }
        .follow-end{
          flex:  0 0 50%;
          text-align: right;
          display: flex;
          justify-content: flex-end;
          div{
            width: 80 / 360 * 100vw;
            height: 30 / 360 * 100vw;
            line-height: 30 / 360 * 100vw;
            background-color: rgb(224, 224, 224);
            border-radius: 50px;
            text-align: center;
            font-size: 13px;
          }
        }
      }
    }
  }
</style>