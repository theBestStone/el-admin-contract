<template>
    <div class="flex modulebox" >
      <!-- @click="setReacts(item.type)" -->
      <div v-for="(item,index) in listd" v-signDrag class="obj-licont" v-if="item.methodArr.length==0||item.methodArr.indexOf(methodInfo)!=-1 " @mousedown="setNowData(item)">
          
          <div class="modulimg drag-tool" v-if="item.src"><img :src="item.src"></div>
           <div class="modulimg drag-tool" v-if="item.icon"><i :class="item.icon" style="font-size:20px;"></i></div>
          <div class="modulname">{{item.title}}</div>
      </div>
      <!-- <div class=" obj-licont" v-if="methodInfo==0||methodInfo==2||methodInfo==7||methodInfo==8" @click="setReacts(ChapterTypes.SIGNAREA)">
          <div class="modulimg"><img src="@/assets/img/feature/sign-gray.png"></div>
          <div class="modulname">个人签字</div>
      </div>
      <div class=" obj-licont" v-if="methodInfo==1||methodInfo==2" @click="setReacts(ChapterTypes.SEALAREA)"> 
          <div class="modulimg"><img src="../../../assets/img/feature/sign-gray.png"></div>
          <div class="modulname">印章</div></div>
      <div class=" obj-licont" @click="setReacts(ChapterTypes.TIMAREA)">
          <div class="modulimg"><i class="el-icon-date" style="font-size:20px;"></i></div>
          <div class="modulname">日期</div>
      </div>
      <div class=" obj-licont" @click="setReacts(ChapterTypes.TEXTAREA)">
          <div class="modulimg"><i class="el-icon-document" style="font-size:20px;"></i></div>
          <div class="modulname">文本</div>
      </div>
      <div class=" obj-licont" @click="setReacts(ChapterTypes.PERFORATIONAREA)">
          <div class="modulimg"><img src="../../../assets/img/feature/co.png"></div>
          <div class="modulname">骑缝章</div>
      </div> -->
  </div>
</template>
<script>
 import {ChapterTypes} from '../../page/contract/signUtile.js'
 import Sortable from 'sortablejs';
import bus from '@/components/common/bus';
export default {
  components:{},
  props: {
    methodInfo: {
      type: [Number,String]
      
    }
  },
  data() {
      return{
        ChapterTypes:ChapterTypes,
        listd:[
          {type:ChapterTypes.SIGNAREA,title:'签字',src:require('@/assets/img/feature/sign-gray.png'),methodArr:[0,2,7,8]},
          {type:ChapterTypes.SEALAREA,title:'印章',src:require('@/assets/img/feature/seal.png'),methodArr:[1,2]},
          {type:ChapterTypes.TIMAREA,title:'日期',icon:'el-icon-date',methodArr:[]},
          {type:ChapterTypes.TEXTAREA,title:'文本',icon:'el-icon-document',methodArr:[]},
          {type:ChapterTypes.PERFORATIONAREA,title:'骑缝章',src:require('@/assets/img/feature/co.png'),methodArr:[1,2]}
        ],
        editInfo:{},
        nowData:{}
      }
  },
  methods: {
    signDrag(){
      // let tbody = document.querySelector('.modulebox');
      //   console.log(tbody,"tbody")
      // Sortable.create(tbody, {
      //     //  指定父元素下可被拖拽的子元素
      //     draggable: '.obj-licont',
      //     handle: '.obj-licont',
      //     onEnd: (res) => {
      //       console.log(res)
      //     }
      // });
    },
    inPdf(){
      console.log(this.nowData,this.editInfo)
      bus.$emit("beforSetReacts",this.nowData.type,{},this.editInfo)
    },
    setNowData(item){
      this.nowData = item;
    }
  },
  created(){
    
     
  },
  mounted() {
    this.signDrag();
  }
}
</script>

<style >
 
</style>
