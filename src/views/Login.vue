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
            <form action="JavaScript:;">
                <div class="username">
                    <input type="text" placeholder="用户名 / 手机号码" name="username" v-model="user.username">
                </div>
                <div class="password">
                    <input type="text" placeholder="密码" name="password" v-model="user.password">
                </div>
                <div class="submit">
                    <input type="submit" value="登录" @click="sub">
                </div>
                <div class="register">
                    <input type="register" value="注册" @click="register">
                </div>
            </form>
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
        sub(e){
            e.preventDefault();
            console.log(this.user);
        },
        register(e){
            console.log('注册');
        }
    }
}
</script>

<style lang="less" scoped>
    .loginPage{
        display: flex;
        flex-direction: column;
        padding: .4rem;
        .logout{
            .iconicon-test{
                font-size: .666667rem;
                color: darkred;
                font-weight: 700;
            }
        }
        .logo{
            display: flex;
            justify-content: center;
            height: 3.566667rem;
            align-items: center;
            .iconnew{
                font-size: 2.666667rem;
                color: red;
            }
        }
        .loginLabel{
            .username,.password{
                input{
                    height: 1.066667rem;
                    width: 100%;
                    border: 0;
                    outline: none;
                    font-size: .4rem;
                    border-bottom: 0.056667rem solid #b4acac;
                    padding-left: 0.2rem;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                }
            }
            .submit,
            .register{
                height: 2.3rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                input{
                    width: 95%;
                    height: 1.066667rem;
                    background-color: rgb(204, 51, 0);
                    color: white;
                    border: 0px;
                    outline: none;
                    font-size: 0.366667rem;
                    font-weight: 700;
                    border-radius: .666667rem;
                    margin: 0 auto;
                    text-align: center;
                }
            }
            .register{
                align-items: end;
            }
        }
    }
</style>