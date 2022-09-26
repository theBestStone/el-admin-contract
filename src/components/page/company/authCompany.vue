<!-- 实名认证 -->
<template>
  <div class="fullheight" >
      <div class="auth-box padding-bottom">

        <div class="ms-title margin-sm">
            <el-steps :active="step" align-center  finish-status="success">
                <el-step title="填写企业信息" ></el-step>
                <el-step title="提交认证资料" ></el-step>
                <el-step title="认证完成" ></el-step>
            </el-steps>
        </div>
        <el-card class="padding comth">
            <div v-if="step==0">
                <p  class="text-center  text-orange" style="background-color:#f7efe1;margin:20px auto;padding:5px;">一个账号一天只能添加一个企业</p>
                <el-form :model="model"  ref="agForm" label-width="200px" style="width:800px;margin:10px auto;" >
                    <el-form-item label="多合一营业执照" prop="businessLicenseId" verify >
                        <el-input v-model="model.businessLicenseId" type="hidden" placeholder=""></el-input>
                        <div class=" cf">
                            <div class="fl margin-right-sm"><el-image
                                style="height: 140px;"
                                :src="authFile"
                                :preview-src-list="[authFile]"
                                fit="cover"></el-image></div>
                            <div class="fl" style="line-height:24px;">
                                <p class="text-gray">照片仅限jpeg、jpg、png格式且大小不超过10M。</p>
                                <p class="text-gray">仅支持无水印或“仅用于5G随e签实名认证”水印字样的图片</p>
                               
                                <p class="text-gray">
                                    <el-upload
                                        :action="action"
                                        :on-error="errorAuth1"
                                        :on-success="successAuth1"
                                        :before-upload="beforeUpload"
                                        :data="uploadData"
                                        :show-file-list="false"
                                        >
                                            <el-button>选择文件</el-button>
                                        </el-upload>
                                    
                                </p>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="企业名称" verify   prop="orgName">
                        <el-input v-model="model.orgName" placeholder="请输入企业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码" verify   prop="orgIden">
                        <el-input v-model="model.orgIden" placeholder="请输入统一社会信用代码"></el-input>
                    </el-form-item>
                    <el-form-item label="法定代表人姓名" verify   prop="legalPerson">
                        <el-input v-model="model.legalPerson" placeholder="请输入法定代表人姓名"></el-input>
                    </el-form-item>
                     <el-divider></el-divider>
                     <el-form-item label="法定代表人身份" verify size="small"  prop="adminType">
                        <el-radio v-model="model.adminType" label="1" border size="medium">企业授权代理人</el-radio>
                        <el-radio v-model="model.adminType" label="2" border size="medium">企业法定代表人</el-radio>
                    </el-form-item>
                    <!-- <el-form-item label="邀请码"    prop="inviteCode">
                        <el-input v-model="model.inviteCode" placeholder="请输入邀请码"></el-input>
                    </el-form-item> -->
                    <el-form-item label=" "    prop="value7">
                         <el-checkbox v-model="model.value7" >
                           我同意5G随e签对我个人身份信息的保护法 <a @click="viewPro" class="text-blue margin-right-sm">《{{protocolItem.title}}》</a>  
                        </el-checkbox>
                    </el-form-item>
                    <div class="login-btn text-center">
                        <el-button type="primary" :disabled="!model.value7" @click="submitForm()">下一步</el-button>
                    </div>
                
                </el-form>
            </div>
            <div v-if="step==1" class="padding" >
                <div v-if="authStatus==1||authStatus==2">

                    <el-form :model="model2" class="biaosi"  ref="agForm2" label-width="200px" style="width:800px;margin:10px auto;" :disabled="authStatus==2">
                        <el-form-item label="法定代表人姓名" verify size="small"  prop="entAuthType">
                            <el-radio v-model="model2.entAuthType" label="1" border size="small">对公打款认证</el-radio>
                            <el-radio v-model="model2.entAuthType" label="2" border size="small">授权委托书认证</el-radio>
                            <div class="margin-top-sm bg-gray padding-sm text-left" style="line-height:16px;" > 
                                <p class="">提交认证资料（约0～2工作日）</p>
                            
                                <p class="text-sm margin-top-sm">1、5G随e签将向下方对公银行账号账户汇入一笔验证资金（少于0.1元）和四位数的随机码，0～2工作日内到账，不会从该账户扣款，您回填真实打款金额和随机码即可通过企业认证。</p>
                                <p class="text-sm margin-top-sm">2、为提高对公打款的效率，请如实填写并核对企业对公账户名、开户支行、账号信息无误！</p>
                            </div>
                            <div class="margin-top cf" v-if="model2.entAuthType==2">
                                <el-input v-model="model2.authFileId" type="hidden" placeholder=""></el-input>
                                <div class="fl margin-right-sm margin-top"><el-image
                                    style="width: 100px; height: 100px"
                                    :src="authFile2"
                                    :preview-src-list="[authFile2]"
                                    fit="cover"></el-image></div>
                                <div class="fl" style="line-height:24px;">
                                    <p class="text-gray">示例图</p>
                                    <p class="text-gray">步骤一：请下载 <span style="cursor:pointer" class="text-blue" @click="getBook">《企业认证申请表》
                                        </span> (填写完上述内容后自动生成)</p>
                                    <p class="text-gray">步骤二：账户管理人签字，并加盖企业公章后上传</p>
                                    <p class="text-gray">支持 .jpg .jpeg .png 格式，大小不超过8M</p>
                                    <p class="text-gray"><el-upload
                                            :action="action"
                                            :on-error="errorAuth2"
                                            :on-success="successAuth2"
                                            :before-upload="beforeUpload2"
                                            :data="uploadData"
                                            :show-file-list="false"
                                            >
                                                <el-button>选择文件</el-button>
                                            </el-upload></p>
                                </div>
                            </div>
                        </el-form-item>
                        <div v-if="model2.entAuthType==1&&authStatus==1">

                            <el-form-item label="账户名" prop="eName" verify >
                                <el-input v-model="model2.eName" disabled placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <div  ref="bank">

                                <el-form-item label="开户行名称" verify class="bank-content"  prop="bankName">
                                    <el-input v-model="model2.bankName"  @focus="bankTag=true" placeholder="请输入开户行名称"></el-input>
                                    <el-button style="margin-left:10px;" type="text" @click="anima">找不到对应银行查询</el-button><el-tooltip class="item"  content="点击左侧按钮，获取最新银行信息" placement="top-start">
                                        <i class="el-icon-warning-outline" style="color:#1257FF"></i>
                                    </el-tooltip>
                                    <input type="hidden" v-model="model2.value4">
                                    <div class="bank-list" v-if="bankTag" >
                                        <el-tabs v-model="bankGroup" @tab-click="bank">
                                        <el-tab-pane label="常用银行" name="common"></el-tab-pane>
                                        <el-tab-pane label="ABCDEF" name="ABCDEF"></el-tab-pane>
                                        <el-tab-pane label="GHJ" name="GHJ"></el-tab-pane>
                                        <el-tab-pane label="KLMN" name="KLMN"></el-tab-pane>
                                        <el-tab-pane label="PQRST" name="PQRST"></el-tab-pane>
                                        <el-tab-pane label="WXYZ" name="WXYZ"></el-tab-pane>
                                        <div style="width:600px;height:180px;overflow-y:scroll;" class="cf">
                                            <div v-if="bankList.length==0" class="margin-top text-center text-gray">暂无数据</div>
                                            <div class="bankitem" v-if="bankList.length>0" :class="{'text-blue':item.id==model2.value4}" @click="selctBank(item)" v-for="item in bankList">{{item.bankName}}</div>
                                        </div>
                                    </el-tabs>
                                    </div>
                                    
                                </el-form-item>
                            </div>
                            <el-form-item label="账号" verify   prop="bankAccount">
                                <el-input v-model="model2.bankAccount" placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item label="开户所在地"    prop="bankAddress2">
                                <el-cascader :props="props" style="width:100%;" placeholder="请输入开户所在地" clearable :show-all-levels="true" v-model="model2.bankAddress2" @change="getArea"></el-cascader>
                              
                            </el-form-item>
                            <el-form-item label="开户支行"    prop="bankAccount">
                                <el-input v-model="model2.bankDetail" placeholder="请输入开户支行"></el-input>
                            </el-form-item>
                        </div>
                            <div class="login-btn text-center" v-if="authStatus==1">
                                <el-button type="primary" @click="submitForm2()">立即提交</el-button>
                            </div>
                    
                    </el-form>
                    <el-form :model="model3"  ref="agForm3" label-width="200px" style="width:800px;margin:10px auto;"  v-if="authStatus==2">
                        <el-form-item label="打款金额" prop="bankBalance" verify >
                            <el-input v-model="model3.bankBalance"  placeholder="请输入打款金额"></el-input>
                        </el-form-item>
                        <el-form-item label="随机码" prop="bankCaptcha" verify >
                            <el-input v-model="model3.bankCaptcha" placeholder="请输入随机码"></el-input>
                        </el-form-item>
                        <div class="login-btn text-center">
                            <el-button type="primary" @click="submitForm3()">立即认证</el-button>
                        </div>
                    </el-form>
                </div>
                <div v-if="authStatus==3">
                    <div class="margin-top-lg text-xxl text-center">授权委托书审核中，请耐心等待！</div>
                    <div class="margin-top-lg text-center" >
                        <el-button type="primary" style="width:200px;margin-top:40px;" @click="backon">确认</el-button>
                    </div>
                </div>
                 <div v-if="authStatus==4" >
                       <div class="margin-top-lg text-xxl text-center">您的资料未通过审核，请修改资料后重新提交</div>
                       <div style="margin:0 auto;width:500px;padding:20px;">
                           <p class="text-red margin-tb">不通过原因</p>
                           <p class="margin-tb-lg">{{info.auditOpinion}}

</p>
                       </div>
                    <div class="margin-top-lg text-center" >
                         <el-button  style="width:150px;margin-top:40px;" @click="backon">返回</el-button>
                        <el-button type="primary" @click="reauth" style="width:150px;margin-top:40px;" >重新认证</el-button>
                    </div>
                 </div>
            </div>
             <div v-if="step==3" class="text-center">
                <p class="text-green"><i class="el-icon-success text-lg margin-right-sm"></i>企业认证成功</p>
                <cert-info ref="certInfo"></cert-info>
                <p class="margin-top">
                    <el-button type="primary" @click="backon" style="width:200px;">
                        确认
                    </el-button>
                </p>
            </div>
        </el-card>
      </div>
       <el-dialog  :visible.sync="visibleHtml" :fullscreen="true">
             <div v-html="contentHtml" class="padding-bottom-xl"></div>
            <div class="padding-sm text-center profotter" slot="footer"> 
               <el-button @click="visibleHtml=false" type="primary">关闭</el-button>
           </div>
         </el-dialog>
  </div>
</template>

<script>
import {uploadFile,downloadFile,preview,downloadAuthTemplate} from '../../../api/index.js'
import {addOrgAuthInfo,accountAuthBegin,comFindById,accountAuthCheck,agencyAuth ,bankInfo,ocr,findProtocol,getCity} from '../../../api/company.js'
import bus from '../../common/bus';
import {getDentify,removeDentify} from '@/utils/auth';
import { findCert } from '@/api/user'
 import CertInfo from '../../common/certInfo.vue'
export default {
  components: {CertInfo},
  data() {
    return {
        visibleHtml:false,
        protocolItem:{},
        model: {
            businessLicenseId: '',
            orgName: '',
            orgIden: '',
            legalPerson: '',
            adminType: '1',
            // inviteCode: '',
            value7: true,
           
        },
        model2: {
            eName: '',
            bankAccount: '',
            bankName: '',
            authFileId:'',
            entAuthType: "1",
            bankAddress:"",
            bankDetail:"",
            bankAddress2:[]
        },
        model3: {
            bankBalance: '',
            bankCaptcha: '',
            eid: '',
          
      
        },
        bankList:[
            
        ],
        authStatus:1,
        authFile:require("../../../assets/img/comauth.png"),
        authFile2:require("../../../assets/img/auth2.png"),
        step:0,
        bankTag:false,
        url:require("../../../assets/img/sign.png"),
        activeName:"common",
        action:"",
        uploadData:{
            channelNo:"anysign",
            storeType:1
        },
        dentify:{},
        info:{},
        handleType:"",
        bankGroup:"",
        props: {
          lazy: true,
          value:"areaName",
          label:"areaName",

          lazyLoad (node, resolve) {
            const { level } = node;
            
            console.log(node)
            let areaCode = ""
            if(level==0){
                areaCode = "100000"
            }else{
                areaCode = node.data.areaCode
                
            }
            getCity({
                areaCode:areaCode
            }).then((res)=>{
               
                if(level==2){
                    res.data.forEach(item=>{
                        item.leaf = true;
                    })
                }
                let nodes = res.data;
                resolve(nodes);
            })
            // setTimeout(() => {
            //   const nodes = Array.from({ length: level + 1 })
            //     .map(item => ({
            //       value: ++id,
            //       label: `选项${id}`,
            //       leaf: level >= 2
            //     }));
            //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            //   resolve(nodes);
            // }, 1000);
          }
        }
    }
  },
  created() {
    this.action = uploadFile();
    this.dentify = getDentify();
    this.init();
    document.addEventListener('click', (e) => {
        if(!this.$refs.bank){
            return false;
        }
        let isSelf=this.$refs.bank.contains(e.target);
        if(isSelf){
        }else{
            this.bankTag=false
        }
    })

       
  },

  methods: {
      getArea(e){
          console.log(e)
      },
      init(){
        this.handleType = this.$route.query.type;
  
        // this.handleType = 1
        if(this.handleType=="edit"){
            comFindById({eid:String(this.dentify.orgId)}).then(res=>{
                this.info = res.data
                //   authStatus:1,  step:0,
                
                if(res.data.state==0){
                    this.step = 1;
                    this.authStatus = 1
                    this.model2.eid = String(res.data.eid);
                    this.model2.eName = res.data.orgName;
                }else if(res.data.state==1){
                    this.step =1;
                    this.authStatus = 3//审核中
                }else if(res.data.state==2){
                    this.step =1;
                    this.authStatus = 4//驳回
                    this.model2.eid = String(res.data.eid);
                    this.model2.eName = res.data.orgName;
                }else if(res.data.state==3){
                    this.step =1;
                    this.authStatus = 2
                    this.model3.eid = String(res.data.eid)
                }else if(res.data.state==10){
                    this.step =3;
                    this.$nextTick(()=>{

                        this.$refs.certInfo.getcertInfo(this.dentify.orgId);
                    })
                    this.authStatus = 1
                }
            })
        }else{
            this.step = 0;
            this.authStatus = 1
        }
        this.bank();
        this.findProtocol();
      },
      async findProtocol(){
          let {data} = await findProtocol({typeId:'4'})
          this.protocolItem = data;
      },
      viewPro(){
        this.visibleHtml  = true;
        this.titleHtml = this.protocolItem.title;
        this.contentHtml = this.protocolItem.content
    },
      bank(){
          let group = this.bankGroup
          if(group =='common'){
              group = ""
          }
          bankInfo({bankGroup:group}).then(res=>{
              this.bankList = res.data;
          })
      },
      backon(){
        //   this.$router.go(-1)
          this.$router.push(sessionStorage.getItem("lasterRouter"))
      },
      successAuth1(res, file){
          console.log(res,"ddd")
          this.model.businessLicenseId = res.data.id;
       
          this.authFile = preview(res.data.id);
           this.getBase64(file.raw).then(res2 => {
             
                this.toOcr(res2.split(",")[1]);
            });
              
      },
      errorAuth1(res, file){
          this.$message.error("上传失败")
          console.log(res,file)
      },
      beforeUpload(file){
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (testmsg!= 'jpg'&&testmsg!= 'png'&&testmsg!= 'jpeg') {
          this.$message.error('上传格式错误!');
           return false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!');
            return false;
        }
         return true;
      },
      successAuth2(res, file){
          if(res.code==200){

              this.model2.authFileId = res.data.id;
              this.authFile2 = preview(res.data.id);
           
          }else{
              
          }
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                imgResult = reader.result;
            };
            reader.onerror = function(error) {
                reject(error);
            };
            reader.onloadend = function() {
                resolve(imgResult);
            };
        });
        },
      errorAuth2(res, file){
          this.$message.error("上传失败")
          
      },
      beforeUpload2(file){
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isLt2M = file.size / 1024 / 1024 < 8;

        if (testmsg!= 'jpg'&&testmsg!= 'png'&&testmsg!= 'jpeg') {
          this.$message.error('上传格式错误!');
           return false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 8MB!');
            return false;
        }
         return true;
      },
      async toOcr(res2){
          let {data} = await ocr({imgBase64:res2})
          console.log(data)
          if(data){

              this.model.orgName = data.companyName;
              this.model.orgIden = data.creditCode;
              this.model.legalPerson = data.legPerson;
          }else{
              this.$message.info("ocr识别失败，请手动填写信息")
          }

         
      },
      
      selctBank(item){
          this.model2.bankName = item.bankName;
          this.model2.value4 = item.id;
          this.bankTag = false;
      },
      isBank(e){
          console.log(e)
      },
    //   async getcertInfo(){
    //     let {data} = await findCert({type:2,id:item.id)
          
    //     this.certInfo = data;
    //   },
    reauth(){
        this.step=1;
        this.authStatus = 1;
    },
    submitForm() {
        this.$refs.agForm.validate(valid => {
            if (valid) {
                addOrgAuthInfo(this.model).then(res=>{
                    console.log(res,this,1)
                    if(res.data=="530003"){
                        this.$alert(res.message, '', {
                            confirmButtonText: '确定',
                        });
                    }else if(res.data=="530002"){
                        this.$alert(res.message, '', {
                            confirmButtonText: '确定',
                        });
                    }else{

                        this.model2.eid = String(res.data.eid);
                        this.model2.eName = res.data.orgName;
                        this.step = 1;
                        bus.$emit('setDentiy');
                    }
                    
                })
            } else {
                
                console.log('error submit!!');
                return false;
            }
        });
    } ,
    submitForm2() {
        if(this.model2.entAuthType==1){
            
            this.$refs.agForm2.validate(valid => {
                if (valid) {
                    if(this.model2.bankAddress2){
                        this.model2.bankAddress = this.model2.bankAddress2[0]+","+this.model2.bankAddress2[1]+","+this.model2.bankAddress2[2]
                    }
                    accountAuthBegin(this.model2).then(res=>{
                        this.model3.eid = String(res.data.eid);
                        // this.model2.eName = res.data.orgName;
                        // this.$router.push({
                        //     query: {
                        //         identity: '1',
                        //     },
                        // });
                        bus.$emit('setDentiy');
                        this.$message.success("提交成功")
                        this.authStatus = 2
                       
                    })
                } else {
                    
                    console.log('error submit!!');
                    return false;
                }
            });
        }else{
            if(!this.model2.authFileId){
                this.$message.error("请上传企业认证申请表")
                return false;
            }
            agencyAuth(this.model2).then(res=>{
                this.authStatus = 3;
            })
        }
    },
    submitForm3() {
        
        this.$refs.agForm3.validate(valid => {
            if (valid) {
                accountAuthCheck(this.model3).then(res=>{
                
                    if(res.data=="530009"){
                        this.$alert(res.message, '', {
                            confirmButtonText: '确定',
                        });
                    }else if(res.data=="530010"){
                        this.$alert(res.message, '', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$refs.agForm.resetFields();
                                this.$refs.agForm2.resetFields();
                                removeDentify();
                                bus.$emit('setDentiy');
                                this.step = 0;
                            }
                        });
                    }else{

                        this.$message("认证成功")
                        // this.getcertInfo();
                        this.step = 3;
                        this.$nextTick(()=>{
                            let id = ""
                            if(this.model2.eid){
                                id = this.model2.eid
                            }else{
                                id =  this.dentify.orgId
                            }
                            this.$refs.certInfo.getcertInfo(id);
                        })
                        
                    }
                })
            } else {
                
                console.log('error submit!!');
                return false;
            }
        });
    },
    anima(){
        let loading =this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
        })
        window.setTimeout(()=>{
            loading.close();
            this.$message.success("已更新最新银行列表")
        },2000)
    },
    async getBook(){
        downloadAuthTemplate({})
    }
  }
}

</script>
<style lang="less">
.fullheight{
    height: 100%;
    background: #fff;
    padding-top: 10px;
    margin-top: 10px;
}
.auth-box{
    width:1000px;
    margin:20px auto 0;
}
.bank-content{
    position: relative;
}
.bank-list{
    position: absolute;
    width:580px;

    left:0px;
    top:34px;
    background-color: #fff;
    z-index:100;
    padding:10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.bankitem{
    float:left;
    width:170px;
    text-align: center;
    padding:10px;
    cursor: pointer;
}
.comth{
    overflow:inherit;
}
.biaosi .el-input{
    width:70%;
}
</style>