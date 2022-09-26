<template>
    <div class="login-wrap">
        <!-- <div class="header">
            <div class="logo" style="width:100%;">
                <img @click="toGw" :src="logo" alt="" /><span  style="position:relative;top:-5px;left:10px;font-size:13px;color:#333">欢迎登录5G随e签</span>
            </div>
        </div> -->
        <img @click="toGw" :src="logo" alt="" class="headerlogin" />
        <div class="ms-login text-gray padding">
            <div class="logintitle">欢迎登录5G随e签</div>
            <div class="tabbox">
                <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
                    <el-tab-pane label="验证码登录" name="1"></el-tab-pane>
                    <el-tab-pane label="密码登录" name="2"></el-tab-pane>
                </el-tabs>
            </div>
            <el-form v-if="activeName == 1" :model="param" ref="login" label-width="0px" class="ms-content">
                <!-- <div class="form-label text-gray margin-bottom">手机号</div> -->
                <el-form-item prop="deviceId" verify agphone>
                    <el-input v-model="param.deviceId" placeholder="请输入手机号" class="margin-top-sm">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                    </el-input>
                </el-form-item>
                <!-- <div class="form-label text-gray margin-bottom">验证码</div> -->
                <el-form-item prop="validCode" verify>
                    <el-input class="margin-top-sm"
                        type="text"
                        placeholder="请输入验证码"
                        style="width:100%;"
                        v-model="param.validCode"
                        @keyup.enter.native="toVerify('login')"
                    >
                        
                    </el-input>
                    <div class="yzmbox"> <Yzm @getCode="getCode" :data="{ mobile: param.deviceId }"></Yzm></div>
                </el-form-item>
                <p class="text-sm margin-top-lg margin-bottom-lg">
                        <el-checkbox v-model="param.agreementState">
                            我已阅读并同意
                            <!-- <a class="text-blue margin-right-sm">隐私政策</a> -->
                        </el-checkbox>
                        <a class="text-blue"  @click="viewPro(protocolList[0])">《{{protocolList[0].title}}》</a> <span style="color:#333">和</span> <a class="text-blue"  @click="viewPro(protocolList[1])">《{{protocolList[1].title}}》</a> 
                    
                </p>
                <div class="login-btn">
                    <el-button
                        :loading="loading"
                        size="medium"
                        type="primary"
                        style="width:100%;"
                        @click.native.prevent="toVerify('login')"
                    >
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                </div>
            </el-form>
            <el-form v-if="activeName == 2" :model="param2" ref="login2" label-width="0px" class="ms-content">
                <!-- <div class="form-label text-gray margin-bottom">手机号</div> -->
                <el-form-item prop="username" verify agphone>
                    <el-input v-model="param2.username" placeholder="请输入手机号" class="margin-top-sm">
                        
                    </el-input>
                </el-form-item>
                <!-- <div class="form-label text-gray margin-bottom">密码</div> -->
                <el-form-item prop="password" verify>
                    <el-input @focus="mytext='password'" :type="mytext" placeholder="请输入密码" v-model="param2.password" @keyup.enter.native="toVerify('login2')" autocomplete="off" class="margin-top-sm">
                        
                    </el-input>
                </el-form-item>
                <p class="text-sm margin-top-lg margin-bottom-lg">
                    <el-checkbox v-model="param2.agreementState">
                        我已阅读并同意 
                        <!-- <a class="text-blue margin-right-sm">隐私政策</a> -->
                    </el-checkbox>
                    <a class="text-blue"  @click="viewPro(protocolList[0])">《{{protocolList[0].title}}》</a> <span style="color:#333">和</span> <a class="text-blue"  @click="viewPro(protocolList[1])">《{{protocolList[1].title}}》</a> 
                </p>
                <div class="login-btn">
                    <el-button
                        :loading="loading"
                        size="medium"
                        type="primary"
                        style="width:100%;"
                        @click.native.prevent="toVerify('login2')"
                    >
                        <span v-if="!loading">登 录</span>
                        <span v-else>登 录 中...</span>
                    </el-button>
                </div>
            </el-form>
            <p class="login-tips padding">
                <router-link :to="{ path: '/reg' }"><a class="text-blue margin-left-sm">注册</a> </router-link>
                <router-link :to="{ path: '/resetPass' }"><a class="text-blue margin-right-sm fr">忘记密码</a> </router-link>
            </p>
        </div>
        <Verify
            @success="getCatch"
            :mode="'pop'"
            :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }"
            ref="verify"
        ></Verify>
        <el-dialog  :visible.sync="visibleHtml" :fullscreen="true">
             <div v-html="contentHtml" class="padding-bottom-xl"></div>
            <div class="padding-sm text-center profotter" slot="footer"> 
               <el-button @click="visibleHtml=false" type="primary">关闭</el-button>
           </div>
         </el-dialog>
    </div>
</template>

<script>
import Yzm from '../common/yzm.vue';
import Verify from '../verifition/Verify';
import { encrypt } from '@/utils/rsaEncrypt';
import Cookies from 'js-cookie';
import qs from 'qs';
import {removeDentify,getToken} from '@/utils/auth';
import {viewAgreement} from '../../api/login.js'
export default {
    components: { Yzm, Verify }, //
    data: function() {
        return {
            gateway:'',
            logo: require('../../assets/img/colourful-logo.png'),
            activeName: '1',
            mytext:'text',
            param: {
                deviceId: '',
                validCode: '',
                client_id: 'webApp',
                client_secret: 'webApp',
                scope: 'app',
                grant_type: 'mobile',
                captchaVerification: '',
                agreementState:false,
                eid:0,
                source:1
            },
            param2: {
                username: '',

                password: '',
                client_id: 'webApp',
                client_secret: 'webApp',
                scope: 'app',
                grant_type: 'password',
                captchaVerification: '',
                agreementState:false,
                eid:0
            },
            passwordCopy: '',
            loading: false,
            redirect: false,
            protocolList:[{},{}],
            titleHtml:"",
            visibleHtml:false,
            contentHtml:"",
        };
    },
    
   
    watch: {
        $route: {
            handler: function(route) {
                const data = route.query;
                if (data && data.redirect) {
                    this.redirect = data.redirect;
                    delete data.redirect;
                    if (JSON.stringify(data) !== '{}') {
                        this.redirect = this.redirect + '&' + qs.stringify(data, { indices: false });
                    }
                }
            },
            immediate: true
        }
    },
    created(){
        this.point();
        this.protocol();
    },
    methods: {
    protocol(){
        viewAgreement().then(res=>{
            this.protocolList = res.data
        })
    },
    point() {
        let gateway =  sessionStorage.getItem('gateway');
        this.gateway = gateway;
      const point = Cookies.get('point') !== undefined
      if (point&&!gateway) {
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    },
    viewPro(item){
        this.visibleHtml  = true;
        this.titleHtml = item.title;
        this.contentHtml = item.content
    },
    toGw() {
        if(this.gateway == 'gateway') {
            window.location.href = process.env.VUE_APP_SASSURL
        }
    },
        handleClick(e) {
            this.$nextTick(() => {
                if (e == 1) {
                    this.$refs.login.clearValidate();
                } else {
                    this.$refs.login2.clearValidate();
                }
            });
        },
        toVerify(refd) {
            if (refd == 'login2') {
                if(!this.param2.agreementState){
                    this.$message('请阅读并同意协议');
                    return false;
                }
                this.$refs.login2.validate(valid => {
                    if (valid) {
                        this.$refs.verify.show();
                    }
                });
            } else {
                if(!this.param.agreementState){
                        this.$message('请阅读并同意协议');
                        return false;
                    }
                this.handleLogin(false, refd);
            }
        },
        getCatch(e) {
            this.param2.captchaVerification = e.captchaVerification;
            this.handleLogin(false, 'login2');
        },
        getCode({ captchaVerification }) {
            this.param.captchaVerification = captchaVerification;
        },

        handleLogin(params, refd) {
            this.$refs[refd].validate(valid => {
                if (valid) {
                    this.loading = true;
                    let str = 'loginCode';
                    let param = 'param';
                    let model = {}
                    if (refd == 'login2') {
                        str = 'loginPass';
                        param = 'param2';
                        model =JSON.parse(JSON.stringify(this.param2))
                        this.passwordCopy = this.param2.password;
                        model.password = this.$common.Encrypt(model.password);
                        model.username = this.$common.Encrypt(model.username);
                        if(model.agreementState) model.agreementState = 1
                    }else{
                        model = JSON.parse(JSON.stringify(this.param))
                        model.deviceId = this.$common.Encrypt(model.deviceId);
                        if(model.agreementState) model.agreementState = 1
                    }
                    // else{
                    //      this.$message.success('登录成功');
                    //     localStorage.setItem('ms_username', this.param.username);
                    //     this.$router.push('/');
                    // }
                    //    this.loginForm.loginPwd = this.Encrypt(this.loginForm.password_copy);
                    this.$store
                        .dispatch(str, model)
                        .then(() => {
                            if(this.gateway) {
                                let tokenKey =getToken(); //Cookies.get('anySign')
                                let dentify = '-1'
                                sessionStorage.setItem('gateway','');
                                window.location.href = process.env.VUE_APP_SASSURL + `/#/index?tokenKey=${tokenKey}&dentify=${dentify}`
                                return
                            }
                            removeDentify();
                            this.loading = false; //this.redirect ||
                            this.$router.push({ path: '/' });
                        })
                        .catch(res => {
                            // if (refd == 'login2') {
                            //     this.param2.password = this.passwordCopy;
                            // }
                            this.loading = false;

                            // this.getCode()
                        });
                    // this.$message.success('登录成功');
                    // localStorage.setItem('ms_username', this.param.username);
                    // this.$router.push('/');
                } else {
                    // this.$message.error('请输入账号和密码');
                    // console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" >
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login/bg-login.png);
    background-size: cover;

    .ms-login {
        position: absolute;
        // right: 20%;
        // top: 50%;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 460px;
        width: 440px;
        box-sizing: border-box;
        // margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.9);
        overflow: hidden;
        box-shadow: -2px 3px 12px 2px rgba(0,0,0,0.07);
    }
    .ms-content {
        padding: 0 25px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 46px;
        margin-bottom: 10px;
        margin-top:5px;
        background-image: linear-gradient(180deg, #185BED 0%, #0541DA 100%);
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        /* color: #fff; */
    }
    // .header {
    //     background-color: transparent;
    // }
    // .header .logo {
    //     float: left;
    //     width: 250px;
    //     line-height: 56px;
    //     overflow: hidden;
    //     color: #fff;
    //     img {
    //         width: 80px;
    //         margin: 15px 0 0 30px;
    //     }
    // }
    .headerlogin {
        width: 100px;
        position: absolute;
        left:40px;
        top:20px;
    }
    .el-tabs__item{
        // font-size:20px;
    }
    .el-tabs__nav-wrap::after{
        background-color: #fff;
    }
    .el-tabs__active-bar{
        background-color: #1664ff;
        height: 1px
    }
    .el-tabs__item.is-active{
        color:#1664ff;
    }
    .el-input--small .el-input__inner{
        border:none;
        border-bottom:1px solid #e9eaee;
        margin-bottom:5px;
        text-indent: 0;
        padding:0 4px;
        padding-bottom:5px;
    }
    .tabbox{
        margin-left: 25px;
    }
    .tabbox .el-tabs__active-bar{
        display: none;
    }
    .logintitle{
        font-size: 26px;
        color: #1257FF;
        font-weight: 700;
        margin:25px;
        margin-top: 40px;
    }
    .yzmbox{
        position: absolute;
        right:0;
        top:10px;
    }
    .el-checkbox__label{
        font-size: 12px;
    }
}
</style>
