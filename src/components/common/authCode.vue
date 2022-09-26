<template>
   <el-dialog
        title="身份验证"
        :visible.sync="visible"
         v-dialogDrag
         :before-close="close"
         :modal-append-to-body='false'
        width="500px"
       >
     <div class="margin">
        
        <p >为保护账号安全，请使用 {{phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2')}}验证身份。</p>
        <p> 该账号将用作接收通知及签署文件，请谨慎修改。</p>
        <div class="margin-tb-sm text-bold">
          验证码
        </div>
        <div> 
          <el-input class="margin-right-sm" type="text" v-model="msgCode" style="width:60%"></el-input> <Yzm :data="{ mobile: phone}"></Yzm>
        </div>
      </div>   
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="toNext">下一步</el-button>
   </div>
  </el-dialog>
</template>
<script>
import {checkIdentify} from '../../api/user.js'
import Yzm from './yzm'
export default {
  components:{Yzm},
  props: {
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
      ytag: false,
      primary: 'primary'
    }
  },
  methods: {
    async toNext() {
      if(!this.msgCode){
        this.$message.error("请填写验证码")
        return false;
      }
      if(this.verifyTag){

        checkIdentify({verifyCode:this.msgCode,phone:this.phone}).then(res=>{
             
              this.$emit('toNext',res.data);
              this.msgCode = ''
              // this.cheackToken = res.data;
          })
      }else{
       
        this.$emit('toNext',this.msgCode);
      }
       
    },
    getCode(data) {
      // this.$emit('getCode', data)
            // if (!result) return this.$message.error('获取验证码失败!')
            // this.form1.vfcode = code
            // this.$forceUpdate()
            // this.$refs.form1.validateField('verifyCode')
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
</style>
