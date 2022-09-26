<!--  -->
<template>
    <div class="canvasbox" :class="{shadowp:pdfConfig.type==1}" ref="canvasbox" :style="canvasboxStyle">
     
      <canvas :id="'the-canvas'+ids" class="canvasstyle" ></canvas>
       <resize :imgUrlInfo="imgUrlInfo" ref="rize" v-if="rects"  :rects="rects"  :page_num="page_num"  :scale="sizeConfig.scale"   @ends="ends()" :config="sizeConfig" ></resize>
    </div>
 
</template>

<script>
import Resize from './vuedragresize/resize'
import pdf from 'pdfjs-dist';
import pdfjsWorker from '../../assets/js/pdf-dist/pdf.worker.entry.js';
 

 
pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export default {
    props: {
        pdfConfig: {
            type: Object,
            required: true,
            default: {}
        },
        rects: {
            type: Array
        },
        imgUrlInfo:{
          type:Array
        } 
    
        
  },
  components: {
    Resize
  },
  
  data() {
    
    return {
    //   pdfObj:{},
    //     pdfConfig:{
    //         pdfUrl:'http://esign.agilestar.cn:9080/contract/downloadTest/444.pdf',
    //         scale:1,
    //         pageNum:1
        

    //   },
        ids:"",
        pdfUrl: "", //'http://esign.agilestar.cn:9080/contract/downloadTest/444.pdf',// 这里是pdf文件地址，后台给的流文件请求地址也是可以的
        pdfDoc: null, // pdfjs 生成的对象
        // pageNum: 1, //
        pageRendering: false,
        pageNumPending: null,
        // scale: 1.5, // 放大倍数
        page_num: 0, // 当前页数
        page_count: 0, // 总页数
        maxscale: 2, // 最大放大倍数
        minscale: 0.8, // 最小放大倍数
        canvasboxStyle:{},
        rectsbow:[],
        pdfWidth:0,
        pdfHeight:0,

        chapterType:3,
        tagtrue:true,
        pdfRef:'',
        sizeConfig:{

        } ,
        ctxDpr:false
    }
  },
  computed:{
    ctx() {
            const id = document.getElementById("the-canvas"+this.ids);
            return id.getContext("2d");
    }
  },
  created() {
      this.ids = parseInt(Math.random()*10000)
  },
  mounted(){
      // this.setPdfDoc()
  },

  methods: {
    init(url) {
 
      let _this = this;
      // 初始化pdf 如果报错  删除依赖 pdfjs-dis  下载指定版本 yarn add pdfjs-dist@2.3.200
      if(!url){
        url = this.pdfConfig.pdfUrl;

      }
  
      pdf.getDocument(url).then(function(pdfDoc_) {
        _this.pdfDoc = pdfDoc_;
        _this.page_count = _this.pdfDoc.numPages;
    
        if(_this.pdfConfig.pageNum>pdfDoc_.numPages){
          return false;
        }
        _this.renderPage(_this.pdfConfig.pageNum)
      })
    },
    setPdfDoc(pdfDoc_,pdfRef){
      // if(!pdfDoc_){
        this.pdfRef = pdfRef;
        this.pdfDoc = pdfDoc_;

      // }
      this.renderPage(this.pdfConfig.pageNum)
    },
    renderPage(num,scalecha) {
      // 渲染pdf
      const vm = this;
      this.pageRendering = true;
      const canvas = document.getElementById("the-canvas"+this.ids);
      let dpr =window.devicePixelRatio; // 假设dpr为2
      if(this.ctxDpr){
        
        this.ctx.scale(dpr,dpr);
        this.ctxDpr = dpr;
      }
      // Using promise to fetch the page
      this.pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(1);
        let apis = 595/viewport.width;
        if(vm.pdfConfig.type!=1&&vm.pdfConfig.type!=2){
           
          apis = 120/viewport.width
        } 
        viewport = page.getViewport(apis);
        canvas.height = viewport.height;
        vm.pdfWidth = canvas.width = viewport.width;
        vm.pdfHeight =  viewport.height;
    
        if(vm.pdfConfig.type==1){

            vm.sizeConfig={
              scale :apis,
              liheight:viewport.height,
              liwidth:viewport.width,
              parentH:viewport.height,
              isActive:vm.pdfConfig.sizeType,
              
            }
            vm.imgUrlInfo[num-1] = {
              width :viewport.width,
              height:viewport.height,
              scale:apis
            }
           
        }

        vm.canvasboxStyle = {
          width: viewport.width+"px",
          height: viewport.height+"px"
        }
       
        // vm.$refs.canvasbox.style.width = viewport.width;
        // vm.$refs.canvasbox.style.height = viewport.height;
        var renderContext = {
          canvasContext: vm.ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        // if(scalecha){
        //   vm.imgboor(scalecha)
        // }
        // Wait for rendering to finish
        renderTask.promise.then(function() {
          vm.pageRendering = false;
          if(vm.pdfRef){

            vm.$emit("rederingFinish",num-1,vm.pdfRef)
          }
          // if (vm.pageNumPending !== null) {
          //   // New page rendering is pending
          //   vm.renderPage(vm.pageNumPending);
          //   vm.pageNumPending = null;
          // }
        });
      });
      vm.page_num = vm.pdfConfig.pageNum;
    },
    addscale() {
      // 放大
      if (thiss.pdfConfig.scale >= this.maxscale) {
        return;
      }
      thiss.pdfConfig.scale += 0.1;
      this.queueRenderPage(this.pdfConfig.pageNum,0.1);
      // this.imgboor(0.1);
    },
    minus() {
      // 缩小
      if (thiss.pdfConfig.scale <= this.minscale) {
        return;
      }
      thiss.pdfConfig.scale -= 0.1;
      this.queueRenderPage(this.pdfConfig.pageNum,-0.1);
      // this.imgboor(-0.1);
    },
    prev() {
      // 上一页
      const vm = this;
      if (vm.pdfConfig.pageNum <= 1) {
        return;
      }
      vm.pdfConfig.pageNum--;
      vm.queueRenderPage(vm.pdfConfig.pageNum);
    },
    next() {
      // 下一页
      const vm = this;
      if (vm.pdfConfig.pageNum >= vm.page_count) {
        return;
      }
      vm.pdfConfig.pageNum++;
      vm.queueRenderPage(vm.pdfConfig.pageNum);
    },
    queueRenderPage(num,scalecha) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num,scalecha);
      }
    },
    getHeight(){
      return this.pdfHeight;
    },
    markSize(src, obj, back,length,isArea) {
        //设置签字的长宽
        let _this = this;
       
        
       
        if(src){//签字  盖章
          obj = this.rects[length]
          this.getImageWidth(src, (w1, h1) => {
              let sl = 0;
              let scaleNow = 1; // w1/sl;
              let width = 0; //Number((w1 * Number(_this.pdfConfig.scale)).toFixed(2));
              let height = 0; // Number((h1 * Number(_this.pdfConfig.scale)).toFixed(2) + 2)
              
              if (obj.chapterType == 1) {
                  let scale = _this.pdfConfig.scale
                  if(isArea=="area"){
                    scale = 1;
                  }
                  console.log(scale,_this.pdfConfig.scale)
                  width = Number(((w1 / (h1 / 28)) * Number(_this.pdfConfig.scale)).toFixed(2)); //Number((w1 * Number(_this.pdfConfig.scale)).toFixed(2));
                  height = Number((28 * Number(_this.pdfConfig.scale)).toFixed(2));

                  this.$set(obj, 'left', obj.left* Number(scale)+10);
                  this.$set(obj, 'top', obj.top* Number(scale)+1);
              } else if (obj.chapterType == 2) {
                let scale = _this.pdfConfig.scale
                  if(isArea=="area"){
                    scale = 1;
                  }
                  sl = 119;
                  this.$set(obj, 'left', obj.left* Number(scale));
                  this.$set(obj, 'top', obj.top* Number(scale));
                  width = Number((sl * Number(_this.pdfConfig.scale)).toFixed(2)); //Number((w1 * Number(_this.pdfConfig.scale)).toFixed(2));
                  height = Number(((h1 / (w1 / sl)) * Number(_this.pdfConfig.scale)).toFixed(2));
              }

              this.$set(obj, 'width', width);
              this.$set(obj, 'height', height);
              
              // this.rects.push(obj);
               
              this.$nextTick(()=>{
                // setTimeout(()=>{
               
                  this.$refs.rize.resize(obj, length,"stop")
                // },300)
                  
              })
          });
      }else{
          let scale = _this.pdfConfig.scale
          // if(isArea=="area"){
          //   scale = 1;
          // }
          if (obj.chapterType == 6) {
                  this.$set(obj, 'left', obj.left* Number(scale));
                  this.$set(obj, 'top', obj.top* Number(scale));
          }
          let width = (obj.width* Number(scale)).toFixed(2); //Number((w1 * Number(_this.pdfConfig.scale)).toFixed(2));
          let height = (obj.height* Number(scale)).toFixed(2); // Number((h1 * Number(_this.pdfConfig.scale)).toFixed(2) + 2)

          this.$set(obj, 'width', Number(width));
          this.$set(obj, 'height', Number(height));
          if(!obj.signName){

            this.rects.push(obj);
          }
      
          this.$nextTick(()=>{
            
            this.$refs.rize.resize(obj, this.rects.length - 1,"stop")
          })
         
      }
    },
    getImageWidth(url, callback) {
      var img = new Image();
      img.src = url;

      // 如果图片被缓存，则直接返回缓存数据
      if (img.complete) {
          callback(img.width, img.height);
      } else {
          // 完全加载完毕的事件
          img.onload = function() {
              callback(img.width, img.height);
          };
      }
    },
  }
}

</script>
<style lang="less">
#the-canvas{
    margin:0 auto;
    
}
.canvasbox{
  margin:0 auto;
 width:50%;
//  height:844px;

  position: relative;
}
// .shadowp{
//    border-bottom:1px solid #999;
//     border-top:1px solid #999;
//     box-shadow: 1px 2px 3px 3px  #ccc;
// }
.canvasstyle{
  position: relative;
  z-index:1;
}

</style>
