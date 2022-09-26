<template>
  <div style="display:inline-block">

   <el-button @click="getVirifi" :disabled="ytag" :type="primary">{{ btn }}</el-button>
    <Verify
            @success="handleLogin"        
            :mode="'pop'"              
            :captchaType="'blockPuzzle'"      
            :imgSize="{ width: '330px', height: '155px' }" 
            ref="verify"
        ></Verify>
  </div>
</template>
<script>

import { getCodeMsg } from '@/api'
import {heGetSmsCode} from '../../api/storage.js'
import Verify from "../verifition/Verify";
export default {
  components:{Verify},
  props: {
    data: {
      type: Object,
      required: true,
      default: {}
    },
    isok:{
      type:Boolean,
      default:true
    },
    ishecaiyun:{
      type:Boolean,
      default:false
    }
  },
  data: function() {
    return {
      btn: '获取验证码',
      ytag: false,
      primary: 'text',
      captchaVerification:"",
    }
  },
  methods: {
    handleLogin(e){
      console.log(e);
      this.captchaVerification = e.captchaVerification;
      this.sendMsg();
    },
    getVirifi(){
      if(!this.isok) return;
      var tags = this.$util.verifyMobile(this.data.mobile)
      if (!tags) {
        this.$message.error('手机号错误')
        return false
      }
      this.$refs.verify.show(); 
    },
    async sendMsg() {
      var tags = this.$util.verifyMobile(this.data.mobile)
      if (!tags) {
        this.$message.error('手机号错误')
        return false
      }
      let obj = this.data;
      obj.captchaVerification = this.captchaVerification;
      let data = {}
      this.ishecaiyun ?  data = await heGetSmsCode({captchaVerification:this.captchaVerification}) :  data = await getCodeMsg(obj)
      
      // const { data } = await getCodeMsg(obj)
      
      this.$emit('getCode', data)
      this.$message.success('已发送')
      var i = 59
      this.btn = '59s'
      this.ytag = true
      this.primary = 'text'
      var times = setInterval(() => {
        if (i == 0) {
          this.btn = '获取验证码'
          this.ytag = false
          this.primary = 'text'
          clearInterval(times)
        } else {
          i--
          this.btn = i + 's'
        }
      }, 1000)
 
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
</style>
