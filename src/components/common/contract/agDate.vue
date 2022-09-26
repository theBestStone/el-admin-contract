<!--  -->
<template>
  <div class="date-box">
    <div v-for="(item,index) in timeArr" :class="activeDateIndex==index?'active':''"  :key="index" class="date-item" @click="selectTime(index)">
      {{item}}
    </div>
    <!-- <div class="date-box">{{value}}</div> -->
    <!-- <el-select v-model="value" @change="selectTime" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> -->

  </div>
</template>

<script>
 import { timeArr} from '@/components/page/contract/signUtile.js'
 
export default {
  
  components: {},
  data() {
    return {
        timeArr:timeArr,
        options:[],
        value:'',
        activeDateIndex:0
    }
  },
  created() {
    //  this.timeOption();
  },
  mounted(){
   
     
  },

  methods: {
     
    selectTime(index){
      this.activeDateIndex = index;
      
    },
     
  }
}

</script>
<style lang="less">
.date-box{
  // width:214px;
  // height:32px;
  // text-indent: 20px;
  // line-height: 32px;
  // background: #FFFFFF;
  // border: 1px solid rgba(221,224,231,1);
  // border-radius: 4px;

  .date-item {
    border: 1px solid rgba(232,232,232,1);
    border-radius: 2px;
    width:260px;
    height:30px;
    line-height: 30px;
    font-size:14px;
    margin:5px auto;
    // text-indent: 20px;
    text-align: center;
    cursor: pointer;
  }
  .active{
      color:#1257FF;
      border:1px solid #1257FF;
  }
}
</style>