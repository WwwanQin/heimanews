<template>
    <div class="videodetail">
        <!-- 视频播放区域 -->
        <div class="videoLabel" @click="start">
            <video ref="video" 
            :poster="`${$axios.defaults.baseURL}${post.cover[0].url}`" controls
            :src="$axios.defaults.baseURL + data.content">
            </video>
            <div class="video-start" v-if="ifPause">
                <span :class="pause"></span>
            </div>
        </div>
        <!-- 作者区域 -->
        <div class="authorArea">
            <div class="leftLabel">
                <div class="authorMessage">
                    <div class="headIcon">
                        <img src="http://192.168.0.104:3000/uploads/image/IMG1574778154464.jpeg">
                    </div>
                    <div class="authorName">
                        {{ nickname }}
                    </div>
                </div>
            </div>
            <div class="rightLabel">
                <div 
                @click="bundleFollows"
                :class="data.has_follow === true ? 'weiguanzhu' : 'guanzhu' ">
                    {{ data.has_follow ===  true ? '已关注' : '关注' }}
                </div>
            </div>
        </div>
        <div class="title">
            {{ data.title }}
        </div>
        <div class="contentfooter">
            <div class="like">
                <span class="iconfont icondianzan" @click="dianzan" ></span>
                <span class="linknum">{{ data.like_length ? data.like_length : 0}}</span>
            </div>
            <div class="wechat">
                <span class="iconfont iconweixin"></span>
                <span class="wechatlink">微信</span>
            </div>
        </div>
        <comment
        :data="data"
        @handlelike="checkLike"></comment>
    </div>
</template>

<script>
import comment from '@/components/comment'
export default {
    data(){
        return {
            postId: '',
            pause: 'iconfont iconshipin',
            ifPause: true,
            data: {},
            content: '  ',
            nickname: '佚名',
            post:{
                cover:[{}]
            }
        }
    },
    methods:{
        start(){
           this.ifPause = !this.ifPause
           let video = this.$refs.video
            if(video.paused){
                video.play()
            }else{
                video.pause();
            }
        },
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
        }
    },
    mounted(){
        this.postId = this.$route.params.id
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
            this.content = data.content
            this.nickname = data.user.nickname;
            this.post = data;
            // let video = this.$refs.video
            // video.src = `${this.$axios.defaults.baseURL}${this.content}`
        })
    },
    components:{
        comment
    }
}
</script>

<style lang="less" scoped>
    .videodetail{
        .videoLabel{
            max-height: 240px;
            position: relative;
            video{
                width: 100%;
                height: 100%;
            }
            .video-start{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 55/360*100vw;
                height: 55/360*100vw;
                background: rgba(255, 221, 221, 0.5);
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-27.5 / 360 * 100vw) translateY(-27.5 / 360 * 100vw);
                .iconshipin{
                    color: #fff;
                    font-size: 32px;
                }
            }
        }
        .authorArea{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 15 / 360 * 100vw;
            .leftLabel{
                .authorMessage{
                    display: flex;
                    .headIcon{
                        width: 40px;
                        height: 40px;
                        img{
                            width: 100%;
                            object-fit: cover;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .authorName{
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        margin-left: 10 / 360 * 100vw;
                        color: gray;
                    }
                }
            }
            .rightLabel{
                .guanzhu{
                    width: 70 / 360 * 100vw;
                    height: 30 / 360 * 100vw;
                    border: 1px solid gray;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50px;
                }
                .weiguanzhu{
                    color: white;
                    background-color: red;
                    width: 70 / 360 * 100vw;
                    height: 30 / 360 * 100vw;
                    border: 1px solid gray;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50px;
                }
            }
        }
    }
    .title{
       margin-left: 25 / 360 * 100vw; 
       color: black;
       font-size: 20px;
    }
    .contentfooter{
        margin: 10 / 360 * 100vw;
        margin-top: 20 / 360 * 100vw;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding-bottom: 5vw;
        height: 100 / 360 * 100vw;
        align-items: center;
        border-bottom: 2px solid #d2caca;
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
</style>