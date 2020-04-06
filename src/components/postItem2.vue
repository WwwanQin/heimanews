<template>
    <div class="star-card">
        <div class="star-top">
            <p class="title">{{ data.title }}</p>
        </div>
        <div class="star-center">
            <div class="images">
                <div class="item" 
                v-for="(photo,i) in data.posters.split(',')" 
                :key="i">
                    <img :src="photo">
                </div>
            </div>
        </div>
        <div class="star-bottom">
            <p class="details">
                <span>{{ data.user.nickname }}</span>
                <span>{{ data.comment_length }} 跟帖</span>
            </p>   
        </div>
    </div>
</template>

<script>
export default {
    props:['title','nickname','size','posters','data']
}
</script>

<style lang='less' scoped>
.star-card{
    .star-top{
        padding: 5/360*100vw 13/360*100vw;
    }
    .star-center{
        padding: 0 3.05555556vw;
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
            width: 29%;
            span{
                color: gray;
                font-size: 13px;
            }
        }
    }
    border-bottom: 1px solid rgb(228, 228, 228);
}
</style>