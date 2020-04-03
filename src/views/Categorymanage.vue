<template>
  <div class="categorymanage">
    <top centerText="栏目管理" showIcon="1"></top>
    <div class="deleteCategory">
        <span class="delTitle">点击删除以下频道</span>
        <div class="delContent">
            <div 
                v-for="(item,index) in dels" 
                :key="index" 
                :class="item.className"
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
                    is_top: 0
                },
                {
                    name: '体育',
                    is_top: 0
                },
                {
                    name: '游戏',
                    is_top: 0
                },
                {
                    name: '旅游',
                    is_top: 0
                },
                {
                    name: '探索',
                    is_top: 0
                },
                {
                    name: '美食',
                    is_top: 0,
                    active: ''
                },
                {
                    name: '育儿',
                    is_top: 0
                },
                {
                    name: '养生',
                    is_top: 0
                },
                {
                    name: '美文',
                    is_top: 0
                }
            ]
        }
    },
    methods:{
        bundleDel(index){
            let localCategorys = JSON.parse(localStorage.getItem('categorys')) || [];
            let addCategorys = JSON.parse(localStorage.getItem('addCategorys')) || [];
            let {token} = JSON.parse(localStorage.getItem('news_User_Data')) || {};
            let labelName = this.dels[index].name;
            if(token && labelName === '关注'){
                return ;
            }
            localCategorys.splice(index,1);
            this.dels.splice(index,1);
            this.adds.push({
                name: labelName,
                is_top: 0,
                active: ''
            })
            addCategorys.push({
                name: labelName,
                is_top: 0,
                active: ''
            })
            localStorage.setItem('categorys',JSON.stringify(localCategorys));
            localStorage.setItem('addCategorys',JSON.stringify(addCategorys))
        },
        bundleAdd(index){
            let labelName = this.adds[index].name;
            this.adds.splice(index,1);
            let addCategorys = JSON.parse(localStorage.getItem('addCategorys'))
            addCategorys.splice(index,1)
            console.log(addCategorys);
            localStorage.setItem('addCategorys',JSON.stringify(addCategorys));
            this.dels.push({
                name: labelName,
                is_top: 0,
                className: 'showDel'
            })
            let categorys = JSON.parse(localStorage.getItem('categorys'))
            categorys.push({
                id:categorys.length+1,
                name: labelName,
                is_top: 0
            })
            localStorage.setItem('categorys',JSON.stringify(categorys))
        }
    },
    mounted(){
        let localCategorys = JSON.parse(localStorage.getItem('categorys')) || [];
        let localAddCategory = JSON.parse(localStorage.getItem('addCategorys')) || this.adds
        this.adds = localAddCategory;
        localStorage.setItem('addCategorys',JSON.stringify(localAddCategory));
        this.dels = localCategorys.map(e => {
            if(e.name === '关注'){
                e.className = 'active';
            }else{
                e.className = 'showDel';
            }
            return e
        });
        
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
            div.showDel::before{
                content: '×';
                position: absolute;
                width: 18 / 360 * 100vw;
                height: 18 / 360 * 100vw;
                border-radius: 50%;
                background-color: red;
                right: -10 / 360 * 100vw;
                top: -10 / 360 * 100vw;
                font-size: 18px;
                line-height: 16 / 360 * 100vw;
                text-align: center;
                color: white;
            }
            .active{
                background: rgb(243,243,243);
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
        }
    }
</style>