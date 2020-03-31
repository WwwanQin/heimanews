<template>
    <div class="indexLabel">
        <div class="header">
            <div class="header-icon">
                <span class="iconfont iconnew"></span>
            </div>
            <div class="header-content">
                <div class="header-search">
                    <span class="iconfont iconsearch"></span>&nbsp;
                    <span>搜索新闻</span>
                </div>
            </div>
            <div class="header-personpage">
                <span class="iconfont iconwode"></span>
            </div>
        </div>
        <div class="tabs">
            <div class="tabs-left">
                <van-tabs sticky swipeable v-model="active">
                    <!-- 设置分类标签选项 -->
                    <van-tab v-for="(item,index) in categories" :key="index" :title="item" >
                        <!-- 设置list内容 -->
                        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="没有更多了"
                                @load="onLoad"
                            >
                                <van-cell v-for="item in list" :key="item" :title="item" />
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="tabs-right">
                <div class="type-icon">
                    <span class="iconfont iconjiantou"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>                                                                                                                                                                                                                                               
export default {
    data(){
        return{
            loading: false,
            finished: false,
            refreshing: false,
            list: [],
            active: 0,
            categories: [
                '推荐',
                '热点',
                '娱乐',
                '科技',
                '汽车',
                '财经',
                '军事',
                '国际',
                '时尚',
                '历史',
                '故事'
            ],
        }
    },
    methods:{
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                for (let i = 0; i < 20; i++) {
                    this.list.push(this.list.length + 1);
                }
                this.loading = false;
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        }
    },
    watch:{
        active(){
            console.log(1);
        }
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
</style>