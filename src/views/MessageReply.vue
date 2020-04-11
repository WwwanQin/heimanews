<template>
    <div class="messageReply">
        <top centerText="精彩跟帖" showIcon="1"></top>
        <div class="moments">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
            v-if="messages.length > 0"
            >
                <div 
                v-for="(item,index) in messages" 
                :key="index"
                class="messageItem"
                >
                    <div class="messageDetail">
                        <div class="item_left">
                            <div class="head_img">
                                <img 
                                :src="$axios.defaults.baseURL + (item.user.head_img || '/uploads/image/IMG1585540477344.jpeg')">
                            </div>
                            <div class="user_detail">
                                <p>{{ item.user.nickname }}
                                    <span class="iconfont iconnew" style="font-size: 25px;color: red;"></span>
                                </p>
                                <em>{{ moment(item.create_date).format('YYYY-MM-DD HH:SS') }}</em>
                                <em>{{ moment(item.create_date).fromNow() }}</em>
                            </div>
                        </div>
                        <div class="item_right" @click="reply(item)">
                            回复
                        </div>
                    </div>
                    <div class="messageContent">
                        <MessageItem
                        v-if="item.parent"
                        :data="item.parent"
                        @handleReply="reply">
                        </MessageItem>
                        {{ item.content }}
                    </div>
                </div>
            </van-list>
            <div v-else class="nocomments">
                暂无跟帖，抢占沙发 (〜￣△￣)〜
            </div>
        </div>
        <!-- 消息回复框 -->
        <div class="replyMessage">
            <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            :placeholder=checkplaceholder
            show-word-limit
            class="vanfidld1"
            v-if="!focus"
            />
            <div class="replyRight">
                <span @click="sendComment">发送</span>
                <span @click="clearComment">清除</span>
            </div>
        </div>
    </div>
</template>

<script>
import MessageItem from '@/components/MessageItem'
import top from '@/components/top'
import moment from 'moment'
moment.locale('zh-CN');
export default {
    data(){
        return {
            checkplaceholder:'发表评论',
            postId: '',
            parentId: '',
            loading: false,
            finished: false,
            messages: [],
            message: '',
            pageSize: 5,
            pageIndex: 1,
            focus: false,
            moment
        }
    },
    components:{
        MessageItem,
        top
    },
    methods:{
        // 清除所有消息
        clearComment(){
            this.checkplaceholder = '发表评论';
            this.message = '';
            this.parentId = undefined;
        },
        // 绑定第一个遍历的子组件的回复事件
        reply(item){
            this.checkplaceholder = `@${item.user.nickname}`
            this.parentId = item.id;
        },
        // 发送评论
        sendComment(){
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {};
            if(!token){
                this.$router.push({
                    path: '/login',
                    query:{
                        returnUrl: this.$route.fullPath
                    }
                });
            }
            let parentId = this.parentId || undefined
            let content = this.message;
            let create_date = new Date();
            this.sendCommentToServe(
                {
                    content: content,
                    parent_id: parentId || undefined
                }
            );
            this.message = '';
        },
        // 评论发送到后台
        sendCommentToServe(params){
            let { token } = JSON.parse(localStorage.getItem('news_User_Data')) || {};
            this.$axios({
                url: `/post_comment/${this.$route.params.id}`,
                method: 'post',
                data: params,
                headers:{
                    Authorization:token || ''
                },
            }).then(res => {
                this.$toast.success('评论成功');
                this.loading= false,
                this.finished= false,
                this.messages = [];
                this.pageIndex = 1;
                this.getList();
            })
        },
        // 列表组件下拉事件
        onLoad(){
            this.pageIndex ++ ;
            this.loading = false;
            this.getList();
        },
        // 分页获取评论数据
        getList(){
            this.$axios({
                url: `/post_comment/${this.$route.params.id}`,
                params:{
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex
                },
                method: 'get'
            }).then(res => {
                let {data} = res;
                this.messages = [...this.messages,...data.data];
                this.loading = false;
                if(data.data.length < this.pageSize){
                    this.finished = true
                }
            })
        }
    },
    mounted(){
        this.postId = this.$route.params.id;
        this.getList();
    }
}
</script>

<style scoped lang="less">
    .messageReply{
        margin: 13 / 360 * 100vw;
        .moments{
            margin-top: 20 / 360 * 100vw;
            margin-bottom: 120 / 360 * 100vw;
            .messageItem{
                border-radius: 10 / 360 * 100vw; 
                padding: 5 / 360 * 100vw; 
                margin-bottom:10 / 360 * 100vw;
                border-radius: 10px;
                box-shadow: rgba(171, 139, 139, 0.16) 7px 8px 10px;
                .messageDetail{
                    display: flex;
                    justify-content: space-between;
                    margin: 10 / 360 * 100vw 5/ 360 * 100vw;
                    .item_left{
                        display: flex;
                        align-items: center;
                        .head_img{
                            width: 45 / 360 * 100vw;
                            height: 45 / 360 * 100vw;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .user_detail{
                            margin-left: 10/ 360 * 100vw;
                            display: flex;
                            flex-direction: column;
                            justify-content:space-around;
                            em{
                                font-style: inherit;
                                color: gray;
                                font-size: 13px;
                            }
                        }
                    }
                    .item_right{
                        display: flex;
                        align-items: center;
                        color: gray;
                        font-size: 16px;
                    }
                }
                .messageContent{
                    padding: 3 / 360 * 100vw;
                    padding-bottom: 20 / 360 * 100vw;
                }
            }
            .nocomments{
                height: 100px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                font-weight: 500;
                color: gray;
                border-radius: 2.77777778vw;
                padding: 1.38888889vw;
                margin-bottom: 2.77777778vw;
                border-radius: 10px;
                -webkit-box-shadow: rgba(171, 139, 139, 0.16) 7px 8px 10px;
                box-shadow: rgba(171, 139, 139, 0.16) 7px 8px 10px;
            }
        }
        .replyMessage{
            position: fixed;
            bottom: 0;
            width: 100%;
            background: white;
            margin-left: -12 / 360 * 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10 / 360 * 100vw;
            box-sizing: border-box;
            border-top: 2px dotted #dbcece;
            .vanfidld1{
                background-color: white;
                border-radius: 10px;
                flex: 1;
                box-shadow: rgba(171, 139, 139, 0.16) 1px 0px 10px;
            }
            span{
                flex: 0 0 15%;
                text-align: center;
                color: gray;
            }
            .replyRight{
                display: flex;
                justify-content: space-evenly;
                flex-direction: column;
                height: 88px;
                width: 70px;
                align-items: center;
            }
        }
    }
</style>