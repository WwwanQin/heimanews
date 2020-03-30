<template>
    <div class="star-label">
        <top centerText="我的收藏" showIcon="1" class="top"></top>
        <div 
        v-for="(item,index) in stars" 
        :key="index">
            <div v-if="item.cover.length == 1">
                <div class="star-item">
                    <div class="star-left">
                        <p class="title">{{ item.title }}</p>
                        <p class="details">
                            <span>{{ item.user.nickname }}</span>
                            <span>{{ item.comments.length }} 跟帖</span>
                        </p>
                    </div>
                    <div class="star-right">
                        <div class="images">
                            <div class="item">
                                <img :src="$axios.defaults.baseURL + item.cover[0].url">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="star-card">
                    <div class="star-top">
                        <p class="title">{{ item.title }}</p>
                    </div>
                    <div class="star-center">
                        <div class="images">
                            <div class="item" 
                            v-for="(photo,i) in item.cover" 
                            :key="i">
                                <img :src="$axios.defaults.baseURL + photo.url">
                            </div>
                            <div class="item">
                                <img :src="$axios.defaults.baseURL + photo.url">
                            </div>
                            <div class="item">
                                <img :src="$axios.defaults.baseURL + photo.url">
                            </div>
                        </div>
                    </div>
                    <div class="star-bottom">
                        <p class="details">
                            <span>{{ item.user.nickname }}</span>
                            <span>{{ item.comments.length }} 跟帖</span>
                        </p>   
                    </div>
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
            stars:[]
        }
    },
    components:{
        top
    },
    mounted(){
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
}
</script>

<style lang="less" scoped>
    .star-label{
        .top{
            margin: 4.16666667vw 4.16666667vw 10.16666667vw 4.16666667vw;
        }
        .star-item{
            display: flex;
            justify-content: space-between;
            padding: 11 / 360 * 100vw;
            .star-left{
                -webkit-box-flex: 0;
                -ms-flex: 0 0 60%;
                flex: 0 0 60%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title{
                    font-size: 16px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-weight: normal;
                }
                .details{
                    padding-top: 10 / 360 * 100vw;
                    display: flex;
                    justify-content: space-between;
                    width: 55%;
                    span{
                        color: gray;
                        font-size: 13px;
                    }
                }
            }
            .star-right{
                flex: 1;
               .images{
                   .item{
                        width: 140/360 * 100vw;
                        text-align: center;
                        img{
                            width: 95%;
                            object-fit: cover;
                        }
                   }
               } 
            }
            border-bottom: 1px solid rgb(228, 228, 228);
        }
        .star-card{
            .star-top{
                padding: 11 / 360 * 100vw;
            }
            .star-center{
                padding: 3.05555556vw;
                .images{
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: space-evenly;
                    -ms-flex-pack: space-evenly;
                    justify-content: space-evenly;
                    .item{
                        flex: 0 0 33%;
                        img{
                            width: 98%;
                            height: 65/360*100vw;
                            object-fit: cover;
                        }
                    }
                }
            }
            .star-bottom{
                padding-left: 3.05555556vw;
                padding-bottom: 3.05555556vw;
                .details{
                    display: flex;
                    justify-content: space-between;
                    width: 32%;
                    span{
                        color: gray;
                        font-size: 13px;
                    }
                }
            }
            border-bottom: 1px solid rgb(228, 228, 228);
        }
    }
</style>