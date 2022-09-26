<template>
   <el-dialog
        class="codedialog"
        title="短信验证"
        :visible.sync="visible"
         v-dialogDrag
         :before-close="close"
         :modal-append-to-body='false'
        width="500px"
       >
     <div class="margin">
        
        <!-- <p >为保护账号安全，请使用 {{phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2')}}验证身份。</p>
        <p> 该账号将用作接收通知及签署文件，请谨慎修改。</p> -->
        <div class="margin-tb-sm text-bold">
         验证码将发送至{{phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2')}}，请尽快填写。
        </div>
        <div> 
          <el-input class="margin-right-sm" type="text" v-model="msgCode" placeholder="请输入手机验证码" style="width:60%"></el-input>
          <!-- <el-button @click="getVirifi" :disabled="ytag" :type="primary">{{ btn }}</el-button> -->
          <Yzm @getCode="getCode" :data="{ mobile: phone}" :ishecaiyun="true"></Yzm>
        </div>
      </div>   
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="toNext">确定</el-button>
   </div>
  </el-dialog>
</template>
<script>
import {heVerifySmsCode,heGetSmsCode} from '../../api/storage.js'
import Yzm from './yzm'
export default {
  components:{Yzm},
  props: {
    phone: {
      type: [Number,String],
      required: true
      
    },
    visible:Boolean,
    random:String,
    verifyTag: {
      type: [Boolean],
      default:true
    },
  },
  data: function() {
    return {
      btn: '获取验证码',
      msgCode:"",
      ytag: false,
      primary: 'primary',
      
    }
  },
  methods: {
    async toNext() {
      if(!this.msgCode){
        this.$message.error("请填写验证码")
        return false;
      }
      if(this.verifyTag){

        heVerifySmsCode({verifyCode:this.msgCode,random:this.random}).then(res=>{
              this.$emit('toNext',res.data);
              this.msgCode = ''
              // this.cheackToken = res.data;
          })
      }else{
       
        this.$emit('toNext',this.msgCode);
      }
       
    },
    getCode(data) {
      console.log(data)
      this.random  = data.data.random
      this.toNext()
      // heGetSmsCode({captchaVerification:data.captchaVerification}).then((res)=>{
      //   console.log(res)
      // })
      // this.$emit('getCode', data)
            // if (!result) return this.$message.error('获取验证码失败!')
            // this.form1.vfcode = code
            // this.$forceUpdate()
            // this.$refs.form1.validateField('verifyCode')
    },
     getVirifi(){
      // var tags = this.$util.verifyMobile(this.phone)
      // if (!tags) {
      //   this.$message.error('手机号错误')
      //   return false
      // }
      // this.sendMsg();
    },
    async sendMsg() {
      // var tags = this.$util.verifyMobile(this.phone)
      // if (!tags) {
      //   this.$message.error('手机号错误')
      //   return false
      // }
      let obj = {};
   
      // const { data } = await heGetSmsCode(obj)
      // this.random = data;
      // this.$emit('getCode', {captchaVerification:this.captchaVerification})
      this.$message.success('已发送')
      var i = 59
      this.btn = '59s'
      this.ytag = true
      this.primary = ''
      var times = setInterval(() => {
        if (i == 0) {
          this.btn = '获取验证码'
          this.ytag = false
          this.primary = 'primary'
          clearInterval(times)
        } else {
          i--
          this.btn = i + 's'
        }
      }, 1000)
 
    },
    
    close(){
      this.msgCode = ''
      this.$emit('closepop','visibleCode'); //通知父组件改变。
    }
  },
  mounted() {}
}
</script>

<style >
.w60 {
  float: left;
  width: 60%;
}
.codedialog /deep/ .el-dialog__body{
    padding:10px;
  }
 

</style>
