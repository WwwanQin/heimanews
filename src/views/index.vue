<template>
    <div class="indexLabel">
        <div class="header">
            <div class="header-icon">
                <router-link to="/">
                    <span class="iconfont iconnew"></span>
                </router-link>
            </div>
            <div class="header-content">
                <div class="header-search" @click="$router.push('/search')">
                    <span class="iconfont iconsearch"></span>&nbsp;
                    <span>搜索新闻</span>
                </div>
            </div>
            <div class="header-personpage">
                <router-link to="/personalPage">
                    <span class="iconfont iconwode"></span>
                </router-link>
            </div>
        </div>
        <div class="tabs">
            <div class="tabs-left">
                <van-tabs sticky swipeable v-model="active" @scroll="scrollTop">
                    <!-- 设置分类标签选项 -->
                    <van-tab v-for="(item,index) in categorys" 
                    :key="index" 
                    :title="item.name" >
                        <!-- 设置list内容 -->
                        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                            <van-list
                                v-model="categorys[active].loading"
                                :immediate-check="false"
                                :finished="categorys[active].finished"
                                finished-text="没有更多了"
                                @load="onLoad"
                            >
                                <div v-for="(item,index) in categorys[active].posts" :key="index">
                                    <postItem1 
                                    v-if="item.cover.length == 1 && item.type == 1"
                                    :data = "item"
                                    @click.native="$router.push(`/newsarticledetail/${item.id}`)"
                                    />

                                    <postItem2
                                    v-if="item.cover.length >= 3 && item.type == 1"
                                    :data = "item"
                                    @click.native="$router.push(`/newsarticledetail/${item.id}`)"
                                    />

                                    <postItem3
                                    v-if="item.type == 2"
                                    :data = "item"
                                    @click.native="$router.push(`/newsvideodetail/${item.id}`)"
                                    />

                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="tabs-right">
                <div class="type-icon">
                    <router-link to="/categorymanage">
                        <span class="iconfont iconjiantou"></span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import postItem1 from '@/components/postItem1'
import postItem2 from '@/components/postItem2'
import postItem3 from '@/components/postItem3'        
export default {
    name:'index',
    data(){
        return{
            refreshing: false,
            pageSize:6,
            active: 0,
            categorys: [],
            categoryId: 0
        }
    },
    // 针对keep-alive组件，每次初始化组件都会执行这个生命函数
    activated(){
    },
    mounted(){
        this.reload();
    },
    methods:{
        // 加载方法
        reload(){
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {};
            let catgoerys = JSON.parse(localStorage.getItem('categorys'));
            // if (catgoerys) this.categoryId = catgoerys[0].i
            if(catgoerys){
                // 刚刚退出登录
                if(catgoerys[0].name === '关注' && !token){
                    this.initCategorys(
                        {
                            url:`/category`,
                            method:'get'
                        }
                    ); 
                    return;
                }
                // 刚刚才登录
                if(catgoerys[0].name !== '关注' && token){
                    this.initCategorys(
                        {
                            url:`/category`,
                            method:'get',
                            headers:{
                                Authorization:token || ''
                            },
                        }
                    );  
                    return;
                }
                this.categorys = catgoerys;
                this.initPageIndex();
                this.initData();
            }else{
                // 第一次进入
                this.initCategorys(
                {
                    url:`/category`,
                    method:'get',
                    headers:{
                        Authorization:token || ''
                    },
                }
                );  
            }
        },
        // 初始化tab栏的内容
        initCategorys(requestData){
            this.$axios(requestData).then(res => {
                let {data:{data}} = res;
                this.categorys = data;
                localStorage.setItem('categorys',JSON.stringify(this.categorys));
                this.initPageIndex();
                this.initData();
                localStorage.removeItem('addCategorys');
            })
        },
        // 在tab栏中加入当前的页码，新闻列表，是否加载，加载完毕
        initPageIndex(){
            this.categorys = this.categorys.map(ele => {
                ele.pageIndex = 1;
                ele.posts = [];
                ele.loading = false;
                ele.finished = false;
                ele.scrollTop = 0;
                ele.isLoad = false;
                return ele;
            })
        },
        // 分页获取数据
        initData(){
            if(this.categorys[this.active].finished) return;
            if(this.categorys[this.active].isLoad) return;
            this.categorys[this.active].isLoad = true;
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {}
            this.$axios({
                url:`/post`,
                method:'get',
                params:{
                    pageIndex: this.categorys[this.active].pageIndex,
                    pageSize: this.pageSize,
                    category: this.categoryId
                },
                headers:{
                    Authorization:token || ''
                },
            }).then(res => {
                let {data:{data,total}} = res;
                if (data.length == 0){
                    return;
                }
                data.forEach(ele => {
                    if(ele.cover.length == 3){
                        ele.posters = ele.cover.map(e => {
                            return this.$axios.defaults.baseURL + e.url;
                        }).toString()
                    }
                });
                this.categorys[this.active].loading = false
                this.categorys[this.active].posts = [...this.categorys[this.active].posts,...data];
                this.categorys = [...this.categorys]
                // 监听分页数据是否加载完毕
                if (this.categorys[this.active].posts.length >= total) {
                    this.categorys[this.active].finished = true;
                    this.categorys[this.active].isLoad = true;
                }
                this.refreshing = false;
                this.categorys[this.active].isLoad = false;
                this.categorys[this.active].pageIndex ++;
            })
            this.categorys[this.active].isLoad = true;
        },
        onLoad() {
            this.initData();
        },
        scrollTop({scrollTop}){
            setTimeout(()=>{
                if(this.categorys[this.active]){
                    this.categorys[this.active].scrollTop = scrollTop;
                }
            },10)
        },
        onRefresh() {
            this.categorys[this.active].pageIndex = 1
            this.categorys[this.active].finished = false;
            this.categorys[this.active].posts = [];
            this.initData();
        }
    },
    watch:{
        active(){
            this.categoryId = this.categorys[this.active].id;
            this.pageIndex = 1;
            this.initData();
            setTimeout(()=>{
                document.documentElement.scrollTo(0,this.categorys[this.active].scrollTop);
            },10)
        }
    },
    components:{
        postItem1,
        postItem2,
        postItem3
    },
    beforeRouteEnter(to,from,next){
        next(vm => {
            if(from && (from.path == '/categorymanage'
            || from.path == '/personalPage'
            || from.path == '/login')){
                vm.reload();
            }
        })
    }
}
</script>

<style lang="less" scoped>
    .indexLabel{
        .header{
            height:55 / 360 * 100vw;
            background-color: rgb(255, 0, 0);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .header-icon{
                a{
                    margin: 0 2.16666667vw;
                    display: flex;
                    span{
                        transform: scale(3);
                        font-size: 20px;   
                        color: white;
                        position: relative;
                        left: 20 / 360 * 100vw;
                    }
                }
            }
            .header-content{
                flex: 1;
                margin: 0 50 / 360 * 100vw;
                color: white;
                padding: 8 / 360 * 100vw;
                border-radius: 50px;
                background-color: rgba(255, 255, 255, .5);
                display: flex;
                justify-content: center;
                .header-search{
                    font-size: 14px;
                }
            }
            .header-personpage{
                a{
                    display: flex;
                    margin: 0 1.16666667vw;
                    span{
                        transform: scale(1.3);
                        font-size: 20px;
                        position: relative;
                        right: 20 / 360 * 100vw;
                        color: white;
                    }
                }
            }
        }
        .tabs{
            display: flex;
            .tabs-left{
                width: 315 / 360 * 100vw;
                /deep/ .van-tabs__content{
                    width: 114%;
                }
            }
            .tabs-right{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 45px;
                flex: 1;
                .type-icon{
                    transform: rotate(-90deg);
                    font-weight: 700;
                }
            }
        }
    }
    /deep/ .van-tabs__line{
        display: none;
    }
    /deep/ .van-tab--active{
        border-bottom: 2px #ff0000 solid;
    }
</style>