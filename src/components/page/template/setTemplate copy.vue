<!--  -->
<template>
    <div class="tempbox" style="height:100%;overflow:hidden;">
        <div class=" bg-white padding-sm tempbox" style="height:100%">
            <div class="cf padding-sm" style="border-bottom:1px solid #ccc;">
                <div class="fr ">
                    <el-button @click="back">上一步</el-button>
                    <el-button @click="tempAdd(0)" v-if="type==1||type==0">存草稿</el-button>
                    <el-button @click="tempAdd(1)" type="primary" v-if="type==1||type==0">下一步</el-button>
                </div>
            </div>
            <div class=" flex h100 ">
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
                        <pdf-view :pdfConfig="{ pdfUrl: pdfUrl,scale: 0.2, pageNum: item }" ref="pdf"></pdf-view>
                    </div> -->
                </div>
                <div class="flex-sub h100 center-box">
                    <div class="pdfbox" ref="pdfbox" >
                        
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
                        <!-- <div ref="pheightpx" v-if="pdfNumTotal>0">
                            <div v-for="item in pdfNumTotal" class="cans">
                                <pdf-view
                                    ref="pdfViewref"
                                    :imgUrlInfo="imgUrlInfo"
                                    :pdfConfig="{ pdfUrl: pdfUrl, scale: scale, pageNum: item, type: 1,sizeType:type }"
                                    :rects="rects"
                                >
                                </pdf-view>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="rightbox">
                    <div class="teptitle margin-sm">模板信息</div>
                    <ul class="tempList">
                        <li :title="item.fileName" v-for="(item, index) in fileList" @click="selectFile(item,index)" :class="{ active: activeIndex == item.id }">
                            <i class="el-icon-document"></i>{{ item.fileName }}
                        </li>
                    </ul>
                    <div class="teptitle margin-sm"><span class="text-blue">第一步：</span>选择签署方</div>
                    <ul class="companyList">
                        <li v-for="(item, index) in comArr" :class="{ comopci: index != comIndex }" @click="selectCom(item, index)">
                            <p :style="{'background-color':item.bgClass}">{{ item.name }} （{{item.type==1?"个人":"企业"}}）</p>
                            <i class="el-icon-success comi text-green" v-if="index == comIndex"></i>
                        </li>
                    </ul>
                    <div class="teptitle margin-sm" ref="ddd" v-if="type==1||type==0">点击添加以下控件</div>
                    <div class="flex" v-if="type==1||type==0">
                        <div class="flex-sub obj-li" v-if="activeCom.method==0||activeCom.method==2" @click="setReacts(3)">签名</div>
                        <div class="flex-sub obj-li" v-if="activeCom.method==1||activeCom.method==2" @click="setReacts(4)">印章</div>
                        <div class="flex-sub obj-li" @click="setReacts(5)">日期</div>
                    </div>
                
                </div>
                
            </div>
        </div>
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext" :verifyTag='false'></auth-code>
    </div>
</template>

<script>
// import pdf from 'pdfjs-dist';
// import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import PdfView from '../../common/pdfView';
import pdfContainer from '../../common/pdfContainer';
import AuthCode from '../../common/authCode';
import {editTemplate,findTemplate,completeTemplate } from '../../../api/template.js';
import {downloadFile} from '../../../api';
import {ChapterTypes} from '../contract/signUtile.js'
let loading = null;
export default {
    components: {
        AuthCode,pdfContainer
    },//PdfView,

    data() {
        return {
            tempId:"",
            type:"",
            tempInfo:{},
            rects: [],
            rectsObj: {},
            fileList: [
                // { fileName: '333.jpeg', url: 'http://esign.agilestar.cn:9080/contract/downloadTest/333.pdf', id: 1 },
                // { name: '444.jpeg', url: 'http://esign.agilestar.cn:9080/contract/downloadTest/444.pdf', id: 2 }
            ],
            fileList2:[],
            activeIndex: 1,
            activeNum:0,
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
                    // { name: '甲方', entName: '北京爱知之星', mobile: '183466455555', checkList: [1, 2] },
                    // { name: '甲方', entName: '北京爱知之星', mobile: '183466455555', checkList: [1, 2] }
                ]
            },
            comArr: [
                // { name: '甲方（企业）', id: 1 },
                // { name: 'er方（企业）', id: 2 },
                // { name: '刘指导', id: 3 }
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
            brotherIndex:1
       
        };
    },
    created() {
        this.getId();
        this.getType();
        this.getById();
        this.getinfo();
    },
    mounted() {
         this.containerHeight = this.$refs.pdfbox.offsetHeight;
        this.containerWidth = this.$refs.pdfbox.offsetWidth;
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
        getId(tag) {
            this.tempId =this.$route.query.tempId// this.$store.getters.tempId;
        },
        getType(){
          this.type =this.$route.query.tempType// this.$store.getters.tempType;
          
        },
        async getById(){
          let {data} = await findTemplate({id:this.tempId});
          let arr = [];
          let arr2 = [];
          this.tempInfo = JSON.parse(JSON.stringify(data));
          data.files.forEach(item=>{
            item.url = downloadFile(item.fileId)
            if(item.fileType==1){
              arr.push(item)
            }else{
                arr2.push(item)
            }
            if(item.signSetting){
               let signSetting2 = JSON.parse(item.signSetting);
                signSetting2.forEach(j=>{
                    var tagflag = true;
                    if(this.type==1||this.type==0){
                        j.isDraggable = true;
                    }else{
                        j.isDraggable = false;
                    }
                    data.players.forEach(i=>{
                        console.log(i.code,j.code)
                        if(i.code==j.code){
                            tagflag = false;
                        }
                    })
                    if(tagflag){
                        j.hideTag = true;
                    }
                })
              item.signSetting2 = signSetting2//JSON.parse(item.signSetting)
            }else{
              item.signSetting2 = [];
            }
          

          })
           data.players.forEach((item,index)=>{
                if(index<6){

                    item.bgClass = this.bgArr[index]
                }else{
                    item.bgClass =this.randomRgb();
                }
            })
          this.comArr = data.players;
          this.fileList = arr;
          this.fileList2 = arr2;
          if(!this.pdfUrl){
            this.pdfUrl = data.files[0].url;
            this.activeCom =  data.players[0];
            this.activeIndex =  data.files[0].id
            this.activeNum = 0;
            // this.rects =data.files[0].signSetting2
            
            // data.files[0].signSetting2.forEach(item=>{
             
            //     this.$refs.pdfViewref[item.page - 1].markSize(null, item);
            // })
          }
       
          this.initPDF();
          
          // fileList
          // { name: '333.jpeg', url: 'http://esign.agilestar.cn:9080/contract/downloadTest/333.pdf', id: 1 },
        }, 
        finishPdf(){
            this.showReact();
        },
        showReact(){
            let obj = this.fileList[this.activeNum];
            let container = this.$refs.pdfContainer;
            if (obj.signSetting2) {
                let arr = obj.signSetting2;
                arr.forEach((item)=>{
                    this.rects.push(item)
                    container.markSize({
                        imageUrl:'',
                        obj:item,
                        index:this.rects.length-1
                    })
                })
                // this.rects =[]; 
                // this.$nextTick(()=>{
                //     this.rects = obj.signSetting2
                // })
                
            }else{
                this.rects = [];

            }
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
            await completeTemplate({verifyCode:code,id:this.tempId});
             this.$message.success("保存成功");
             this.$router.push({path:'/template'})
            // })
        },
      async tempAdd(type){
          let tipTile= this.getArea();
          
           
          
            if(type==1){
              if(tipTile.length>0){
                const h = this.$createElement;
                // let str = tipTile.join("，")
                this.$alert(h('div',null, tipTile), '', {
                  confirmButtonText: '确定' 
                });
                return false;
              }
            } 
              
            let model = this.tempInfo;
            let arrFile =this.fileList.concat(this.fileList2)
            model.files =arrFile;
            console.log(model)
            
            let {data} = await editTemplate(model);
          
           
        
             if(type==0){
              this.$message.success("保存成功")
            }else{
               this.$message.success("已保存")
               this.visibleCode = true;
             }
           
       
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
          
        this.fileList.forEach(item=>{
          this.comArr.forEach(o=>{
            obj[item.id+'-'+o.code] = {};
            obj[item.id+'-'+o.code].method = o.method;
            obj[item.id+'-'+o.code].name = o.name;
            obj[item.id+'-'+o.code].acMethod = -1;
            obj[item.id+'-'+o.code].fileName = item.fileName
          })
             
            if(!item.signSetting2||item.signSetting2.length==0){
              tipTile.push(h('p',null,"请添加文件"+item.fileName+"的签署区域") )
            }else{
             let signSetting2 =JSON.parse(JSON.stringify(item.signSetting2))// JSON.parse(item.signSetting)
              let arr = [];
              signSetting2.forEach(i=>{
                if(!i.hideTag){

                  if(i.chapterType==3){
                       
                    if(obj[item.id+'-'+i.code].acMethod==1){
                      obj[item.id+'-'+i.code].acMethod = 2;
                    }else if(obj[item.id+'-'+i.code].acMethod==-1){
                      obj[item.id+'-'+i.code].acMethod = 0;
                    }
                  }else if(i.chapterType==4){
                       console.log(obj[item.id+'-'+i.code])
                    if(obj[item.id+'-'+i.code].acMethod==-1){
                      obj[item.id+'-'+i.code].acMethod =1;
                    }else if(obj[item.id+'-'+i.code].acMethod==0){
                      obj[item.id+'-'+i.code].acMethod =2;
                    }
                  }
                  arr.push(i)
                }
              })
              item.signSetting = JSON.stringify(arr)
            }
           
        })
       
        for(let i in obj){
        
          let oooj = obj[i];
            let str = ""
          if(oooj.method==2){
             if(oooj.acMethod==-1){
               str  = '签字与印章'
             }else if(oooj.acMethod==1){
               str  = '签字'
             }else if(oooj.acMethod==0){
               str  = '印章'
             }
             
          }else if(oooj.method==1){
            if(oooj.acMethod==-1){
               str  = '印章'
             } 
          }else if(oooj.method==0){
            if(oooj.acMethod==-1){
               str  = '签字'
             } 
          }
          if(str){
              tipTile.push( h('p',null,"请添加文件"+oooj.fileName+"下"+oooj.name+"的"+str+"区域") )
            }
        }
        return tipTile
        // console.log(tipTile,"tipTile",this.fileList)
         
      },
        initPDF(url) {
            let _this = this;
            // if(!url){
            //   url = this.pdfUrl;
            // }
            //查询pdf页码
            this.$refs.pdfContainer.pdfInit(this.pdfUrl)
            this.$refs.pdf.pdfInit(this.pdfUrl)
            // pdf.getDocument(_this.pdfUrl).then(function(pdfDoc_) {
            //     _this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
            //     _this.pdfDoc = pdfDoc_;
            //     // if (url) {
                
            //      _this.$nextTick(()=>{

            //          _this.$refs.pdfViewref.forEach(item => {
            //              // item.init(_this.pdfUrl);
            //              item.setPdfDoc(pdfDoc_)
                        
            //          });
            //          _this.$refs.pdf.forEach(item => {
            //              // item.init(_this.pdfUrl);
            //              item.setPdfDoc(pdfDoc_)
            //          });
            //      })
                     
            //     // }
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
            this.activeNum = index;
            this.activeIndex = item.id;

            // if (obj.signSetting2) {
            //     this.rects =[]; 
            //     this.$nextTick(()=>{
            //         this.rects = obj.signSetting2
            //     })
                
            // } else {
            //     this.rects = [];
            // }
         
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

            this.$refs.pdfbox.scrollTop = top - 134;
        },
        
      
        setReacts(nul) {
            let index = this.pageNum;
            let width = '';
            let height = '';
            
            let container = this.$refs.pdfContainer;
            let {y,page,x} = this.$refs.pdfContainer.witchPage();
            
            if (nul == ChapterTypes.SEALAREA) {
                width =  container.realNum(120,page);
                height = container.realNum(120,page);
            } else if (nul == ChapterTypes.TIMAREA) {
                width = container.realNum(107,page);
                height = container.realNum(16,page);
            } else if (nul == ChapterTypes.SIGNAREA) {
                width = container.realNum(80,page);
                height = container.realNum(28,page);
            }
               
            let obj = {
                left: x,
                top: y,
                code: this.activeCom.code,
                method:this.activeCom.method,
                width: width,
                height: height,
                hideTag: false,
                chapterType: nul,
                page:page,
                isDraggable:true,
                bgClass: this.activeCom.bgClass,
                hideDel:true
            };
            this.rects.push(obj)
            container.markSize({
                imageUrl:'',
                obj:obj,
                index:this.rects.length-1
            })
            // let liheight = this.$refs.pdfViewref[0].getHeight(); //每个pdf页面的高度
            // let page = Math.ceil((obj.top + 100) / liheight); //计算应当处于哪一页

            // if (page == 0) {
            //     page = 1;
            // }

            // obj.page = page;
            // obj.top = obj.top - (page - 1) * liheight + 100;
            
            // this.$refs.pdfViewref[page - 1].markSize(null, obj);
        },
       
        broindex(item){
           
            this.$refs.pdfContainer.tosomgWhere(item-2)
        },
        initPdf(){
            this.pdfShowTag = true;
        },
    }
};
</script>
<style lang="less">
// .rightbox {
//     width: 260px;
// }
// .leftbox {
//     width: 200px;
//     position: relative;
//     text-align: center;
//     left: -20px;
//     z-index: 400;
//     background-color: #f8f9f9;
//     // overflow-y: scroll;
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
        //  width: 100%;   /*一定要设置宽度，或者元素内含的百分比*/
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
.pdfbox {
    // overflow: scroll;
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
}
</style>
