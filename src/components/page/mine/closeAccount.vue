<!--  -->
<template>
  <div>
      <div class="closeWin">
          <el-card class="margin-top padding">
              <div class="text-blod margin-top-sm text-xl">您正在申请注销账号{{userInfo.phone}}，请仔细阅读并确认以下信息。</div>
              <div class="margin-top-sm text-blod">为保障您的权益，在您提交注销申请前，请先确认如下信息：</div>
              <div class="margin-top-sm">1、您的账号下待我处理与待他人处理的文件需全部处理完成；</div>
              <div class="margin-top-sm">2、您的账号为企业的主管理员或企业代表人时，需将角色身份更改为普通员工再申请注销；</div>
              <div class="margin-top-sm">3、注销后您的账号会自动退出所有的企业组织架构，所经办的企业文件不会删除，将继续保存在该企业内管理。</div>
              <div class="margin-top-sm">4、注销申请提交后15天内处于冻结期，<span class="text-red">冻结期内可随时登录系统撤销注销申请</span></div>
              <div class="margin-top-sm">注销后，将视为放弃以下资产或权益：</div>
              <div class="margin-top">1、注销后账号下的个人签名删除、印章授权关系自动解除；</div>
              <div class="margin-top-sm">2、注销后账号内个人文件数据将无法继续查看、下载及申请出证，建议下载备份后再申请注销；</div>
              <div class="margin-top-sm">3、注销15天内不可使用该账号注册 15天后可用该账号注册；</div>
              <div class="margin-top-sm">4、此账号的注销将关联5G随e签签约门户、能力开放平台、存证系统三个系统同时注销账号；</div>
              <div class="margin-top-sm"> <el-checkbox v-model="radio" label="1">同意</el-checkbox><a class="text-blue" @click="viewPro(item)" v-for="item in protocolList">《{{item.title}}》</a></div>
              <div class="text-center margin-top">
                <router-link to="/mine/account">
                    <el-button>取消</el-button></el-button>
                </router-link>
               
                <el-button style="margin-left:20px;" :disabled="!radio" type="primary" @click="doSure">确认注销</el-button>
              </div>
          </el-card>
          
      </div>
      <auth-code :visible="visibleCode" :phone="realPhone" :verifyTag="false" @toNext="toNext" @closepop="closepop"></auth-code>
      <el-dialog  :visible.sync="visibleHtml" :fullscreen="true">
             <div v-html="contentHtml" class="padding-bottom-xl"></div>
            <div class="padding-sm text-center profotter" slot="footer"> 
               <el-button @click="visibleHtml=false" type="primary">关闭</el-button>
           </div>
         </el-dialog>
  </div>
</template>

<script>
import AuthCode from '../../common/authCode';
 
import {register,accoutClose} from '../../../api/user.js'
import {agreement} from '../../../api/login.js'


export default {
  components: {AuthCode},
  data() {
    return {
        radio:false,
        visibleCode:false,
         visibleHtml:false,
         realPhone:"",
         contentHtml:"",
        userInfo:{},
        agreementToken:"",
        protocolList:[]
    }
  },
  created() {
      this.getinfo();
      this.protocol();
  },

  methods: {
    getinfo(tag){
         this.$store.dispatch('GetInfo',tag).then((res) => {
           console.log(res,"data")
           this.userInfo = res;
           this.realPhone = res.realPhone
       })
    },
    protocol(){
        register().then(res=>{
            this.protocolList = res.data
        })
    },
    viewPro(item){
        this.visibleHtml  = true;
        this.titleHtml = item.title;
        this.contentHtml = item.content
    },
    doSure(){
        this.$confirm('请确认是否注销', '即将开始注销', {
          confirmButtonText: '确定注销',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(async () => {
            let {data} = await agreement({protocolType:2})
            this.agreementToken = data.agreementToken;
               this.visibleCode = true;
              
          }).catch(() => {
              console.log("cancel");
      });
    },
    toNext(cheackToken){
      this.$confirm('您的账号 '+this.userInfo.phone+' 将在15天后被注销，期间可登录系统撤销注销。注销后用户数据将被清除并无法恢复，是否确认注销？', '温馨提示', {
          confirmButtonText: '确定注销',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
              //  this.visibleCode = true;
              accoutClose({verifyCode:cheackToken,agreementToken:this.agreementToken}).then(res=>{
                this.$message.success("注销成功");
                this.getinfo(true)
                setTimeout(()=>{
                  this.$router.push('/mine/account');
                },1200)
              })
          }).catch(() => {
              console.log("cancel");
      });
    },
    closepop(visible){
      this[visible] = false;
    }
  }
}

</script>
<style lang="less">
.closeWin{
    width: 600px;
    margin:0 auto;
}
</style>