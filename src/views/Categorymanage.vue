<template>
  <div class="categorymanage">
    <top centerText="栏目管理" showIcon="1"></top>
    <div class="deleteCategory">
        <span class="delTitle">点击删除以下频道</span>
        <div class="delContent">
            <div 
                v-for="(item,index) in dels" 
                :key="index" 
                :class="item.active "
                @click="bundleDel(index)">
                {{ item.name }}
            </div>
        </div>
    </div>
    <div class="addCategory">
        <span class="addTitle">点击添加以下频道</span>
        <div class="addContent">
            <div 
                v-for="(item,index) in adds" 
                :key="index" 
                :class="item.active "
                @click="bundleAdd(index)">
                {{ item.name }}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/top'
export default {
    data(){
        return {
            dels:[],
            adds:[
                {
                    name: '社会',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '体育',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '游戏',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '旅游',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '探索',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '美食',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '育儿',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '养生',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '美文',
                    is_top: 0,
                    active: ''
                }
            ]
        }
    },
    methods:{
        bundleDel(index){
            console.log(index);
            this.dels.forEach(ele => ele.active = '')
            this.dels[index].active = 'active';
            let labelName = this.dels[index].name;
            this.dels.splice(index,1);
            this.adds.push({
                name: labelName,
                is_top: 0,
                active: ''
            })
        },
        bundleAdd(index){
            this.adds.forEach(ele => ele.active = '')
            this.adds[index].active = 'active';
            let labelName = this.adds[index].name;
            this.adds.splice(index,1);
            this.dels.push({
                name: labelName,
                is_top: 0,
                active: ''
            })
        }
    },
    mounted(){
        let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {};
        this.$axios({
            url:`/category`,
            method:'get',
            headers:{
                Authorization:token || ''
            },
        }).then(res => {
            let {data:{data}} = res;
            this.dels = data.map(ele => {ele.active = ''; return ele})
        })
    },
    components:{
        top
    }
}
</script>

<style scoped lang="less">
    .categorymanage{
        margin: 4.16666667vw;
    }
    .deleteCategory{
        padding: 10 / 360 * 100vw;
        .delTitle{
            color: gray;
        }
        .delContent{
            display: flex;
            flex-wrap: wrap;
            margin-top: 10 / 360 * 100vw;
            div{
                -webkit-box-flex: 0;
                -ms-flex: 0 0 22%;
                flex: 0 0 20%;
                text-align: center;
                height: 35 / 360 * 100vw;
                border: 1px solid rgb(179, 173, 173);
                line-height: 35 / 360 * 100vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin: 5 / 360 * 100vw 7/ 360 * 100vw;
                position: relative;
            }
            div::before{
                content: '×';
                position: absolute;
                width: 5.55555556vw;
                height: 5.55555556vw;
                border-radius: 50%;
                background-color: red;
                right: -10 / 360 * 100vw;
                top: -10 / 360 * 100vw;
                font-size: 22px;
                line-height: 18 / 360 * 100vw;
                text-align: center;
                color: white;
            }
            .active{
                background: rgb(230, 223, 223);
            }
        }
    }
    .addCategory{
        padding: 10 / 360 * 100vw;
        .addTitle{
            color: gray;
        }
        .addContent{
            display: flex;
            flex-wrap: wrap;
            margin-top: 10 / 360 * 100vw;
            div{
                -webkit-box-flex: 0;
                -ms-flex: 0 0 22%;
                flex: 0 0 20%;
                text-align: center;
                height: 35 / 360 * 100vw;
                border: 1px solid rgb(179, 173, 173);
                line-height: 35 / 360 * 100vw;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin: 5/ 360 * 100vw 7/ 360 * 100vw;
            }
            .active{
                background: rgb(230, 223, 223);
            }
        }
    }
</style>