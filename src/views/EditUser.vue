<template>
  <div class="editUser">
    <top centerText="编辑资料" showIcon="1"></top>
    <div class="uploadImg">
        <img :src="$axios.defaults.baseURL + localUser.head_img"/>
        <van-uploader :after-read="afterRead" :deletable ="uploadCheck"/>
    </div>

    <!-- 昵称修改 -->
    <labelItem label='昵称' :tips="localUser.nickname" @click.native="bundlenickname = true"></labelItem>
    <van-dialog v-model="bundlenickname" title="修改昵称" show-cancel-button @cancel="nickNameCancel" @confirm="nickNameConfrim">
        <van-field
            v-model="userJson.nickname"
            placeholder="昵称"
        />
    </van-dialog>

    <!-- 密码修改 -->
    <labelItem label='密码' tips="* * * * * * " @click.native="bundlepassword = true"></labelItem>
    <van-overlay :show="bundlepassword">
        <div class="wrapper" @click="bundlepassword = false;showKeyboard=false">
            <div class="block" @click="stopPagation">
                <span @click="bundlepassword = false;showKeyboard=false" class="iconfont iconicon-test"></span>
                <van-password-input
                    :value="password"
                    info="密码为 6 位数字"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
                />
                <!-- 数字键盘 -->
                <van-number-keyboard
                    @input="onInput"
                    @delete="onDelete"
                    :show="showKeyboard"
                />
            </div>
        </div>
    </van-overlay>
    
    <!-- 性别修改 -->
    <labelItem label='性别' :tips="['男','女'][localUser.gender]" @click.native="bundlegender = true"></labelItem>
    <van-action-sheet 
    close-on-click-action
    v-model="bundlegender" 
    :actions="actions" 
    @select="onSelect" />
  </div>
</template>

<script>
import labelItem from '@/components/labelItem';
import top from '@/components/top'
export default {
    data(){
        return {
            uploadCheck:true,
            localUser:{},
            userJson:{},
            showKeyboard: false,
            password:'',
            bundlenickname:false,
            bundlepassword:false,
            bundlegender:false,
            actions:[
                {name: '男',value: '0'},
                {name: '女',value: '1'}
            ]
        }
    },
    components:{
        labelItem,
        top
    },
    methods:{
        // vantui中的文件上传
        afterRead(file){
            const fmData = new FormData();
            fmData.append('file',file.file);
            this.$axios({
                url:'/upload',
                headers:{
                    Authorization:JSON.parse(localStorage.getItem('news_User_Data')).token
                },
                method:'post',
                data:fmData
            }).then(async result => {
                this.$toast.success(result.data.message);
                this.localUser.head_img = result.data.data.url;
                await this.editUser({head_img: result.data.data.url});
            }).catch(reason => {
                this.$toast.fail('文件上传失败');
            })
        },
        stopPagation(event){
            event.stopPropagation();
        },
        nickNameCancel(){
            this.userJson.nickname = this.localUser.nickname
        },
        // 提交昵称
        async nickNameConfrim(){
            let result = await this.editUser({nickname: this.userJson.nickname})
            this.localUser = result.data.data;
        },
        // 修改密码
        async onInput(key){
            if(this.password.length <= 6){
                this.password = (this.password+key).slice(0,6)
                if(this.password.length == 6){
                    let result = await this.editUser({password: this.password})
                    this.$toast.success(result.data.message + '，请重新登录');
                    this.localUser = result.data.data;
                    this.password = '';
                    this.bundlepassword = false;
                    this.showKeyboard=false
                    localStorage.removeItem('news_User_Data');
                    this.$router.replace('/login');
                }
            }else{
                return;
            }
        },
        onDelete(){
            this.password = this.password.slice(0,this.password.length-1)
        },
        // 修改昵称
        async onSelect(item){
            let result = await this.editUser({gender: item.value})
            this.localUser = result.data.data;
            this.bundlegender = false;
        },
        // 抽离编辑用户信息的方法
        editUser(data){
            return new Promise((resolve,reject) => {
                this.$axios({
                    url:`/user_update/${this.localUser.id}`,
                    headers:{
                        Authorization:JSON.parse(localStorage.getItem('news_User_Data')).token
                    },
                    method:'post',
                    data:data
                }).then(result => {
                    this.$toast.success('编辑成功');
                    resolve(result);
                }).catch(reason => {
                    this.$toast.fail('编辑失败，请稍后重试');
                    reject(reason);
                })
            })
        }
    },
    async mounted(){
        const news = JSON.parse(localStorage.getItem('news_User_Data')) || {};
        let result = await this.$axios({
            url:`/user/${news.user.id}`,
            method:'get',
            headers:{
                Authorization:news.token
            },
        }).catch(reason => {
            this.$toast.fail('个人信息获取失败');
        });
        this.localUser = result.data.data;
        this.userJson = news.user;
    }
}
</script>

<style lang="less" scoped>
    .editUser{
        margin: 4.16666667vw;
        .uploadImg{
            height: 150/360 * 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                border-radius: 50%;
                height: 75/360 * 100vw;
                width: 75/360 * 100vw;
                object-fit: cover;
            }
            .van-uploader{
                position: absolute;
                opacity: 0;
            }
        }
        .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .block {
            span{
                display: inline-block;
                padding: 10px;
            }
            width: 80%;
            height: 20%;
            background-color: #fff;
        }
    }
</style>