<template>
    <div class="searchLabel">
        <div class="searchTop">
            <div class="goBack">
                <span class="iconfont iconjiantou" @click="$router.back()"></span>
            </div>
            <div class="search">
                <span class="iconfont iconsearch"></span>
                <input 
                :placeholder="hotWords" 
                ref="search" 
                type="search" 
                @click="searchHistory" 
                @keyup.enter="searchResult"
                v-model="value">
            </div>
            <div class="searchBtn" 
            @click="searchResult">
                搜索
            </div>
        </div>
        <!-- 展示搜索结果 -->
        <div class="result-layer" v-if="clearResult">
            <div class="resultList">
                <div class="resultItem" 
                v-for="(item,index) in searchList" 
                :key="index">
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
            </div>
        </div>
        <div class="historyLabel" v-if="clearHistory">
            <div class="leftLabel">
                <h3>历史记录</h3>
                <div @click="removeHistory">×</div>
            </div>
            <div class="recordList">
                <div class="recordItem" 
                v-for="(item,index) in records" 
                :key="index"
                @click="value = item">
                    {{ item }}
                </div>
            </div>
            <div class="clearRecord" v-if="clearRecord">
                清除搜索历史记录 
                <span style="font-size:22px;line-height:22px">×</span>
            </div>
        </div>
    </div>
</template>

<script>
import postItem1 from '@/components/postItem1'
import postItem2 from '@/components/postItem2'
import postItem3 from '@/components/postItem3'
export default {
    name:'search',
    data(){
        return {
            hotWords: '通灵兽消失术',
            value: '',
            clearRecord: false,
            clearHistory: true,
            clearResult: false,
            records: [],
            searchList: []
        }
    },
    components:{
        postItem1,
        postItem2,
        postItem3
    },
    methods:{
        searchResult(){
            this.clearHistory = false;
            this.clearResult = true;
            this.records = JSON.parse(localStorage.getItem('records')) || [];
            this.records.unshift(this.value);
            this.records = [...new Set(this.records)];
            localStorage.setItem('records',JSON.stringify(this.records));
            this.value = '';
            this.$axios({
                url:`/post_search`,
                method:'get',
                params:{
                    keyword: this.value,
                    pageIndex: 1,
                    pageSize: 20
                }
            }).then(res => {
                let {data:{data}} = res;
                data.forEach(ele => {
                    if(ele.cover.length == 3){
                        ele.posters = ele.cover.map(e => {
                            return this.$axios.defaults.baseURL + e.url;
                        }).toString()
                    }
                });
                this.searchList = data;
            })
        },
        searchHistory(){
            this.clearHistory = true;
            this.clearResult = false; 
        },
        removeHistory(){
            localStorage.removeItem('records');
            this.records = JSON.parse(localStorage.getItem('records')) || [];
        }
    },
    mounted(){
        this.$refs.search.focus();
        let records = JSON.parse(localStorage.getItem('records')) || [];
        this.records = records;
    },
    beforeRouteEnter(to,from,next){
        next(vm => {
            if(from.path === '/'){
                vm.value = '';
                vm.clearResult = false;
                vm.clearHistory = true;
            }
        })
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
                    width: 85%;
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
        .result-layer{
            position: absolute;
            display: flex;
            top: 45 / 360 * 100vw;
            width: 100%;
            margin: 0 auto;
            overflow-y: auto;
            .resultList{
                margin: 15 / 360 * 100vw 25 / 360 * 100vw;
                width: 100%;
                .resultItem{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10 / 360 * 100vw 0;
                }
            }
        }
        .historyLabel{
            margin: 0 25 / 360 * 100vw;
            .leftLabel{
                display: flex;
                justify-content: space-between;
            }
            .recordList{
                display: flex;
                flex-wrap: wrap;
                padding-bottom: 10 / 360 * 100vw;
                border-bottom: 1px solid rgb(215, 215, 215);
                .recordItem{
                    display: flex;
                    align-items: center;
                    border: 1px solid #cccccc;
                    padding: 3 / 360 * 100vw;
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