<!--  -->
<template>
    <div style="position:absolute;top:0;left:0;width:100%;height:100%;">
   
        <!-- :sticks="chapterType==2?[]:['tl', 'br']" -->
        <vue-drag-resize-rotate   :class-name-active="(option.type!='time'&&option.type!='mark')?'my-active-class':'my-active-class my-active-class2'"   ref="dragResize" :rotatable="option.rotatable" :z="500" :aspectRatio="true" v-for="(option, index) in rects" :key="index" :parentH="config.parentH" :isActive="false" :w="option.width" :h="option.height" :x="option.left" :y="option.top" :minw="10" :minh="10" 
        :maxWidth="5000"
        :maxHeight="5000"
        :axis="option.axis?option.axis:'both'"
        :lock-aspect-ratio="option.lock2"
        :draggable="option.isDraggable"
        :resizable="option.resizable"
        :active.sync="option.active"
        :scaleRatio="scaleBox"
        :r="option.degree"
        @resizestop="(left, top,width, height) => resize({left:left, top:top,width:width,height:height},index,'resizestop')"  
        @resizing="(left, top,width, height) => resize({left:left, top:top,width:width,height:height},index,'resizing')" 
        @dragstop="(left, top) => resize({left:left, top:top,width:option.width,height:option.height},index,'stop')"
        @dragging="(left, top) => resize({left:left, top:top,width:option.width,height:option.height},index,'dragging')" 
        @rotating="(degree) => onRotating(degree,index)" 
        @activated="onActivated(option,index)"
        @deactivated="onDeactivated"
        :parent="option.parentLimit==1?false:true" v-if="!option.hideTag&&(option.page == page_num)">
        <!-- :parent="option.parent?option.parent:false" -->
       
            <div class="opbg" :style="{backgroundColor:option.bgClass?option.bgClass:'#a6d6f8'
                }"></div>
            <div v-if="toolbarVeri(option)"  class="size-toolbar" ref="toolbar">

                <div style="position:relative">
                    <span class="sanjiao2"></span>
                    
                    <div class="toolli"  v-if="!option.hideDel"  @click="operation(index,{operType:'del','batch':'one'})">删除</div>
                    <div class="toolli"  v-if="!option.hideDel&&signTool(option)"  @click="operation(index,{operType:'delAllSign','batch':'more'})">删除全部签名</div>
                    <div class="toolli"  v-if="!option.hideDel&&sealTool(option)"  @click="operation(index,{operType:'delAllSeal','batch':'more'})">删除全部印章</div>
                    
                    <div class="toolli"  v-if="!option.hideDel&&timeTool(option)"  @click="operation(index,{operType:'delAllTime','batch':'more'})">删除全部日期</div>
                    <div class="toolli" v-if="signTool(option)"  @click="operation(index,{operType:'changeSign','batch':'one'})">更换签名</div>
                    <div class="toolli" v-if="signTool(option)"  @click="operation(index,{operType:'changeSign','batch':'all'})">更换全部签名</div>
                    <div class="toolli" v-if="timeTool(option)"  @click="operation(index,{operType:'changeTime','batch':'one'})">更换时间</div>
                    <div class="toolli" v-if="timeTool(option)"  @click="operation(index,{operType:'changeTime','batch':'more'})">更换全部时间</div>
                     <div class="toolli"  v-if="textTool(option)"  @click="operation(index,{operType:'getTextArea','batch':'one'})">填写文本</div>
                     <div class="toolli" v-if="sealTool(option)"  @click="operation(index,{operType:'changeSeal','batch':'one'})">更换印章</div>
                    <div class="toolli" v-if="sealTool(option)"  @click="operation(index,{operType:'changeSeal','batch':'all'})">更换全部印章</div>
                     <div class="toolli" v-if="crossPageTool(option)"  @click="operation(index,{operType:'changeCrossPageSeal','batch':'more'})">更换骑缝章</div>
                </div>
            </div>
            <div style="width:100%;height:100%;" class="ag-drag" :style="{'border-color':option.bgClass?option.bgClass:'#a6d6f8'}">
            <!-- :style="{font-size}" -->
                <div v-if="option.chapterType==ChapterTypes.SEALAREA" class="signatur-area areas"  
                >
                    <p><img src="../../../assets/img/feature/seal.png" alt="" class="areaimg"></p>
                    <p v-if="hideMe(option)">签章</p>
                </div>
                <!-- 印章域 -->
                <div v-if="option.chapterType==ChapterTypes.SIGNAREA" class="sign-area areas"   
                > <p><img src="../../../assets/img/feature/sign-gray.png" alt="" class="areaimg"></p>
                    <p  v-if="hideMe(option)">签字</p> </div>
                    <!-- 签字域 -->

                <div v-if="option.chapterType==ChapterTypes.TEXTAREA" class="sign-area areas"   
                > 
                    <p style="overflow:hidden;" :title="`录入文本添加区域,该区域可添加${option.valSetting.textareaRow}行,每行${option.valSetting.textareaTotal}字`">
                        录入文本区域<br/>
                        该区域可添加<span>{{ option.valSetting.textareaRow }}</span
                        >行， 每行<span>{{ option.valSetting.textareaTotal }}字</span>
                    </p>
                    
                </div>
                <div v-if="option.chapterType==ChapterTypes.TEXTELEMENTAREA" class="sign-area areas"   
                > 
                    <p style="overflow:hidden;" >
                         <span>{{option.valSetting.elementName}}</span>
                    </p>
                    
                </div>
                <!-- 组件域 -->
                <div v-if="option.chapterType==ChapterTypes.TEXTELEMENT" class="sign-area text-set"  :style="{'font-family':option.valSetting.fontFamily,'font-size':option.valSetting.fontSize+'px','text-align':option.valSetting.textAlign,transform:option.valSetting.fontSize>=10?'scale(1)':'scale('+option.valSetting.fontSize/10+')' }" :class="{areas:option.valSetting.elementType!='textarea'}"> 
                 
                    <div>{{option.valSetting.content}}</div>                    
                </div>
                <!-- 组件 -->
                
                 <div v-if="option.chapterType==ChapterTypes.TEXT" class="sign-area text-set"  :style="{'font-family':option.valSetting.fontFamily,'font-size':option.valSetting.fontSize+'px','text-align':option.valSetting.textAlign,transform:option.valSetting.fontSize>=10?'scale(1)':'scale('+option.valSetting.fontSize/10+')'}"> 
                 
                    <div>{{option.valSetting.content}}</div>                    
                </div>
                <!-- 文本 -->
                <div v-if="option.chapterType==ChapterTypes.PERFORATIONAREA" class="sign-area areas"   
                > <p><img :src="require('@/assets/img/feature/co.png')" alt="" class="areaimg"></p>
                    <p >骑缝章</p> </div>
                    <!-- 骑缝章域 -->
                <div v-if="option.chapterType==ChapterTypes.TIMAREA" class="date-area areas"  
                ><span><i class="areaicon el-icon-date"></i> 日期</span></div>
                <!-- 日期域 -->
                <!-- width:option.valSetting.fontSize<10?100*10/option.valSetting.fontSize+'%':'100%', -->
                <div style=" white-space: nowrap;" v-if="option.chapterType==ChapterTypes.FORMALTIME" class=" areas" :style="{'font-size':option.valSetting.fontSize+'px',transform:option.valSetting.fontSize>10?'scale(1)':'scale('+option.valSetting.fontSize/10+')'}"  
                >{{option.valSetting.content}} </div>
                <!-- 日期 -->
                <div class="areas" v-if="(option.chapterType==ChapterTypes.SIGN||option.chapterType==ChapterTypes.SEAL||option.chapterType==ChapterTypes.PERFORATION)&&option.imgUrl">

                    <img  ref="mark" class="mark" :src="option.imgUrl" />
                </div>
                <!-- 印章 签字 骑缝 -->
            </div>
            <span class="close text-white" v-if="!option.hideDel" @click="deleted( index)"><i class="el-icon-close"></i> </span>
            <div slot="br" class="brs"><img style="width:22px;height:22px;" src="../../../assets/img/feature/scale.png" alt=""></div>
            
        </vue-drag-resize-rotate>
        
    </div>
</template>

<script>
// import VueDragResize from 'vue-drag-resize';
import {ChapterTypes} from '../../page/contract/signUtile.js'
import vueDragResizeRotate from "@gausszhou/vue-drag-resize-rotate";
import bus from '@/components/common/bus';
 
export default {
    props: {
        scaleBox:Number,
        rects: Array,
        page_num: Number,
        // imgUrl: null,
        // chapterType: [String, Number],//1 签字  2 盖章  3. 签字区域  4.日期
        useType: [String, Number],
        config:Object,
        scale:Number,
        imgUrlInfo:{
          type:Array
        } 
    },
    components: {
        // VueDragResize,
        vueDragResizeRotate
    },
    data() {
        return {
         
            liwidth: '',
            liheight: '',
            parentH: '',
            ChapterTypes:ChapterTypes
        };
    },
    created() {},
    mounted() {

    },

    methods: {
        
        resize(newRect, index, tag) {
            
            // let getSet = null;
            var x = newRect.left;
            var y = newRect.top;
           
            var scale = this.imgUrlInfo[this.rects[index].page - 1].scale;
            let myheight = newRect.height; // this.rects[index].height
            let liheight = this.config.parentH
            if (tag == 'stop' || tag == 'resizing' || tag == 'stopInit') {
                var csk = Math.random();
                let ycopy = y;

                if (y > liheight) {
                    //拖拽下侧越界
                    // let page = Math.floor(y/liheight);
                    // y = y-page*liheight;
                    let h = liheight;
                    let h2 = liheight;
                    let n = -1;

                    this.imgUrlInfo.forEach((item, index) => {
                        if (n == -1) {
                            if (index > this.page_num - 1) {
                                h += item.height;
                                if (h > y) {
                                    scale = item.scale;
                                    n = index + 1;
                                    ycopy = y - h2;
                                    y = y - h2;
                                }
                                h2 += item.height;
                            }
                        }
                    });
                    if (n == -1) {
                        n = this.imgUrlInfo.length;
                        scale = this.imgUrlInfo[n - 1].scale;
                        ycopy = this.imgUrlInfo[n - 1].height - myheight;
                        y = this.imgUrlInfo[n - 1].height - myheight;
                    }
                    setTimeout(() => {
                        this.$set(this.rects[index], 'top', ycopy + csk);
                        this.$set(this.rects[index], 'page', n);
                         
                    }, 30);
                } else if ((y < 0 && this.rects[index].page == 1) || (y < 0 && y + myheight > 0)) {
                    //拖拽上侧骑缝
                    y = 0;
                    setTimeout(() => {
                        this.$set(this.rects[index], 'top', csk);
                    }, 30);
                    // else if(y<0&&y+myheight>0){
                    //     this.$set(this.rects[index], 'top', csk);

                    // }
                } else if (y < 0 && y + myheight < 0) {
                    //上侧拖拽越界

                    // let page =Math.ceil(-ycopy/liheight);
                    // y = (page*liheight+ycopy)
                    let h = 0;
                    let h2 = 0;
                    let n = -1;
                    for (let i = this.page_num - 2; i >= 0; i--) {
                        if (n == -1) {
                            h += this.imgUrlInfo[i].height;
                            if (h > -y) {
                                n = i + 1;
                                //  scale = this.imgUrlInfo[i].scale
                                ycopy = h + y;
                                y = h + y;
                            }
                        }
                    }
                    scale = this.imgUrlInfo[n - 1].scale;
                    setTimeout(() => {
                        this.$set(this.rects[index], 'top', ycopy + csk);
                        this.$set(this.rects[index], 'page', n);
                    }, 30);
                } else if (y < liheight && y + myheight > liheight) {
                    //下侧拖拽骑缝
                    y = liheight - myheight;

                    setTimeout(() => {
                        this.$set(this.rects[index], 'top', liheight - myheight - csk);
                    }, 30);
                } else {
                    this.$set(this.rects[index], 'top', y);
                }
                // function
                if (x < 0) {
                    //左边拖拽
                    x = 0;
                    setTimeout(() => {
                        // this.rects[index].left = 0;0
                        this.$set(this.rects[index], 'left', csk);
                    }, 30);
                } else if (x + newRect.width > this.config.liwidth) {
                    //拖拽右侧越界
                    x = this.config.liwidth - newRect.width;
                    setTimeout(() => {
                        this.$set(this.rects[index], 'left', this.config.liwidth - newRect.width - csk);
                    }, 30);
                } else {
                    //拖拽正常

                    this.$set(this.rects[index], 'left', x);
                }

                this.$set(this.rects[index], 'width', newRect.width);
                this.$set(this.rects[index], 'height', newRect.height);
                if (this.rects[index].chapterType == ChapterTypes.TEXTAREA) {
                    this.getWordsNum(index);
                }
                // if (this.from === 'setContract' || this.from === 'setTemplate'){
                    //签字域的大小
                    this.$set(this.rects[index], 'width2', newRect.width / scale)
                    this.$set(this.rects[index], 'height2', newRect.height / scale)  
                    
                // } else {
                //     //签字图片的大小
                //     this.$set(this.rects[index], 'iniWidth', newRect.width / scale)
                //     this.$set(this.rects[index], 'iniHeight', newRect.height / scale)  
                // }
                    

                if (this.rects[index].chapterType == ChapterTypes.TEXTAREA) {
                    this.getWordsNum(index);
                }
                if (this.rects[index].chapterType == ChapterTypes.FORMALTIME) {
                    this.getTimeSize(index);
                }
            }
           
            var width = Number(newRect.width);
            var height = Number(newRect.height);
            y = Number(y);
            x = Number(x);

            // this.$set(this.rects[index], 'y1', ((this.liheight - (y + height)) /scale).toFixed(2))
            
            this.$set(this.rects[index], 'y1', (y / scale).toFixed(2));
            this.$set(this.rects[index], 'x1', (x / scale).toFixed(2));
 
            // if (this.rects[index].page == undefined) {
            //     this.$set(this.rects[index], 'page', newRect.page);
                
            // }
         
            this.$set(this.rects[index], 'yc', ((y + height / 2) / scale).toFixed(2));
            this.$set(this.rects[index], 'xc', ((x + width / 2) / scale).toFixed(2));
            
            if(tag=='stop'){//骑缝章同步

                if(this.rects[index].chapterType==ChapterTypes.PERFORATION||this.rects[index].chapterType==ChapterTypes.PERFORATIONAREA){
                    this.opOther(index,'drag');
                    
                }
            }
            if(tag=='resizestop'){
                // console.log(newRect,"newRect")
                // this.$set(this.rects[index], 'active', false);
                // this.$nextTick(()=>{})
            }
            if(tag=='stopInit'){
              
                if(this.rects[index].active){

                    this.onActivated(this.rects[index],index)
                }
                
                setTimeout(()=>{
                    this.$set(this.rects[index],'lock2',this.rects[index].lock)
                    
                },500)
            }
            
       
        },
        resizeend(newRect, index) {
            this.$emit('ends');
        },
        count(obj) {
            //计算dpi
            this.scale = obj.scale;
            this.liheight = obj.liheight;
            this.liwidth = obj.liwidth;
            this.parentH = obj.parentH;
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
        deleted(index) {
            this.$set(this.rects[index], 'hideTag', true);
            if(this.rects[index].chapterType==ChapterTypes.PERFORATION||this.rects[index].chapterType==ChapterTypes.PERFORATIONAREA){
                this.opOther(index,'del');
            }
            bus.$emit("subNum")//删除组件需要告知父级
        },
        deletedAll(chapterType){
            this.rects.forEach(item=>{
                if(item.chapterType==chapterType){

                    this.$set(item, 'hideTag', true);
                }
            })
        },
        opOther(index,opType){
            let top = this.rects[index].top;
            let uuid = this.rects[index].uuid;
            this.rects.forEach((item,index2)=>{
                if(index2!=index&&item.uuid==uuid&&(item.chapterType==ChapterTypes.PERFORATION||item.chapterType==ChapterTypes.PERFORATIONAREA)){
                    if(opType=='drag'){

                        this.$set(this.rects[index2],'top',top)
                    }else{
                        this.$set(this.rects[index2],'hideTag',true)
                    }
                    
                }
            })
        },
        
        hideMe(option){
            if(option.width<80||option.height<45){
                return false;
            }else{
                return true;
            }
        },
        onActivated(option,index){
            
            bus.$emit("activeRect",option,index)
        },
        onDeactivated(option,index){
           
            // bus.$emit("deactiveReact",option,index)
        },
        onRotating: function (degree, index) { //正在旋转
            this.$set(this.rects[index], 'degree', degree);
        },
        toolbarVeri(option){
           
            let arr = [ChapterTypes.SIGN,ChapterTypes.SEAL,ChapterTypes.FORMALTIME,ChapterTypes.TEXT,ChapterTypes.PERFORATION]
            // &&option.chapterType!=
            if(arr.indexOf(option.chapterType)>-1||(option.signAndArea)){
                return true
            }else{
                return false;
            }
        },
        operation(index,{batch,operType}){
            if(operType=='del'){
                this.deleted(index)
            }else if(operType=='delAllTime'){
                this.deletedAll(ChapterTypes.FORMALTIME)
            }else if(operType=='delAllSign'){
                this.deletedAll(ChapterTypes.Sign)
            }else if(operType=='delAllSeal'){
                this.deletedAll(ChapterTypes.SEAL)
            }else{
                
                bus.$emit("operation",{
                    index,batch,operType
                })
            }
        },
        signTool(option){
            let arr = [ChapterTypes.SIGN,ChapterTypes.SIGNAREA]
             if(arr.indexOf(option.chapterType)>-1){
                return true
            }else{
                return false;
            }
            
        },
        
        sealTool(option){
            let arr = [ChapterTypes.SEAL,ChapterTypes.SEALAREA]
             if(arr.indexOf(option.chapterType)>-1){
                return true
            }else{
                return false;
            }
            
        },
        crossPageTool(option){
            let arr = [ChapterTypes.PERFORATIONAREA,ChapterTypes.PERFORATION]
             if(arr.indexOf(option.chapterType)>-1){
                return true
            }else{
                return false;
            }
        },
        timeTool(option){
            let arr = [ChapterTypes.TIMAREA,ChapterTypes.FORMALTIME]
             if(arr.indexOf(option.chapterType)>-1){
                return true
            }else{
                return false;
            }
        },
        textTool(option){
            let arr = [ChapterTypes.TEXT,ChapterTypes.TEXTAREA,ChapterTypes.TEXTELEMENTAREA,ChapterTypes.TEXTELEMENT]
             if(arr.indexOf(option.chapterType)>-1){
                return true
            }else{
                return false;
            }
        },
        getWordsNum(index) {
            let obj = this.rects[index];
            let width = obj.width;
            let height = obj.height;
         
            this.$set(this.rects[index].valSetting, 'textareaRow', Math.floor(height / (obj.valSetting.fontSize+3)));
            console.log(obj.valSetting.fontSize,6)
            this.$set(this.rects[index].valSetting, 'textareaTotal', Math.floor((width - 10) / obj.valSetting.fontSize));
        },
        getTimeSize(index){
            let obj = this.rects[index];
             let height = obj.height;
             this.$set(this.rects[index].valSetting, 'fontSize',height-6);
        }
    }
};
</script>
<style scoped lang="less">
.close {
    display: none;
}

.active .close, .my-active-class .close {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: -8px;
    margin-right: -8px;
    display: flex;
    justify-content: center;
	align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* text-align: center;
    line-height: 20px; */
    background: tomato;
    cursor: pointer;
}

.mark {
    width: 100%;
    height: 100%;
}
.areas{
    /* text-align: center; */
    width:100%;
    height:100%;
    color: #333;
    display:flex;
    justify-content: center;
	align-items: center;
    flex-flow: column;
}
/* .signatur-area{
    font-size:20px;
}
.sign-area{
    font-size:20px;
}
 
.date-area{
    font-size:16px;
   
} */
.areaimg{
    width:30px;
    font-size:30px;
}
.areaicon{
    font-size:20px;
}
.opbg{
    position: absolute;
    left:1px;
    top:1px;
    width:100%;
    height:100%;
    opacity: .3;
    z-index:-1;
    border-radius: 4px;
}
.size-toolbar{
  display: none;
  border-radius: 3px;
  text-align:left;
  .toolli{
    color:#fff;
    background-color: #595959;
    font-size:10px;
    height:25px;
    line-height: 25px;
    padding:0 8px;
    text-align: center;
    // margin:0 2px;
    border-right: 1px solid #4b4b4b;
    display: inline-block;
  }
}
.active .size-toolbar ,.my-active-class .size-toolbar{
  position: absolute;
  /* left:50%; */
    width:100%;
    min-width:35px;
  bottom:-30px;
  display: block;
//   text-align: center;
  
  /* margin-left:-35px;
  margin-top:-30px; */
  cursor: pointer;
    white-space: nowrap; 
//   overflow: hidden;
 
  text-overflow:ellipsis;
}
.sanjiao2{
    display: none;
    width: 0px;
    height: 0px;
  
    border: 6px solid #595959;
    border-bottom-color: #595959;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    top:-9px;
    left:10px;
}
 .my-active-class .sanjiao2{
    display: inline-block;
 }
.text-set{
    word-break:break-all; 
     
}
</style>
