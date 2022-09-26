<!-- 我的 -->
<template>
  <div class="prefer fullheight">
       <!-- <div class="cf margin-sm bg-white text-xl text-bold">
          <div class="fl margin-sm margin-left">文件偏好设置</div>
      </div> -->
      <div>
        <el-card class="margin-sm fullcard">
        <div class="cf text-xl text-bold bordertitle">
            <div class="fl">文件偏好设置</div>
        </div>
          <p class="info">签署设置<span>短信认证、邮箱认证、人脸认证方式中至少选择一个</span></p>
          <p class="info">意愿认证方式：</p>
          <div>
            <el-radio v-model="radio" label="1" border size="medium">人脸认证</el-radio>
            <el-radio v-model="radio" label="2" border size="medium">邮箱认证</el-radio>
            <el-radio v-model="radio" label="3" border size="medium">密码认证</el-radio>
          </div>
          <!-- <el-checkbox-group v-model="checkList">
            <el-checkbox label="人脸认证"></el-checkbox>
            <el-checkbox label="邮箱认证"></el-checkbox>
            <el-checkbox label="密码认证"></el-checkbox>
          </el-checkbox-group> -->
        </el-card>
      </div>
  </div>
</template>

<script>
import {parseTime} from '@/utils/index';
import {getDentify} from '@/utils/auth';
 
export default {
  data() {
    return {
      deptName:"",
      loading:false,
      checkList:[],
      radio:'1',
      list:[],
      model:{
        sealTypeName:'',
        sealTypeExplain:'',
        id:''
      },
      modelTitle:'',
      getDentify:{}
    };
  },
    created(){
      // this.doSearch();
      this.getDentify = getDentify();
        
    },
    methods: {

    }
}

</script>
<style lang="less">
.prefer{
  .info{
    font-size: 14px;
    color: #333;
    font-weight: 500;
    margin-bottom: 20px;
    span{
      font-weight: 400;
      color: #959595;
      margin-left: 15px;
    }
  }
  .bordertitle{
    margin-bottom: 20px;
  }
}
</style>