<!--  -->
<template>
  <div>
      <el-row>
          <el-col :span="17">
              <div   class="pdfbox2" ref="pdfbox" :style="{height:baseHeight}" @scroll="windowScroll">

                <div class="text-center margin" v-if="pdfNumTotal==0">
                        <el-upload
                            class="upload-demo"
                            :on-change="getPdf"
                            drag
                            :accept="'.pdf'"
                            :show-file-list="false"
                            :auto-upload="false"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将pdf文件拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                            
                    </div>
                        
                    <div v-if="pdfNumTotal>0" v-for="item in pdfNumTotal" class="cans">

                            <pdf-view style="margin:0px auto;" :pdfConfig="{ pdfUrl: pdfUrl, scale: 1,type:1, pageNum: item }" ref="pdfViewref"  :rects="rects" :imgUrlInfo="imgUrlInfo"></pdf-view> 
                    </div>
              </div>
                    
          </el-col>
          <el-col :span="7" style="background:#fff;overflow-y:scroll;" :style="{height:baseHeight}">
              <div style="text-align:center;">
                  <el-upload
                    class="upload-demo"
                    :on-change="getPdf"
                    style="display:inline-block;margin-right:3px;"
                        
                    :accept="'.pdf'"
                    :show-file-list="false"
                    :auto-upload="false"
                    multiple>
                            <el-button v-if="pdfNumTotal>0" style="margin:10px auto;" block type="primary"> 重新上传</el-button>
                    </el-upload>
                    <el-button type="primary" @click="copyarea" v-if="area2.length>0">复制坐标</el-button>
                 </div>
              <div style="margin-top:10px;text-align:center">点击下方蓝色区域获取坐标</div>
              <div>
                  <span class="blueblock" @click="setReacts(1)"></span>
              </div>
              <div>
                  <ul>
                      <li class="areali"  v-for="item in area2">
                        <span>x: <input type="text" disabled class="showinput" :value="item.position.x"> </span> 
                        <span>y: <input type="text" disabled class="showinput" :value="item.position.y"> </span>
                        <span>page: <input style="width:20px" type="text" disabled class="showinput" :value="item.position.page"> </span>
                        <!-- <span>width: <input type="text" disabled class="showinput" :value="item.style.width"> </span>
                        <span>height: <input type="text" disabled class="showinput" :value="item.style.height"> </span> -->
                      </li>
                  </ul>
                  
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import PdfView from '../../common/pdfView';
import pdf from 'pdfjs-dist';
import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export default {
  components: {PdfView},
  data() {
    return {
        visible:false,
        pdfNumTotal:0,
        pdfUrl:'',
        nowindex:0,
        scrolls:0,
        baseHeight:'auto',
        imgUrlInfo:[],
        rects:[]

    }
  },
  computed:{
        area2:function(){
            let arr =[]
            this.rects.forEach(item=>{
                if(!item.hideTag){
                    let y = Number(this.imgUrlInfo[item.page-1].height- (Number(item.y1)+item.height2)).toFixed(2);
                    if(y<0){
                        y = 0;
                    }
                    arr.push({
                        "position": {
                            "page":item.page,
                            "x":Number(item.x1).toFixed(2),
                            "y":y
                        },
                        "style": {
                            "height":Number(item.height2).toFixed(2),
                            "width":Number(item.width2).toFixed(2)
                        }
                    })
                }
            })
           
            return arr;
        },
         
    },
  created() {
      let baseHeight = document.body.clientHeight-56
      this.baseHeight = baseHeight+"px";
  },

  methods: {
        getPdf(file, fileList) {
             
            this.pdfUrl = this.getObjectURL(file.raw)
            this.$nextTick(()=>{
                
             this.initPDF(this.pdfUrl)
            })
            // this.fileList = fileList.slice(-3);
        },
        getObjectURL(file) {
            let url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                try {
                    url = window.webkitURL.createObjectURL(file);            
                } catch (error) {
                    
                }
            } else if (window.URL != undefined) { // mozilla(firefox)
                try {
                url = window.URL.createObjectURL(file);
                } catch (error) {
                
                }
            }
            return url;
        },
        setReacts(){
            if(this.pdfNumTotal==0){
                this.$message.error("请选择pdf文件")
                return false;
            }
            let obj = {
                left: 100,
                top: this.scrolls,
                width: 0,
                height: 0,
                hideTag: false,
                chapterType: 4,
                bgClass: "",
                page:"",
                imgUrl:'',
                isDraggable:true,
                hideDel:true,
                bgClass:'#8591d3',
                content:"",
                signName:"demo"
            };
            let liheight = this.$refs.pdfViewref[0].getHeight(); //每个pdf页面的高度
            let page = Math.ceil((obj.top + 100) / liheight); //计算应当处于哪一页

            if (page == 0) {
                page = 1;
            }

            obj.page = page;
            obj.top = obj.top - (page - 1) * liheight + 100;
            obj.isDraggable = true;
            
            obj.width = 120;
             obj.height = 120
             
            this.rects.push(obj);
            this.$refs.pdfViewref[obj.page-1 ].markSize('', obj,null,this.rects.length-1);
        },
        windowScroll(e) {
            this.scrolls = e.srcElement.scrollTop.toFixed(2);
            let height = this.$refs.pdfViewref[0].$el.getBoundingClientRect().height;
            let nowindex = Math.floor(e.srcElement.scrollTop / height);
            this.nowindex = nowindex;
          
        },
        initPDF(url) {
            let _this = this;
            this.pdfNumTotal = 0;
            
            //查询pdf页码
            pdf.getDocument(_this.pdfUrl).then(function(pdfDoc_) {
                _this.rects = [];
                _this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
                _this.$nextTick(()=>{
                    
                    _this.$refs.pdfViewref.forEach(item => {
                        // item.init(_this.pdfUrl);
                        item.setPdfDoc(pdfDoc_)
                        
                    });
                    
                })
            });
        },
        copyarea(){
            let base = JSON.stringify(this.area2)
            this.$copyText(base).then(
		        res => {
		          console.log(res)
		          this.$message.success("坐标已复制");
		        },
		        err => {
		          this.$message.error("复制失败");
		        }
		    )
        }
  }
}

</script>
<style lang="less">
 .blueblock{
     display: block;
     width:120px;
     height:120px;
     background-color: #3e52c0;
     margin:15px auto 0;
     opacity: .6;
     cursor: pointer;
 }
 .pdfbox2 {
    overflow: scroll;
  
}
.showinput{
    border:1px solid #ccc;
    width:50px;
    height:25px;
    line-height: 25px;
    margin-right:2px;
    border-radius: 3px;
    text-indent: 4px;
    outline: none;


}
.areali{
    padding:10px;
    width:80%;
    line-height:35px;
    margin:5px 0;
    background-color: #fff;
    span{
        display: inline-block;
        margin-left:10px;
    }
}
</style>