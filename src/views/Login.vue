<template>
  <div>
      <div class="loginPage">
        <div class="logout">
            <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>
        <div class="loginLabel">
            <van-form class="form">
                <van-field
                    v-model="user.username"
                    name="手机号码"
                    label="手机号码"
                    placeholder="手机号码"
                    :rules="[{ required: true, message: '请填写手机号码' }]"
                    ref="login"
                />
                <van-field
                    v-model="user.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div class="regBtn">
                    <van-button round block type="info" native-type="submit" @click="onSubmit">
                        登录
                    </van-button>
                </div>
            </van-form>
            <van-form class="form">
                <van-button round block type="info" native-type="submit" @click="register">
                    注册
                </van-button>
            </van-form>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        onSubmit(e){
            this.$axios({
                url:'/login',
                method:'post',
                data:this.user
            }).then(result => {
                localStorage.setItem('news_User_Data',JSON.stringify(result.data.data));
                this.$router.push(`/`)
            })
        },
        register(e){
            this.$router.push('/register');
        }
    },
    mounted(){
        this.$refs.login.focus()
    }
}
</script>

<style lang="less" scoped>
    .loginPage{
        .logout{
            margin: 20 / 360 * 100vw;
            span{
                font-size: 34px;
            }
        }
        .logo{
            display: flex;
            justify-content: center;
            span{
                font-size: 135px;
                color: red;
            }
        }
        .loginLabel{
            .form{
                margin: 20 / 360 * 100vw;
                .van-cell{
                    margin-top: 15px;
                    border: none;
                    border-bottom: 1px solid black;
                    line-height: 30px;
                }
                .regBtn{
                    margin-top: 50px;
                    button{
                        border: none;
                        background-color: rgb(204, 51, 0);
                    }
                }
            }
        }
    }
</style>