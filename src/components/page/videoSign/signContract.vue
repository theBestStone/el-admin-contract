<!--  -->
<template>
    <div class="tempbox" style="height:100%;overflow:hidden;" ref="tempbox">
        <div class=" bg-white padding-sm tempbox" style="height:100%">
            <div class="cf padding-sm" style="border-bottom:1px solid #ccc;">
                <div class="fr ">
                    <el-button @click="back" >返回</el-button>
                    <el-button @click="back" v-if="tempInfo.status==10&&checkPer(['admin','permission:downFile'])">下载</el-button>
               
                      <el-button @click="tempAdd" type="primary" v-if="type==1">签署</el-button>
                </div>
            </div>
            <div class=" flex h100 ">
                <div class="rightbox h100" style="overflow-y:scroll;position: relative;left: 11px;">
                    <div class="teptitle margin-sm">文件列表</div>
                    <ul class="tempList">
                        <li :title="item.fileName" v-for="(item, index) in fileList" @click="selectFile(item,index)" :class="{ active: activeIndex == item.id }">
                            <i class="el-icon-document"></i>{{ item.fileName }}
                        </li>
                    </ul>
                    <div v-if="activeCom.method==0||activeCom.method==2" class="teptitle margin-sm"><span class="text-blue">签名</span> </div>
                    <ul class="companyList text-center margin-tb" v-if="activeCom.method==0||activeCom.method==2">
                         <el-image v-if="signObj" @click="beforSetReacts(1,signObj)" style="height:60px;width:112px;cursor:pointer;margin-top:10px"  :src="signObj.fileImg2" ref="sign2img" class="avatar" fit="contain"><div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div></el-image>
                      
                         <el-button @click="toSign" type="primary" v-if="!signObj">添加签字</el-button>
                        
                    </ul>
                    <div v-if="activeCom.method==1||activeCom.method==2" class="teptitle margin-sm" ref="ddd" >印章</div>
                    <div style="padding-bottom:40px;" v-if="activeCom.method==1||activeCom.method==2">
                         <div class="text-center margin-tb" v-for="item in signatureList">
                             <div style="position:relative">
                               
                                 
                                 <el-image @click="beforSetReacts(2,item)"  style="width:50%;cursor:pointer"  :src="item.fileImgWater" class="avatar" fit="contain"></el-image>
                                
                             </div>
                             <p>
                                <span class="margin-top-sm text-bold">{{item.sealName}}</span>
                             </p>
                             
                             <p v-if="item.status!=1">
                                  <el-button size="mini" v-if="!item.status&&item.status!=0" type="primary" @click="getAuthSign(item)">获取授权</el-button>
                                 <el-button size="mini" v-if="item.status==0" >审核中</el-button>
                                 <el-button size="mini" v-if="item.status==2" type="primary">重新获取授权</el-button>
                                 <el-button size="mini" v-if="item.status==2" type="primary">查看驳回原因</el-button>
                             </p>
                         </div>
                    </div>
                    <!-- <el-row :gutter="10">
                <el-col :span="8">
                    <div class="obj-li">签名</div>
                </el-col>
            </el-row> -->
                </div>
                <div class="flex-sub h100 center-box padding-top">
                    <div class="pdfbox2" ref="pdfbox">
                        <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
                         <pdf-container
                            ref="pdfContainer" 
                             :pdfConfig="{ type: 1,sizeType:type }"
                            :conWidth="containerWidth" :conHeight="containerHeight"
                            :rects="rects"
                            :imgUrlInfo="imgUrlInfo"
                            @initPdf="initPdf"
                            @finishPdf="finishPdf"
                        >    
                        </pdf-container>
                    </div>
                </div>
                <div class="leftbox">
                    <pdf-container
                            ref="pdf" 
                            :conWidth="150" :conHeight="containerHeight"
                            :brotherIndex="brotherIndex"
                            :imgUrlInfo="imgUrlInfo2"
                            :pdfConfig="{ type: 'none',sizeType:type }"
                            @broindex="broindex"
                        >    
                        </pdf-container>
                    <!-- <div
                        v-for="(item, index) in pdfNumTotal"
                        ref="pdfNumTotal"
                        class="pdfNumTotal"
                        @click="jump(index)"
                        :class="{ activepage: nowindex == index }"
                    >
                        <pdf-view :pdfConfig="{ pdfUrl: pdfUrl, scale: 0.2, pageNum: item }" ref="pdf"></pdf-view>
                    </div> -->
                </div>
            </div>
        </div>
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext" :verifyTag='false'></auth-code>
       
        <el-dialog title="输入密码" :modal-append-to-body='false' :visible.sync="visiblePass" v-dialogDrag width="500px">
             <six-pass ref="six"></six-pass>
             <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visiblePass = false">取 消</el-button>
              
                <el-button type="primary" @click="getSix()">签署</el-button>
            </div>
        </el-dialog>
        <el-dialog title="拒签" :visible.sync="visibleRefuse" v-dialogDrag width="500px">
            <div>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入拒签原因"
                    v-model="applyModel.refuseReason">
                    </el-input>
            </div>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleRefuse = false">取 消</el-button>
              
                <el-button type="primary" @click="doRefuse(10)">拒签</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import pdf from 'pdfjs-dist';
// import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import PdfView from '../../common/pdfView';
import pdfContainer from '../../common/pdfContainer';
import AuthCode from '../../common/authCode';
import SixPass from '../../common/sixPass';
 import {uploadBase64,preview} from '../../../api/index.js';
import { saveDraftContract,saveContract,myPlayer,sign,findTime,refuseSign} from '../../../api/contract.js';
import {findVideoContractFileList,signContract} from '../../../api/video.js';

import {downloadFile,downloadFile2} from '../../../api';
import { findDefault} from '../../../api/signManage.js';
import { signSealList,applySeal} from '../../../api/signatureManage.js';
import {getDentify} from '@/utils/auth';
import {ChapterTypes,SignInitialize,SealInitialize,TimeInitialize}  from '../contract/signUtile.js'
 
let loading = null;
export default {
    components: {
        pdfContainer,AuthCode,SixPass
    },

    data() {
        return {
            containerHeight:0,
            containerWidth:0,
            contId:"",
            type:"",
            tempInfo:{},
            dentify:{},
            rects: [],
            rectsObj: {},
            signArea:[],
            fileList: [
                // { fileName: '333.jpeg', url: 'http://esign.agilestar.cn:9080/contract/downloadTest/333.pdf', id: 1 },
                // { name: '444.jpeg', url: 'http://esign.agilestar.cn:9080/contract/downloadTest/444.pdf', id: 2 }
            ],
            fileList2:[],
            activeIndex: 1,
            fileIndex:0,
            activeFileObj:{},
            canStyle: {},
            applyModel:{
                refuseReason:"",
                id:""
            },
            visibleCode:false,
            visibleRefuse:false,
            visiblePass:false,
             realPhone: '',
             userInfo:{},
            model: {
                value1: '',
                value2: '',
                radio: 1,
                checkList: [],
                sendArr: [
                    // { name: '甲方', entName: '北京爱知之星', mobile: '183466455555', checkList: [1, 2] },
                    // { name: '甲方', entName: '北京爱知之星', mobile: '183466455555', checkList: [1, 2] }
                ]
            },
            comArr: [
                // { name: '甲方（企业）', id: 1 },
                // { name: 'er方（企业）', id: 2 },
                // { name: '刘指导', id: 3 }
            ],
            bgArr: ['bg-orange', 'bg-blue', 'bg-purple', 'bg-green', 'bg-yellow', 'bg-brown', 'bg-pink'],
            loading: false,
            selections: [],

            list: [
                {
                    fileName: 'lll.pdf',
                    fileStatus: 1
                }
            ],
            pdfNumTotal: 0,
            scale: 1.2,
            pdfUrl: '',
            pdfHeight: 0,
            scrolls: 0,
            nowindex: 0,
            activeCom:{
               
            },
            cid:1,
            signSetting:[],
            signObj:"",
            signatureList:[],
            comIndex: 0, //当前选中公司
            imgUrlInfo:[],
            imgUrlInfo2:[],
            pdfDoc_:null,
            pdfViewrefReady:false,//加载完成
            pdfShowTag:false,
            brotherIndex:1
        };
    },
    created() {
        // this.dentify = getDentify();
        // this.getId();
        //  if(!this.contId){
        //     this.$router.push({path:'/contract'});
        //     return false;
        // }
        // this.getType();
        // this.getById();
        // this.getinfo();
      
    },
    mounted() {
        this.containerHeight = this.$refs.pdfbox.offsetHeight;
        this.containerWidth = this.$refs.pdfbox.offsetWidth;
    },

    methods: {
        init(row){
            this.dentify = getDentify();
            // this.getId();
            // if(!this.contId){
            //     this.$emit("change","close2")
            //     return false;
            // }
            this.contId = row.roomId;
            this.type = row.type
            this.getById()
            this.getinfo();
            this.setHeight();
        },
        setHeight(){
            // tempbox
            let screenHeight = document.body.clientHeight;
            this.$refs.tempbox.style.height = screenHeight-30+'px'
        },
        back(){
           this.$emit("change","close2")
        },
        getId(tag) {
            
           
        },
        getType(){

          this.type = this.$route.query.tempType;//this.$store.getters.tempType;
          
        },
        async getSign(){
            let {data} =await findDefault({})
            if(data){
                data.fileImg2 = 'data:image/png;base64,'+data.waterImg//preview(data.fileId);
                data.fileImg = preview(data.fileId);
                this.signObj = data;
            }else{
                 this.signObj = null;
            }
            
           
        },
        async getSignature(){
            let {data} = await signSealList({eid:this.dentify.orgId})
            let arr = [];
            data.forEach(item=>{
                item.fileImg = preview(item.fileId);
                item.fileImgWater = "data:image/jpg;base64,"+item.waterImg//preview(item.fileId);
                if(item.status==1&&item.valid!=0){
                    arr.push(item)
                }
            })
            this.signatureList = arr;
           
        },
        async myPlayer(){
            
           
          

                this.activeCom = {
                    method:2
                };
            
        },
        async getById(){
          let {data} = await findVideoContractFileList({roomId:this.contId})
          let arr = [];
          let arr2 = [];
          
        //   this.tempInfo = JSON.parse(JSON.stringify(data));
          data.forEach(item=>{
            item.url = downloadFile2(item.fileId)
           
            arr.push(item)
            
            item.signSetting2 = [];
           

          })
        
          this.fileList = arr;
        //   this.fileList2 = arr2;
          if(!this.pdfUrl){
            this.pdfUrl = data[0].url;
            // this.activeCom =  data.players[0];
            this.activeIndex =  data[0].id
            this.fileIndex = 0;
            // this.rects =data.files[0].signSetting2//reacts
            this.activeFileObj = data[0]
          }
        
        //   if(this.type==1){
              this.getSign();
              this.getSignature();
        //   }
            this.myPlayer();
          this.initPDF();
           
        }, 
        getinfo(tag) {
            this.$store.dispatch('GetInfo', tag).then(res => {
                this.userInfo = res;
                this.realPhone = res.realPhone;
            });
        },   
        closepop(visible) {
            this[visible] = false;
        },
        async toNext(code,type) {
            let tipTile= this.getArea();
 
             
              if(tipTile.length>0){
                const h = this.$createElement;
                // let str = tipTile.join("，")
                this.$alert(h('div',null, tipTile), '', {
                  confirmButtonText: '确定' 
                });
                return false;
              }
           
            this.tempAdd(1,code,type);
        },
        getMsg(){
            if(this.userInfo.signPwdEnabled==1 ){
                this.visiblePass = true;
            }else{

                this.visibleCode = true;
            }
        },
        refuseSign(){
            this.visibleRefuse = true;
        },
        async doRefuse(){
            this.$confirm("确认拒绝签署？", '温馨提示', {
                confirmButtonText: '拒签',
                cancelButtonText: '取消'
            })
                .then(async () => {
                    this.applyModel.id = this.contId;
                    let {data} = refuseSign(this.applyModel)
                    
                    this.$message.success('拒签成功');
                    this.$router.push({path:'/contract'})
                })
                .catch(() => {});
            

        },
        async tempAdd(type,code,tag){
          
            let tipTile= this.getArea();
 
           
              if(tipTile.length>0){
                const h = this.$createElement;
                // let str = tipTile.join("，")
                this.$alert(h('div',null, tipTile), '', {
                  confirmButtonText: '确定' 
                });
                return false;
              }
            this.$confirm("确认签署文件？", '温馨提示', {
                confirmButtonText: '签署',
                cancelButtonText: '取消'
            })
            .then(async () => {
                let model = {};//this.tempInfo;
                model.roomId = this.contId;
                // let arrFile =this.fileList.concat(this.fileList2)
                model.signInfo =this.signArea;
                // if(this.userInfo.signPwdEnabled==0 ){

                //     model.verifyCode = code;
                // }else{
                //     model.signPassword = code;
                // }
                // model.version = this.tempInfo.version;
            
                // return false;
                let {data} = await signContract(model); 
                this.$message.success("签署成功")
                window.setTimeout(()=>{
                    this.$emit("change",'close2')
                },1000)
               
            })
            .catch(() => {});
            
           
       
      },
      toSign(){
            this.$router.push("/mine/signManage")
        },
      getSix(){
          let six = this.$refs.six.sendCode();
          if(!six){
              this.$message.info("输入密码")
              return false;
          }
          this.toNext(six,true)
          
      },
      getArea(){
        
        let tipTile = [];
        const h = this.$createElement;
        let obj = {};
        this.fileList.forEach(i=>{//组合数据前先存储当前页面数据
          if(i.id==this.activeIndex){
              let rectsArr = [];
              this.rects.forEach(i=>{
                  if(!i.hideTag){
                      rectsArr.push(i)
                  }
              })
            this.$set(i, 'signSetting2', JSON.parse(JSON.stringify(rectsArr)))
          }
        })
        let arrs = [];
        this.fileList.forEach(item=>{
            let actCom = JSON.parse(JSON.stringify(this.activeCom))
            actCom.acMethod = -1;
            actCom.fileName = item.fileName
            // obj[item.id+'-'+this.activeCom.code] = actCom
             
            if(!item.signSetting2||item.signSetting2.length==0){
              tipTile.push(h('p',null,"请添加文件"+item.fileName+"的签字或印章") )
            }else{
                
             let signSetting2 =JSON.parse(JSON.stringify(item.signSetting2))// JSON.parse(item.signSetting)
              let arr = [];
              signSetting2.forEach(i=>{
                  
                if(!i.hideTag){
                    
                    let strChap = "";
                    if(i.chapterType==1){
                        strChap = "sign"
                    }else if(i.chapterType==2){
                        strChap = "seal"
                    }else if(i.chapterType==6){
                        strChap = "time"
                    }
                    let signObj ={
                        fileId:i.fileId,
                        type:strChap,
                        x:i.x1,
                        y:i.y1,
                        sealId:i.sealId,
                        rotate:0,
                        signW:i.width,
                        signH:i.height,
                        page:i.page

                }
                  arrs.push(signObj)
                }
              })
            //   item.signSetting = JSON.stringify(arr)
            }
           
        })
        this.signArea = JSON.stringify(arrs);
      
        // for(let i in obj){
            
        //     let oooj = obj[i];
        //     let str  = '签字或印章'
            
        //     if(str){
        //       tipTile.push( h('p',null,"请添加文件"+oooj.fileName+"下的"+str+"区域") )
        //     }
        // }
      
        return tipTile
         
         
      },
        initPDF(url) {
            
            // if(!url){
            //   url = this.pdfUrl;
            // }
             console.log(this.pdfUrl,"this.pdfUrl")
            this.$refs.pdfContainer.pdfInit(this.pdfUrl)
            this.$refs.pdf.pdfInit(this.pdfUrl)
            //查询pdf页码
            // pdf.getDocument(_this.pdfUrl).then(function(pdfDoc_) {
            //     _this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
            //     _this.$nextTick(()=>{

            //          _this.$refs.pdfViewref.forEach(item => {
            //              // item.init(_this.pdfUrl);
            //              item.setPdfDoc(pdfDoc_)
                        
            //          });
            //          _this.$refs.pdf.forEach(item => {
            //              // item.init(_this.pdfUrl);
            //              item.setPdfDoc(pdfDoc_)
            //          });
            //      })
            // });
        },
        selectCom(item, index) {
            this.comIndex = index;
            this.activeCom = item;
        },
        selectFile(item, index) {
            
            if(item.id==this.activeIndex){
              return false;
            }
            this.imgUrlInfo = [];
            this.fileIndex = index;
            this.pdfUrl = item.url;
            let obj = {};
            this.fileList.forEach(i=>{
              if(i.id==this.activeIndex){
                let rectsArr = [];
                this.rects.forEach(i=>{
                    if(!i.hideTag){
                        rectsArr.push(i)
                    }
                })
                this.$set(i, 'signSetting2', JSON.parse(JSON.stringify(rectsArr)))
              }
              if(i.id==item.id){
                obj = i;
              }

            })
            this.activeIndex = item.id;
            this.activeFileObj = item;
            if (obj.signSetting2) {
                this.rects =[]; 
                this.$nextTick(()=>{
                    this.rects = obj.signSetting2
                })
                
            } else {
                this.rects = [];
            }
         
            this.nowindex = 0;

            this.$nextTick(() => {
                this.initPDF(item.url);
            });
            loading = this.$loading({
                lock: true,
                text: '切换中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                loading.close();
            }, 3000);
        },
        jump(page) {
            this.nowindex = page;
            let top = this.$refs.pdfViewref[page].$el.getBoundingClientRect().top + Number(this.scrolls);

            this.$refs.pdfbox.scrollTop = top -30;
        },
         async beforSetReacts(nul,item){
            let {y,page,x} = this.$refs.pdfContainer.witchPage();
            let objInit = {
                left: x,
                top: y,
                code: this.activeCom.code,
                method:this.activeCom.method,
                width: 0,
                height: 0,
                hideTag: false,
                chapterType: nul,
                bgClass: "",
                page:page,
                sealId:item.id,
                imgUrl:item.fileImg,
                isDraggable:true,
                fileId:this.activeFileObj.fileId,
                hideDel:true,
                content:""
            };
            let area  = this.activeFileObj.signSetting;
            if(area){
                area = JSON.parse(area);
                let jumpObj = {top:0}
                let code=this.activeCom.code
                this.$message.success("已在签署区域添加"+(nul==1?'签字':'印章'))
                area.forEach((item2,index)=>{
                    if(item2.code==code){//&&()
                        if((nul==ChapterTypes.SIGN&&item2.chapterType==ChapterTypes.SIGNAREA)){
                            objInit.y1 = item2.y1;
                            objInit.x1 = item2.x1;
                            let obj2 =SignInitialize(JSON.parse(JSON.stringify(objInit)))// JSON.parse(JSON.stringify(objInit))
                            obj2.chapterType = ChapterTypes.SIGN;
                            obj2.page = item2.page;
                            obj2.isDraggable = false;
                            let top = this.$refs.pdfContainer.getSomePageHeight(item2.page)
                            jumpObj.left = this.$refs.pdfContainer.realNum(item2.x1,item2.page);
                            jumpObj.top = top+this.$refs.pdfContainer.realNum(item2.y1,item2.page);//用于跳转页面
                             this.signInit(obj2)
                        }else if((ChapterTypes.SEAL&&item2.chapterType==ChapterTypes.SEALAREA)){
                             objInit.y1 = item2.y1;
                            objInit.x1 = item2.x1;
                            let obj2 =SignInitialize(JSON.parse(JSON.stringify(objInit)))// JSON.parse(JSON.stringify(objInit))
                            obj2.chapterType = ChapterTypes.SEAL;
                            let top = this.$refs.pdfContainer.getSomePageHeight(item2.page)
                            jumpObj.left = obj2.x1;
                            jumpObj.top = top+Number(item2.y1);//用于跳转页面
                            obj2.page = item2.page;
                            obj2.isDraggable = false;
                             
                             this.sealInit(obj2)
                        }else if(item2.chapterType==5){
                            
                            if(!item2.cid){

                                item2.cid = this.cid;
                                this.$set(this.fileList[this.fileIndex],"signSetting",JSON.stringify(area))
                                this.cid++
                            }
                           
                                this.setTime(item2,index);
                        }   
                    }
                })
                 this.$refs.pdfContainer.jumpto( jumpObj.top)
                 this.$set(this.fileList[this.fileIndex],"signSetting",JSON.stringify(area));//设置好setting 这是判断当前文件是否签署的关键 
            }else if(nul==ChapterTypes.SIGN){
                let signObj = SignInitialize(JSON.parse(JSON.stringify(objInit)))
                this.signInit(signObj)

            }else if(nul==ChapterTypes.SEAL){
                let signObj = SealInitialize(JSON.parse(JSON.stringify(objInit)))
                this.sealInit(signObj)
            }if(nul==ChapterTypes.FORMALTIME){
                let signObj = TimeInitialize(JSON.parse(JSON.stringify(objInit)))
                this.timeInit(signObj)
            }
       }, 
       signInit(signObj){
            this.rects.push(signObj);
            this.$refs.pdfContainer.markSize({
                imageUrl:signObj.fileImg,
                obj:signObj,
                index:this.rects.length - 1
            })
       },
       sealInit(signObj){
       
        this.rects.push(signObj);
        this.$refs.pdfContainer.markSize({
            imageUrl:signObj.fileImg,
            obj:signObj,
            index:this.rects.length - 1
        })
       },
       async timeInit(signObj){
            let {data} = await findTime();
            obj.content = data
            this.rects.push(signObj);
            this.$refs.pdfContainer.markSize({
                imageUrl:"",
                obj:signObj,
                index:this.rects.length - 1
            })
       },
        
      
        async setReacts(nul,item) {
            let index = this.pageNum;
            let width = '';
            let height = '';
             let code=this.activeCom.code
            let obj = {
                left: 100,
                top: this.scrolls,
                code: this.activeCom.code,
                method:this.activeCom.method,
                width: 0,
                height: 0,
                hideTag: false,
                chapterType: nul,
                bgClass: "",
                page:"",
                sealId:item.id,
                imgUrl:item.fileImg,
                isDraggable:true,
                fileId:this.activeFileObj.fileId,
                hideDel:true,
                content:""
            };
            // nowindex
           
            // let tempInfo = this.tempInfo;
   
         
           

                
                let liheight = this.$refs.pdfViewref[0].getHeight(); //每个pdf页面的高度
                let page = Math.ceil((obj.top + 100) / liheight); //计算应当处于哪一页

                if (page == 0) {
                    page = 1;
                }
                 if(nul==1){
                    obj.width = 55;
                    obj.height = 28
                }else if(nul==2){
                    obj.width = 120;
                    obj.height = 120
                }
                obj.page = page;
                obj.top = obj.top - (page - 1) * liheight + 100;
                obj.isDraggable = true;
                this.rects.push(obj);
                this.$refs.pdfViewref[obj.page-1 ].markSize(item.fileImg, obj,null,this.rects.length-1);
            
            

            
        },
        setTime(item){
            let tag = false;
         
            this.rects.forEach(async (i,index)=>{
               
                if(i.cid==item.cid){
                    
                    tag = true;
                    let {data} = await findTime();
                    this.$set(i, 'content', data)
                       
                 
                }
                 
            })
            
            if(tag){

                return false;
            }else{
               
                this.setReacts(6,item)
            }
        },
        getAuthSign(item){//applySeal
            this.$confirm("企业印章管理员负责审核印章使用权限，是否发起授权！", '温馨提示', {
                confirmButtonText: '发起授权',
                cancelButtonText: '取消'
            })
            .then(async () => {
                
                let {data} = applySeal({id:item.id})
                
                this.$message.success('申请成功');
                this.getSignature();
            })
            .catch(() => {});
        },
        initPdf(){
            this.pdfShowTag = true;
        },
        broindex(item){
           
            this.$refs.pdfContainer.tosomgWhere(item-2)
        },
    }
};
</script>
<style lang="less">
 
// .leftbox {
//     width: 200px;
//     position: relative;
//     text-align: center;
//     left: -20px;
//     z-index: 400;
//     background-color: #f8f9f9;
//     overflow-y: scroll;
//     border-left: 1px solid #ccc;
//     padding-bottom: 50px;
// }
.tempList {
    border-bottom: 4px solid #fafbfc;
    li {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        color: #7f7f7f;
        cursor: pointer;
        
         overflow:hidden; /*溢出的部分隐藏*/
        white-space: nowrap; /*文本不换行*/
        text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
    }
    .active {
        background-color: #f7f8fa;
        color: #555555;
    }
}
.center-box {
    position: relative;
    background-color: #f8f9f9;
    z-index: 100;
    border: 1px solid #ccc;
    padding-bottom: 50px;
}
.pdfbox2 {
    overflow: scroll;
    height: 100%;
}
.h100 {
    height: 100%;
    box-sizing: border-box;
}
.companyList {
    li {
        height: 30px;
        line-height: 30px;
        width: 180px;
        text-align: center;
        // background-color: #6e6eff;
        color: #fff;
        border-radius: 5px;
        margin: 10px auto;
        cursor: pointer;
        position: relative;
        p {
            width: 100%;
            height: 100%;
        }
        .comi {
            position: absolute;
            right: -30px;
            top: 5px;
            font-size: 20px;
        }
    }
}
.obj-li {
    border: 1px dashed #555555;
    height: 65px;
    line-height: 65px;
    text-align: center;
    margin: 10px;
    cursor: pointer;
}
.cans {
    position: relative;
}
.pdfNumTotal {
    cursor: pointer;
    margin: 5px auto;
    display: inline-block;
    border-bottom: 1px solid #ccc;
}
.activepage {
    border: 1px solid #3285ff;
}
// .comopci {
//     opacity: 0.4;
// }
.tempbox {
    box-sizing: border-box;
    .avatar{
        display:inline-block;
        height: auto;
    }
}
</style>
