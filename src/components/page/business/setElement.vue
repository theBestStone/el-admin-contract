<!--  -->
<template>
    <div class="tempbox" style="height:100%;overflow:hidden;">
        <div class=" bg-gray  tempbox" style="height:100%">
            <div class="cf sign-header">
                <div class="sign-left" @click="back"><i class="el-icon-close"></i>关闭</div>
                <div class="sign-center text-center ag-steps">
                    <!-- <div class="steps-item">
                        <i class="steps-num steps-num-active el-icon-check"></i><span class="steps-title-active">签署设置</span>
                    </div>
                    <i class="steps-line"></i>
                    <div class="steps-item"><i class="steps-num steps-num-active ">2</i><span class="steps-title">指定签署位置</span></div>
                    <i class="steps-line steps-line-active"></i>
                    <div class="steps-item"><i class="steps-num">3</i><span class="steps-title">发起确认</span></div> -->
            
                </div>
                <div class="sign-right text-right">
                     <el-button v-if="viewType!='view'" @click="tempAdd(1)" type="primary">确定</el-button>
                </div>
            </div>
         
            <div class=" flex h100 sign-body2">
                <div class="leftbox" :class="leftShowTag?'':'leftboxHide'">
                    
                    <div class="to-left-side" @click="leftShowTag = !leftShowTag" v-if="viewType!='view'">
                        <img v-if="leftShowTag" src="../../../assets/img/feature/coolLeft.png" alt="">
                         <img v-if="!leftShowTag" src="../../../assets/img/feature/coolLeft2.png" alt="">
                    </div>
                    <div style="overflow:hidden" class="h100" >

                        <div class="contract-title margin-bottom-sm">组件库</div>
                        <div class="text-left">
                            <div class="padding senece-title">基础组件</div>
                            <div class="element-box flex flex-wrap">
                                <div  v-signDrag v-for="item in elementBase" @mousedown="selectElement(item)">
                                    <div class="element-span drag-tool">
                                        {{item.valSetting.textTitle}}
                                    </div>
                                </div>
                            </div>
                            <div class="padding senece-title margin-top-sm">场景组建</div>
                             <div class="element-box flex flex-wrap">
                                <div  v-signDrag  v-for="item in elementSence" @mousedown="selectElement(item)">
                                    <div class="element-span drag-tool">
                                        {{item.valSetting.textTitle}}
                                    </div>
                                </div>
                            </div> 
                             <div class="padding senece-title cf margin-top-sm">临时组件 </div>
                             <div class="element-box flex flex-wrap">
                                <div  v-signDrag  v-for="item in elementShort" @mousedown="selectElement(item)">
                                    <div class="element-span drag-tool text-cut">
                                        {{item.valSetting.textTitle}}
                                    </div>
                                </div>
                            </div> 
                            <div class="text-center margin-top-sm">

                                <el-button   style="width:90%;height: 40px; background: #e7eeff; color: #1257FF; font-size: 14px; line-height: 10px;border:1px solid #0079fe" @click="editElement('add')">
                                    添加组件
                                </el-button>
                            </div>
                                
                        </div>
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
                    <div class="to-right-side" @click="rightShowTag = !rightShowTag" v-if="viewType!='view'">
                        <img v-if="rightShowTag" src="../../../assets/img/feature/coolRight.png" alt="">
                         <img v-if="!rightShowTag" src="../../../assets/img/feature/coolRight2.png" alt="">
                    </div>
                    <div >

                        <div class="contract-title margin-bottom-sm">基本信息</div>
                        <div class="padding">
                            <el-input v-model="fileObj.fileName" :disabled="true"></el-input>
                        </div>
                         <div class="contract-title margin-bottom-sm margin-top-sm">组件列表</div>
                         <!-- <div class="padding-lr"><el-divider></el-divider></div> -->
                         <div class="padding">
                            <div class="flex padding-sm align-center right-element-item margin-bottom-sm" v-for="(item,index) in rectsPrint"  v-if="!item.hideTag" @mouseenter="changeStyle(index,true)" @mouseleave="changeStyle(index,false)">
                                <span class="flex-sub">{{item.valSetting.textTitle}}</span>
                                <div class="element-tag">
                                    <i class="el-icon-edit cursor-pointer" @click="editElement('edit',item,index)"></i><i class="el-icon-delete cursor-pointer" @click="delReact(index)"></i>
                                </div>
                            </div>
                         </div>
                    </div>
                    
                </div>
               
            </div>
        </div>
      
       
        <el-dialog :title="visibleType=='add'?'新增':'编辑'" class="none-padding" :visible.sync="visibleEdit"  width="500px" :append-to-body="true">
             <el-form size="mini" ref="agForm" :model="dialogData" label-width="0">
                <el-form-item label="" verify prop="valSetting.textTitle" >
                <div class="sign-label"> <span class="text-red">*</span> 组件名称</div>
                <el-input   v-model="dialogData.valSetting.textTitle"></el-input>
                </el-form-item>
                 <el-form-item label="" verify prop="valSetting.textTitle" >
                <div class="sign-label"> 最大长度</div>
                <el-input   v-model="dialogData.valSetting.length"></el-input>
                </el-form-item>
                <el-form-item label="" prop="">
                    <div class="sign-label">组件类型</div>
                    <el-select style="width:80%;" v-model="dialogData.valSetting.elementType" placeholder="" >
                    
                    <el-option v-for="item in typeArr" :label="item.name" :key="item.key" :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
            
            
                <el-form-item label="" prop="valSetting.defaultText">
                <div class="sign-label">默认文本内容</div>
                <el-input type="textarea"  v-model="dialogData.valSetting.defaultText"></el-input>
                </el-form-item>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="" prop="region">
                    <div class="sign-label">字号</div>
                    <el-select style="width:80%;" v-model="dialogData.valSetting.fontSize" placeholder="字号设置" >
                    
                    <el-option v-for="item in fontSizeArr" :label="item+'px'" :key="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="" prop="">
                    <div class="sign-label">对齐方式</div>
                    <div class="flex">
                        <span v-for="item in alignList"  class="align"><img :src="dialogData.valSetting.textAlign==item.value?item.activeImg:item.img" alt="" @click="setAlign(item)"></span>
                        
                    </div>
                    </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-form-item label="" prop="fontFamily" >
              <div class="sign-label">字体类型</div>
              <el-select style="width:100%;"  v-model="dialogData.valSetting.fontFamily" placeholder="参与方设置">
               <el-option v-for="item in fontFamilyArr" :label="item.name" :key="item.key" :value="item.key"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="" prop="valSetting.isVerify" >
              <div class="sign-label">填写要求</div>
                
                  <el-checkbox label="必填"  v-model="dialogData.valSetting.isVerify" name="region">必填</el-checkbox>
                 
            </el-form-item> -->
          </el-form>

        <div slot="footer" class="dialog-footer text-center">
            <el-button @click="visibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="doChange()">确定</el-button>
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
import {downloadFile,downloadFile2} from '../../../api';
import {ChapterTypes,calNum,uuid,calNumArea,verifySignArea} from '../contract/signUtile.js'
import '../../../assets/css/contract.less'
import bus from '@/components/common/bus';
let loading = null;
export default {
    components: {
        pdfContainer
    },
    props:{
        fileObj:Object
    },
    // watch:{
    //     rects(val,old){
      
    //         // this.subNum();
        
    //     }

    // },

    data() {
        return {
          
            leftShowTag:true,
            rightShowTag:true,
            ChapterTypes:ChapterTypes,
            contId:"",
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
            
            comArr: [
               
            ],
            bgArr: ['#f37b1d',  '#6739b6', '#39b54a', '#fbbd08', '#a5673f', '#e03997'],//bgArr: ['#f37b1d', '#0081ff', '#6739b6', '#39b54a', '#fbbd08', '#a5673f', '#e03997'],
            loading: false,
            selections: [],

        
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
            visibleEdit:false,
            errorObj:{},
            editInfo:{},
            elementBase:[
                {valSetting:{textTitle:'日期',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'date',length:'',defultValue:''} ,width:102,height:38,isAdc:true},

                {valSetting:{textTitle:'单行文本',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'text',length:18,defultValue:''},width:102,height:38,isAdc:true},
                {valSetting:{textTitle:'多行文本',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'textarea',length:60,defultValue:''},width:160,height:50,isAdc:true},
                {valSetting:{textTitle:'数字',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'number',length:3,defultValue:''},width:102,height:38,isAdc:true},
            ],
            elementSence:[
                 {valSetting:{textTitle:'姓名',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'text',length:4,defultValue:''},width:102,height:38,isAdc:true},
                {valSetting:{textTitle:'身份证号',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'text',length:18,defultValue:''},width:102,height:38,isAdc:true},
                {valSetting:{textTitle:'联系电话',fontSize:'13',isVerify:true,fontColor:'#000000',textAlign:'center',elementType:'number',length:18,defultValue:''},width:102,height:38,isAdc:true},
            ],
            elementShort:[],
            dialogData:{
                valSetting:{
                    fontSize:13,
                    textAlign:'center',
                    textTitle:'',
                    defaultText:'',
                    elementType:'text',

                },width:102,height:38,isAdc:false

            },
            alignList:[
                {img:require('@/assets/img/feature/alignLeft.png'),value:"left",activeImg:require('@/assets/img/feature/alignLeftActive.png')},
                {img:require('@/assets/img/feature/alignCenter.png'),value:"center",activeImg:require('@/assets/img/feature/alignCenterActive.png')},
                {img:require('@/assets/img/feature/alignRight.png'),value:"right",activeImg:require('@/assets/img/feature/alignRightActive.png')},
            ],
            rectsPrint:[],
            visibleType:'',
            activeIndex:'',
            fontSizeArr:[
                12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28
            ],
            typeArr:[
                {name:'单行文本',key:'text'},
                {name:'多行文本',key:'textarea'},
                {name:'数字',key:'number'},
                {name:'日期',key:'date'},
            ],
            fontFamilyArr:[
                {name:'宋体',key:'宋体'},
                {name:'仿宋',key:'仿宋'},
                {name:'黑体',key:'黑体'},
                {name:'楷体',key:'楷体'},
                {name:'Arial',key:'Arial'}
            ],
            viewType:''

            
        };
    },
    created() {
        
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
        setAlign(item){
            this.$set(this.dialogData.valSetting,"textAlign",item.value);
            // this.setRectsValue('valSetting')
        },
        delReact(index){
             bus.$emit("setRectsValue",index,{hideTag:true},'hideTag')
        },
        changeStyle(index,tag){
            bus.$emit("setRectsValue",index,{active:tag},'active')
        },
        editElement(type,item,index){
            this.visibleType = type
            this.visibleEdit = true;
            this.activeIndex = -1
            console.log(item,"item")
            this.$nextTick(()=>{
                //  this.$refs.agForm.resetFields();
                 if(type=='edit'){
                    let is =  JSON.parse(JSON.stringify(item))
                    console.log(is,"item")
                     this.$set(this,'dialogData',is)
                     this.activeIndex = index;
                 }else{
                    this.dialogData = {
                        valSetting:{
                            fontSize:13,
                            textAlign:'center',
                            textTitle:'',
                            defaultText:'',
                            elementType:'text',

                        },width:102,height:38,isAdc:false

                    }
                    this.$refs.agForm.clearValidate();
                     
                 }
            })
        },
        doChange(){
            if(this.visibleType=='add'){
                this.elementShort.push(JSON.parse(JSON.stringify(this.dialogData)))
            }else{
                 bus.$emit("setRectsValue",this.activeIndex,{valSetting:this.dialogData.valSetting},'valSetting')
            }
             this.visibleEdit = false;
        },
        selectElement(item){
             item.type = ChapterTypes.TEXTELEMENTAREA;
            this.nowData = item;
        },
        inPdf(){
            // console.log(this.nowData,"nowData")
            bus.$emit("beforSetReacts",this.nowData.type,this.nowData,this.editInfo)
        },
        getFileView(tag){
            this.viewType=tag;
            if(tag=='view'){
                this.leftShowTag = false;
                this.rightShowTag = false;
            }
            this.pdfUrl =downloadFile(this.fileObj.fileId) ;
            let files =  JSON.parse(JSON.stringify(this.fileObj))
            // activeFile
            console.log(files,"files")
            files.signSetting2 = files.vars?JSON.parse(files.vars):[]
            console.log(files.signSetting2,"files.signSetting2")
            this.activeFile =files;
            if(files.elementShort){
                this.elementShort = files.elementShort
            }
            // vars
            this.getById();
        },
        randomRgb() {
            let R = Math.floor(Math.random() * 255);
            let G = Math.floor(Math.random() * 255);
            let B = Math.floor(Math.random() * 255);
            return 'rgb(' + R + ',' + G + ',' + B + ')'
        },
 
        back(){
             this.$emit('closeme')
        },
        
        async getById(){
         
  
          this.initPDF();
        
           
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
           
            this.tempAdd(1,code);
        },
    
      async tempAdd(type,code){
        //   let {errorObj} = verifySignArea({
        //     activeFileIndex:this.activeFileIndex,
        //     fileList:this.fileList,
        //     comArr:this.comArr,
        //     rects:this.getRects()
        //   })
        
      
        // if(JSON.stringify(errorObj) != "{}"){
           
        //    this.errorObj = errorObj;
        //    this.visibleEdit = true;
        //     return false;
        // }
        let rects = this.getRects();
        let arr = []
        rects.forEach(item=>{
        if(!item.hideTag){
            arr.push(item)
        }
        })
        this.$emit('setFile',JSON.stringify(arr),this.elementShort)
      },
     
        initPDF(url) {
            let _this = this;
             this.$refs.pdfContainer.pdfInit(this.pdfUrl)
       
         
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
        
        // setRectsValue(setTag){
       
        //     let data = JSON.parse(JSON.stringify(this.dialogData))
        //     if(setTag=='code'){
        //         let obArr =  this.userList.filter(item=>{
        //         return  item.code==this.dialogData.code
        //         })
        //         data.bgClass = obArr[0].bgClass
               
        //     }
        //     bus.$emit("setRectsValue",this.activeIndex,data,setTag)
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
            
              this.rectsPrint = this.getRects()
             
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
.element-box{
    padding:0 15px;
}
    .element-span{
        border:1px dashed #0079fe;
        border-radius: 5px;
        width: 100px;
        height: 35px;
        display: flex;
        // justify-content: center;
        align-items: center;
        margin:4px;
        font-size: 14px;
        color: #7F7F7F;
        text-indent: 20px;
        cursor: move;
    
    }
    .senece-title{
        font-weight: bold;
        font-size:15px;

    }
    .element-tag{
        width:55px;
        font-size:18px;
        i{
            margin: 0 4px;
            display: inline-block;
        }
    }
    .right-element-item{
        border: 1px dashed #0079fe;
        border-radius: 5px;
        &:hover{
             border: 1px solid #0079fe;
             .el-icon-edit{
                color:#0079fe;
             }
             .el-icon-delete{
                color:red
             }
        }
    }
     .align{
        margin:0 5px;
        cursor:pointer;
    }
</style>
 