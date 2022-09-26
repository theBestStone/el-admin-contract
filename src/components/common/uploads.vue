<!--  -->
<template>
  <el-upload
    :class="{'upload-demo':type ==3?true:false}"
    :action="action"
    :on-error="errorAuth"
    :on-success="successAuth"
    :before-upload="beforeUpload"
    :on-progress="progressAuth"
    :data="uploadData"
   
    :show-file-list="false"
    :drag="type ==3||type ==2"
    multiple
    > 
      <el-button v-if="type ==1" :type="btnType">{{btnTitle}}</el-button>
      <div class="upload-box2" v-if="type ==2"><i class="el-icon-paperclip"></i>添加附件</div>
      <div v-if="type ==3" class="upload-box"><i class="el-icon-upload2"></i>点击或拖动文档上传</div>
    </el-upload> 
</template>

<script>
import {uploadFile,downloadFile} from '../../api/index.js'
import {uploadFileContract,uploadStatus} from '../../api/contract.js'

import Cookies from 'js-cookie'
export default {
    props:{
        btnTitle: {
            type: [String],
            required: true,
            default: '选择文件'
      
        },
        data:{
            type:Object,
            required:false
        },
        btnType:{
            type:String,
             default: ''
        },
        fileType:{
            type: [Array]
        },
        type: {
          default:1
        },
        fileList:{
          type:Array,
          default:[]
        },
        batchNo:String,
        uploadUrl:String
    },
  components: {},
  computed:{
    uploadData(){
      let obj = {}
      obj.batchNo = this.batchNo;
      return obj;
    }
  },
  data() {
    return {
        // uploadData:{
          
        // },
        percentage : 100,
        // fileObject:{}
    }
  },
  created() {
       this.setAction();
      
  },

  methods: {
    setAction(){
      if(this.uploadUrl=='common'){
        this.action = uploadFile();
      }else{
        this.action = uploadFileContract();
      }
      
    },
    beforeUpload(file,sends){
      console.log(file,"file")
         let limit = 50*1024*1024//最大小不超过50M
         let limitTree = 30*1024*1024//最大小不超过30M
         const isLt2M = file.size / 1024 / 1024 < 10;
         this.fileList.forEach(item=>{
           limit-=item.size
         })
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1) //文件类型
        if (limit-file.size<0) {
          this.$message.error('上传文件总大小不能超过50MB!');
          return false;
        } else if (testmsg == "docx" || testmsg == "doc") { //限制word类型30M
          if (limitTree-file.size<0) { 
            this.$message.error('上传word文件总大小不能超过30M!');
            return false;
          }
        }
           if(this.fileType){
                if (this.fileType.indexOf(testmsg)==-1) {
                    this.$message.error('格式文件上传错误!');
                    return false;
                }
                this.$emit("beforeUpload",file)
           }else{
               this.$emit("beforeUpload",file)
           }
          
      },
      //  beforeUpload(file){
      //      if(this.fileType){
      //          let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      //           // const isLt2M = file.size / 1024 / 1024 < 10;
      //           if (this.fileType.indexOf(testmsg)==-1) {
      //               this.$message.error('格式文件上传错误!');
      //               return false;
      //           }

      //           this.$emit("beforeUpload",file)
      //      }else{
      //          this.$emit("beforeUpload",file)
      //      }
      //     this.fileObject = file;
      // },
      successAuth(res, file){
          console.log(res,res.code,"zheshi")
          if(res.code==200){
        
            this.$emit("successAuth",res, file)
          }else if(res.code==401){
            Cookies.set('point', 401)
            this.$store.dispatch('LogOut',true) 
          }else{
            
            this.$emit("errorAuth",file)
            this.$message.error(file.name+ " 上传失败")
            
          }
      },
      errorAuth(err,file,fileList){
        console.log(err,file)
        this.$message.error(file.name+ " 上传失败")
        this.$emit("errorAuth",file,err)
        //   console.log(res,file)
      },
      progressAuth(res, file){
        console.log(res, file,"11")
      },
      getProgressRate(file, fileList) {
        const that = this
        // if (this.percentage >= 100) {
        //   return
        // }
        // 查询进度条
        console.log(file,"filegetProgressRate")
        // if (file.status === 'ready') {
        //   // timer = window.setInterval(function () {
        //     uploadStatus({}).then(({data}) => {
        //       console.log(data)
        //       // if (response >= 100) {
        //       //   that.percentage = 100
        //       //   that.clearIntervalA()
        //       // }else{

        //       // }
        //       // that.percentage = response
        //     })
        //   // }, 500)
        // }
      },
 
      // errorAuth(){
      //   this.$message.error("上传失败")
      //   this.$emit("errorAuth",file)
    
      // }
  }
}

</script>
<style  >
.upload-box {
  font-size: 14px;
  color: #1257FF;
  margin-top: 30px;
}

.upload-box2 {
  font-size: 14px;
  color: #1257FF;
  width: 100%;
  height: 100%;
  line-height: 30px;
}
</style>