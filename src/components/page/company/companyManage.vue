<!-- 我的 -->
<template>
    <!-- <div > -->
    <div class="fullheight" style="padding-right:3px;">
        <div class="cf margin-xs bg-white" style="height:100%;position: relative; margin-top:10px;">
            <!-- <img src="../../../assets/img/companybanner.png" style="width: 100%;" alt=""> -->
            <div class="bannerbg" :style="{'background-image': `url(${require('../../../assets/img/companybanner.png')})`}"></div>
            <!-- <div class="roundlogo"> -->
            <img class="roundlogo" src="../../../assets/img/companyhome.png" alt="">
            <!-- </div> -->
            <div style="text-align: center;font-size: 26px; color: #333;margin-top: 45px;">{{dentify.orgName}}</div>
            <div style="text-align: center;font-size: 14px;color: #959595;margin-top: 10px;">统一社会信用代码:{{ info.orgIden }}</div>
            <div style="text-align: center;margin-top: 10px;">
                <el-tag class="margin-left" :type="info.state == 10 ? 'success' : 'danger'">{{
                    info.state == 10 ? '已认证' : info.state == 2 ? '审核失败' : '认证中'
                }}</el-tag>
                 <el-button @click="goon" v-if="info.state != 10" class=" text-blue margin-left" type="text">继续认证</el-button>
            </div>
            <div class="infobox">
                <div class="infoitem">
                    <div>法定代表人:{{info.legalPerson}}</div>
                </div>
                <div class="infoitem">
                    <div>
                        <p>企业管理员:{{companyInfo.adminName}}</p>
                        <p>账号:{{companyInfo.adminMobile}}</p>
                        <el-button style="margin:0 auto;margin-top:20px" v-if="companyInfo.exchangeAdmin&&info.state == 10" type="danger" size="mini" plain round @click="toEditSome('visibleAdmin')">转授</el-button>
                    </div>
                </div>
                <div class="infoitem" style="border-right:0">
                    <div>
                        <p>企业员工数:{{companyInfo.count}}人</p>
                        <p>&nbsp;</p>
                        <el-button style="margin:0 auto;margin-top:20px" type="danger" size="mini" plain round @click="gotouser">查看</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="cf margin-xs padding bg-white ">
            <div class="fl margin-right margin-top">
                <img src="../../../assets/img/admin/text7.png" style="width:65px;height:65px;border-radius:50%" alt="" />
            </div>
            <div class="fl ">
                <p class="margin-top-sm">
                    <span class="margin-right text-grey">公司名称</span><span>{{ info.orgName }}</span>
                    <el-tag class="margin-left" :type="info.state == 10 ? 'success' : 'danger'">{{
                        info.state == 10 ? '已认证' : info.state == 2 ? '审核失败' : '认证中'
                    }}</el-tag>
                    
                </p>
                <p class="margin-top-sm">
                    <span class="margin-right text-grey">创建时间</span><span>{{ $util.datetimeFormat(info.createTime)   }}</span>
                </p>
                <p class="margin-top-sm">
                    <span class="margin-right text-grey">统一社会信用代码</span><span>{{ info.orgIden }}</span>
                </p>
            </div>
            <el-button type="text" class="fr" @click="viewCert" v-if="info.state==10">查看数字证书</el-button>
            <div class="fr" style="margin-top:30px;margin-right:30px;">
                <el-button @click="goon" v-if="info.state != 10" class=" text-blue" type="text">继续认证</el-button>
                <el-button class="text-blue" v-if="companyInfo.deleteOrg" type="text" @click="delcompany()">删除</el-button>
            </div>
        </div> -->
        <!-- <el-card class="margin margin-top-sm  bg-white">
            <div class="cf">
                <div class="fl ">
                    <p class="margin-top-sm">
                        <span class="margin-right text-grey">主管理员</span><span>{{ companyInfo.adminName }}</span>
                    </p>
                    <p class="margin-top-sm">
                        <span class="margin-right text-grey">企业成员</span><span>{{ companyInfo.count }}人</span>
                    </p>
                </div>
                <div class="fr" style="margin-top:20px;margin-right:30px;">
                    <el-button class=" text-blue" type="text" v-if="companyInfo.exchangeAdmin&&info.state == 10" @click="toEditSome('visibleAdmin')"
                        >更换管理员</el-button
                    >
                </div>
            </div>
        </el-card> -->
        <!-- <el-card class="margin margin-top-sm  bg-white">
            <p>完成实名认证，您将获得如下权限：</p>
            <el-row :gutter="20" class="text-center margin-top-sm">
                <el-col :span="6">
                    <div class="bg-gray padding">
                        <p>
                            <el-image style="width: 60px;height:60px;" :src="require('../../../assets/img/icon_qiye_1.png')"></el-image>
                        </p>
                        <p class="text-xl margin-top-sm">发起合同</p>
                        <p class="text-gray text-sm margin-top-sm">开启全新电子签约新模式</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-gray padding">
                        <p>
                            <el-image style="width: 60px;height:60px;" :src="require('../../../assets/img/icon_qiye_2.png')"></el-image>
                        </p>
                        <p class="text-xl margin-top-sm">提升账号安全性</p>
                        <p class="text-gray text-sm margin-top-sm">享受更多会员保障服务</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-gray padding">
                        <p>
                            <el-image style="width: 60px;height:60px;" :src="require('../../../assets/img/icon_qiye_3.png')"></el-image>
                        </p>
                        <p class="text-xl margin-top-sm">线上合同管理功能</p>
                        <p class="text-gray text-sm margin-top-sm">提升企业效率</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-gray padding">
                        <p>
                            <el-image style="width: 60px;height:60px;" :src="require('../../../assets/img/icon_qiye_4.png')"></el-image>
                        </p>
                        <p class="text-xl margin-top-sm">获得电子合同份数</p>
                        <p class="text-gray text-sm margin-top-sm">满足您对电子签约的需求</p>
                    </div>
                </el-col>
            </el-row>
        </el-card> -->
         
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext"></auth-code>
        <el-dialog title="更换管理员" :visible.sync="visibleAdmin" v-dialogDrag width="700px" class="onechange">
            
            <el-row :gutter="20">
                <el-col :span="12"><orgTree  ref="orgTree3" @handleNodeClick="onChangeClick"></orgTree></el-col>
                <el-col :span="12">
                    <span v-if="list2.length==0" >暂无成员</span>
                    <el-radio-group v-if="list2.length>0" v-model="onChangeModel.newUid">
                        <p v-for="item in list2" style="margin-top:3px">
                            <el-radio :label="item.uid">{{item.userName}}</el-radio>
                        </p>
                       
                    </el-radio-group>
                    
                </el-col>
                
            </el-row>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleAdmin = false">取 消</el-button>
                <el-button type="primary" @click="chageAdmin" >保存</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog title="更换管理员" :visible.sync="visibleAdmin" v-dialogDrag width="600px">
            
            <el-form label-width="90px" ref="treeSelect" :model="modelTree" @submit.native.prevent>
                <el-form-item style="margin-bottom: 0;" verify label="选择成员" prop="uid">
                        
                    <treeselect
                        noOptionsText="暂无成员"
                        v-model="modelTree.uid"
                        :load-options="loadDepts"
                        :disable-branch-nodes="true"
                        :options="treeData"
                        style="width: 370px;"
                        placeholder="选择成员"
                       
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleAdmin = false">取消</el-button>
                <el-button type="primary" @click="chageAdmin">确定</el-button>
            </div>
        </el-dialog> -->
         <el-dialog title="证书" :visible.sync="visibleViewCert" v-dialogDrag width="600px">
             <cert-info ref="certInfo"></cert-info>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button type="primary"  @click="visibleViewCert = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { comFindById, countOrgUser, findFirstPage, deleteOrgAuthInfo,updateAdmin } from '../../../api/company.js';
import { getDentify, setDentify,getToken,setToken} from '@/utils/auth';
import bus from '../../common/bus.js';
import CertInfo from '../../common/certInfo.vue'
import AuthCode from '../../common/authCode';
import Treeselect from '@riophae/vue-treeselect';
import {findOrgAuthInfoList} from '../../../api/companyManage.js';
import common from '@/assets/js/common.js'
import addUser from './roleWin/addUser'
import orgTree from '../../common/orgTree';
 import {findOrgUserList,findOrgUserListRealName} from '../../../api/companyManage.js';
 import { refreshToken } from '../../../api/user.js';
 
// import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
export default {
    components: { AuthCode, Treeselect,addUser,orgTree,CertInfo },
    data() {
        return {
            dentify: {},
            info: {},
            data: [],
            treeData:[],
            realPhone: '',
            companyInfo: {},
            count: 0,
            nowVisi: '',
            visibleCode: false,
            visibleAdmin:false,
            userInfo: {},
            cheackToken:"",
            powerList:[],
            visibleViewCert:false,
            modelTree:{
              uid:null
            },
             list2:[],
            onChangeModel: {
                
                newUid: ''
              
            },
        };
    },
    methods: {
        async init() {
            comFindById({ eid: this.dentify.orgId }).then(res => {
                this.info = res.data;
            });

            let { data } = await findFirstPage({});
            this.companyInfo = data;
            this.companyInfo.adminMobile = common.base64DeCode(this.companyInfo.adminMobile)
            let phone = this.companyInfo.adminMobile
            this.companyInfo.adminMobile = phone.substring(0, 3)+"****"+phone.substr(phone.length-4);
        },
        getinfo(tag) {
            this.$store.dispatch('GetInfo', tag).then(res => {
                this.userInfo = res;
                this.realPhone = res.realPhone;
            });
        },
        toEditSome(visible) {
            // this.visibleAdmin = true;
            //  this.$nextTick(res => {
            //     this.$refs.orgTree3.getOrgList();
            // });
            this.nowVisi = visible;
            this.visibleCode = true;
        },
        viewCert(){
            this.visibleViewCert = true;
            this.$nextTick(()=>{
                this.$refs.certInfo.getcertInfo(this.dentify.orgId);
            })
        },
        toNext(cheackToken) {
            this[this.nowVisi] = true;
            this.visibleCode = false;
            this.cheackToken = cheackToken;
             this.$nextTick(res => {
                this.$refs.orgTree3.getOrgList();
            });
            // })
        },
        closepop(visible) {
            this[visible] = false;
        },
        onChangeClick(item){
          
            this.onChangeModel.orgId = item.id;
            this.getUserList2();
        },
        
        getUserList2(){
            let model = {
                orgId: this.onChangeModel.orgId,
                pageNum: 1,
                pageSize: 999
            }
            findOrgUserListRealName(model).then(res => {
                 
                this.list2 = res.data.list;
                
            });
        },
        async chageAdmin() {
        //   this.$refs.treeSelect.validate(async valid => {

            // if (valid) {
                if(!this.onChangeModel.newUid){
                    this.$message.error("请选择转交员工")
                    return false;
                }
              let {data} =await updateAdmin({
                uid:this.onChangeModel.newUid,
                eid:this.dentify.orgId,
                token:this.cheackToken
              })
              this.$message.success("更换成功")
             
              let res = await refreshToken({ eid: this.dentify.orgId, access_token: getToken() });
              setToken(res.access_token);
               this.init();
              this.getinfo(true)
              this[this.nowVisi] = false;
            // }
        //   })
            
        },
        async refreshToken(item) {
           
              
        },
        async loadDepts({ action, parentNode, callback }){
          
          if (action === "LOAD_CHILDREN_OPTIONS") {
            let {data} = await  findOrgUserList({
              orgId:parentNode.id,
              pageNum:1,
              pageSize:9999
            })
            let coData = [];//JSON.parse(JSON.stringify(data.list))
            try {
                coData = JSON.parse(JSON.stringify(data.list))
            } catch (error) {
               coData = [];
            }
            // if(coData.length>0){
              
              coData.forEach(item=>{
                item.id = item.uid;
                item.label = item.userName;
                item.children = undefined;
              })
            // }else{

            // } 
           
            parentNode.children = coData
             callback()
             
            // parentNode.children = [ {
            //     id: 'child',
            //     label: 'Child option',
            //   } ]
            // callback()
          }
        },
        goon() {
            this.$router.push('/company/authCompany?type=edit');
        },
        gotouser(){
             this.$router.push('/company/userManage');
        },
        async delcompany() {
            this.$confirm('确认删除企业?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let { data } = await deleteOrgAuthInfo({ eid: this.dentify.orgId });
                    this.$message.success('删除成功');
                    setDentify({
                        orgId: 0,
                        orgName: this.userInfo.userName
                    });
                    bus.$emit('setDentiy');
                    this.$router.push('/mine/account');
                })
                .catch(() => {});
        },
        async getOrgList(selectTag){
          
          let {data} = await findOrgAuthInfoList({id:this.dentify.orgId});
          let adata = [data];
          adata.forEach(item=>{
            item.children = item.orgInfoDtoList;
            item.label = item.channelName;
            item.children.forEach(element=>{
               element.children = null;
                element.label = element.channelName;
            })
          })
          this.treeData = adata;
         
        }
    },
    created() {
        
    },
    mounted(){
        this.dentify = getDentify();
        
        this.init();
        this.getinfo();
        this.getOrgList();
    }
};
</script>
<style scoped lang="less">
.bannerbg{
    width: 100%;
    height: 160px;
    background-size: cover;
}
.roundlogo{
    width: 84px;
    height: 84px;
    /* background: #FFFFFF; */
    /* box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.05); */
    border-radius: 100%;
    position: absolute;
    left:50%;
    margin-left: -42px;
    top:125px;
}
.infobox{
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-around;
    height: 170px;
    width: 86%;
    margin-left: 7%;
    margin-top: 35px;
    .infoitem{
        border-top:1px solid #f0f0f0;
        border-right:1px solid #f0f0f0;
        width: 100%;
        display: flex;
        div{
            align-items:center;
            align-content: center;
            display: flex;
            text-align: center;
            margin:0 auto;
            font-size: 16px;
            color: #333333;
            flex-wrap:wrap;
            p{
                width: 100%;
                margin-bottom: 10px;
            }
        }
    }
}
</style>
