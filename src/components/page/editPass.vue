<!--  -->
<template>
  <div class="reg-wrap">
      <div class="header">
            <div class="logo" style="width:100%;"><img  :src="logo" alt=""></div>
            
        </div>
       <div class="ms-login text-gray">
           <div class="ms-title text-center margin-sm">欢迎注册5G随e签</div>
           <el-form :model="model"  ref="reg" label-width="100px" class="ms-content">
                <el-form-item label="手机号">
                    <el-input v-model="model.value1" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                    <el-input
                        type="text"
                        placeholder="请输入验证码"
                         style="width:58%"
                        v-model="model.value2"
                    >
                    </el-input>
                     <span class="margin-left-sm" style="width:40%"> <Yzm @getCode="getCode" :data="{ mobile: model.value1}"></Yzm></span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="model.value3" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input type="password" v-model="model.value4" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认登录密码">
                    <el-input type="password" v-model="model.value5" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <p class="margin">
                    <el-checkbox v-model="model.value6" disabled="">
                        我已阅读并同意 <a class="text-blue margin-right-sm">服务协议</a> <a class="text-blue margin-right-sm">隐私政策</a>
                    </el-checkbox>
                </p>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                
                
            </el-form>
       </div>
       <el-dialog title="用户协议" :visible="visible=='protal'">
           <div class="padding">
               <p>【审慎阅读】您在申请注册流程中点击同意前，应当认真阅读以下协议。请您务必审慎阅读、充分理解协议中相关条款内容，其中包括：</p>
               <p class="margin-top-sm text-blod"> 1、与您约定免除或限制责任的条款；</p>
               <p class="margin-top-sm text-blod"> 2、与您约定法律适用和管辖的条款；</p>
               <p class="margin-top-sm text-blod"> 3、与您使用本网站服务相关的其他重要条款。</p>
               <p class="margin-top-xl"> 【特别提示】您已充分理解，当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容，并将基于您的真实需求而使用5G随e签的服务。阅读协议的过程中，如果您不同意相关协议或其中任何条款约定，您应立即停止注册程序。</p>
               <p class="margin-top-xl">
                   【授权协议】感谢您使用电子印章服务平台，因电子签约服务的需要，请授权平台获取您的电子印章信息，信息包括：如企业名称、企业统一信用代码、印章图样、电子印章有效期。
               </p>
               <p class="margin-top"><a class="text-blue">《使用协议》</a></p>
               <p class="margin-top"><a class="text-blue">《隐私政策》</a></p>
           </div>
           <div class="padding-sm text-center">
               <el-button @click="onBack">取消</el-button>
               <el-button @click="onSure" type="primary">确定</el-button>
           </div>
        </el-dialog>
  </div>
</template>

<script>
import Yzm from '../common/yzm.vue'
export default {
  components: {Yzm},
  data() {
    return {
        logo:require("../../assets/img/colourful-logo.png"),
        visible:"protal",
        model: {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: true,
            value7: '',
            value8: '',
            value9: '',
            value10: '',
        },
    }
  },
  created() {},

  methods: {
      getCode({ code, result }) {
            if (!result) return this.$message.error('获取验证码失败!')
            this.form1.vfcode = code
            this.$forceUpdate()
            this.$refs.form1.validateField('verifyCode')
    },
    onSure(){
        this.visible = ""
    },
    onBack(){
        this.$router.go(-1)//返回上一层
    },
    submitForm() {
            this.$refs.reg.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
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
.header .logo {
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
.reg-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login/bg-login.jpg);
    background-size: cover;

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 450px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgb(255, 255, 255);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
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
}
</style>