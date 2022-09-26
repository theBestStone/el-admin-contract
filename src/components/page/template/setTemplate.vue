<!--  -->
<template>
    <div class="tempbox" style="height:100%;overflow:hidden;">
        <div class=" bg-gray  tempbox" style="height:100%">
            <div class="cf sign-header">
                <div class="sign-left" @click="closeThis"><i class="el-icon-close"></i>关闭</div>
                <div class="sign-center text-center ag-steps" v-if="!sceneNo">
                    <div class="steps-item">
                        <i class="steps-num steps-num-active el-icon-check"></i><span class="steps-title-active">签署设置</span>
                    </div>
                    <i class="steps-line"></i>
                    <div class="steps-item"><i class="steps-num steps-num-active ">2</i><span class="steps-title">指定签署位置</span></div>
                     
            
                </div>
                 <div class="sign-center text-center ag-steps" v-if="sceneNo">
                    <div class="steps-item">
                        <i class="steps-num steps-num-active ">1</i><span class="steps-title-active">签署设置</span>
                    </div>
                    <i class="steps-line steps-line-active"></i>
                    <div class="steps-item"><i class="steps-num steps-num-active">2</i><span class="steps-title-active">指定签署位置</span></div>
                    
                    <i class="steps-line "></i>
                        <div class="steps-item"><i class="steps-num  ">3</i><span class="steps-title">组件指定填写方</span></div>
                    <i class="steps-line"></i>
                    <div class="steps-item"><i class="steps-num">4</i><span class="steps-title">发起确认</span></div>
                
                </div>
                <div class="sign-right">
                    <el-button @click="back">上一步</el-button>
                    <el-button @click="tempAdd(0)" v-if="type != -1" style="border:1px solid #88abff">保存</el-button>
                     <el-button @click="tempAdd(1)" v-if="type != -1" type="primary">{{sceneNo?'下一步':'发布'}}</el-button>
                </div>
            </div>
            <!-- <div class="cf padding-sm" style="border-bottom:1px solid #ccc;">
                <div class="fr ">
                    <el-button @click="back">上一步</el-button>
                    <el-button @click="tempAdd(1)">保存</el-button>
                     <el-button @click="back">下一步</el-button>
                    <!~~ <el-button @click="getMsg" type="primary" v-if="type==1||type==2||type==0">立即发起签署</el-button> ~~>
                </div>
            </div> --> 
            <div class=" flex h100 sign-body2">
                <div class="leftbox" :class="leftShowTag?'':'leftboxHide'">
                    
                    <div class="to-left-side" @click="leftShowTag = !leftShowTag">
                        <img v-if="leftShowTag" src="../../../assets/img/feature/coolLeft.png" alt="">
                         <img v-if="!leftShowTag" src="../../../assets/img/feature/coolLeft2.png" alt="">
                    </div>
                    <div style="overflow:hidden" class="h100" >

                        <div class="contract-title margin-bottom-sm">{{activeFile.fileName}}</div>
                        <pdf-container2
                            ref="pdf" 
                            :conWidth="220" :conHeight="containerHeight"
                            :brotherIndex="brotherIndex"
                            :imgUrlInfo="imgUrlInfo2"
                            :pdfConfig="{ type: 'none',sizeType:type }"
                            @broindex="broindex"
                            :rects="[]"
                            
                        >    
                        </pdf-container2>
                    </div>
                   
                </div>
                
                <div class="flex-sub h100 center-box">
                    <div class="pdfboxtop" ref="pdfboxtop" >
                        <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
                        <pdf-container
                            ref="pdfContainer" 
                             :pdfConfig="{ type: 1,sizeType:type }"
                            :conWidth="containerWidth" :conHeight="containerHeight"
                            :key="pdfTagNum"
                            :imgUrlInfo="imgUrlInfo"
                            :activeFileObj="activeFile"
                            :activeCom="activeCom"
                            @initPdf="initPdfText"
                            @finishPdf="finishPdf"
                        >    
                        </pdf-container>
                    </div>
                </div>
                <div class="rightbox bg-white"  :class="rightShowTag?'':'leftboxHide'">
                    <div class="to-right-side" @click="rightShowTag = !rightShowTag">
                        <img v-if="rightShowTag" src="../../../assets/img/feature/coolRight.png" alt="">
                         <img v-if="!rightShowTag" src="../../../assets/img/feature/coolRight2.png" alt="">
                    </div>
                    <div class="contract-title">文档列表（{{fileList.length}}）</div>
                    <ul class="tempList ">
                        <li class="flex" :title="item.fileName" v-for="(item, index) in fileList"  :class="{ active: activeId == item.id }">
                            <div class="tem-left">
                                <div class="tem-title"><i class="el-icon-document"></i>{{ item.fileName }}</div>
                                <div >
                                    <!-- v-if="activeId == item.id" -->
                                <span v-for="user in item.userArr" class="tem-user">{{user}}</span></div>
                            </div>
                            <div class="tem-right">
                                <div class="h100 flex flex-direction align-center justify-center" v-if="activeId == item.id">
                                    <span><i class="el-icon-success" style="color:#1257ff;font-size:18px;"></i></span>
                                    <span class="tem-more">查看更多</span>
                                </div>
                                <div v-if="activeId != item.id" @click="selectFile(item,index)">
                                    <p><i class="none-cercl"></i></p>
                                </div>
                            </div>
                            
                        </li>
                    </ul>
                    <div class="contract-title">参与方</div>
                    <ul class="companyList2">
                        <li v-for="(item, index) in comArr" v-if="item.roleType==1" :class="{ comopci: index == comIndex }" @click="selectCom(item, index)">
                            <div class="user-box" :style="{'background-color':item.bgClass}"></div>
                            <div class="user-sanjiao" :class="{'user-sanjiao-active':index == comIndex}">
                                <!--  -->
                            </div>
                            <i class="el-icon-check usergou"></i>
                            <div class="userlds">
                                <div class=""><span class="usertip" :style="{'background-color':item.bgClass}"></span><span ><span v-if="item.type!=4"> {{item.type==1?"个人":"企业"}}-</span> {{item.name}}</span></div>
                                <div class="userarea">
                                    <span class="signnum">签署控件：{{item.signNum?item.signNum:0}}</span><span class="signnum">文本控件：{{item.textNum?item.textNum:0}}</span>
                                </div>

                            </div>
                            <!-- <p :style="{'background-color':item.bgClass}">{{ item.name }} （{{item.type==1?"个人":"企业"}}）</p>
                            <i class="el-icon-success comi text-green" v-if="index == comIndex"></i> -->
                        </li>
                    </ul>
                    <div class="contract-title" v-if="type==1||type==0">签署控件</div>
                     <sign-toolbar v-if="(type==1||type==0)&&activeCom.signType==1" :methodInfo="activeCom.method"></sign-toolbar>
                        <div class="text-gray margin-top-sm" v-if="activeCom.signType==2">
                            <el-alert
                                title="当前参与方仅需审批，无需添加签署控件。"
                                type="info" :closable="false">
                            </el-alert>
                        </div>
                  
                    
                </div>
                <!-- <div class="leftbox">
                    <div
                        v-for="(item, index) in pdfNumTotal"
                        ref="pdfNumTotal"
                        class="pdfNumTotal"
                        @click="jump(index)"
                        :class="{ activepage: nowindex == index }"
                    >
                        <pdf-view :pdfConfig="{ pdfUrl: pdfUrl, scale: 0.2, pageNum: item }" ref="pdf"></pdf-view>
                    </div>
                </div> -->
            </div>
        </div>
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext" :verifyTag='false'></auth-code>
        <sign-info :userList="comArr"></sign-info>
        <el-dialog title="温馨提示" class="none-padding" :visible.sync="visibleError"  width="500px">
        <div><el-alert
            title="以下文件缺少相关签署设置"
            type="warning"
            :closable="false"
            show-icon>
        </el-alert></div>
        <div class="error-box">
            <div v-for="(item,key) in errorObj">
            
                <p class="error-title"><span class="tiph"></span>{{item.name}}</p>
                <div  style="padding-left:24px;">
                 <div v-for="(item2,key2) in item" v-if="key2!='name'">
                 <!-- {{key2}} -->
                     <p class="error-title"><span class="tiph"></span>{{item2.fileName}}</p>
                        <span class="error-content padding-left" v-for="errArr in item2.errorArr">{{errArr}}</span>
                 </div>
                
                </div>
            </div>
        </div>

        <div slot="footer" class="dialog-footer text-center">
            <el-button @click="visibleError = false">取 消</el-button>
            <el-button type="primary" @click="visibleError = false">继续设置</el-button>
        </div>
        </el-dialog>
    </div>
</template>

<script>
// import pdf from 'pdfjs-dist';
// import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import PdfView from '../../common/pdfView';
import AuthCode from '../../common/authCode';
import SignToolbar from '../../common/contract/signToolbar';
import SignInfo from '../../common/signInfo';
 import pdfContainer from '../../common/pdfContainer';
  import pdfContainer2 from '../../common/pdfContainer';
// import { saveDraftContract,findContract,saveContract} from '../../../api/contract.js';
import {editTemplate,findTemplate,completeTemplate } from '../../../api/template.js';
import {
		addShopTemplate,
		updateShopTemplate,
		findShopTemplateByNo
	} from '../../../api/business.js';
import {downloadFile} from '../../../api';
import {ChapterTypes,calNum,uuid,calNumArea,verifySignArea,elementSettingFake} from '../contract/signUtile.js'
import '../../../assets/css/contract.less'
import bus from '@/components/common/bus';
let loading = null;
export default {
    components: {
        pdfContainer,AuthCode,SignInfo,SignToolbar,pdfContainer2
    },
    // watch:{
    //     rects(val,old){
      
    //         // this.subNum();
        
    //     }

    // },

    data() {
        return {
            batchNo:'',
            leftShowTag:true,
            rightShowTag:true,
            ChapterTypes:ChapterTypes,
            tempId:"",
            sceneNo:"",
            type:"",
            tempInfo:{},
            rects: [],
            rectsObj: {},
            fileList: [
                
            ],
            fileList2:[],
            activeFile:{},
            pdfTagNum:'bdc',
            activeId: 1,
            activeFileIndex:0,
            canStyle: {},
            visibleCode:false,
             realPhone: '',
             userInfo:{},
            model: {
                value1: '',
                value2: '',
                radio: 1,
                checkList: [],
                sendArr: [
                    
                ]
            },
            comArr: [
               
            ],
            bgArr: ['#f37b1d',  '#6739b6', '#39b54a', '#fbbd08', '#a5673f', '#e03997'],//bgArr: ['#f37b1d', '#0081ff', '#6739b6', '#39b54a', '#fbbd08', '#a5673f', '#e03997'],
            loading: false,
            selections: [],

            list: [
                {
                    fileName: 'lll.pdf',
                    fileStatus: 1
                }
            ],
            pdfNumTotal: 0,
            scale: 1,
            pdfUrl: '',
            pdfHeight: 0,
            scrolls: 0,
            nowindex: 0,
            activeCom:{},
            comIndex: 0, //当前选中公司
            imgUrlInfo:[],
             imgUrlInfo2:[],
            pdfDoc_:null,
            pdfViewrefReady:false,//加载完成
            pdfShowTag:false,
            brotherIndex:1,
            visibleError:false,
        };
    },
    created() {
        this.getId();
       
        this.getById();
        this.getinfo();
    },
    mounted() {
        this.containerHeight = this.$refs.pdfboxtop.offsetHeight;
        this.containerWidth = this.$refs.pdfboxtop.offsetWidth;
        // this.$set(this,'rects',[])
        bus.$off("subNum");
        bus.$on("subNum",(res)=>{
            this.subNum();
        })
    },

    methods: {
        randomRgb() {
            let R = Math.floor(Math.random() * 255);
            let G = Math.floor(Math.random() * 255);
            let B = Math.floor(Math.random() * 255);
            return 'rgb(' + R + ',' + G + ',' + B + ')'
        },
 
        back(){
            this.$router.go(-1)//返回上一层
        },
        closeThis(){
			if(this.sceneNo){
                this.$router.push({ path: '/business' });
            }else{

                this.$router.push({ path: '/template' });
            }
        },
        getId(tag) {
            this.tempId =this.$route.query.tempId;// this.$store.getters.tempId;
            this.sceneNo =this.$route.query.sceneNo;
        },
        getType(){
          this.type =this.$route.query.temType;// this.$store.getters.tempType;
          
        },
        async getById(){
            let data = {}
            if(this.sceneNo){
                
                let res  = await findShopTemplateByNo({templateNo:this.tempId});
                data = res.data;
            }else{
                let res  = await findTemplate({templateNo:this.tempId});
                data = res.data;
            }
         
          let arr = [];
          let arr2 = [];
          if(data.isTemplate==1){
              this.type = 2;
          }else{
               this.getType();
          } 
         
          data.files.forEach(item=>{
            item.url = downloadFile(item.fileId)
            if(item.fileType==2){
                return false;
            }
            if(item.signSetting||item.vars){//setting的默认设置
                let signSetting2 = [];
                if(item.signSetting){

                    signSetting2.push(...JSON.parse(item.signSetting)) //JSON.parse(item.signSetting);
                }
                if(item.vars){//将组件数据放到这里
                    signSetting2.push(...JSON.parse(item.vars))
                }
                ///////////////////////////
                // let vars = elementSettingFake;
        
                // signSetting2.push(...(vars))
                //////////////////////////
                signSetting2.forEach(j=>{
                    var tagflag = true;
                    if(data.isTemplate==1){
                        j.isDraggable = false;
                        j.hideDel  = false
                        
                    }
                    if(this.type==-1){
                        j.isDraggable = false;
                        j.hideDel  = true;
                        j.resizable = false;
                        j.rotatable = false;  
                    }
                    if(j.chapterType==ChapterTypes.TEXTELEMENTAREA){
                        j.isDraggable = false;
                        j.hideDel  = true;
                        j.resizable = false;
                        j.rotatable = false;  
                    }
                    if(data.signProcess==0){//==0是共同签署 如果是独立签署  则不用删除

                        data.players.forEach(i=>{//去除掉已删除的player
                            if(i.code==j.code){
                                tagflag = false;
                            }

                        })
                        if((j.chapterType==ChapterTypes.TEXTELEMENTAREA&&j.code==undefined)){
                            
                             tagflag = false;
                        }
                        
                        if(tagflag){
                            
                            j.hideTag = true;
                        }
                    }
                })
              item.signSetting2 = signSetting2//
            }else{
              item.signSetting2 = [];
            }
            if(item.fileType==1){
                arr.push(item)
            }else{
                arr2.push(item)
            }

        })
        //   if(data.players.length>7){
        let i = 0;
        let firstComindex = -1;
        let players = []
        if(data.signProcess==1){
            firstComindex = 0;
            let meth1=-1;
            let objPlayer = {
                code:'-1',
                name:'签署方',
                bgClass:this.bgArr[0],
                type:4,
               
                signNum:0,
                textNum:0
            }
            data.players.forEach((item,index)=>{
                if(item.processType==1){
                    objPlayer.code = item.code;
                    if(item.type==1){
                        if(meth1==-1){
                            meth1 = 0;
                        }
                    }else if(item.type==2){
                         
                         if(item.method==0){
                            if(meth1==-1){
                                meth1 = 0;
                            }else if(meth1==1){
                                meth1 = 2;
                            }
                         }else if(item.method==1){
                             if(meth1==-1){
                                meth1 = 1;
                            }else if(meth1==0){
                                meth1 = 2;
                            }
                         }else if(item.method==2){
                            meth1 = 2;
                         }
                    }
                }else{
                    players.push(item)
                }
            })
            

            objPlayer.method = meth1;
            players.push(objPlayer)
            
             
        }else{

            data.players.forEach((item,index)=>{
                if(item.roleType==1){
                    item.signNum=0,
                    item.textNum=0
                    if(firstComindex==-1){
                        firstComindex = index;
                    }
                    if(!item.bgClass ){

                        if(index<6){
            
                            item.bgClass = this.bgArr[i]
                            i++
                        }else{
                            item.bgClass =this.randomRgb();
                        }
                    }
                }
            })
            players = JSON.parse(JSON.stringify(data.players))
        }
        //   }
         this.tempInfo = JSON.parse(JSON.stringify(data));
          this.comArr = players;
          this.fileList = arr;
          this.fileList2 = arr2;
          if(!this.pdfUrl){
            this.activeCom =  players[firstComindex];
            this.pdfUrl = arr[0].url;
            this.activeId =  arr[0].id
            this.activeFileIndex = 0;
            this.activeFile = arr[0]
          }
  
          this.initPDF();
          this.calNumArea();

           
        }, 
        finishPdf(){
            this.showReact();
        },
        showReact(){
            bus.$emit('showArea','set')
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
        async toNext(code) {
            // this.msgCode = code;
            // checkIdentify({verifyCode:code}).then(res=>{
            await completeTemplate({verifyCode:code,templateNo:this.tempId});
             this.$message.success("保存成功");
             this.$router.push({path:'/template'})
            // })
        },
     
      async tempAdd(type,code){
           let {errorObj} = verifySignArea({
            activeFileIndex:this.activeFileIndex,
            fileList:this.fileList,
            comArr:this.comArr,
            rects:this.getRects(),
            temp:1
          })
        
        console.log(errorObj,"errorObj")
        if(JSON.stringify(errorObj) != "{}"){
           
           this.errorObj = errorObj;
           this.visibleError = true;
            return false;
        }
            
            let model = JSON.parse(JSON.stringify(this.tempInfo));
        
            let arrFile =this.fileList.concat(this.fileList2)
            model.files =arrFile;
            let data = '';
            if(this.sceneNo){
                let res = await updateShopTemplate(model);
                data = res.data;
                if(type==0){
                    this.$message.success("保存成功")
                }else{
                    this.$message.success("已保存")
                    this.$router.push({path:'/designateElment',
					query:{
						tempId:this.tempId,
						temType:this.type,
						sceneNo:this.sceneNo
						
					}})
                }
            }else{

                let res = await editTemplate(model);
                data = res.data;
                if(type==0){
                    this.$message.success("保存成功")
                }else{
                    this.$message.success("已保存")
                    this.visibleCode = true;
                }
            }
          
           
        
           
       
      },
    //   getArea(){
        
    //     let tipTile = [];
    //     const h = this.$createElement;
    //     let obj = {};
    //     this.fileList.forEach(i=>{//组合数据前先存储当前页面数据
    //       if(i.id==this.activeId){
    //         let rectsArr = [];
    //           this.rects.forEach(i=>{
    //               if(!i.hideTag){
    //                   rectsArr.push(i)
    //               }
    //           })
    //         this.$set(i, 'signSetting2', JSON.parse(JSON.stringify(rectsArr)))
    //       }
    //     })
          
    //     this.fileList.forEach(item=>{
    //       this.comArr.forEach(o=>{
    //           if(o.type!=3){
    //             obj[item.id+'-'+o.code] = {};
    //             obj[item.id+'-'+o.code].method = o.method;
    //             obj[item.id+'-'+o.code].name = o.name;
    //             obj[item.id+'-'+o.code].acMethod = -1;
    //             obj[item.id+'-'+o.code].fileName = item.fileName

    //         }
    //       })
             
    //         if(!item.signSetting2||item.signSetting2.length==0){
           
    //         }else{
    //          let signSetting2 =JSON.parse(JSON.stringify(item.signSetting2))//  
    //           let arr = [];
    //           signSetting2.forEach(i=>{
    //             if(!i.hideTag){

    //               if(i.chapterType==3){
                     
    //                 if(obj[item.id+'-'+i.code].acMethod==1){
    //                   obj[item.id+'-'+i.code].acMethod = 2;
    //                 }else if(obj[item.id+'-'+i.code].acMethod==-1){
    //                   obj[item.id+'-'+i.code].acMethod = 0;
    //                 }
    //               }else if(i.chapterType==4){
    //                    console.log(obj[item.id+'-'+i.code])
    //                 if(obj[item.id+'-'+i.code].acMethod==-1){
    //                   obj[item.id+'-'+i.code].acMethod =1;
    //                 }else if(obj[item.id+'-'+i.code].acMethod==0){
    //                   obj[item.id+'-'+i.code].acMethod =2;
    //                 }
    //               }
    //               arr.push(i)
    //             }
    //           })
    //           item.signSetting = JSON.stringify(arr)
    //         }
           
    //     })
       
    //     for(let i in obj){
        
    //       let oooj = obj[i];
    //         let str = ""
    //       if(oooj.method==2){
    //          if(oooj.acMethod==-1){
    //            str  = '签字与印章'
    //          }else if(oooj.acMethod==1){
    //            str  = '签字'
    //          }else if(oooj.acMethod==0){
    //            str  = '印章'
    //          }
             
    //       }else if(oooj.method==1){
    //         if(oooj.acMethod==-1){
    //            str  = '印章'
    //          } 
    //       }else if(oooj.method==0){
    //         if(oooj.acMethod==-1){
    //            str  = '签字'
    //          } 
    //       }
    //       if(str){
    //           tipTile.push( h('p',null,"请在文件《"+oooj.fileName+"》下添加签署方"+oooj.name+"的"+str+"区域") )
    //         }
    //     }
    //     return tipTile
    //     // console.log(tipTile,"tipTile",this.fileList)
         
    //   },
        initPDF(url) {
            let _this = this;
             this.$refs.pdfContainer.pdfInit(this.pdfUrl)
            this.$refs.pdf.pdfInit(this.pdfUrl)
            // if(!url){
            //   url = this.pdfUrl;
            // }
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
              
            //  bus.$emit("showArea")
            //  return false;

            if(item.id==this.activeId){
              return false;
            }
            // let rects
            this.imgUrlInfo = [];
            this.pdfUrl = item.url;
            this.pdfTagNum = uuid();
            this.$set(this.fileList[this.activeFileIndex],'signSetting2',JSON.parse(JSON.stringify(this.getRects())))
    
            this.activeId = item.id;
            this.activeFileIndex = index;
            
            this.activeFile = this.fileList[index]//item;
            
         
            this.nowindex = 0;

            this.$nextTick(() => {
                this.initPDF(item.url);
            });
            loading = this.$loading({
                lock: true,
                text: '切换中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.4)'
            });
            setTimeout(() => {
                loading.close();
            }, 3000);
        },
        jump(page) {
            this.nowindex = page;
            let top = this.$refs.pdfViewref[page].$el.getBoundingClientRect().top + Number(this.scrolls);

            this.$refs.pdfboxtop.scrollTop = top - 134;
        },
        
      
        // setReacts(nul) {
        //     let index = this.pageNum;
        //     let width = '';
        //     let height = '';

        //    let container = this.$refs.pdfContainer;
        //     let {y,page,x} = this.$refs.pdfContainer.witchPage();
            
        //     if (nul == ChapterTypes.SEALAREA) {
        //         width =  container.realNum(120,page);
        //         height = container.realNum(120,page);
        //     } else if (nul == ChapterTypes.TIMAREA) {
        //         width = container.realNum(107,page);
        //         height = container.realNum(16,page);
        //     } else if (nul == ChapterTypes.SIGNAREA) {
        //         width = container.realNum(80,page);
        //         height = container.realNum(28,page);
        //     }
        //    let obj = {
        //         left: x,
        //         top: y,
        //         code: this.activeCom.code,
        //         method:this.activeCom.method,
        //         width: width,
        //         height: height,
        //         hideTag: false,
        //         chapterType: nul,
        //         page:page,
        //         isDraggable:true,
        //         bgClass: this.activeCom.bgClass,
        //         hideDel:true
        //     };
        //     this.rects.push(obj)
        //     container.markSize({
        //         imageUrl:'',
        //         obj:obj,
        //         index:this.rects.length-1
        //     })
        // },
       
        broindex(item){
           
            this.$refs.pdfContainer.tosomgWhere(item-1)
        },
        initPdfText(){
            this.pdfShowTag = true;
        },
        getRects(){
            
          return  this.$refs.pdfContainer.rects
        },
        subNum(){
            
           calNum({
            rects:this.getRects(),
            activeCom:this.activeCom,
            fileList:this.fileList,
            activeFileIndex:this.activeFileIndex,
            comArr:this.comArr
           })
        },
        calNumArea(){
            calNumArea({
                fileList:this.fileList,
                comArr:this.comArr
            })
        }
        
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

 
.h100 {
    height: 100%;
    box-sizing: border-box;
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
}
</style>
 