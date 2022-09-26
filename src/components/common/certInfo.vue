<template>
  <div >
 
    <div class="margin-top">
        <p class="text-bold padding text-center text-xxl ">CA证书中心</p>
        <el-divider></el-divider>
        <div class="text-left">
           
            <p class="padding"><span class="text-bold margin-right">颁发者</span>{{certInfo.issuer}}</p>
            <p class="padding"><span class="text-bold margin-right">序列号</span>{{certInfo.serialNumber}}</p>
            <p class="padding"><span class="text-bold margin-right">有效期</span>{{certInfo.beginDate}} 至 {{certInfo.endDate}}</p>
             <p class="padding"><span class="margin-right">颁发给</span>{{type==1?certInfo.userName:certInfo.certName}}</p>
            <!-- <p class="padding"><span class="text-bold margin-right">颁发机构</span>iTrusChina</p> -->
       
            <p class="padding"><span class="margin-right">证书说明</span>数字证书由证书发行，具有安全唯一性</p>
        </div>
        <p v-if="type==1" class="margin-top padding-left text-gray text-sm">个人身份信息将用于申请数字证书</p>
    </div>
   
  </div>
</template>
<script>

import { findCert } from '@/api/user'
 
export default {
   
  props: {
    
  },
  data: function() {
    return {
      certInfo:{},
      userInfo:{},
      type:1
    }
  },
  methods: {
    GetInfo(tag){
      this.type = 1;
        this.$store.dispatch('GetInfo',tag).then( (res) => {
          this.userInfo = res;

          this.getcertInfo();
        
          
      })
    },
    async getcertInfo(id){
            let obj = {type:1}
            if(id){
              obj.type = 2;
              obj.id = id;
              this.type=2;
            }else{
              obj.id = this.userInfo.uid
            }
           let {data} = await findCert(obj)
           console.log(data)
            this.certInfo = data;
        //   let data = findCert({type:1,id:})
      },
  },
  mounted() {}
}
</script>

<style >
.w60 {
  float: left;
  width: 60%;
}
</style>
