<template>
    <div class="star-item">
        <div class="star-left">
            <p class="title">{{ data.title }}</p>
            <p class="details">
                <span>{{ data.user.nickname }}</span>
                <span>{{ data.comment_length }} 跟帖</span>
            </p>
        </div>
        <div class="star-right">
            <div class="images">
                <div class="item">
                    <img :src="$axios.defaults.baseURL + data.cover[0].url">
                </div>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    props:['data']
}
</script>

<style lang='less' scoped>
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
            width: 50%;
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
                    max-height: 80 / 360 * 100vw;
                    object-fit: cover;
                }
            }
        } 
    }
    border-bottom: 1px solid rgb(228, 228, 228);
}
</style>