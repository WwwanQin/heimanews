<template>
    <div class="newsdetail">
        <!-- 新闻头部 -->
        <div class="toplabel">
            <div class="left">
                <span class="iconfont iconjiantou" @click="$router.back()"></span>
                <span class="iconfont iconnew"></span>
            </div>
            <div class="right">
                <span 
                :class="data.has_follow === true ? 'following' : 'nofollow' "
                @click="bundleFollows"
                >
                    {{ data.has_follow ===  true ? '已关注' : '关注' }}
                </span>
            </div>
        </div>
        <!-- 新闻内容 -->
        <div class="contenttitle">
            <h3>
                {{ data.title }}
            </h3>
            <div class="source">
                <span>{{ nickname }}</span>
                <span>{{ moment(create_date).format('YYYY-MM-DD') }}</span>
            </div>
        </div>
        <div class="contentbody">
            <div v-html="data.content"></div>
        </div>
        <div class="contentfooter">
            <div class="like">
                <span class="iconfont icondianzan" @click="dianzan"></span>
                <span class="linknum">{{ data.like_length ? data.like_length : 0}}</span>
            </div>
            <div class="wechat">
                <span class="iconfont iconweixin"></span>
                <span class="wechatlink">微信</span>
            </div>
        </div>
        <!-- 展示图片遮罩层 -->
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" >
                <div class="block">
                    <img :src="overlayImg">
                </div>
            </div>
        </van-overlay>
        <comment
        :data="data"
        @handlelike="checkLike"
        @handleComment="commentsPage"></comment>
    </div>
</template>

<script>
import moment from 'moment'
import comment from '@/components/comment'
export default {
    data(){
        return {
            overlayImg: `${this.$axios.defaults.baseURL + '/uploads/image/IMG1574774541633.png'}`,
            show:false,
            postId: '',
            follow: true,
            bodyClassName: '',
            nickname:'',
            create_date:'',
            data: {},
            comments: [],
            moment
        }
    },
    methods:{
        // 子组件调用的收藏文章
        checkLike(){
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {};
            if(!token){
                this.$router.push({
                    path: '/login',
                    query:{
                        returnUrl: this.$route.fullPath
                    }
                });
                // return;
            }
            this.data.has_star = !this.data.has_star;
            this.$axios({
                url: `post_star/${this.postId}`,
                method: 'get',
                headers: {
                    Authorization: token
                }
            }).then(res => {
                let {data:{message}} = res;
                this.$toast(message)
            })
        },
        // 绑定是否关注
        bundleFollows(){
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {}
            if(!token){
                this.$router.push({
                    path: '/login',
                    query:{
                        returnUrl: this.$route.fullPath
                    }
                });
                // return;
            }
            let url = this.data.has_follow ? 'user_unfollow' : 'user_follows';
            this.data.has_follow = !this.data.has_follow;
            this.$axios({
                url: `${url}/${this.data.user.id}`,
                type: 'get',
                headers: {
                    Authorization: token
                }
            }).then(res => {
                let {data:{message}} = res;
                this.$toast(message)
            })
        },
        // 点赞
        dianzan(){
            this.data.like_length = this.data.has_like ? this.data.like_length - 1: this.data.like_length + 1
            this.data.has_like = !this.data.has_like;
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {}
            if(!token){
                this.$router.push({
                    path: '/login',
                    query:{
                        returnUrl: this.$route.fullPath
                    }
                });
            }
            this.$axios({
                url: `post_like/${this.postId}`,
                method: 'get',
                headers: {
                    Authorization: token
                }
            }).then(res => {
                let {data:{message}} = res;
                this.$toast(message)
            })
        },
        //进入到评论详情页面
        commentsPage(){
            this.$router.push(`/messagereply/${this.$route.params.id}`);
        }
    },
    mounted(){
        this.postId = this.$route.params.id;
        let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {}
        // 查看文章详情
        this.$axios({
            url: `/post/${this.postId}`,
            method: 'get',
            headers:{
                Authorization:token || ''
            }
        }).then(res => {
            let {data:{data}} = res;
            this.data = data;
            this.nickname = data.user.nickname
            this.create_date = data.user.create_date;
            setTimeout(() => {
                document.querySelectorAll('img').forEach(ele => {
                    ele.addEventListener('click',()=>{
                        this.show = true;
                        this.overlayImg = ele.src;
                    })
                })
            },100)
        })
    },
    components:{
        comment
    }
}
</script>

<style lang="less" scoped>
    .newsdetail{
        .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .block {
            max-width: 380px;
            max-height: 200px;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        margin: 4.16666667vw;
        .toplabel{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5 / 360 * 100vw;
            .left{
                flex: 0 0 25%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .iconnew{
                    transform: scale(3.5);
                }
            }
            span{
                font-size: 20 / 360 * 100vw;
            }
            .right{
                flex: 1;
                display: flex;
                justify-content: flex-end;
                padding-bottom: 5 / 360 * 100vw;
                .following,
                .nofollow{
                    background-color: rgb(255, 0, 0);
                    color: white;
                    font-size: 16px;
                    width: 60 / 360 * 100vw;
                    height: 30 / 360 * 100vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50px;
                }
                .nofollow{
                    background-color: white;
                    font-size: 16px;
                    color: black;
                    border: 1px solid gray;
                }
            }
        }
        .contenttitle{
            margin: 10 / 360 * 100vw;
            .source{
                margin-top: 5 / 360 * 100vw;
                span{
                    margin-right: 10 / 360 * 100vw;
                    color: rgb(134, 147, 173);
                    font-size: 14 / 360 * 100vw;
                }
            }
        }
        .contentbody{
            margin: 10 / 360 * 100vw;
            /deep/ img{
                max-width: 100%;
            }
        }
        .contentfooter{
            margin: 10 / 360 * 100vw;
            margin-top: 20 / 360 * 100vw;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            padding-bottom: 5vw;
            height: 100 / 360 * 100vw;
            align-items: flex-start;
            div{
                border: 1px solid rgb(172, 172, 172);
                width: 70 / 360 * 100vw;
                height: 30 / 360 * 100vw;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50px;
                :nth-child(1){
                    padding-right: 10 / 360 * 100vw;
                }
                .iconweixin{
                    color: rgb(4, 201, 4);
                }
            }
        }
        .postcomment{
            h2{
                text-align: center;
                font-weight: 500;
            }
            .nocomment{
                text-align: center;
                margin: 2.77777778vw;
                line-height: 80 / 360 * 100vw;
                color: gray;
                font-size: 18px;
            }
            .comment{
                margin-left: 10 / 360 * 100vw;
                .comment_top{
                    display: flex;
                    .left{
                        flex:  0 0 90%;
                        .comment_detail{
                            display: flex;
                            img{
                                width: 30 / 360 * 100vw;
                                height: 30 / 360 * 100vw;
                                object-fit: cover;
                                border-radius: 50%;
                            }
                            .user_detail{
                                flex: 1;
                                display: flex;
                                flex-direction: column;
                                align-items: baseline;
                                margin-left: 10 / 360 * 100vw;
                            }
                        }
                    }
                    .right{
                        flex: 1;
                    }
                }
                .comment_body{
                    margin: 10 / 360 * 100vw 0vw 5 / 360 * 100vw 5 / 360 * 100vw;
                    font-size: 18px;
                }
                margin-bottom: 5vw;
            }
            .morecommen{
                display: flex;
                justify-content: center;
                align-items: center;
                div{
                    margin-top: 10 / 360 * 100vw;
                    width: 35%;
                    text-align: center;
                    height: 30 / 360 * 100vw;
                    border: 1px solid black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50px;
                }
            }
        }
    }
</style>