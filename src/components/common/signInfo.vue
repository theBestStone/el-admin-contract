<template>
    <el-drawer
      class="drawerinfo"
      :style="drawercss"
      :visible.sync="drawer"
      :direction="direction"
      :modal="false"
      :size="270"
      :withHeader="false"
      :wrapperClosable="false"
      :before-close="handleClose" >
          <span class="drawer-close" @click="drawer=false"> <img  :src="require('@/assets/img/feature/coolLeft.png')" alt=""></span>
        <div class="contract-title">{{titleName}}控件设置</div>
        <div class="padding">

          <el-form size="mini" ref="form" :model="data" label-width="0">
            <el-form-item label="" verify prop="valSetting.textTitle" v-if="checkType([ChapterTypes.TEXTAREA])">
              <div class="sign-label"> <span class="text-red">*</span> 控件名称</div>
              <el-input @input="setRectsValue('valSetting')"  v-model="data.valSetting.textTitle"></el-input>
            </el-form-item>
             <el-form-item label="" prop="code">
              <div class="sign-label">参与方设置</div>
               <!-- {{userList}} -->
              <el-select style="width:100%;" @change="setRectsValue('code')"  v-model="data.code" placeholder="参与方设置">
               <el-option  v-for="item in userList" :label="item.type==1?'个人-'+item.name:(item.type==2?(item.orgName?item.orgName:'企业')+'-'+item.name:item.name)" :key="item.code" :value="item.code" v-if="item.roleType==1"></el-option>
              
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="valSetting.sealType" style="margin-bottom:0" v-if="checkType([ChapterTypes.SEALAREA])">
              <el-radio-group v-model="data.valSetting.sealType">
                <el-radio label="entSeal">企业章</el-radio>
                <!-- <el-radio label="法定代表人章"></el-radio> -->
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="" prop="remark" v-if="checkType([ChapterTypes.TEXTAREA])">
              <div class="sign-label">备注</div>
              <el-input @input="setRectsValue('remark')" type="textarea" v-model="data.remark"></el-input>
            </el-form-item> -->
            <el-form-item label="" prop="valSetting.defaultText" v-if="checkType([ChapterTypes.SEALAREA,ChapterTypes.PERFORATIONAREA,ChapterTypes.TEXTAREA])">
              <div class="sign-label">默认文本内容</div>
              <el-input type="textarea" @input="setRectsValue('valSetting')" v-model="data.valSetting.defaultText"></el-input>
            </el-form-item>
            <el-row v-if="checkType([ChapterTypes.TEXTAREA])">
              <el-col :span="12">
                <el-form-item label="" prop="region">
                <div class="sign-label">字号</div>
                <el-select style="width:80%;" v-model="data.valSetting.fontSize" placeholder="字号设置" @change="setRectsValue('valSetting')">
                  
                  <el-option v-for="item in fontSizeArr" :label="item+'px'" :key="item" :value="item"></el-option>
                </el-select>
               </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="" prop="">
                  <div class="sign-label">对齐方式</div>
                   <div class="flex">
                      <span v-for="item in alignList"  class="align"><img :src="data.valSetting.textAlign==item.value?item.activeImg:item.img" alt="" @click="setAlign(item)"></span>
                      
                   </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="" prop="fontFamily" v-if="checkType([ChapterTypes.TEXTAREA])">
              <div class="sign-label">字体类型</div>
              <el-select style="width:100%;" @change="setRectsValue('valSetting')" v-model="data.valSetting.fontFamily" placeholder="参与方设置">
               <el-option v-for="item in fontFamilyArr" :label="item.name" :key="item.key" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="valSetting.isVerify" v-if="checkType([ChapterTypes.TEXTAREA])">
              <div class="sign-label">填写要求</div>
                 <!-- <el-checkbox-group v-model="data.region"> -->
                  <el-checkbox label="必填" @change="setRectsValue('valSetting')" v-model="data.valSetting.isVerify" name="region">必填</el-checkbox>
                <!-- </el-checkbox-group> -->
            </el-form-item>
          </el-form>
        </div>
    </el-drawer>
</template>
<script>
 import bus from '@/components/common/bus';
 import {ChapterTypes,TypeList} from '@/components/page/contract/signUtile.js'
export default {
  components:{},
  props: {
    userList:{
      type:Array,
      default:[]
    }
  },
  data: function() {
    return {
      drawer: false,
      direction: 'ltr',
      drawercss:{},
      activeIndex:'',
      alignList:[
        {img:require('@/assets/img/feature/alignLeft.png'),value:"left",activeImg:require('@/assets/img/feature/alignLeftActive.png')},
        {img:require('@/assets/img/feature/alignCenter.png'),value:"center",activeImg:require('@/assets/img/feature/alignCenterActive.png')},
         {img:require('@/assets/img/feature/alignRight.png'),value:"right",activeImg:require('@/assets/img/feature/alignRightActive.png')},
      ],
      data:{
        valSetting:{},
        code:0,

      },
      TypeList:TypeList,
      ChapterTypes:ChapterTypes,
      titleName:'',
      fontSizeArr:[
        12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28
      ],
      fontFamilyArr:[
        {name:'宋体',key:'宋体'},
        {name:'仿宋',key:'仿宋'},
        {name:'黑体',key:'黑体'},
        {name:'楷体',key:'楷体'},
        {name:'Arial',key:'Arial'},
      ],
      activeWhiteList:[//active白名单
        ChapterTypes.SIGNAREA,
        ChapterTypes.SEALAREA,
        ChapterTypes.TIMAREA,
        ChapterTypes.TEXTAREA,
        ChapterTypes.PERFORATIONAREA,
      ]

    }
  },
  methods: {
    setRectsValue(setTag){
       
      let data = JSON.parse(JSON.stringify(this.data))
      if(setTag=='code'){
        let obArr =  this.userList.filter(item=>{
         return  item.code==this.data.code
        })
        data.bgClass = obArr[0].bgClass
        console.log(obArr,"obArr")
      }
      bus.$emit("setRectsValue",this.activeIndex,data,setTag)
    },
    activeRect(item,index){
      if(this.activeWhiteList.indexOf(item.chapterType)!=-1){

        this.data = item;
        this.activeIndex = index;
        this.drawer = true;
        this.TypeList.forEach(element=>{
          if(item.chapterType ==element.value){
            this.titleName = element.name;
          }
        })
      }
    },
    deactiveReact(){
       
      this.drawer = false;
    },
    setAlign(item){
      this.$set(this.data.valSetting,"textAlign",item.value);
      this.setRectsValue('valSetting')
    },
    checkType(arr){
      let chapterType = this.data.chapterType;
      if(arr.indexOf(chapterType)==-1){
        return false;
      }else{
        return true;
      }
    }
  },
  destroyed() {
      // 离开页面需要销毁监听，且需在 destroyed 里面销毁，
      // 否则监听会一直存在，因为是单页面应用，页面并未关闭。
      // 销毁事件总线
      bus.$off("activeRect");
      bus.$off("deactiveReact");
    
  },
  mounted() {
    let height = window.screen.height-60;
    this.drawercss={
      height:height+'px',
      top:'60px'
    }
    bus.$off("activeRect");
    bus.$off("deactiveReact");
    bus.$on("activeRect",(item,index)=>{
      this.activeRect(item,index)
    })
    bus.$on("deactiveReact",()=>{
      this.deactiveReact()
    })
    
  }
}
</script>

<style lang="less">
 .el-drawer__wrapper{
  width:288px;
  
 }
 .sign-label{
  font-size:14px;
  margin:10px 0 0 0;
  color: #333333;
  letter-spacing: 0;
  font-weight: 600;
  text-align:left;
 }
 .align{
  margin:0 5px;
  cursor:pointer;
 }
 .drawer-close{
    position: absolute;
    top:40%;
    right:-22px;
    cursor: pointer;
    z-index:1002;
 }
 .drawerinfo{
    overflow: hidden;
   .el-drawer{
      overflow: visible;
   }
   .el-drawer{
    border-right:8px solid #dee1e5;
    box-shadow:none;
   }
 }
</style>
