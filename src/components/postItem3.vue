<template>
    <div class="star-video">
        <div class="star-top">
            <p class="title">{{ title }}</p>
        </div>
        <div class="star-center">
            <div class="video-poster">
                <img :src="url">
                <div class="video-start">
                    <span class="iconfont iconshipin"></span>
                </div>
            </div>
        </div>
        <div class="star-bottom">
            <p class="details">
                <span>{{ nickname }}</span>
                <span>{{ size }} 跟帖</span>
            </p>   
        </div>
    </div>
</template>

<script>
export default {
    props:['title','nickname','size','url']
}
</script>

<style scoped lang='less'>
    .star-video{
        .star-top{
            padding: 5/360*100vw 13/360*100vw;
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
                    background: rgba(0, 0, 0, 0.5);
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
                    font-size: 13px;
                }
            }
        }
        border-bottom: 1px solid rgb(228, 228, 228);
    }
</style>