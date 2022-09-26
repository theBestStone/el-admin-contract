<!-- 我的 -->
<template>
    <div class="mines">
        <el-row :gutter="10" class="padding-sm">
            <el-col :span="12" class="">
                <div class="padding-sm bg-white solid-bottom">我的信息</div>
                <div class="cf  padding bg-white  text-bold">
                    <div class="fl margin-right">
                      
                        <img :src="headImg" style="width:65px;height:65px;border-radius:50%"  alt="" />
                    </div>
                    <div class="fl ">
                        <p class="margin-top-sm">{{ userInfo.userName }}</p>
                        <p class="text-gray text-df">{{ userInfo.phone }}</p>
                    </div>
                    <el-button style="float: left;font-size:12px;margin-left:20px;margin-top:20px; padding: 3px 0" type="text" @click="viewCert" v-if="userInfo.realNameState == 1"
                        >查看证书</el-button
                    >
                      <uploads  style="float: left;font-size:14px;margin-left:10px;margin-top:10px; padding: 3px 0"  @successAuth="successAuth" @errorAuth="errorAuth" @beforeUpload="beforeUpload" :fileType="['png','jpg','jpeg']" :btnTitle="'上传头像'" :uploadUrl="'common'" :btnType="'text'"></uploads>
                </div>
            </el-col>
            <el-col :span="12" class="">
                <div class="padding-sm bg-white solid-bottom cf">
                    企业信息<el-button
                        class="fr"
                        style="padding-top:0"
                        type="text"
                        @click="toApplyCompany"
                        v-if="userInfo.realNameState == 1"
                        >加入企业</el-button
                    >
                </div>
                <div class="cf   bg-white  text-bold" style="height:98px;">
                    <div class="padding-left margin-top" v-if="userInfo.realNameState == 0">暂未加入企业</div>
                    <div class="block" v-if="userInfo.realNameState == 1">
                        <el-carousel height="98px" trigger="click" :autoplay="false" :arrow="'always'">
                            <el-carousel-item v-for="item in channalList" :key="item.id">
                                <div class="cf padding-top-sm">
                                    <div class="fl margin-right" style="margin-left:50px;">
                                        <img
                                            src="../../../assets/img/admin/text7.png"
                                            style="width:65px;height:65px;border-radius:50%"
                                            alt=""
                                        />
                                    </div>
                                    <div class="fl ">
                                        <p class="margin-top-sm"><span class="text-gray margin-right">企业名称</span> {{ item.orgName }}</p>
                                        <p class="text-gray text-df"><span class="text-gray margin-right">授权角色</span>{{item.roleNameAll}}</p>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </el-col>
            <el-col> </el-col>
        </el-row>

        <el-card class="margin-lr-sm">
            <ul class="ag-list">
                <li class="ag-item cf">
                    <div class="fl ">
                        <p class="ag-item-first">真实姓名</p>
                        <p class="ag-item-second">{{ userInfo.userName }}</p>
                    </div>

                    <div class="fr" v-if="userInfo.realNameState != 1">
                        <el-button class="text-blue" type="text" @click="toAuth">去认证</el-button>
                    </div>
                </li>
                <li class="ag-item cf">
                    <div class="fl">
                        <p class="ag-item-first">手机号</p>
                        <p class="ag-item-second">{{ userInfo.phone }}</p>
                    </div>

                    <div class="fr">
                        <el-button class="text-blue" type="text" @click="toEditSome('visiblePhone','editPhone')">修改</el-button>
                    </div>
                </li>
                <li class="ag-item cf">
                    <div class="fl">
                        <p class="ag-item-first">电子邮箱</p>
                        <p class="ag-item-second">{{ userInfo.email }}</p>
                    </div>

                    <div class="fr">
                        <el-button class="text-blue" @click="toEditSome('visibleEmail','editEmail')" type="text">修改</el-button>
                    </div>
                </li>
                <li class="ag-item cf">
                    <div class="fl ">
                        <p class="ag-item-first">登录密码</p>
                        <p class="ag-item-second">已设置，可通过账号密码登录</p>
                    </div>

                    <div class="fr">
                        <el-button class="text-blue" type="text" @click="toEditSome('visibleRepass','editRepass')">重置</el-button>
                    </div>
                </li>
                <li class="ag-item cf">
                    <div class="fl ag-item-first">
                        <p class="ag-item-first">账号注销</p>
                        <p class="ag-item-second">
                            若不再需要此账号，可将其注销。<span class="text-red">注销成功后，该账号下所有服务及数据将被删除且无法恢复</span>
                        </p>
                    </div>

                    <div class="fr">
                         <el-button @click="toEditSome('visibleno','')"  v-if="userInfo.state==2" class="text-blue" type="text">取消注销</el-button>
                        <router-link to="/mine/closeAccount" v-if="userInfo.state==0">
                            <el-button class="text-blue" type="text">注销账号</el-button>
                        </router-link>
                    </div>
                </li>
                <li class="ag-item cf">
                    <div class="fl">
                        <p class="ag-item-first">密码签署</p>
                        <p class="ag-item-second">开启后，每次签署时需使用密码校验</p>
                    </div>

                    <div class="fr">
                        <el-switch class="margin-right" @change="updateEnble" v-model="userInfo.signPwdEnabled== 0?false:true">
                        </el-switch>
                        <el-button type="text" @click="toEditSome('visibleSignpass','editSignpass')">{{
                            userInfo.signPwdState == 0 ? '添加签署密码' : '修改签署密码'
                        }}</el-button>
                        <!-- |
                      <el-button  class="text-blue" type="text" @click="toEditSome('visibleSignpass')">重置</el-button> -->
                    </div>
                </li>
            </ul>
        </el-card>
        <el-dialog title="申请加入企业" :visible.sync="visibleApply" v-dialogDrag width="400px">
            <div>
                <el-select
                    v-model="companyJoninIndex"
                    style="width:350px;"
                    filterable
                    :remote-method="remoteMethod"
                    remote
                    placeholder="请选择"
                >
                    <el-option v-for="item in options" :key="item.eid" :label="item.orgName" :value="item.eid">
                        <span style="float: left">{{ item.orgName }}</span>
                        <span style="float: right;margin-left:10x; color: #8492a6; font-size: 13px"
                            ><el-tag type="success">已认证</el-tag></span
                        >
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleApply = false">取 消</el-button>
                <el-button type="primary" @click="joinCompany">确 定</el-button>
            </div>
        </el-dialog>
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext"></auth-code>
        <!-- <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext"></auth-code> -->
        <el-dialog title="输入新手机号" :visible.sync="visiblePhone" v-dialogDrag width="500px">
            <el-form :model="editPhoneModel" ref="editPhone" label-width="100px">
                <el-form-item label="手机号" prop="newPhone" verify agphone>
                    <el-input v-model="editPhoneModel.newPhone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verifyCode" verify>
                    <el-input type="text" placeholder="请输入验证码" style="width:58%" v-model="editPhoneModel.verifyCode"> </el-input>
                    <span class="margin-left-sm" style="width:40%"> <Yzm :data="{ mobile: editPhoneModel.newPhone }"></Yzm></span>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visiblePhone = false">取 消</el-button>
                <el-button type="primary" @click="editPhone">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="邮箱修改" :visible.sync="visibleEmail" v-dialogDrag width="500px">
            <el-form :model="editEmailModel" ref="editEmail" label-width="100px">
                <el-form-item label="邮箱号" prop="email" verify email>
                    <el-input v-model="editEmailModel.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleEmail = false">取 消</el-button>
                <el-button type="primary" @click="editEmail">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="输入新密码" :visible.sync="visibleRepass" v-dialogDrag width="500px">
            <el-form :model="editRepassModel" ref="editRepass" label-width="150px">
                <el-form-item label="登录密码" prop="password" agpass verify>
                    <el-input type="password" v-model="editRepassModel.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认登录密码" prop="rePassword"  :verify="verifypassword" :watch="editRepassModel.password">
                    <el-input type="password" v-model="editRepassModel.rePassword" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleRepass = false">取 消</el-button>
                <el-button type="primary" @click="editRepass">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置签署密码" :visible.sync="visibleSignpass" v-dialogDrag width="500px">
            <el-form :model="editSignpassModel" ref="editSignpass" label-width="150px">
                <el-form-item label="设置密码" prop="signPassword" agsignpass verify :length="6">
                    <el-input type="password" v-model="editSignpassModel.signPassword" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    prop="rePassword"
                    number
                    :length="6"
                     
                    :verify="verifypassword2"
                    :watch="editSignpassModel.signPassword"
                >
                    <el-input type="password" v-model="editSignpassModel.rePassword" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleSignpass = false">取 消</el-button>
                <el-button type="primary" @click="editSignpass">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="证书" :visible.sync="visibleViewCert" v-dialogDrag width="600px">
             <cert-info ref="certInfo"></cert-info>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button type="primary"  @click="visibleViewCert = false">关闭</el-button>
            </div>
        </el-dialog>

        <!-- <el-card class="margin-sm">
          <div slot="header" class="clearfix  text-bold text-xl">
            <span>成员管理</span>
           
        </div>
      </el-card> -->
    </div>
</template>

<script>
import AuthCode from '../../common/authCode';
import Yzm from '../../common/yzm';
 import CertInfo from '../../common/certInfo.vue'
 import {preview} from '../../../api/index.js';
import { updateEmail, updatePhone, checkIdentify, retrievePwd, signPwdOnOff, setSignPw,profilePicture,accountBackOut } from '../../../api/user.js';
import { queryEntName, joinEnt } from '../../../api/company.js';
import { changeIdentify } from '../../../api/user.js';
import uploads from '../../../components/common/uploads';
export default {
    components: { AuthCode, Yzm,CertInfo,uploads },
    data() {
        return {
            value1: false,
            visibleApply: false,
            visibleCode: false,
            visiblePhone: false,
            visibleEmail: false,
            visibleRepass: false,
            visibleSignpass: false,
            visibleViewCert:false,
            visibleno:false,//无用
            companyJoninIndex: '',
            options: [],
            editPhoneModel: { newPhone: '', verifyCode: '', token: '' },
            editEmailModel: { email: '', token: '' },
            editRepassModel: { password: '', token: '', rePassword: '', phone: '' },
            editSignpassModel: { rePassword: '', signPassword: '', token: '' },
            realPhone: '',
            userInfo: {},
            nowVisi: '',
            nowFrom:"",
            msgCode: '',
            cheackToken: '', //验证码验的返回token
            passwordCopy: '',
            passwordCopy2: '',
            channalList: [],
            headImg:require('../../../assets/img/admin/text7.png')
        };
    },
    created() {
        this.getinfo();
        this.getcom();
    },

    methods: {
        getinfo(tag) {
            this.$store.dispatch('GetInfo', tag).then(res => {
             
                this.userInfo = res;
                this.realPhone = res.realPhone;
                if(res.fileId){
                    this.headImg = preview(res.fileId)
                }
            });
        },
        getcom() {
            changeIdentify({}).then(res => {
                this.channalList = res.data[1];
            });
        },
        toAuth() {
            this.$router.push({ path: '/mine/authentication' });
        },
        toApplyCompany() {
            this.visibleApply = true;
        },
        editPhone() {
            this.$refs.editPhone.validate(valid => {
                if (valid) {
                    this.editPhoneModel.token = this.cheackToken;
                    updatePhone(this.editPhoneModel).then(res => {
                        this.$alert('手机号修改成功，请使用新的手机号码重新登陆', '温馨提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$store
                                    .dispatch('LogOut')
                                    .then(res => {
                                        location.reload();
                                    })
                                    .catch(res => {});
                            }
                        });
                        this[this.nowVisi] = false;
                    });
                } else {
                    return false;
                }
            });
        },
        editEmail() {
            this.$refs.editEmail.validate(valid => {
                if (valid) {
                    this.editEmailModel.token = this.cheackToken;
                    updateEmail(this.editEmailModel).then(res => {
                        this.$message.success('修改成功');
                        this[this.nowVisi] = false;
                        this.getinfo(true);
                    });
                } else {
                    return false;
                }
            });
        },
        editRepass() {
            this.$refs.editRepass.validate(valid => {
                if (valid) {
                    let editRepassModel = JSON.parse(JSON.stringify(this.editRepassModel))
                    editRepassModel.token = this.cheackToken;
                    editRepassModel.phone = this.realPhone;
                    this.passwordCopy = editRepassModel.password;
                    editRepassModel.password = this.$common.Encrypt(editRepassModel.password);
                    editRepassModel.rePassword = this.$common.Encrypt(editRepassModel.rePassword);
                    editRepassModel.verifyCode = this.msgCode;
                    retrievePwd(editRepassModel)
                        .then(res => {
                            this[this.nowVisi] = false;
                            this.$alert('密码修改成功，请使用新密码重新登陆', '温馨提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$store
                                        .dispatch('LogOut')
                                        .then(res => {
                                            location.reload();
                                        })
                                        .catch(res => {});
                                }
                            });
                        })
                        .catch(err => {
                            // this.editRepassModel.password = this.passwordCopy;
                            // this.editRepassModel.rePassword = this.passwordCopy;
                        });
                } else {
                    return false;
                }
            });
        },
        editSignpass() {
            this.$refs.editSignpass.validate(valid => {
                if (valid) {
                    let editSignpassModel = JSON.parse(JSON.stringify(this.editSignpassModel))
                    this.passwordCopy2 = editSignpassModel.signPassword;
                    editSignpassModel.signPassword = this.$common.Encrypt(editSignpassModel.signPassword);
                    editSignpassModel.rePassword = this.$common.Encrypt(editSignpassModel.rePassword);
                    editSignpassModel.token = this.cheackToken;
                    setSignPw(editSignpassModel).then(res => {
                        this[this.nowVisi] = false;
                        this.$message.success('操作成功');
                        this.getinfo(true);
                    }).catch(err => {
                            // this.editSignpassModel.signPassword = this.passwordCopy2;
                            // this.editSignpassModel.rePassword = this.passwordCopy2;
                        });;
                } else {
                    return false;
                }
            });
        },
        updateEnble(e) {
            if (this.userInfo.signPwdState == 1) {
                var state = 0;
                let str = '已关闭';
                if (e) {
                    state = 1;
                    str = '已开启';
                }
                signPwdOnOff({ state: state }).then(res => {
                    this.$message.success(str);
                    this.getinfo(true);
                    this.userInfo.signPwdEnabled = e ? 1 : 0;
                });
            } else {
                this.toEditSome('visibleSignpass','editSignpass');
            }
        },
        verifypassword(rule, val, callback) {
            if (val) {
                if (val !== this.editRepassModel.password) callback(Error('两次输入密码不一致!'));
                else callback();
            } else {
                callback();
            }
        },
        verifypassword2(rule, val, callback) {
            if (val) {
                if (val !== this.editSignpassModel.signPassword) callback(Error('两次输入密码不一致!'));
                else callback();
            } else {
                callback();
            }
        },
        toEditSome(visible,nowFrom) {
            this.nowVisi = visible;
            this.nowFrom = nowFrom
            this.visibleCode = true;
           
        },
        async cancelClose(){
            // this.$confirm('确定取消注销？', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消'
            // }).then(() => {
                 accountBackOut({token:this.cheackToken}).then(()=>{
                    this.$message.success('取消成功');
                    this.getinfo(true);
                 })
            // });
        },
        joinCompany() {
            //companyJoninIndex

            joinEnt({
                eid: String(this.companyJoninIndex)
            }).then(res => {
                this.$message.success('申请成功');
                this.visibleApply = false;
            });
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                queryEntName({
                    entName: query
                }).then(res => {
                    if (res.data.length > 0) {
                        this.options = res.data;
                    } else {
                        this.options = [];
                    }
                });
                //   setTimeout(() => {
                //     this.loading = false;
                //     this.options = this.list.filter(item => {
                //       return item.label.toLowerCase()
                //         .indexOf(query.toLowerCase()) > -1;
                //     });
                //   }, 200);
            } else {
                this.options = [];
            }
        },
        closepop(visible) {
            this[visible] = false;
        },
        toNext(cheackToken) {
            // this.msgCode = code;
            // checkIdentify({verifyCode:code}).then(res=>{
            this.cheackToken = cheackToken;
            this.visibleCode = false;
            if(this.nowVisi=='visibleno'){
                this.cancelClose();
            }else{

                this[this.nowVisi] = true;
               
                 if(this.nowFrom){
                    this.$nextTick(()=>{
                        this.$refs[this.nowFrom].resetFields();
                    })
                }
            }
            // })
        },
        viewCert(){
            this.visibleViewCert = true;
            this.$nextTick(()=>{
                this.$refs.certInfo.GetInfo(true);
            })
        },
        async successAuth(res,file) {
       
             
            let {data} =await profilePicture({fileId:res.data.id});
            this.$message.success("修改成功")
            this.headImg =  preview(res.data.id)
                
        },
        errorAuth(){
            
        },
        beforeUpload(files) {
         

        },
        editHeadImg(){
           
        }
    }
};
</script>
<style lang="less">
.ag-list {
    .ag-item {
        padding: 10px 0;
        border-bottom: 1px dashed #dee0e3;
        .ag-item-first {
            // width:120px;
            color: #333;
        }
        .ag-item-second {
            margin-top: 10px;
            color: #b2b5c7;
        }
    }
}
.mines {
    .el-carousel__arrow--left {
        left: 5px;
    }
}
</style>
