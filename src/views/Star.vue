<template>
    <div class="star-label">
        <top centerText="我的收藏" showIcon="1" class="top"></top>
        <div 
        v-for="(item,index) in stars" 
        :key="index">
            <div v-if="item.cover.length == 1">
                <postItem1
                :title = "item.title"
                :nickname = "item.user.nickname"
                :size = "item.comments.length"
                :url = "$axios.defaults.baseURL + item.cover[0].url"/>
            </div>
            <div v-else>
            </div>
        </div>
    </div>
</template>

<script>
import top from '@/components/top'
import postItem1 from '@/components/postItem1'
export default {
    data(){
        return {
            cover:"http://localhost:3000/uploads/image/IMG1574774561941.png,http://localhost:3000/uploads/image/IMG1574774561941.png,http://localhost:3000/uploads/image/IMG1574774561941.png",
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
        postItem1
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