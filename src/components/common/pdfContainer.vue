<!--  -->
<template>
    <div class="pdfbox" style="width:100%;height:100%">
      <!-- <div> -->
        <div class="pdfcontainer" ref="content-box"    @scroll="windowScroll">
        <!-- :style="{width:conWidth+'px'}" ,'transform-origin':scaleBox>1?'0% 0':'-50% 0',  -->
          <div class="scallclass" ref="scallclass" :style="{ transform: 'scale(' + scaleBox + ')','transform-origin':'50% 0','margin-left':smallLeft+'px' }">
            <div     v-for="(item,index) in pdfNumTotal" :key="item" >
             
               <pdf-view-one  :scaleBox="scaleBox" :pdfConfig="pdfConfig" v-if="pdfConfig.type==1" :imgUrlInfo="imgUrlInfo" :pageNum="item" @completOne="complet" :rects.sync="rects" ref="pdfViewref" ></pdf-view-one>
               <div class="smallpdf" v-if="pdfConfig.type=='none'" :class="{activepdf:brotherIndex==item}">
                  <div class="pdf-pre" style="display: inline-block;" @click="broIndex(item)">
                      <pdf-view-one :rects="rectson"  :imgUrlInfo="imgUrlInfo" :pageNum="item" @completOne="complet" ref="pdfViewref"></pdf-view-one> 
                  </div>
                   <div class="pdf-num">{{item}}/{{pdfNumTotal}}</div>
               </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
        <div class="pdf-footer" v-if="pdfConfig.type==1">
            <div style="position:relative">
    
                <div class="pdf-page">
                    <span class="pdf-lastpage" :class="{disactive:realIndex==0}"  @click="changePage(-1)">上一页</span>
                    <!-- <span>{{realIndex+1}}/{{pdfNumTotal}}</span> -->
                    <span class="page-tool">
                       <el-select v-model="realIndex" clearable @change="tosomgWhere" placeholder="请选择">
                       
                        <el-option
                              v-for="item in pageArr"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                       </el-select>
                      </span>
                    <span  class="pdf-nextpage" :class="{disactive:realIndex==pdfNumTotal-1}" @click="changePage(1)">下一页</span>
                </div>
                <div class="percent-tool">
                    <div @mouseenter="initPercent()"> 
                          <i class="el-icon-minus stepd" @click="percentGo(-0.25)"></i>
                         <el-select v-model="percent" clearable @change="sizePdf" placeholder="请选择">
                          <el-option
                            v-for="item in percentArr"
                            :key="item.value"
                            :label="item.title"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <i class="el-icon-plus stepd" @click="percentGo(0.25)"></i>
                   
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pdf from 'pdfjs-dist'
import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js'
pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker
 import pdfViewOne from './pdfViewOne.vue'
 import bus from '@/components/common/bus';
 import { findTime} from '@/api/contract.js';
 import {ChapterTypes,SignInitialize,SealInitialize,TimeInitialize,perforationInitialize,uuid} from '@/components/page/contract/signUtile.js'
export default {
 
  components: {
    pdfViewOne
  },
  props: {
    conWidth:Number,
    conHeight:Number,
    // rects: Array,
     imgUrlInfo:{
        type:Array,
        default:[]
     },
     brotherIndex:{
        type:Number,
        default:1
     },
     pdfConfig:Object,
     activeCom:Object,
     activeFileObj:{
      type:Object,
      default:{}
     }
  },

  data() {
    return {
     
      rects:[],
      rectson:[],//无作用
      ids: '',
      pdfUrl: '', //'http://esign.agilestar.cn:9080/contract/downloadTest/444.pdf',// 这里是pdf文件地址，后台给的流文件请求地址也是可以的
      pdfDoc: null, // pdfjs 生成的对象
     
      pdfNumTotal:0,
      nowNum:1,
      completTag:false,
      scrolls:0,
      scrollTop:0,
      scrollLeft:0,
      scaleBox:1,
      smallLeft:0,
      scrollNum:0,
      showNum: 2,
      nowindex:1,
      realIndex:0,
      editInfo:{},
      percent:1,
      minX:0,
      minY:0,
      percentY:0,
      percentX:0,
      percentArr:[
        {value:0.5,title:'50%'},
        {value:0.75,title:'75%'},
        {value:1,title:'100%'},
        {value:1.25,title:'125%'},
        {value:1.5,title:'150%'},
        {value:1.75,title:'175%'},
        {value:2,title:'200%'},
        {value:2.25,title:'225%'},
        {value:2.5,title:'250%'},
        {value:2.75,title:'275%'},
        {value:3,title:'300%'},
   
      ],
      nowTime:'',
      pageArr:[],
      minY:0,
      minX:0
    }
  },
  computed: {
    
  },
  created() {
   
  },
  // watch:{
  //   rects(){
    
  //      this.$emit("update:rects", this.rects);
       
  //   }

  // },
  destroyed() {
    // 离开页面需要销毁监听，且需在 destroyed 里面销毁，
    // 否则监听会一直存在，因为是单页面应用，页面并未关闭。
 
    
    // 销毁事件总线
   
},
  mounted() {
    // this.setPdfDoc()
    if(this.pdfConfig.type==1){
      bus.$off("beforSetReacts");
      bus.$off("showArea");
      bus.$off("setRectsValue");
      bus.$off("beforReal");
      bus.$off("timeChange");
      bus.$off("RealOperation");
      
      // if(!bus._events.beforSetReacts){
        bus.$on('RealOperation', (operationObj,item) => {
        
       
          this.RealOperation(operationObj,item);
        
  
      });
      bus.$on('beforSetReacts', (nul,item,editInfo) => {
          
          this.editInfo = editInfo;
        //  this.updateReacts()
        
          this.beforSetReacts(nul,item);
        
  
      });
      bus.$on('timeChange', (time) => {//时间格式
          this.nowTime = time
      });
      bus.$on('beforReal', (nul,item,editInfo) => {
           
           this.editInfo = editInfo;
          //  this.updateReacts()
         
           this.beforReal(nul,item);
          
   
       });
       
     bus.$on('showArea', (showType) => {
         
        this.beforSetReactsArea(showType);
 
     });
     bus.$on('setRectsValue', (index,item,typeTag) => {//同步信息
          
         this.setRectsValue(index,item,typeTag);
 
     });
      
    }
  },

  methods: {
    pdfInit(pdfUrl){
       this.pdfUrl = pdfUrl; // pdfContainer 
      if(this.$refs.pdfViewref){
        this.$refs.pdfViewref.forEach(item=>{
          item.showTag = false;
        })
      }
      this.jumpto(0)
      
      this.initPDF();
    },
    complet(nowNum){
      // return false;
      // this.nowNum++;
      if(nowNum<this.pdfNumTotal-1){
        nowNum++
        let width = this.conWidth
        
        if(this.pdfConfig.type=='none'){
          width = 150;
          
        }
     
         
        this.$refs.pdfViewref[nowNum].setPdfDoc(this.pdfDoc_,width)
      }else{
        this.completTag = true;
        this.$emit("finishPdf")
      }
    },
    async initPDF() {
      //初始化pdf
     this.pdfNumTotal =0;
      let pdfDoc_ = await pdf.getDocument({
        //获取到了pdf对象
        url: this.pdfUrl,
        // cMapUrl: bcmap(),
        // cMapPacked: true
      }) //.then(function(pdfDoc_) {

      this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
      this.pageSet();
      this.$emit("initPdf")
  
      this.initPage = 0
      this.pdfDoc_ = pdfDoc_
      this.$nextTick(() => {

         let width = this.conWidth
        if(this.pdfConfig.type=='none'){
          width = 150;
          
        }
        this.$refs.pdfViewref[0].setPdfDoc(this.pdfDoc_,width);
        
      })
    },
    changePage(chagneNum){
       
         let realIndex = this.realIndex+chagneNum;
         console.log(realIndex,"realIndex",this.realIndex,chagneNum)
         if(realIndex<0){
            return false;
         }else if(realIndex==this.pdfNumTotal){
            return false;
         }
        
        this.realIndex = realIndex;
        this.tosomgWhere(realIndex)
    },

    tosomgWhere(num){
        let h = 0;
         
        this.imgUrlInfo.forEach((item,index)=>{
            if(index<num){
                h+=item.height*this.scaleBox
            }
        })
       
        this.jumpto(h+4)
    },
    getSomePageHeight(page){
      let top = 0;
      
      this.imgUrlInfo.forEach((li,liindex)=>{
         
          if(liindex<page-1){
              top+=li.height*this.scaleBox;
              
          }
      })
      return top;
    },
    realNum(num,page){
      let numB = num/this.imgUrlInfo[page-1].scale;
      return numB;
    },
    jumpto(top,type){
      
      this.$refs['content-box'].scrollTop = top//+'px';
       
    },

    windowScroll(e) {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
       
      let boxHeight = this.$refs['content-box'].offsetHeight * 2 //this.boxHeight*2//
      if (e) {
        let scrollTop = e.srcElement.scrollTop || e.target.scrollTop
        let scrollLeft = e.srcElement.scrollLeft || e.target.scrollLeft
        this.scrollLeft = scrollLeft.toFixed(2)
  
        this.scrollTop = scrollTop.toFixed(2)
        // 上面是原来的逻辑
        this.scrolls = scrollTop.toFixed(2)
         
    
        
      }
      
      let h = 0
      let nowindex = 0;
      let realIndex = 0;
      this.imgUrlInfo.forEach((item, index) => {
        //imgUrlInfo 所有pdf页宽高的集合
        if (Number(this.scrolls)  > h) {
          //scaleBox 双指放大缩放比例
          realIndex= index
           
        }
        if (Number(this.scrolls) + boxHeight * this.scaleBox > h) {
          //scaleBox 双指放大缩放比例
          nowindex= index
          
          if(this.scrollNum<index){
            this.scrollNum = index;
          }
        }
        h += item.height * this.scaleBox
       
      })
 
      this.nowindex =nowindex
      this.realIndex = realIndex;
      if (this.showNum < this.scrollNum) {
        this.showNum = this.scrollNum
        this.$refs.pdfViewref.forEach((item, index) => {
          if (this.showNum >= index) {
            item.showPdf()
          }
        })
      }
      if (!e) {
       
        this.$refs['pdfViewref'].forEach((item, index) => {
          if (this.showNum > index) {
            item.showPdf()
          }
        })
      }
      
    },
    broIndex(item){
        this.brotherIndex = item;
        this.$emit("broindex",item);
    },
    markSize(item) {
      if(this.pdfConfig.type==1){

        let index = item.obj.page-1
        
        this.$refs.pdfViewref[index].markSize(item)
      }
    },
    witchPage() {
            //获取page和y
          let scroll = this.scrolls;
          let editInfo = this.editInfo;
          let x = this.conWidth/2;
          let h = 0;
          let y = 0;
          let n = -1;
          let h2 = 0;
          
          if(editInfo){//realNum
            
              
             this.imgUrlInfo.forEach((item, index) => {
               
              if (h <= scroll) {
                  n = index+1;
                  y = (scroll-h+(editInfo.coordinatesY+editInfo.boxHeight/2))/ this.scaleBox;
              }
              h += (item.height+3)*this.scaleBox;//高度需要加3
               
            });
            let box = this.$refs.pdfViewref[n-1].$el.getBoundingClientRect()
            // y = y-box.top;
            let boxLeft = box.left
            x = ((editInfo.coordinatesX-boxLeft)+editInfo.boxWidth/2)/ this.scaleBox;;
           
          }else{

            this.imgUrlInfo.forEach((item, index) => {
                h2 += item.height;
                // if (n == -1) {
                    if (h <= scroll) {
                        n = index+1;
                        y = scroll - h + this.conHeight / 2 + 60;
                    }
                    h += item.height;
                // }
            });
            if (this.conHeight - 240 > h2) {
                y = h2 - h2 / 2 + 100;
            }
          }
          
         
          return { page: n, y: this.realNum(y,n),x:this.realNum(x,n) };
    },
    setRects(){

    },
    beforReal(nul,item){
      let {y,page,x} = this.witchPage();
        let objInit = {
            left: x,
            top: y,
            code: this.activeCom.code,
            method:this.activeCom.method,
            width: 0,
            height: 0,
           
            hideTag: false,
            chapterType: nul,
            bgClass: this.activeCom.bgClass,
            page:page,

            sealId:item.id,
            imgUrl:item.fileImg,
            isDraggable:true,
            fileId:this.activeFileObj.fileId,
            hideDel:false,
            content:"",
            remark:'',
            active:true,
            uuid:uuid(),
            valSetting:{
              fontColor:'#000000'
            },
            lock:true,
            lock2:false,
            rotatable:true,
            degree:item.degree||0
             

        };
      // let area  = this.activeFileObj.signSetting;
            // if(area){
            //     area = JSON.parse(area);
            //     let jumpObj = {top:0}
            //     let code=this.activeCom.code
            //     this.$message.success("已在签署区域添加"+(nul==1?'签字':'印章'))
            //     area.forEach((item2,index)=>{
            //         if(item2.code==code){
            //             if((nul==ChapterTypes.SIGN&&item2.chapterType==ChapterTypes.SIGNAREA)){
            //                 objInit.y1 = item2.y1;
            //                 objInit.x1 = item2.x1;
            //                 let obj2 =SignInitialize(JSON.parse(JSON.stringify(objInit)))// JSON.parse(JSON.stringify(objInit))
                           
            //                 obj2.chapterType = ChapterTypes.SIGN;
            //                 obj2.page = item2.page;
            //                 obj2.isDraggable = false;
            //                 let top = this.getSomePageHeight(item2.page)
            //                 jumpObj.left = this.realNum(item2.x1,item2.page);
            //                 jumpObj.top = top+this.realNum(item2.y1,item2.page);//用于跳转页面
            //                  this.signInit(obj2)
            //             }else if((ChapterTypes.SEAL&&item2.chapterType==ChapterTypes.SEALAREA)){
            //                  objInit.y1 = item2.y1;
            //                 objInit.x1 = item2.x1;
            //                 let obj2 =SignInitialize(JSON.parse(JSON.stringify(objInit)))// JSON.parse(JSON.stringify(objInit))
            //                 obj2.chapterType = ChapterTypes.SEAL;
            //                 let top = this.getSomePageHeight(item2.page)
            //                 jumpObj.left = obj2.x1;
            //                 jumpObj.top = top+Number(item2.y1);//用于跳转页面
            //                 obj2.page = item2.page;
            //                 obj2.isDraggable = false;
                             
            //                  this.sealInit(obj2)
            //             }else if(item2.chapterType==ChapterTypes.TIMAREA){
                            
            //                 if(!item2.cid){

            //                     item2.cid = this.cid;
            //                     // this.$set(this.activeFileObj,"signSetting",JSON.stringify(area))
            //                     this.cid++
            //                 }
                           
            //                     this.setTime(item2,index);
            //             }   
            //         }
            //     })
            //      this.jumpto( jumpObj.top)
                
            // }else{
              
              if(nul==ChapterTypes.SIGN){//单独签字签署
                  let signObj = SignInitialize(JSON.parse(JSON.stringify(objInit)))
                  if(item.writeId){
                    signObj.writeId = item.writeId;
                  }
             
                  this.signInit(signObj)
  
              }else if(nul==ChapterTypes.SEAL){//单独印章签署
                objInit.sealWidth =  item.sealWidth||42;
                objInit.sealHeight = item.sealHeight||42;//印章不能缩放并且有自己的宽高
                  let signObj = SealInitialize(JSON.parse(JSON.stringify(objInit)))
                  this.sealInit(signObj)
              }else if(nul==ChapterTypes.FORMALTIME){//时间
                  let signObj = TimeInitialize(JSON.parse(JSON.stringify(objInit)))
                  signObj.valSetting.content = item.time;
                  
                  this.timeInit(signObj)
              }else if(nul==ChapterTypes.TEXT){//文本
                  // let signObj = TimeInitialize(JSON.parse(JSON.stringify(objInit)))
                  // this.timeInit(signObj)
                  objInit.width = this.realNum(250,page);
                  objInit.height = this.realNum(100,page);
                  objInit.textstyle={
                      'fontSize':13,
                      'lineHeight':18,
                      'textAlign':'left',
                      'fontFamily':'宋体',
                      'content':'',
                      
                  }
                  objInit.isVerify = true;
                  this.areaInit(objInit)
              }
              // else if (nul == ChapterTypes.PERFORATION) {//骑缝章  骑缝章没有指定则不可直接拖拽
                  // objInit.width = this.realNum(107,page);
                  // objInit.height = this.realNum(16,page);
                  // this.areaInit(objInit)
              // } 
            // }
    },
    async beforSetReacts(nul,item){
            console.log(nul,"nul")
            let {y,page,x} = this.witchPage();
            let objInit = {
                left: x,
                top: y,
                code: this.activeCom.code,
                method:this.activeCom.method,
                width: 0,
                height: 0,
                hideTag: false,
                chapterType: nul,
                bgClass: this.activeCom.bgClass,
                page:page,
                sealId:item.id,
                imgUrl:item.fileImg,
                isDraggable:true,
                fileId:this.activeFileObj.fileId,
                hideDel:false,
                content:"",
                remark:'',
                active:true,
                uuid:uuid(),
                valSetting:{
                  fontColor:'#000000'
                },
                lock:true,
                lock2:false,
                rotatable:true,
                degree:item.degree||0
                 

            };
            if (nul == ChapterTypes.SEALAREA) {//印章区域
                objInit.width =  this.realNum(120,page);
                objInit.height = this.realNum(120,page);
                objInit.valSetting = {
                  sealType:'entSeal'
                }
               
                this.areaInit(objInit)
            } else if (nul == ChapterTypes.TIMAREA) {//时间区域
                objInit.width = this.realNum(130,page);
                objInit.height = this.realNum(20,page);
                this.areaInit(objInit)
            } else if (nul == ChapterTypes.SIGNAREA) {//签字区域
              objInit.width = this.realNum(80,page);
              objInit.height = this.realNum(28,page);
              this.areaInit(objInit)
            }else if (nul == ChapterTypes.TEXTAREA) {//文本区域
                objInit.width = this.realNum(250,page);
                objInit.height = this.realNum(100,page);
                let name = this.getTextName()
                objInit.valSetting={
                  isVerify:true,
                  mark:'',
                  fontColor:'#000000',
                  textTitle:name,
                  defaultText:'',
                  'fontSize':13,
                  'textAlign':'left',
                  'fontFamily':'宋体'
                }
                // objInit.isVerify = true;
                this.areaInit(objInit)
            } else if (nul == ChapterTypes.PERFORATIONAREA) {//骑缝章区域
              
              objInit.axis = 'y';
              // objInit.parent = true;
              objInit.resizable = false;
              objInit.rotatable = false;
              objInit.pageCopy = objInit.page;
              this.perforationAreaInit(objInit,0)
              
            } else if (nul == ChapterTypes.TEXTELEMENTAREA) {//组件域
              
            
            
              objInit.width = this.realNum(item.width,page);
                objInit.height = this.realNum(item.height,page);
              objInit.valSetting =Object.assign({},{
                isVerify:true,
                mark:'',
                fontColor:'#000000',
                textTitle:'',
                defaultText:'',
                'fontSize':13,
                'textAlign':'left',
                'fontFamily':'宋体',
              }, item.valSetting);
              objInit.lock = false;
           
              
              if(item.isAdc){
                  objInit.resizable = false;
              }else{
                  objInit.resizable = true;
              }
              console.log(objInit,"objInitobjInit")
              this.textElementAreaInit(objInit,0)
              
            }
    }, 
    beforSetReactsArea(showType){//pdf加载完成后自动执行
       
      let area  =  this.activeFileObj.signSetting2?JSON.parse(JSON.stringify(this.activeFileObj.signSetting2)):[]
      
      this.$set(this,'rects',[])
      if(area.length>0){
        let code=this.activeCom.code
        console.log(area,"area")
        area.forEach(item=>{
          if(showType=='set'){
           this.pushRects(item,{
                imageUrl:'',
                obj:item,
            })
             
          }else if(showType=='sign'&&item.code==code){
            this.pushRects(item,{
                imageUrl:'',
                obj:item,
            })
            
          }else if(showType=='signAndArea'){
            // item.signAndArea = true;

            this.pushRects(item,{
                imageUrl:'',
                obj:item,
            })
          }
        })
      }
      
    },
       signInit(signObj){
            // this.$set(signObj, 'top', signObj.top- signObj.height/2);
            this.$set(signObj, 'left', signObj.left- signObj.width/2);
            this.$set(signObj, 'top', signObj.top- signObj.height/2);
           
            this.pushRects(signObj,{
                imageUrl:signObj.imgUrl,
                obj:signObj,
            })
            // this.rects.push(signObj);
            // this.markSize({
            //     imageUrl:signObj.fileImg,
            //     obj:signObj,
            //     index:this.rects.length - 1
            // })
       },
       sealInit(signObj){
          this.$set(signObj, 'left', signObj.left- signObj.width/2);
          this.$set(signObj, 'top', signObj.top- signObj.height/2);
          this.pushRects(signObj,{
                imageUrl:'',//signObj.imgUrl,//不用获取印章的宽高比了
                obj:signObj,
            })
        // this.rects.push(signObj);
        // this.markSize({
        //     imageUrl:signObj.fileImg,
        //     obj:signObj,
        //     index:this.rects.length - 1
        // })
       },
       async timeInit(signObj){
            // let {data} = await findTime();
                    
            this.$set(signObj, 'left', signObj.left- signObj.width/2);
            this.$set(signObj, 'top', signObj.top- signObj.height/2);
            this.pushRects(signObj,{
                imageUrl:"",
                obj:signObj,
            })
            // this.rects.push(signObj);
            // this.markSize({
            //     imageUrl:"",
            //     obj:signObj,
            //     index:this.rects.length - 1
            // })
       },
       areaInit(signObj){
      
        
        signObj.left = signObj.left-signObj.width/2
        signObj.top = signObj.top-signObj.height/2
        this.pushRects(signObj,{
            imageUrl:'',
            obj:signObj,
        })
        // this.rects.push(signObj)
        // this.markSize({
        //     imageUrl:'',
        //     obj:signObj,
        //     index:this.rects.length-1
        // })
       
        
       },
       textElementAreaInit(signObj){
         signObj.left = signObj.left-signObj.width/2
          signObj.top = signObj.top-signObj.height/2
          this.pushRects(signObj,{
              imageUrl:'',
              obj:signObj,
          })
       },
       perforationAreaInit(signObj2,page){
         
          let signObj = JSON.parse(JSON.stringify(signObj2))
          let signObjCopy = JSON.parse(JSON.stringify(signObj2))
        // for(let i =0;i<this.pdfNumTotal;i++){
          if(signObjCopy.pageCopy!=page+1){
            signObj.active=false;
          }
            
          signObj.page = page+1
          signObj.width = this.realNum(120,signObj.page);
          signObj.height = this.realNum(120,signObj.page);
          let width = this.imgUrlInfo[signObj.page-1].width
        
          signObj.left = this.realNum(width,signObj.page)-signObj.width
          signObj.top = signObj.top-signObj.height/2

          this.pushRects(signObj,{
              imageUrl:'',
              obj:signObj,
          })
          
          let pages = page+1
          if(page<this.pdfNumTotal-1){
            this.perforationAreaInit(signObjCopy,pages )
          }
       
        
       },
       perforationInit(signObj){
        signObj.left = this.conWidth-signObj.width
        signObj.top = signObj.top-signObj.height/2
        this.pushRects(signObj,{
            imageUrl:'',
            obj:signObj,
        })
        // this.rects.push(signObj)
        // this.markSize({
        //     imageUrl:'',
        //     obj:signObj,
        //     index:this.rects.length-1
        // })
       },
       setTime(item){
            let tag = false;
         
            this.rects.forEach(async (i,index)=>{
               
                if(i.cid==item.cid&&!i.hideTag){
                    tag = true;
                    // let {data} = await findTime();
                    this.$set(i, 'content', this.nowTime)
                       
                 
                }
                 
            })
            
            if(tag){

                return false;
            }else{
               this.timeInit(item)
                // this.setReacts(6,item)
            }
      },
      setRectsValue(index,item,typeTag){//通过左侧信息栏修改rects数据
        if(this.rects[index].chapterType==ChapterTypes.PERFORATIONAREA){
          let uuid = this.rects[index].uuid;
          this.rects.forEach((item2,index2)=>{//index2!=index&&
                if(item2.uuid==uuid&&(item2.chapterType==ChapterTypes.PERFORATION||item2.chapterType==ChapterTypes.PERFORATIONAREA)){
                      this.$set(this.rects[index2],typeTag,item[typeTag]);
                      //  this.$set(this.rects[index2],'top',top)
                      if(typeTag=='code'){
                        this.$set(this.rects[index2],'bgClass',item['bgClass'])
                       
                      }
                      
                    
                }
            })
            if(typeTag=='code'){

              bus.$emit("subNum")
            }
        }else{

          this.$set(this.rects[index],typeTag,item[typeTag]);
           
          if(typeTag=='code'){
            this.$set(this.rects[index],'bgClass',item['bgClass'])
            bus.$emit("subNum")
          }
        }
      },
      pushRects(signObj,obj){
        let tractObj = JSON.parse(JSON.stringify(signObj))
        // tractObj.lock = false
        // tractObj.lock2 = true;
         console.log(signObj,"signObj")
        this.rects.push(tractObj)
        obj.index = this.rects.length-1
        obj.obj = tractObj;
        this.markSize(obj)
        bus.$emit("subNum")
      },
      getTextName(){
        let i = 1;
        this.rects.forEach(item=>{
          if(item.chapterType==ChapterTypes.TEXTAREA){
            i++
          }
        })
        return '文本组件'+i;
      },
      initPercent(){
        let scrollTop = Number(this.scrollTop);
        let scrollLeft = Number(this.scrollLeft);
         
        this.minX = this.$refs['content-box'].offsetWidth/2;
        this.minY = this.$refs['content-box'].offsetHeight/2;
        let allHeight = this.$refs.scallclass.offsetHeight*this.scaleBox;
        let allWidth = this.$refs.scallclass.offsetWidth*this.scaleBox;
        console.log(scrollTop,this.minY,allHeight)
        this.percentY =(scrollTop+this.minY)/ allHeight;
        this.percentX =(scrollLeft+this.minX)/ allWidth;
       
      },
      percentGo(num){
        let per = this.percent+num
        if(per>3||per<0.5){
          return false;
        }
        this.percent = per;
        this.sizePdf(per)
      },
      sizePdf(value){
          let api = value
          this.scaleBox = api;
           
          let allHeight = this.$refs.scallclass.offsetHeight//直接获取高度
          let baseWidth = this.$refs.scallclass.offsetWidth
          let scrollLeft2 = (api * baseWidth-this.$refs['content-box'].offsetWidth)*0.5//-this.minX//用比例算出left减去minx就是
          let scrollTop2 = api * allHeight*this.percentY-this.minY//用比例算出left减去miny就是
          if(baseWidth*api >this.$refs['content-box'].offsetWidth){
            this.smallLeft = (baseWidth*api-this.$refs['content-box'].offsetWidth)
          }else{
             this.smallLeft = 0
          }
          // .left;
          console.log(baseWidth,"offsetLeft")
          this.$nextTick(()=>{
             

              this.$refs['content-box'].scrollTo({
                    top: scrollTop2,//滚动高度
                    left:scrollLeft2
               })
             
          })
          //  percentY
      },//this.$refs['content-box'].scrollTop
      pageSet(){
        this.pageArr = [];
        this.realIndex = 0;
        for(let i = 0;i<this.pdfNumTotal;i++){

          let obj = {
            value:i,
            name:(i+1)+'/'+this.pdfNumTotal
          }
            this.pageArr.push(obj)
        }
        
      },
      RealOperation(operationObj,item){
        let {index,operType,batch} = operationObj;
         
        if(operType =='changeSign'){
          if(batch=='one'){
            this.operationSign(index,item)
          }else{
            this.rects.forEach((rectsItem,rectsIndex)=>{
              if(rectsItem.chapterType==ChapterTypes.SIGN||rectsItem.chapterType==ChapterTypes.SIGNAREA){
                this.operationSign(rectsIndex,item)
              }
            })
          }
        }else if(operType =='changeSeal'){
          if(batch=='one'){
            this.operationSeal(index,item)
          }else{
            this.rects.forEach((rectsItem,rectsIndex)=>{
              if(rectsItem.chapterType==ChapterTypes.SEAL||rectsItem.chapterType==ChapterTypes.SEALAREA){
                this.operationSeal(rectsIndex,item)
              }
            })
          }
        }else if(operType =='changeCrossPageSeal'){
            let uuidnow = this.rects[index].uuid
            this.rects.forEach((rectsItem,rectsIndex)=>{
              if((rectsItem.chapterType==ChapterTypes.PERFORATIONAREA||rectsItem.chapterType==ChapterTypes.PERFORATION)&&rectsItem.uuid==uuidnow){
                this.operationCrossPageSeal(rectsIndex,item)
              }
            })
          
        }else if(operType =='changeTime'){
          if(batch=='one'){
            this.operationTime(index,item)
          }else{
            this.rects.forEach((rectsItem,rectsIndex)=>{
              if(rectsItem.chapterType==ChapterTypes.FORMALTIME||rectsItem.chapterType==ChapterTypes.TIMAREA){
                this.operationTime(rectsIndex,item)
              }
            })
          }
        }else if(operType =='changeText'){
            console.log(index,item,"sd")
            this.operationText(index,item)
           
        }else if(operType=='changeElementText'){
           this.operationElementText(index,item)
        }
      },
      operationSign(index,item){
        let reactsItem = JSON.parse(JSON.stringify(this.rects[index]))
        reactsItem.chapterType = ChapterTypes.SIGN;
        if(item.writeId){//是手绘签名
          reactsItem.uploadId = item.writeId;
          reactsItem.sealId = '';
        }else{
          reactsItem.uploadId = '';
          reactsItem.sealId = item.id;
        }
        reactsItem.imgUrl = item.fileImg
        reactsItem.lock2 =false;
        reactsItem.resizable =true;
        this.$set(this.rects,index,reactsItem)
        this.$nextTick(()=>{
          this.markSize({
                imageUrl:item.fileImg,
                obj:reactsItem,
                index:index
            })
        })
      },
      operationSeal(index,item){
        let reactsItem = JSON.parse(JSON.stringify(this.rects[index]))
        reactsItem.chapterType = ChapterTypes.SEAL;
        reactsItem.sealId = item.id;
        reactsItem.imgUrl = item.fileImg
        reactsItem.sealWidth = item.sealWidth||42;
        reactsItem.sealHeight = item.sealHeight||42;
        
        reactsItem.lock2 =false;
        this.$set(this.rects,index,reactsItem)
        this.$nextTick(()=>{
          this.markSize({
                imageUrl:'',
                obj:reactsItem,
                index:index
            })
        })
      },
      operationCrossPageSeal(index,item){
        let reactsItem = JSON.parse(JSON.stringify(this.rects[index]))
        reactsItem.chapterType = ChapterTypes.PERFORATION;
        reactsItem.sealId = item.id;
        reactsItem.imgUrl = item.fileImg
        reactsItem.sealWidth = item.sealWidth||42;
        reactsItem.sealHeight = item.sealHeight||42;
        
        reactsItem.sealHeight = item.sealHeight;
        reactsItem.lock2 =false;
        this.$set(this.rects,index,reactsItem)
        this.$nextTick(()=>{
          this.markSize({
                imageUrl:'',//item.fileImg
                obj:reactsItem,
                index:index
            })
        })
      },
      
      operationTime(index,item){
        let reactsItem = JSON.parse(JSON.stringify(this.rects[index]))
        reactsItem.chapterType = ChapterTypes.FORMALTIME;
        reactsItem.resizable =true;
        
        reactsItem.valSetting.content = item.time;
        reactsItem.valSetting.fontSize = reactsItem.height-6;
        this.$set(this.rects,index,reactsItem)
        
      },
      operationText(index,item){
        let reactsItem = JSON.parse(JSON.stringify(this.rects[index]))
        reactsItem.chapterType = ChapterTypes.TEXT;
        reactsItem.valSetting.content = item.text;
       
        this.$set(this.rects,index,reactsItem)
        
      },
      operationElementText(index,item){
         let reactsItem = JSON.parse(JSON.stringify(this.rects[index]))
        reactsItem.chapterType = ChapterTypes.TEXTELEMENT;
        reactsItem.valSetting.content = item.text;
       
        this.$set(this.rects,index,reactsItem)
      }
  }
}
</script>
<style lang="less">
#the-canvas {
  margin: 0 auto;
}
.smallpdf{
    .pdf-pre{
        cursor:pointer;
    }
    .pdf-num{
        margin:10px 0;
    }
}
.activepdf{
    .pdf-pre{

        border:1px solid #84a6fa
    }
    .pdf-num{
        color:#84a6fa;
        
    }
}
.canvasbox {
  // margin:0 auto;

  width: 50%;
  //  height:844px;

  position: relative;
}
// .shadowp {
//   //  border-bottom:1px solid #999;
//   // border-top:1px solid #999;
//   padding-top: 3px;
//   box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.12);
// }
.canvasstyle {
  position: relative;
  z-index: 1;
}
.pdfbox{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .pdf-footer{
   
        width:100%;
        background-color: #fff;
  
        z-index: 500;
        height:40px;
        line-height: 40px;
        .pdf-page{
            text-align: center;

            span{
                margin:0 10px;
            }
            .pdf-lastpage{
                cursor: pointer;
            }
            .pdf-nextpage{
                cursor: pointer;
            }
        }
    }

    .pdfcontainer{
        width:100%;
        overflow-y: auto;
        margin:0 auto;
        position: relative;
        padding-bottom:40px;
        box-sizing: border-box;
        flex:1;
        display: flex;
        justify-content:center;
        &::-webkit-scrollbar{ /*滚动条整体样式*/
            width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 6px;
            cursor:pointer;
            
        }
        
        &::-webkit-scrollbar-thumb{ /*滚动条里面小方块*/
            border-radius:4px;
            background: #a8a8a8;
            // width:4px;
            // height:4px;
        }
        &::-webkit-scrollbar-track{ /*滚动条里面轨道*/
            border-radius: 10px;
            background: #f1f1f1;
        }
    }
}
.percent-tool{
  width:200px;
  position:absolute;
  right:0;
  top:0px;
  text-align: center;
  .el-input__suffix{
    display: none;
  }
  .el-input--small .el-input__inner{
    width:60px;
    padding-right:0;
  }
  .stepd{
    display: inline-block;
    margin:0 4px;
    font-size:15px;
    cursor: pointer;
  }
}
.page-tool{
  display:inline-block;
  .el-input__suffix{
    display: none;
  }
  .el-input--small .el-input__inner{
    width:60px;
    padding-right:0;
  }
}
.scallclass {
   position:relative;
   display: inline-block;
   text-align: center;
  //  margin:0 auto;
  // transform-origin: 0 0 ;
  overflow: visible;
}
</style>
