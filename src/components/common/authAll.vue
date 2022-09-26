<template>
   <div>

     <div class="margin code-a" v-if="witchWay=='SMS'">
        
        <p >为保护账号安全，请使用 {{phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2')}}验证身份。</p>
        <p> 该账号将用作接收通知及签署文件，请谨慎修改。</p>
        <!-- <div class="margin-tb-sm text-bold">
          验证码
        </div> -->
        <div class="margin-tb-sm"> 
          <el-input class="margin-right-sm" type="text" placeholder="请输入手机验证码" v-model="msgCode" style="width:60%"></el-input> <Yzm v-show="msgCode.length<6" :data="{ mobile: phone}" @getCode="getCode"></Yzm><el-button @click="toNext"  v-show="msgCode.length==6" type="primary">确定</el-button>
        </div>
      </div>   
       <div class="margin code-b" v-if="witchWay=='PWD'">
          <div v-if="userInfo.signPwdEnabled==0">
            <div>
            <i class="el-icon-warning text-blue"></i> 当前账号{{userInfo.signPwdState==0?'未设置':'未开启'}}签署密码，请前往用户中心设置签署密码，或优先选择其他认证方式

            </div>
          </div>
          <div v-if="userInfo.signPwdEnabled==1">

              <p >填写验证码确认签署代表您的真实意愿，该电子签名将产生相应的法律效力。</p>
            
            
              <div class="margin-tb-sm"> 
                <el-input class="margin-right-sm" type="password" placeholder="请输入签署密码" v-model="pwd" style="width:60%"></el-input> <el-button @click="toNext"  type="primary">确定</el-button>
              </div>
          </div>
      </div>  
      <div class="code-c"  v-if="witchWay=='FACE'" >
        <!-- v-if="witchWay=='FACE'" -->
        <p >签署代表您的真实意愿，该电子签名将产生相应的法律效力，请扫描下方二维码进行人脸识别验证身份完成签署</p>
        <div class="text-center margin-top">
        <span class="shadow -black" style="display:inline-block;padding:10px;position:relative">

          <el-image  style="width:200px;height:200px" class="" :src="qrimg" fit="contain">
            <div slot="error" class="image-slot" style="margin-top:90px;">
              <i class="el-icon-loading"></i>
            </div>
        </el-image>
          <div @click="setting()" class="error-cover" v-if="qrCodeStatus==2">
            <div><i class="el-icon-refresh"></i>二维码已过期，点击刷新</div>
          </div>
        </span>
        <p class="margin-top text-gray"><i class="el-icon-warning-outline text-red"></i>请使用手机微信扫描二维码</p>
      </div>
      </div>
    <div slot="footer" class="dialog-footer padding">
       <div class="flex align-center " style="height:50px;">
        <span>其他验证方式： </span>

        <span class="auth-way-type" @click="changeWay('SMS')" v-if="witchWay!='SMS'"><img src="../../assets/img/feature/codeauth.png" alt=""> 短信验证码验证 </span>
        <span class="auth-way-type" @click="changeWay('FACE')" v-if="witchWay!='FACE'"><img src="../../assets/img/feature/faceauth.png" alt=""> 人脸识别 </span>
        <span class="auth-way-type" @click="changeWay('PWD')" v-if="witchWay!='PWD'"><img src="../../assets/img/feature/pwd.png" alt=""> 密码验证 </span>
       </div>
   </div>
   </div>
  
</template>
<script>
import {checkIdentify} from '../../api/user.js'
import { faceResult,setting } from '../../api/contract.js';
import Yzm from './yzm'
export default {
  components:{Yzm},
  props: {
    contractNo:String,
    witchWay:{
      type:String,
      default:'SMS'
    },
    phone: {
      type: [Number,String],
      required: true
      
    },
    visible:Boolean,
    verifyTag: {
      type: [Boolean],
      default:true
    },
  },
  data: function() {
    return {
      btn: '获取验证码',
      msgCode:"",
      pwd:'',
      ytag: false,
      primary: 'primary',
      qrimg:'',
      timer:'',
      userInfo:{},
      qrCodeStatus:0
      // witchWay:'SMS'
    }
  },
  methods: {
    async toNext() {
      let way = this.witchWay;
      let code = ''
      if(way=='SMS'){

        if(!this.msgCode){
          this.$message.error("请填写验证码")
          return false;
        }
        way = this.msgCode
      }else if(way=='PWD'){
        if(!this.pwd){
          this.$message.error("请填写签署密码")
          return false;
        }
        way = this.$common.Encrypt(this.pwd)
      }else if(way=='FACE'){
         way = 'setTrue'
      }
     
       
      this.$emit('toNext',way);
     
       
    },
     async setting(captchaVerification){
      let obj = {
        contractNo:this.contractNo,
        intentMethod:this.witchWay
      }
      if(captchaVerification){
        obj.captchaVerification = captchaVerification;
      }
      let {data } = await setting(obj);
      if(this.witchWay=='FACE'){
        this.skey = data.skey;
        this.qrimg = "data:image/png;base64," + data.qrCode;
        this.getQrCodeRes();
      }
    },
    changeWay(type) {
      this.witchWay = type;
      if(type!='SMS'){
        this.setting();
      }
      if(type!='FACE'){
        if(this.timer){
          window.cleartTimeout(this.timer)
          this.timer = null;
        }
      }
      // this.$emit('getCode', data)
            // if (!result) return this.$message.error('获取验证码失败!')
            // this.form1.vfcode = PWD
            // this.$forceUpdate()
            // this.$refs.form1.validateField('verifyCode')
    },
    async getQrCodeRes() {

      let { data } = await faceResult({ skey: this.skey });
      console.log(data,"data")
      this.qrCodeStatus = data.qrCodeStatus
      if (data.qrCodeStatus==10 ) {
        
          this.toNext();

      } else {
        this.timer = window.setTimeout(() => {
          this.getQrCodeRes();
        }, 1000)
      }
    },
    getCode(item){
      this.setting(item.captchaVerification)
    },
    close(){
      this.msgCode = ''
      this.$emit('closepop','visibleCode'); //通知父组件改变。
    },
     getinfo(tag) {
      let res = this.$store.getters.user;
      // this.$store.dispatch('GetInfo', tag).then(res => {
      this.userInfo = res;
 
      // });
    }
  },
  mounted() {
    this.getinfo();
  }
}
</script>

<style lang="less">
.w60 {
  float: left;
  width: 60%;
}
.auth-way-type{
  display: inline-block;
  margin-right:20px;
  cursor: pointer;
  img{
    position: relative;
    top:3px;
  }
}
.error-cover{
  position:absolute;
  height:200px;
  width:200px;
  position:absolute;
  left:10px;
  top:10px;
  background-color: rgba(255,255,255,.9);
  color:#000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  
}
</style>
