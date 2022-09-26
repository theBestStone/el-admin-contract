<!--  -->
<template>
  <div class="reg-wrap">
      <!-- <div class="header">
            <div class="logoreg" style="width:100%;"><img  :src="logoreg" alt=""></div>
            
        </div> -->
        <img class="logoreg" :src="logoreg" alt="" />
       <div class="ms-login text-gray padding">
            <div class="logintitle">欢迎注册5G随e签</div>
           <el-form :model="model"  ref="reg" class="ms-content">
                <el-form-item prop="phone" :verify="verifyPhone" agphone>
                    <el-input v-model="model.phone" type="text" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode" verify>
                    <el-input
                        type="text"
                        placeholder="请输入验证码"
                        style="width:100%"
                        v-model="model.verifyCode"
                    >
                    </el-input>
                     <div class="yzmbox"> <Yzm @getCode="getCode" :data="{ mobile: model.phone}" :isok="isok"></Yzm></div>
                </el-form-item>
                <!-- <el-form-item label="邮箱" prop="email" verify email>
                    <el-input v-model="model.email" placeholder="请输入邮箱"></el-input>
                </el-form-item> -->
                <el-form-item verify agpass prop="password" >
                    <el-input type="password" autocomplete="new-password" v-model="model.password" placeholder="请输入密码" ></el-input>
                </el-form-item>
                <el-form-item  :verify="verifypassword" prop="rePassword" :watch="model.password">
                    <el-input type="password" v-model="model.rePassword" placeholder="请再次输入密码" ></el-input>
                </el-form-item>
                <p class="margin">
                    <el-checkbox v-model="model.agreementState2">
                        我已阅读并同意 <a class="text-blue margin-right-sm"  v-for="(item,index) in protocolList"  @click="viewPro(item)">《{{item.title}}》</a> 
                        <!-- <a class="text-blue margin-right-sm">隐私政策</a> -->
                    </el-checkbox>
                </p>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                 <p class="margin-left-lg text-right">
                    <router-link :to="{path:'/login'}">已有账号， <a class="text-blue" >前往登录</a></router-link>
                </p>
                
            </el-form>
       </div>
       <el-dialog title="用户协议" :visible.sync="visible" :before-close="onBack">
           <div class="padding">
               <p>【审慎阅读】您在申请注册流程中点击同意前，应当认真阅读以下协议。请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</p>
               <p class="margin-top-sm text-blod"> 1、与您约定免除或限制责任的条款；</p>
               <p class="margin-top-sm text-blod"> 2、与您约定法律适用和管辖的条款；</p>
               <p class="margin-top-sm text-blod"> 3、与您使用本网站服务相关的其他重要条款。</p>
               <p class="margin-top-xl"> 【特别提示】您已充分理解，当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容，并将基于您的真实需求而使用5G随e签的服务。阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</p>
               <p class="margin-top-xl">
                   【授权协议】感谢您使用电子印章服务平台，因电子签约服务的需要，请授权平台获取您的电子印章信息，信息包括：如企业名称、企业统一信用代码、印章图样、电子印章有效期。
               </p>
               <p class="margin-top protitle" v-for="(item,index) in protocolList"><a class="text-blue" @click="viewPro(item)">《{{item.title}}》</a></p>
               <!-- <p class="margin-top"><a class="text-blue">《隐私政策》</a></p> -->
           </div>
           <div class="padding-sm text-center">
               <el-button @click="onBack">取消</el-button>
               <el-button @click="onSure" type="primary">确定</el-button>
           </div>
        </el-dialog>
         <el-dialog  :visible.sync="visibleHtml" :fullscreen="true">
             <div v-html="contentHtml" class="padding-bottom-xl"></div>
            <div class="padding-sm text-center profotter" slot="footer"> 
               <el-button @click="visibleHtml=false" type="primary">关闭</el-button>
           </div>
         </el-dialog>
  </div>
</template>

<script>
import Yzm from '../common/yzm.vue'
import {register,agreement,accountCheck,viewAgreement} from '../../api/login.js'
// import CryptoJS from 'crypto-js'
// import { try } from 'q';
export default {
  components: {Yzm},
  data() {
    return {
        logoreg:require("../../assets/img/colourful-logo.png"),
        visible:false,
        loading:false,
        titleHtml:"",
        visibleHtml:false,
        contentHtml:"",
        protocolList:[],
        passwordCopy:"",
        model: {
            phone: '',
            verifyCode: '',
            // email: '',
            password: '',
            // password:'',
            rePassword: '',
            source: 1,
            agreementState:1,
            agreementState2:false
            // agreementToken: '',
            // captchaVerification: ''
            // value9: '',
            // value10: '',
        },
        isok:true,
    }
  },
  created() {
      this.protocol();
    
  },

  methods: {
    protocol(){
        viewAgreement().then(res=>{
            this.protocolList = res.data
        })
    },
    getCode({captchaVerification }) {
            //  this.model.captchaVerification = captchaVerification;
    },
    viewPro(item){
        this.visibleHtml  = true;
        this.titleHtml = item.title;
        this.contentHtml = item.content
    },
    onSure(){
        // agreement({
        //     protocolType:"1"
        // }).then(res=>{
        //     this.model.agreementToken = res.data.agreementToken;
            this.visible = false;
            
        // })
       
    },
    onBack(){
        this.$router.go(-1)//返回上一层
    },
    verifyPassword1 (rule, val, callback) {
        if(this.model.rePassword){

            if (val !== this.model.rePassword) callback(Error('两次输入密码不一致!'))
            else callback()
        }else{
            callback()
        }
    },
    verifypassword (rule, val, callback) {
       if(this.model.password){

            if (val !== this.model.password) callback(Error('两次输入密码不一致!'))
            else callback()
        }else{
            callback()
        }
    },
    verifyPhone(rule, val, callback){
        // console.log(rule)
       
            let res =  accountCheck({phone:val}).then((res)=>{
                this.isok = true
                console.log(res);
                if (res.code === 200) {
                  callback()
                }
            }).catch((error)=>{
                this.isok = false
                callback(Error('该手机号已注册'))
            }); 
        
        // if(res.code==500){
        //     callback(Error(res.message+'!'))
        // }else{
            
        // }
        // console.log(res)

    },
    submitForm() {
       
        this.$refs.reg.validate(valid => {
            if (valid) {
                let model = JSON.parse(JSON.stringify(this.model))
                 if(!this.model.agreementState2){
                        this.$message('请阅读并同意协议');
                        return false;
                    }
                this.passwordCopy = model.password;
                model.password = this.$common.Encrypt(model.password);
                model.rePassword = this.$common.Encrypt(model.rePassword);
                register(model).then(res=>{
                    this.$message.success('注册成功');
                    setTimeout(()=>{
                        this.$router.push({ path:'/login' })
                    },1200)
                }).catch(err=>{
                    // this.model.password = this.passwordCopy;
                    // this.model.rePassword = this.passwordCopy;
                })
            } else {
                // this.$message.error('请输入账号和密码');
                // console.log('error submit!!');
                return false;
            }
        });
    } 
  }
}

</script>
<style lang="less">
.header {
    background-color:transparent;
}
.header .logoreg {
        float: left;
        width: 250px;
        line-height: 56px;
        overflow: hidden;
        color:#fff;
        img{
            width:100px;
            margin:15px 0 0 30px;
        }
        
    }
    .logoreg {
        width: 100px;
        position: absolute;
        left:40px;
        top:20px;
    }
.reg-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login/bg-login.png);
    background-size: cover;
    .logintitle{
        font-size: 26px;
        color: #1257FF;
        font-weight: 700;
        margin:25px;
        margin-top: 40px;
    }
    .ms-login {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 500px;
        width: 440px;
        box-sizing: border-box;
        // margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.9);
        overflow: hidden;
        box-shadow: -2px 3px 12px 2px rgba(0,0,0,0.07);
    }
    .ms-content {
        // padding: 10px 30px;
        padding:20px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        // width: 100%;
        width:300px;
        height: 36px;
        margin-bottom: 10px;
    }
    .protitle{
        cursor: pointer;
    }
    .profotter{
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
    }
    .yzmbox{
        position: absolute;
        right:10px;
        top:5px;
    }
    .el-input--small .el-input__inner{
        border:none;
        border-bottom:1px solid #e9eaee;
        // margin-bottom:5px;
        margin:5px 0;
        text-indent: 0;
        padding:0 4px;
        // padding-bottom:5px;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
            color: #606266;
    }
}
</style>