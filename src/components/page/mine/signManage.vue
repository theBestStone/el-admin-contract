<!-- 我的 -->
<template>
  <div>
      <el-card class="margin-sm">
        <div slot="header" class="clearsquer">
            <span>签名</span>
        </div>
        <div>
           <div class="avatar-uploader">
             <div v-if="signLists.length>0" class="el-upload margin-left margin-bottom shadow -black text-center"  v-for="item in signLists">
               <a  style="position:relative;display:inline-block" @mouseover="item.hoverTag=true" @mouseleave="item.hoverTag=false">
                 <a v-if="item.defaultFlag==1" style="position:absolute;right:0;top:2px;padding:4px;border-radius:5px;" class="bg-blue text-white">默认签名</a>
                <el-image @click="setLog(item,1)"  :src="item.fileImg" class="avatar" fit="contain"></el-image>
                  <a class="cf " v-if="item.hoverTag" style="position:absolute;bottom:-8px;left:0;width:100%;background-color:rgba(0,0,0,0.1);border-radius:5px;">
                    <el-button @click="setDefulte(item)" type="text" class="text-blue" style="width:45%">设为默认</el-button>
                    <el-button @click="signDel(item)" type="text" class="text-red" style="color:#e54d42 !important;width:45%">删除</el-button>
                  </a>
               </a>
             
              </div>
              <div class="el-upload margin-left margin-bottom text-blue shadow -black" @click="getQr(false)">
                <i class="avatar-uploader-icon"></i><i class="el-icon-plus"></i>添加签名
              </div>
           </div>
            

        </div>
      </el-card>
      <el-card class="margin-sm">
          <div slot="header" class="clearsquer">
            <span>授权企业印章</span>
        </div>
        <div class="cf">
            <div class="text-center padding"  v-if="entSealLists.length==0">
                <el-image
                        style="width:80px;height:76px"
                            :src="require('../../../assets/img/noneSign.png')"
                            fit="contain"></el-image>
              <p class="text-bold">{{dentify.orgId=="0"?'切换企业查看印章':'请联系管理员给您分配印章'}} </p>
            </div>
            <div v-if="entSealLists.length>0">

                <div class="signature-box fl margin-left" @click="setLog(item),2" v-for="item in entSealLists">
                    <div class="text-center padding-sm">
                        <el-image
                        style="height:160px;"
                            :src="item.fileImg"
                            fit="contain"></el-image>
                    </div>
                    <div class=" margin-left">
                        <p><span class="text-gray">公司：</span> {{item.entName}}</p>
                        <p class="margin-top-sm"><span class="text-gray">使用期限：</span>{{item.period}}</p>
                    </div>
                </div>
            </div>
                
                   

        </div>
      </el-card>
      <el-card class="margin-sm">
          <div slot="header" class="clearsquer">
            <span>使用记录</span><span class="text-gray margin-left text-sm">点击 印章/签字 查看</span>
        </div>
        
            <el-table class="margin-top-sm" ref="table" v-loading="loading" :data="list" style="width: 100%;" >
           
              <el-table-column :show-overflow-tooltip="true" width="400" prop="updateTime" label="签署时间" />
              <el-table-column :show-overflow-tooltip="true" prop="fileName" label="签署文件" />
              
              <el-table-column
                label="操作"
                width="300px"
                align="center"
              >
                <template slot-scope="scope">
                 
                  <el-button  type="primary" size="mini" @click="viewpdf(scope.row)">阅览</el-button>
                </template>
              </el-table-column>
          </el-table>
          <el-pagination
              :current-page.sync="logModel.pageNum"
              background
              layout="total,prev, pager, next,jumper"
              :total="pageTotal"
              :page-size="logModel.pageSize"
              @current-change="getLog"
          >
          </el-pagination>
      </el-card>
      <el-dialog title="添加签字" :visible.sync="visible" v-dialogDrag width="500px" :before-close="handleClose">
            <div class="text-center ">
                <span class="shadow -black" style="display:inline-block;padding:10px;"> 

                  <el-image style="width:200px;height:200px" class="" v-if="imageUrl" :src="qrimg" fit="contain"></el-image>
                </span>
                <p class="margin-top text-gray"><i class="el-icon-warning-outline text-red"></i>请使用手机微信或浏览器扫描二维码签名</p>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="doAddSign">提交</el-button>
                 <el-button type="primary" plain @click="getQr(1)">重新获取二维码</el-button>
            </div>
        </el-dialog>
        <el-dialog title="阅览" :visible.sync="visible2" top="2%" @close="initPDFTag"  width="80%" >
          <div style="width:100%;height:80vh;overflow:hidden" ref="bbox">
          
            <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
            <pdf-container
                ref="pdfContainer" 
                :pdfConfig="{ type: 1}"
                :conWidth="conWidth" :conHeight="conHeight"
                :rects="rects"
                :imgUrlInfo="imgUrlInfo"
                @initPdf="initPdf2"
              
            >    
            </pdf-container>
          </div>
        </el-dialog>
  </div>
</template>

<script>
import { createQrCode, addSign,deleteSign,signList,setDefault,qrSealSave,getQrCodeRes,mySealList,findSignLogById } from '../../../api/signManage.js';
  import {uploadBase64,preview} from '../../../api/index.js';
 import {getDentify} from '@/utils/auth';
let timers = null;
//  import pdf from 'pdfjs-dist';
// import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import PdfView from '../../common/pdfView';
import pdfContainer from '../../common/pdfContainer';
import {downloadFile} from '../../../api';
export default {
  components: {pdfContainer},
  data() {
    return {
        value1:false,
        hoverTag:false,
        dentify:{},
        imageUrl: require('../../../assets/img/sign.png'),
        loading:false,
        qrimg:"",
        skey:"",
        skey2:"",
        signimg:"",
        signLists:[],
        entSealLists:[],
         pageTotal: 0,
        logModel:{
          sealId: '',
          pageNum: 1,
          pageSize: 10
        },
        list:[ ],
        pdfNumTotal: 0,
        scale: 1,
        pdfUrl: '',
        visible:false,
        visible2:false,
        pdfShowTag:false,
        conWidth:0,
        conHeight:0,
    }
  },
  created() {
     this.dentify = getDentify();
    this.init();
  },

  methods: {
      init(){
        this.signList();
        this.mySealList();
      },
      handleClose(){
        
        if(timers){
          window.clearInterval(timers);
          timers = null;
        }
        this.visible = false;
      },
      async signDel(item){
        this.$confirm('确认删除签字?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await deleteSign({id:item.id})
          this.signList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
                   
        });
        
      },
      async setDefulte(item){
          await setDefault({id:item.id})
           this.signList();
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
      },
      async signList(){
        let {data} = await signList({});
        data.forEach(item=>{
          item.fileImg ='data:image/png;base64,'+item.waterImg//preview(item.fileId);
          item.hoverTag = false;
        })
     
        this.signLists = data;

      },
      async mySealList(){
        let {data} = await mySealList({});
        data.forEach(item=>{
          item.fileImg ='data:image/png;base64,'+item.waterImg// preview(item.fileId);
          item.hoverTag = false;
        })
        this.entSealLists = data;
      },
      async getQr(tag){
       
        if(!tag){
           this.visible = true;
        }
        let {data} = await createQrCode({});
        this.qrimg ="data:image/png;base64," + data.qrCode;
        
        this.skey = data.skey;
        if(timers){
          window.clearInterval(timers);
          timers = null;
        }else{
          timers = window.setInterval(this.getQrCodeRes,2000)
        }
      },
      async getQrCodeRes(){
        
        let {data} =await getQrCodeRes({skey:this.skey});
        if(data.base64!=0){
          this.qrimg ="data:image/png;base64," + data.base64;

          this.signimg =   data.base64;
          this.skey2 = data.skey
          window.clearInterval(timers);
          timers = null;
        }
      },
      async doAddSign(){
        if(!this.signimg){
          this.$message.error("请添加个人签字")
          return false;
        }
        let res= await uploadBase64({
          base64:this.signimg,
          fileName:"sign.png",
          channelNo:"anysign",
          storeType:"1",
          businessType:3
        });
        let {data} = await addSign({
          fileId:res.data.id
        })
        this.$message.success("添加成功");
        this.visible = false;
        this.signList();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      setLog(item,type){
        if(type==1){
          this.logModel.sealId = item.id;
        }else{
          this.logModel.sealId = item.sealId;
        }
        
        this.getLog(1);
      },
      async getLog(value){
         value ? (this.logModel.pageNum = value) : (this.logModel.pageNum = 1);
        let {data}  = await findSignLogById(this.logModel);
        data.list.forEach(item=>{
          item.url = downloadFile(item.fileId)
        })
        this.list = data.list
        this.pageTotal = data.total

      },
      viewpdf(row){
        this.visible2 = true;
        this.pdfUrl = row.url;
        this.$nextTick(()=>{
          this.conWidth = this.$refs.bbox.offsetWidth
          this.conHeight = this.$refs.bbox.offsetHeight
       
          this.initPDF(row.url)
        })
      },
        initPDF(url) {
            let _this = this;
            this.pdfNumTotal = 0;
            this.$refs.pdfContainer.pdfInit(this.pdfUrl)
            // if(!url){
            //   url = this.pdfUrl;
            // }
            //查询pdf页码
            // pdf.getDocument(_this.pdfUrl).then(function(pdfDoc_) {
            //     _this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
            //      _this.$nextTick(()=>{
                    
            //          _this.$refs.pdfViewref.forEach(item => {
            //              // item.init(_this.pdfUrl);
            //              item.setPdfDoc(pdfDoc_)
                        
            //          });
                     
            //      })
            // });
        },
        initPdf2(){
            this.pdfShowTag = true;
        }
  }
}

</script>
<style lang="less">
 .avatar-uploader .el-upload {
    // border: 1px solid #d9d9d9;
    border-radius: 16px;
    width:188px;
    height:188px;
    
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload{
    img{
      width:80%;
    }
  }
  // .avatar-uploader .el-upload:hover {
  //   border-color: #409EFF;
  // }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .signature-box{
    width:276px;
    height:245px;
    border-radius: 8px;
    cursor: pointer;
    border:1px solid #f3f3f3;
    img{
      width:147px;
    }
  }
</style>