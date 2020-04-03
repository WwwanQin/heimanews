<template>
    <div class="newsdetail">
        <div class="toplabel">
            <div class="left">
                <span class="iconfont iconjiantou" @click="$router.back()"></span>
                <span class="iconfont iconnew"></span>
            </div>
            <div class="right">
                <span :class="follow ? 'following' : 'nofollow' ">
                    关注
                </span>
            </div>
        </div>
        <div class="contenttitle">
            <h3>
                车主注意啦！九月下旬部分临时泊位进行清洁保养
            </h3>
            <div class="source">
                <span>火星时报</span>
                <span>2019-10-10</span>
            </div>
        </div>
        <div class="contentbody">
            落就韩忧杨么人，家下第老锐胆责我办文仇是量勉文定学，说招在为你自骂量接如了他，未月送即反他你着揽性此掸，揽天云司话他给以，可未间同。
            落就韩忧杨么人，家下第老锐胆责我办文仇是量勉文定学，说招在为你自骂量接如了他，未月送即反他你着揽性此掸，揽天云司话他给以，可未间同。
            落就韩忧杨么人，家下第老锐胆责我办文仇是量勉文定学，说招在为你自骂量接如了他，未月送即反他你着揽性此掸，揽天云司话他给以，可未间同。
            落就韩忧杨么人，家下第老锐胆责我办文仇是量勉文定学，说招在为你自骂量接如了他，未月送即反他你着揽性此掸，揽天云司话他给以，可未间同。
        </div>
        <div class="contentfooter">
            <span class="iconfont icondianzan"></span>
            <span class="iconfont iconweixin"></span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            postId: '',
            follow: true
        }
    },
    mounted(){
        this.postId = this.$route.params.id;
        console.log(this.postId);
    }
}
</script>

<style lang="less" scoped>
    .newsdetail{
        margin: 4.16666667vw;
        .toplabel{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5 / 360 * 100vw;
            .left{
                flex: 0 0 25%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .iconnew{
                    transform: scale(3.5);
                }
            }
            span{
                font-size: 20 / 360 * 100vw;
            }
            .right{
                flex: 1;
                display: flex;
                justify-content: flex-end;
                padding-bottom: 5 / 360 * 100vw;
                .following{
                    background-color: rgb(255, 0, 0);
                    color: white;
                    font-size: 16px;
                    width: 60 / 360 * 100vw;
                    height: 30 / 360 * 100vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50px;
                }
            }
        }
        .contenttitle{
            margin: 10 / 360 * 100vw;
            .source{
                margin-top: 5 / 360 * 100vw;
                span{
                    margin-right: 10 / 360 * 100vw;
                    color: rgb(134, 147, 173);
                    font-size: 16 / 360 * 100vw;
                }
            }
        }
        .contentbody{
            margin: 10 / 360 * 100vw;
        }
    }
</style>