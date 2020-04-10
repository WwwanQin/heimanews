<template>
    <div class="star-video">
        <div class="star-top">
            <p class="title">{{ data.title }}</p>
        </div>
        <div class="star-center">
            <div class="video-poster">
                <img :src="$axios.defaults.baseURL + data.cover[0].url">
                <div class="video-start">
                    <span class="iconfont iconshipin"></span>
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
    props:['data']
}
</script>

<style scoped lang='less'>
    .star-video{
        .star-top{
            padding: 7/360*100vw 13/360*100vw;
        }
        .star-center{
            padding: 1.5vw 3.05555556vw;
            .video-poster{
                width: 100%;
                height: 160 / 360 * 100vw;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                }
                .video-start{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 55/360*100vw;
                    height: 55/360*100vw;
                    background: rgba(197, 173, 173, 0.5);
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translateX(-27.5 / 360 * 100vw) translateY(-27.5 / 360 * 100vw);
                    .iconshipin{
                        color: #fff;
                        font-size: 32px;
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
                    font-size: 11 / 360 * 100vw;
                }
            }
        }
        border-bottom: 1px solid rgb(228, 228, 228);
    }
</style>