<template>
    <div class="labels">
        <top centerText="个人中心" showIcon="0"></top>
        <div class="personDetails" @click="$router.push('/editUser')">
            <div>
                <div class="avatar">
                    <img :src="$axios.defaults.baseURL + user.headImg"/>
                    <div class="usrInfo">
                        <p class="name">
                            <span class="gender" v-if="user.gender == 0">{{ '♂' }}</span>
                            <span class="gender" v-if="user.gender == 1">{{ '♀' }}</span>
                            <span>{{ user.nickname }}</span>
                        </p>
                        <p class="date">{{ moment(user.createDate).format('YYYY-MM-DD') }}</p>
                    </div>
                </div>                
            </div>
            <p><span class="iconfont iconjiantou1"></span></p>
        </div>
        <labelItem 
            v-for="(item,index) in labels" 
            :key="index"
            :label="item.label"
            :tips="item.tips"
            :method="item.methodName"
            @handleMethod="item.fun()"/>
    </div>
</template>

<script>
import labelItem from '@/components/labelItem';
import top from '@/components/top'
import moment from 'moment'
import { Dialog } from 'vant';
export default {
    components:{
        labelItem,
        top
    },
    data(){
        return {
            user:{
                headImg: '/uploads/image/IMG1574778073476.jpeg',
                id: '',
                username: '',
                password: '',
                nickname: '',
                gender: '',
                createDate: ''
            },
            labels:[
                {
                    label:'我的关注',
                    tips:'关注的用户',
                    methodName: 'handleMethod',
                    fun:()=>{
                        this.$router.push('/follow');
                    }
                },
                {
                    label:'我的跟帖',
                    tips:'跟帖 / 回复',
                    methodName: 'handleMethod',
                    fun:()=>{
                        this.$router.push('/comments');
                    }
                },
                {
                    label:'我的收藏',
                    tips:'文章 / 视频'
                },
                {
                    label:'设置',
                    tips:'',
                    methodName:'handleMethod',
                    fun:()=>{
                        console.log('设置');
                    }
                },
                {
                    label:'退出',
                    tips:'',
                    methodName:'handleMethod',
                    fun:()=>{
                        Dialog.confirm({
                            title: '退出',
                            message: '是否退出登录？'
                        }).then(result => {
                            localStorage.removeItem('news_User_Data');
                            this.$router.back();
                        }).catch(reason => {
                            console.log(reason);
                        });
                    }
                }
            ],
            moment
        }
    },
    methods:{
        logOut(){
            console.log(1);
        }
    },
    mounted(){
        // 将个人信息修改通用方法放入全局
        window.editUser = this.editUser;
        const newsUserData = JSON.parse(localStorage.getItem('news_User_Data'));
        this.user.id = newsUserData.user.id;
        let id = this.user.id
        this.$axios({
            url:`/user/${id}`,
            headers:{
                Authorization:newsUserData.token
            },
            method:'get'
        }).then(result => {
            let userdata = result.data.data;
            this.user.headImg = userdata.head_img;
            this.user.id = userdata.id;
            this.user.username = userdata.username;
            this.user.password = userdata.password;
            this.user.nickname = userdata.nickname;
            this.user.createDate = userdata.create_date;
            this.user.gender = userdata.gender;
        }).catch(reason => {
            this.$toast('个人主页进入失败');
            this.$router.back();
        })
    }
}
</script>

<style lang="less" scoped>
    .labels{
        margin: 15 / 360 * 100vw;

        .personDetails{
            height: 60/360 * 100vh;
            display: flex;
            justify-content: space-between;
            border-bottom: 4px solid #ccadad;
            div{
                .avatar{
                    display: flex;
                    align-items: center;
                    height: 100%;
                    img{
                        border-radius: 50%;
                        height: 65/360 * 100vw;
                        width: 65/360 * 100vw;
                        object-fit: cover;
                    }
                    .usrInfo{
                        p{
                            line-height: 12/360 * 100vh;
                        }
                        margin-left: 15/360 * 100vw;
                        .name{
                            font-size: 15px;
                            .gender{
                                font-size: 12px;
                                padding-right: 5/360 * 100vw;
                            }
                        }
                        .date{
                            font-size: 13px;
                            color: gray;
                        }
                    }
                }
            }
            p{
                display: flex;
                align-items: center;
            }
        }
        .goBack{
            margin-top: 25 / 360 * 100vh;
            button{
                border: none;
                background-color: rgb(204, 51, 0);
            }
        }
    }
</style>