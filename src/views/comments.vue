<template>
    <div class="comment-label">
        <top centerText="我的跟帖" showIcon="1" class="top"/>
        <div class="comment" v-for="(item,index) in comments" :key="index">
            <div class="comment-date">
                {{ moment(item.create_date).format('YYYY-MM-DD HH:MM:SS') }}
            </div>
            <div class="comment-content">
                {{ item.content }}
            </div>
            <div class="comment-source">
                <p>
                    原文：{{ item.post.title }}
                </p>
                <span class="iconfont iconjiantou1"></span>
            </div>
        </div>
    </div>
</template>

<script>
import top from '@/components/top'
import moment from 'moment';
export default {
    components:{
        top
    },
    data(){
        return {
            comments:[],
            moment
        }
    },
    mounted(){
        let {token,user:{userId}} = JSON.parse(localStorage.getItem('news_User_Data'))
        this.$axios({
            url:`/user_comments/`,
            method:'get',
            headers:{
            Authorization:token
            }
        }).then(res => {
            let {data:{data}} = res;
            this.comments = data
        })
    }
}
</script>

<style lang="less" scoped>
    .comment-label{
        .top{
            margin: 4.16666667vw 4.16666667vw 10.16666667vw 4.16666667vw;
        }
        .comment{
            margin-top: 15 / 360 * 100vw;
            padding-bottom: 10 / 360 * 100vw;
            .comment-date{
                font-size: 13px;
                color: rgb(128,128,128);
                margin: 4.16666667vw;
            }
            .comment-content{
                margin-top: 8 / 360 * 100vw;
                font-size: 15px;
                margin: 4.16666667vw;
                .comment-reply{
                    background-color: rgb(228, 228, 228);
                    padding: 10 / 360 * 100vw;
                    margin-bottom: 5 / 360 * 100vw;
                    color: rgb(139, 134, 134);
                    border-radius: 5px;
                    :nth-child(1){
                        font-size: 13px;
                        padding-bottom: 4 / 360 * 100vw;
                    }
                }
            }
            .comment-source{
                margin-top: 8 / 360 * 100vw;
                margin-left: 15 / 360 * 100vw;
                margin-right: 8 / 360 * 100vw;
                display: flex;
                justify-content: space-between;
                width: 95%;
                p{
                    flex: 0 0 75%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 14px;
                    color: rgb(128,128,128);
                }
                span{
                    flex: 0 0 10%;
                    text-align: center;
                }
            }
            border-bottom: 2px solid rgb(215, 215, 215);
        }
        
    }
</style>