<template>
  <div class="messagereply">
      <div class="message">
        <div class="detail">
            <div class="nickanme">{{ data.user.nickname }}</div>
            <div class="data">{{ moment(data.create_date).fromNow() }}</div>
            <div class="huifu"  @click="childReply(data)">回复</div>
        </div>
        <div class="content">
            {{ data.content }}
        </div>
        <div v-if="data.parent">
            <messageReply 
            :data="data.parent"
            @handleReply="childReply">
            </messageReply>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
            moment
        }
    },
    methods:{
        childReply(data){
            this.$emit('handleReply',data);
        }
    },
    name: 'messageReply',
    props: ['data'],
}
</script>

<style scoped lang="less">
    .message{
        border: 1px solid rgb(201, 190, 190);
        border-radius: 5px;
        margin: 5 / 360 *100vw;
        padding: 5 / 360 * 100vw;
        font-size: 12px;
        .detail{
            display: flex;
            padding-bottom:  5 / 360 * 100vw;
            .data{
                margin-left: 10 / 360 * 100vw;
                font-size: 10px;
                color: gray;
                display: flex;
                align-items: center;
            }
            .huifu{
                flex: 1;
                text-align: right;
                font-size: 12px;
                color: black;
            }
        }
        .content{
            width: 100%;
            padding-bottom:  5 / 360 * 100vw;
        }
    }
</style>