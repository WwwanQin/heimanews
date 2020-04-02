<template>
    <div class="star-label">
        <top centerText="我的收藏" showIcon="1" class="top"></top>
        <div 
        v-for="(item,index) in stars" 
        :key="index">
            <postItem1 
            v-if="item.cover.length == 1 && item.type == 1"
            :data = "item"
            />
            
            <postItem2
            v-if="item.cover.length >= 3 && item.type == 1"
            :data = "item"
            />
        
            <postItem3
            v-if="item.type == 2"
            :data = "item"
            />
        </div>
    </div>
</template>

<script>
import top from '@/components/top'
import postItem1 from '@/components/postItem1'
import postItem2 from '@/components/postItem2'
import postItem3 from '@/components/postItem3'
export default {
    data(){
        return {
            stars:[]
        }
    },
    methods:{
        initData:function(){
            let {token,user:{id}} = JSON.parse(localStorage.getItem('news_User_Data'))
            this.$axios({
                url:'/user_star',
                method:'get',
                headers:{
                    Authorization:token
                },
            }).then(res => {
                let {data:{data}} = res
                this.stars = data
            })
        }
    },
    components:{
        top,
        postItem1,
        postItem2,
        postItem3
    },
    mounted(){
        this.initData();
        document.addEventListener('scroll',(eve)=>{
            console.log(eve);
        })
    }
}
</script>

<style lang="less" scoped>
    .star-label{
        .top{
            margin: 4.16666667vw 4.16666667vw 10.16666667vw 4.16666667vw;
        }

    }
</style>