<!--  -->
<template>
    <div class="canvasbox" style="position:relative" :class="{shadowp:pdfConfig.type==1}" ref="canvasbox" :style="canvasboxStyle">
     
      <canvas :id="'the-canvas' + ids" class="canvasstyle" :style="canvasboxStyle"></canvas>
       <resize :scaleBox="scaleBox"  :imgUrlInfo="imgUrlInfo" ref="rize" v-if="rects.length>0"  :rects.sync="rects"  :page_num="pageNum"  :scale="sizeConfig.scale"   @ends="ends()" :config="sizeConfig" ></resize>
    </div>
 
</template>

<script>
import Resize from './vuedragresize/resize'
import {ChapterTypes,calcWH} from '../page/contract/signUtile.js'
export default {
    props: {
        scaleBox:Number,
        pageNum:Number,
        pdfConfig: {
            type: Object,
            required: true,
            default: {}
        },
        rects: Array,
        imgUrlInfo:{
          type:Array
        } 
    
        
  },
  components: {
    Resize
  },
  // watch:{
  //   rects(){
    
  //      this.$emit("update:rects", this.rects);
       
  //   }

  // },
  
  data() {
    
    return {
   
        ids:"",
        pdfUrl: "", //,// 这里是pdf文件地址，后台给的流文件请求地址也是可以的
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
          apis:1,
          liwidth:0,
          liheight:0,
          parentH:0

        } ,
        ctxDpr:false,
        viewport:'',
        showTag:false
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
    async setPdfDoc(pdfDoc_, width) {
      //pdf 渲染
    
      this.scaleWidth = width //屏幕宽度
      this.pdfDoc = pdfDoc_ //pdf对象
      await this.renderPage(this.pageNum)
    },
    renderPage() {
      // 渲染pdf
      this.pageRendering = true
      const canvas = document.getElementById('the-canvas' + this.ids) //获取到canvas
      let dpr = window.devicePixelRatio // 假设dpr为2
      if (this.ctxDpr) {
        //防止canvas失真

        this.ctx.scale(dpr, dpr)
        this.ctxDpr = dpr
      }
      
      if(this.pdfConfig.type == 1) {
        dpr = dpr*2
      }
      // Using promise to fetch the page
      this.pdfDoc.getPage(this.pageNum).then(page => {
        this.pdfRender = page //当前页对象
        var viewport = page.getViewport(1* dpr) //可以获取pdf的视图
        let apis =1// this.scaleWidth / viewport.width //手机pdf的缩放比例
       
        if(this.pdfConfig.type != 1) {
           
          apis =this.scaleWidth / viewport.width/dpr //手机pdf的缩放比例 
          viewport = page.getViewport(apis * dpr) //可以获取pdf的视图
        }
        
        this.viewport = viewport;
        this.apis = apis
        canvas.height = viewport.height 
        this.pdfWidth = canvas.width = viewport.width
        this.pdfHeight = viewport.height 
     

        if (this.pdfConfig.type == 1) {
            this.$set(this,'sizeConfig',{
                scale: apis,
                liheight: viewport.height/dpr,
                liwidth: viewport.width/dpr,
                parentH: viewport.height/dpr,
               
            })
             
            

        }
          this.imgUrlInfo[this.pageNum - 1] = {//统计pdf的宽高
            width: viewport.width/dpr,
            height: viewport.height/dpr,
            scale: apis //apis
          }
       

        this.canvasboxStyle = {
          width: viewport.width/dpr + 'px',
          height: viewport.height/dpr + 'px'
        }
        // var renderContext = {
        //   canvasContext: this.ctx,
        //   viewport: viewport3
        // };

        // var renderTask = page.render(renderContext);
        if (this.pageNum <= 3) {
          //懒加载
          this.showPdf()
        }
        
        let num = this.pageNum
        this.$emit('completOne', num-1)
       
        // Wait for rendering to finish
        // renderTask.promise.then(function() {
        //   this.$emit('finish');
        //   this.pageRendering = false;
        //   if(this.pdfRef){
        //     this.$emit("rederingFinish",this.pageNum-1,this.pdfRef)
        //   }

        // });
      })
     
    },
    showPdf() {
      // pdfRender
      if (!this.showTag) {
        this.showTag = true
        // let viewport3 = this.pdfRender.getViewport(this.apis * this.dpr)
        var renderContext = {
          canvasContext: this.ctx,
          viewport:this.viewport// viewport3
        }
        var renderTask = this.pdfRender.render(renderContext) //pdf真实canvas渲染
        renderTask.promise.then(() => {
          // this.$emit('finish');
          this.pageRendering = false
          
        })
      }
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
      if (this.pdfConfig.pageNum <= 1) {
        return;
      }
      this.pdfConfig.pageNum--;
      this.queueRenderPage(this.pdfConfig.pageNum);
    },
    next() {
      // 下一页
      const vm = this;
      if (this.pdfConfig.pageNum >= this.page_count) {
        return;
      }
      this.pdfConfig.pageNum++;
      this.queueRenderPage(this.pdfConfig.pageNum);
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
    markSize(row) {//src, obj, back,length,isArea
        //设置签字的长宽
        let _this = this;
        let src = row.imageUrl;
        let length = row.index;
        let obj = row.obj;
        let scale = this.imgUrlInfo[obj.page-1].scale;
        let top = obj.y1?obj.y1:obj.top//区分是已经保存过的还是新的
        let left = obj.x1?obj.x1:obj.left//区分是已经保存过的还是新的
        this.$set(obj, 'top', top*scale);
        this.$set(obj, 'left', left*scale);

        let width = obj.width2?obj.width2:obj.width
        let height = obj.width2?obj.height2:obj.height; // Number((h1 * Number(scale)).toFixed(2) + 2)
        if (obj.chapterType  == ChapterTypes.SEAL||obj.chapterType  == ChapterTypes.PERFORATION) {
          console.log(obj.sealWidth,"obj.sealWidth")
          width = obj.sealWidth/25.4*72
          height = obj.sealHeight/25.4*72
        }
        
        // obj = this.rects[length]
         
        if(src){//签字  盖章
          this.getImageWidth(src, (w1, h1) => {
              let sl = 0;
             
           
              // if (obj.chapterType == ChapterTypes.SIGN) {
               
                   
                  width = Number(((w1 / (h1 / height)) * Number(scale)).toFixed(2)); //Number((w1 * Number(scale)).toFixed(2));
                  height = Number((height * Number(scale)).toFixed(2));
            
              // } else if (obj.chapterType  == ChapterTypes.SEAL) {
               
              //     width = Number((width * Number(scale)).toFixed(2)); 
              //     height = Number(((h1 / (width / sl)) * Number(scale)).toFixed(2));
              // }
              this.$set(obj, 'width', width);
              this.$set(obj, 'height', height);
               
              // this.$set(obj, 'top', obj.top- height/2);
              // this.$set(obj, 'left', obj.left- width/2);
              this.$nextTick(()=>{
                  this.$refs.rize.resize(obj, length,"stopInit")
              })
          });
      }else{
          
          let widthNew = (width* Number(scale)).toFixed(2); //Number((w1 * Number(scale)).toFixed(2));
          let heightNew = (height* Number(scale)).toFixed(2); // Number((h1 * Number(scale)).toFixed(2) + 2)
      
          this.$set(obj, 'width', Number(widthNew));
          this.$set(obj, 'height', Number(heightNew));
          // if(obj.chapterType  == ChapterTypes.PERFORATION){//正常应该会自动调节
          //    let widthOne = this.imgUrlInfo[obj.page-1].width
          //     this.$set(obj, 'left',widthOne-widthNew);
            
          // }
          this.$nextTick(()=>{
             
            this.$refs.rize.resize(obj, length,"stopInit")
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
  border-bottom:1px solid #999;
}
.shadowp{
  //  border-bottom:1px solid #999;
  //   border-top:1px solid #999;
    box-shadow: 1px 2px 3px 3px  #ccc;
}
.canvasstyle{
  position: relative;
  z-index:1;
}

</style>
