<template>
    <div class="searchLabel">
        <div class="searchTop">
            <div class="goBack">
                <span class="iconfont iconjiantou" @click="$router.back()"></span>
            </div>
            <div class="search">
                <span class="iconfont iconsearch"></span>
                <input :placeholder="hotWords" ref="search">
            </div>
            <div class="searchBtn">
                搜索
            </div>
        </div>
        <div class="historyLabel">
            <h3>历史记录</h3>
            <div class="recordList">
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
                <div class="recordItem">美女</div>
            </div>
            <div class="clearRecord">
                清除搜索历史记录 ×
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            hotWords: '通灵兽消失术'
        }
    },
    mounted(){
        this.$refs.search.focus();
    }
}
</script>

<style scoped lang="less">
    .searchLabel{
        .searchTop{
            display: flex;
            margin: 20 / 360 * 100vw;
            height: 35 / 360 * 100vw;
            margin-top: 10 / 360 * 100vw;
            justify-content: center;
            box-sizing: border-box;
            position: relative;
            .goBack{
                width: 30 / 360 * 100vw;
                display: flex;
                align-items: center;
                span{
                    font-size: 20px;
                }
            }
            .search{
                flex: 1;
                border: 1px solid rgb(199, 181, 181);
                border-radius: 50px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span{
                    margin-left: 15 / 360 * 100vw;
                }
                input{
                    border: 0;
                    outline: none;
                    padding-left: 10 / 360 * 100vw;
                }
            }
            .searchBtn{
                font-size: 17px;
                width: 11.11111111vw;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: flex-end;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                text-align: right;
            }
        }
        .historyLabel{
            margin: 0 25 / 360 * 100vw;
            .recordList{
                display: flex;
                flex-wrap: wrap;
                padding-bottom: 10 / 360 * 100vw;
                border-bottom: 1px solid rgb(215, 215, 215);
                .recordItem{
                    flex: 0 0 10%;
                    margin: 3 / 360 * 100vw;
                }
            }
            .clearRecord{
                margin-top: 10 / 360 * 100vw;;
                border-radius: 50px;
                border: 1px solid rgb(215,215,215);
                width: 150 / 360 * 100vw;
                text-align: center;
            }
        }
    }
</style>