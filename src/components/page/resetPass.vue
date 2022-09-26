<!--  -->
<template>
  <div class="repass-wrap">
      <!-- <div class="header">
            <div class="logo" style="width:100%;"><img  :src="logo" alt=""></div>
            
        </div> -->
        <img :src="logo" alt="" class="headerlogin" />
       <div class="ms-login text-gray padding">
           <div class="ms-title margin-sm" style="margin-top: 30px;">
               <el-steps :active="step" align-center  finish-status="success">
                    <el-step title="账号验证" ></el-step>
                    <el-step title="重置密码" ></el-step>
                   <el-step title="成功" ></el-step>
                </el-steps>
           </div>
           <el-form :model="model" v-if="step==0" ref="reset" label-width="100px" class="ms-content">
                <el-form-item label="手机号" prop="phone" :verify="verifyPhone" agphone>
                    <el-input v-model="model.phone" placeholder="请输入手机号" style="width:88%"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verifyCode" :length="6" verify >
                    <el-input
                        type="text"
                        placeholder="请输入验证码"
                         style="width:58%"
                        v-model="model.verifyCode"
                    >
                    </el-input>
                     <span class="margin-left-sm" style="width:40%"> <Yzm  :data="{ mobile: model.phone}" @getCode="getCode"></Yzm></span>
                </el-form-item>
                 
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm($event)">下一步</el-button>
                </div>
                
                
            </el-form>
             <el-form :model="model" v-if="step==1" ref="reset2" label-width="120px" class="ms-content">
                <el-form-item label="登录密码" verify agpass  prop="password">
                    <el-input type="password" v-model="model.password" placeholder="请输入密码" style="width: 90%" ></el-input>
                </el-form-item>
                <el-form-item label="确认登录密码"  :verify="verifypassword" prop="rePassword" :watch="model.password">
                    <el-input type="password" v-model="model.rePassword" placeholder="请再次输入密码" style="width: 90%" ></el-input>
                </el-form-item>
                 
                <div class="text-center">
                    <el-button type="primary" @click="step=0">上一步</el-button>
                    <el-button type="primary" @click="submitForm2()">提交</el-button>
                </div>
                
                
            </el-form>
            <div v-if="step==3" class="text-center">
                <i class="el-icon-success text-green text-xsl"></i>
            </div>
            <p class="gotologin">
                <router-link :to="{path:'/login'}"> <a class="text-blue" >返回登录</a></router-link>
            </p>
       </div>
      
  </div>
</template>

<script>
import {retrievePwd,checkSmsCode} from '../../api/user.js'
import {accountCheck} from '../../api/login.js'
 
import Yzm from '../common/yzm.vue'
export default {
  components: {Yzm},
  data() {
    return {
        logo:require("../../assets/img/colourful-logo.png"),
        visible:"protal",
        step:0,
        model: {
            phone: '',
            verifyCode: '',
            password: '',
            captchaVerification:'',
            rePassword: '',
            token:''
        },
        passwordCopy:""
    }
  },
  created() {},

  methods: {
    getCode({captchaVerification }) {
        // console.log(captchaVerification,"captchaVerification")
        this.model.captchaVerification = captchaVerification;
    },
    verifypassword (rule, val, callback) {
       if(this.model.password){

            if (val !== this.model.password) callback(Error('两次输入密码不一致!'))
            else callback()
        }else{
            callback()
        }
    },
    onSure(){
        this.visible = ""
    },
    onBack(){
        this.$router.go(-1)//返回上一层
    },
    verifyPhone(rule, val, callback){
        // console.log(rule)
       
            let res =  accountCheck({phone:val}).then((res)=>{
                if (res.code === 200) {
                  callback(Error('该手机还未注册'))
                }
            }).catch((error)=>{
                callback()
            }); 
        
        // if(res.code==500){
        //     callback(Error(res.message+'!'))
        // }else{
            
        // }
        // console.log(res)

    },
    submitForm(e) {
            this.$refs.reset.validate((valid) => {
                if (valid) {
                    checkSmsCode({verifyCode:this.model.verifyCode,phone:this.model.phone}).then(res=>{
                        this.model.token = res.data
                        this.step = 1;
                        this.$nextTick(() => {
                            this.$refs.reset2.clearValidate()
                        })
                    })
                } else {
                     
                    return false;
                }
            });
    } ,
     async submitForm2() {
            this.$refs.reset2.validate(async valid => {
                if (valid) {
                    let model = JSON.parse(JSON.stringify(this.model))
                    this.passwordCopy = model.password;
                    model.password = this.$common.Encrypt(model.password);
                    model.rePassword = this.$common.Encrypt(model.rePassword);
                    retrievePwd(model).then(res=>{
                        this.$message.success("修改成功");
                        this.step = 3;
                        window.setTimeout(()=>{
                            this.$router.push({ path: '/login' });
                        },1200)
                    }).catch(err=>{
                        // this.model.password = this.passwordCopy;
                        // this.model.rePassword = this.passwordCopy;
                    });
                    
                } else {
                  
                    console.log('error submit!!');
                    return false;
                }
            });
    } 
  }
}

</script>
<style lang="less" scoped>
// .header {
//     background-color:transparent;
// }
// .header .logo {
//         float: left;
//         width: 250px;
//         line-height: 56px;
//         overflow: hidden;
//         color:#fff;
//         img{
//             width:100px;
//             margin:15px 0 0 30px;
//         }
        
//     }
.headerlogin {
        width: 100px;
        position: absolute;
        left:40px;
        top:20px;
    }
.repass-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login/bg-login.png);
    background-size: cover;

    .ms-login {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        height: 340px;
        width: 440px;
        box-sizing: border-box;
        // margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.9);
        overflow: hidden;
        box-shadow: -2px 3px 12px 2px rgba(0,0,0,0.07);
    }
    .ms-content {
        padding: 20px 30px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        // width: 100%;
        width:280px;
        height: 36px;
        margin-top: 10px;
    }
    .el-step__title.is-process{
        color:#d7d7d7;
    }
    .el-step__head.is-process{
        color:#d7d7d7;
        border-color:#d7d7d7;
    }
    .el-step.is-center .el-step__line{
        left:0%;
        right:-100%;
    }
    .gotologin{
        margin-left: 60px;
    }
}
</style>