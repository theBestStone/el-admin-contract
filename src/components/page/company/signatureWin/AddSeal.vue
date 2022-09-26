<!-- 裁剪图片 -->
<template>
  <!-- <el-dialog center :close-on-click-modal="false" :visible.sync="dialogVisible" width="980px" :before-close="handleClose"> -->
    <div class="tailoringWrapper" style="margin:0 auto;width: 88%;">
      <el-row :gutter="14">
        <el-col :span="16">
          <!-- <h3>{{type==0?'印章上传':"编辑印章"}}</h3> -->
          <div class="content1">
            <div class="mt10" v-if="!isuploaded">
              <el-upload class="upload-demo" ref="upload" action="" drag :on-change="handlePreview" :show-file-list="false" :file-list="fileList" :auto-upload="false">
                <!-- <el-button size="small" slot="trigger" type="primary">选择本地印章图片</el-button> -->
                <i class="el-icon-upload2"></i>
                <div class="el-upload__text"><em>点击</em>或将图片拖拽到这里上传</div>
              <div  style="margin-top:8px; font-size: 12px; color: #AEAEAE;">支持jpg、png格式的清晰印章图片，大小不超过5M</div>
                
              </el-upload>
            </div>
            <div class="show-info"  v-if="isuploaded">
              <p>请沿印章边缘裁剪，以确保电子印章和实际印章签署后的大小一致</p>
              <div class="test">
                <vueCropper ref="cropper" :img="example2.img" :outputSize="example2.size" :outputType="example2.outputType" :info="example2.info" :canScale="example2.canScale" :autoCrop="example2.autoCrop" :autoCropWidth="example2.autoCropWidth" :autoCropHeight="example2.autoCropHeight" :fixed="example2.fixed" :infoTrue="example2.infoTrue" @realTime="realTime" :fixedNumber="example2.fixedNumber" :enlarge="1"></vueCropper>
              </div>
              <div class="margin-top">
                <span>设置印章规格</span>
              </div>
              <div class="margin-top">
                <el-radio v-model="sealRadio" label="1">默认印章尺寸</el-radio>
                <el-input  value="42*42mm"  :disabled="true" style="width: 120px;"></el-input>
              </div>
              <div class="margin-top">
                <el-radio v-model="sealRadio" label="2">自定义印章尺寸</el-radio>
                长<el-input v-model="sealSize.width" style="width: 50px;"></el-input>
                *宽<el-input v-model="sealSize.height" style="width: 50px;"></el-input>mm
                <el-tooltip class="item" effect="dark" content="非标准比例可能会导致印章变形，请谨慎设置" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
        <div v-if="isuploaded">
          <h3>高清预览</h3>
          <el-button size="small" type="primary" style="margin-left:10px;" :disabled="!(steps >= 1)" @click="preview()">查看预览</el-button>
          <div class="previewWrapper">
            <div :class="{ watermark: steps > 1 }"></div>
            <img ref="previewImg" />
          </div>
          <div class="mt10">
            <div class="upload-tip" style="margin-bottom:6px;margin-top:0px;">选择以下背景色查看预览效果</div>
            <ul class="colorpicker" @click="colorpickerActive" ref="colorpickerRef">
              <li class="white-bg el-icon-check active"></li>
              <li class="green-bg el-icon-check"></li>
              <li class="lightgreen-bg el-icon-check"></li>
              <li class="lime-bg el-icon-check"></li>
              <li class="yellow-bg el-icon-check"></li>
              <li class="orange-bg el-icon-check"></li>
              <li class="deeporange-bg el-icon-check"></li>
              <li class="red-bg el-icon-check"></li>
              <li class="pink-bg el-icon-check"></li>
              <li class="purple-bg el-icon-check"></li>
              <li class="deeppurple-bg el-icon-check"></li>
              <li class="blue-bg el-icon-check"></li>
              <!-- <li class="lightblue-bg"></li> -->
            </ul>
          </div>
        </div>
          
        </el-col>
      </el-row>
      <!-- <el-form :inline="true" :model="formInline" ref="formInline" label-width="200px" class="demo-form-inline">
      
        <el-form-item label="印章名称" prop="sealName" verify>
          <el-input v-model="formInline.sealName" placeholder="请输入印章名称"></el-input>
        </el-form-item>
       
       
     
  
      </el-form>
      <el-form>
        <el-form-item label-width="0px">
          <div style="text-align: center;">
            <el-button size="small" @click="handleClose">取消</el-button>
            <el-button size="small" type="primary" :disabled="steps != 2" @click="submitForm('formInline')">{{ type == 0 ? '提交' : '保存' }}</el-button>
          </div>
        </el-form-item>
      </el-form> -->
    </div>
  <!-- </el-dialog> -->
</template>

<script>
import { mapActions } from 'vuex'
// import { VueCropper } from 'vue-cropper'
import { VueCropper } from 'vue-cropper'
// import { getTargetObject, parentDeal } from '@/utils/common.js'
// import RelatedChannelDialog from '@/components/RelatedChannelDialog.vue'
  import {uploadBase64,preview} from '../../../../api/index.js';
  
 import {cutoutSignBase64,addSeal,editSeal} from '../../../../api/signatureManage.js';
// import img from '@/assets/images/preview.jpg'
export default {
  // name:'CompanySealDialog',
  components: {
    VueCropper,
    // RelatedChannelDialog
  },
  props: {
    
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: false,
      type:"",
      modelSrc: '',
      getDentify:{},
      crap: false,
      previews: {},
      previewStyle1: {},
      fileList: [],
      form: {
        head: ''
      },
      fixednum: [],
      example2: {
        //img的路径自行修改
        img: require('../../../../assets/img/preview.jpg'),
        info: true,
        size: 0.8,
        outputType: 'png',
        canScale: true, //是否可以滚轮
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效true
        autoCropWidth: 160,
        autoCropHeight: 160,
        fixed: true, //是否开启比例
        isShowCropper: true,
        // 真实的输出宽高
        infoTrue: true,
        fixedNumber: [4, 4]
        // maxImgSize: 32 // 图片最大像素
      },
      downImg: '#',
      dialogVisible: true,
      formInline: {
         
        sealName: '',
        eid:"",
        fileId:""
      },
      optionData: [],
      optionDataCopy: [],
      optionData1: [],
      history: {
        departNumber: '',
        sealName: '',
        userAccount: '',
        userName: '',
        idCardNumber: '',
        userEmail: '',
        userPhone: '',
        typeCode: '2',
        sealId: '',
        sealWidth: '',
        sealHeight: '',
        dataBase: '',
        sealFilepath: '',
        channelList: ''
      },
      props: {
        lazy: false,
        checkStrictly: true,
        value: 'enterpriseCode',
        label: 'enterpriseName',
        children: 'children'
      },
      checkChanneData: [],
      steps: 0,
      isuploaded:false,
      sealRadio:'1',
      sealSize:{
        width:0,
        height:0
      }
    }
  },
  watch: {
    checkChanneData(val) {
      if (val.length > 0) {
        this.formInline.channelList = val.map(item => ({ channelNo: item.channelNo, channelName: item.channelName, approvalNo: item.approvalNo }))
        this.formInline.channelNo = val.map(item => item.channelId)
      }
    }
  },
  async created() {
    // 获取企业数据
   
    if (this.type === 2) {
      // const data = await this.getSealData({ sealId: this.id })
      this.formInline = Object.assign(this.formInline, data)
      this.formInline.channelList = [{ channelNo: this.formInline.channelNo, channelName: this.formInline.channelName, approvalNo: this.formInline.approvalNo }]
      delete this.formInline.channelName
      delete this.formInline.approvalNo
      this.departChange(new Array(this.formInline.departNumber), true)
      this.example2.autoCropWidth = Number(this.formInline.sealWidth)
      this.example2.autoCropHeight = Number(this.formInline.sealHeight)
      this.example2.img = window.URL.createObjectURL(this.toBlob('data:image/png;base64,' + this.formInline.dataBase))
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.cropper.refresh()
        })
      }, 500)
    }
  },
  methods: {
    // ...mapActions([ 'addSeal', 'getSealData', 'updateSeal', 'previewImg', 'findbyChannelData']),
    init(type,getDentify) {
      console.log(type,"type")
     
      this.type = type;
      this.getDentify = getDentify
     
      if(type==0){

        this.formInline.eid = getDentify.orgId;
        this.example2.img = '../../../../assets/img/preview.jpg'
      }else{
         this.formInline.id = getDentify.id;
         this.formInline.sealName = getDentify.sealName
         getDentify.sealFile = preview(getDentify.fileId)
         this.example2.img = getDentify.sealFile;
         this.$refs.previewImg.src =getDentify.imgseal// preview(getDentify.fileId)
         this.formInline.fileId = getDentify.fileId
          this.steps = 2
         
      }
      // if (type == 'signImg') {
      //   this.example2.fixedNumber = [4, 4]
      //   this.example2.fixed = true
      // } else {
      //   this.example2.fixedNumber = [4, 3]
      //   this.example2.fixed = false
      // }
      console.log(getDentify)
      
    },
    
    handleClose() {
      this.dialogVisible = false
      this.$emit('closeDialog')
    },
    handlePreview(file) {
      // const isLt5M = file.size / 1024 < 500
      // if (!isLt5M) {
      //   this.$message.error('上传文件大小不能超过 500KB!')
      //   return false
      // }
      this.uploadImg(file.raw, 2)
      this.steps++
    },
    //点击裁剪，这一步是可以拿到处理后的地址
    finish2(back) {
      return new Promise((resolve, reject) => {
        var img = null
        this.$refs.cropper.getCropBlob(data => {
          img = window.URL.createObjectURL(data)

          this.$refs.cropper.getCropData(data => {
            this.modelSrc = data
            // this.model = false;
            //裁剪后的图片显示
            // this.example2.img = this.modelSrc;
            // this.toBlob(data)
            // console.log(data)
            // console.log(this.toBlob(data))

            //阿里云处理图片，项目的接口，这里可以不用，上面的地址打印即为base64的地址
            resolve(data)
            reject(data)
            back(img, data)
          })
        })
      })
    },
    realTime(data) {
      // this.finish2(img => {
      //   this.$refs.previewImg.src = img
      // })
      this.previews = data
      this.formInline.autoCropWidth = data.w
      this.formInline.autoCropHeight = data.h
    },
    uploadImg(e, num) {
      console.log(num)
      //上传图片
      this.example2.img = ''
      var file = e //e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.name)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.example2.img = window.URL.createObjectURL(file) // reader.result
        this.isuploaded = true
      }

      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blobcs
      // reader.readAsArrayBuffer(file)
    },
    // base64转blob
    toBlob(ndata) {
      //ndata为base64格式地址

      let arr = ndata.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    autoCropWidth() {
      if (this.formInline.autoCropWidth > this.$refs.cropper.$el.offsetWidth) this.formInline.autoCropWidth = this.$refs.cropper.$el.offsetWidth
      this.example2.autoCropWidth = this.formInline.autoCropWidth
      if (this.formInline.autoCropWidth > this.formInline.autoCropHeight) {
        this.formInline.autoCropWidth = this.formInline.autoCropHeight
      }
    },
    autoCropHeight() {
      if (this.formInline.autoCropHeight > this.$refs.cropper.$el.offsetHeight) this.formInline.autoCropHeight = this.$refs.cropper.$el.offsetHeight
      this.example2.autoCropHeight = this.formInline.autoCropHeight
    },
    colorpickerActive(e) {
      if (e.target.nodeName !== 'LI') return
      for(let i=0;i<this.$refs.colorpickerRef.children.length;i++ ){
        let element = this.$refs.colorpickerRef.children[i]
        element.className = element.className.split(' ')[0] + ' el-icon-check'

      }
      
      document.querySelector('.previewWrapper').className = document.querySelector('.previewWrapper').className.split(' ')[0] + ' ' + e.target.className.split(' ')[0]
      e.target.className = e.target.className + ' active'
    },
    getimg(){
      console.log(this.formInline.dataBase)
      if(this.sealRadio == 1){
        this.sealSize.width = 42
        this.sealSize.height = 42
      }
      this.$emit('transImg',this.formInline.dataBase,this.sealSize)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
       
          if(!this.formInline.fileId){
            if (!this.formInline.dataBase) return this.$message.error('请点击【上传预览】完成印章上传！')
            let {data} = await uploadBase64({
              base64:this.formInline.dataBase,
              fileName:this.formInline.sealName+".png",
              channelNo:"anysign",
              storeType:"1"
            });
            
            this.formInline.fileId = data.id;
          }
       
          if (this.type == 0) {
            
            await addSeal(this.formInline)
          } else {
            await editSeal(this.formInline)
          }
          this.$message.success('提交成功！')
          this.dialogVisible = false
          this.$emit('closeDialog')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async preview() {
      let dataBase = await this.finish2(() => {})
      if (!dataBase) return this.$message.error('请选择本地印章图片！')
      dataBase = dataBase.split(';base64,')[1]
     
      const {data} = await cutoutSignBase64({ img: dataBase })
      
      this.$refs.previewImg.src = 'data:image/png;base64,' + data.waterImg
      this.formInline.dataBase = data.realImg
      // console.log(data.realImg)
      this.formInline.fileId = ""
      this.steps = 2
    },
    async departChange(data, status) {
      this.$refs.elcascader.dropDownVisible = false
      !status && (this.formInline.channelNo = '')
      this.optionData1 = []
      this.checkChanneData = []
      // let enterpriseName = this.optionDataCopy.find(item => item.enterpriseCode === data[data.length - 1])?.enterpriseName
      // const res = await this.findbyChannelData({ departNumber: data[data.length - 1] })
      this.optionData1 = res || []
    },
    relatedChannelCloseDialog(data) {
      if (!data) return
      this.checkChanneData = data
    },
    delChannel() {
      if (this.formInline.channelList.length == 0) {
        this.formInline.channelNo = ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.content1 {
  overflow: hidden;
  /* margin: auto; */
  /* max-width: 585px; */
  /* margin-bottom: 100px; */
}

.colorBtns{
    width: 25px;
    height: 25px;
    padding:0;
    margin-right:10px;
}
.show-info {
  margin-bottom: 20px;
}

.show-info h2 {
  line-height: 50px;
}

.test {
  height: 320px;
}
.tailoringWrapper h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}
.tailoringWrapper .previewWrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border: 1px solid #cccccc;
  overflow: hidden;
}
.watermark {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: url('../../assets/images/watermark.png'); */
  background-size: 80px;
}
.tailoringWrapper .previewWrapper img {
  width: 100%;
}
.tailoringWrapper .demo-form-inline.el-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tailoringWrapper .demo-form-inline.el-form .el-form-item {
  display: flex;
  width: 48%;
  margin-right: 0;
}
.tailoringWrapper .demo-form-inline.el-form .el-form-item:nth-child(even) {
  display: flex;
  justify-content: flex-end;
}
.tailoringWrapper .demo-form-inline.el-form .el-form-item:last-child {
  width: 100%;
  justify-content: flex-start;
}
.tailoringWrapper .demo-form-inline.el-form .el-form-item:last-child /deep/ textarea {
  width: 520px;
}
.tailoringWrapper .demo-form-inline.el-form .el-form-item /deep/ .el-form-item__content {
  width: 312px;
}
.tailoringWrapper .demo-form-inline.el-form .el-form-item /deep/ .el-form-item__content .el-select {
  width: 100%;
}
.upload-tip {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: #aaaaaa;
}
.colorpicker .white-bg {
  background-color: #ffffff;
  border: 1px dotted #eee;
  box-sizing: border-box;
}
.green-bg {
  background-color: #0da58e;
}
.lightgreen-bg {
  background-color: #8cc152;
}
.lime-bg {
  background-color: #cdda49;
}
.yellow-bg {
  background-color: #fdc02f;
}
.orange-bg {
  background-color: #fd9727;
}
.deeporange-bg {
  background-color: #fc5830;
}
.red-bg {
  background-color: #e2202c;
}
.pink-bg {
  background-color: #e62565;
}
.purple-bg {
  background-color: #9b2fae;
}
.deeppurple-bg {
  background-color: #673fb4;
}
.blue-bg {
  background-color: #4054b2;
}
.lightblue-bg {
  background-color: #587bf8;
}
.colorpicker {
  font-size: 0;
  padding: 0;
}
.colorpicker li {
  display: inline-block;
  width: 8.33333333%;
  height: 30px;
  position: relative;
  color: #fff;
  cursor: pointer;
}
.colorpicker li span {
  width: 100%;
  height: 50px;
  text-align: center;
  padding-top: 11px;
  pointer-events: none;
}
.colorpicker li span::after {
  opacity: 0;
}
.colorpicker li.selected span::after {
  opacity: 1;
}
.colorpicker li:hover span::after {
  opacity: 0.5;
}
.colorpicker li {
  position: relative;
  overflow: hidden;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 20px;
  line-height: 1;
  font-family: FontAwesome;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.colorpicker li::before {
  transition: left 0.5s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.2s 1s;
  content: '';
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  left: 120%;
  top: 0;
  opacity: 0;
  line-height: 30px;
  content: '\e6da';
}
.colorpicker li.active::before {
  left: 0;
  opacity: 1;
  transition: left 0.5s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.2s;
}
.colorpicker li.active ~ li::before {
  left: -90%;
}
.tagItem {
  margin-right: 20px;
}
.upload-demo /deep/ .el-upload-dragger{
  background: rgb(243,246,255);
}
.upload-demo{
  i{
    font-size: 25px;
    margin-top: 60px;
    margin-bottom: 10px;
    color: #1257FF;
  }
}
</style>
