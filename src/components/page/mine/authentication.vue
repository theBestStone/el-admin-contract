<!-- 实名认证 -->
<template>
    <div>
        <div class="fullheight">
            <div class="auth-box">
                <div class="ms-title margin-sm">
                    <el-steps :active="step" align-center finish-status="success">
                        <el-step title="信息填写"></el-step>
                        <el-step title="认证比对" v-if="model.type == 1"></el-step>
                        <el-step title="成功"></el-step>
                    </el-steps>
                </div>
                <el-card class="padding margin-top-lg">
                    <div v-if="step == 0">
                        <p class="text-center margin-tb">请如实填写一下信息，为认证比对提供基础数据</p>
                        <el-form :model="model" ref="agForm" label-width="100px">
                            <el-form-item label="姓名" prop="userName" verify>
                                <el-input v-model="model.userName" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" verify idcard prop="idNumber">
                                <el-input v-model="model.idNumber" placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                            <el-form-item label="认证方式" prop="type">
                                <el-select v-model="model.type" placeholder="请选择" style="width: 100%">
                                    <el-option key="1" label="人脸识别认证" value="1"></el-option>
                                    <el-option key="2" label="手机号认证" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号" verify agphone prop="phone" v-if="model.type == 2">
                                <el-input v-model="model.phone" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" verify prop="code" v-if="model.type == 2">
                                <div style="position: relative">
                                    <el-input v-model="model.code" placeholder="请输入验证码"> </el-input>
                                    <!-- <el-button type="text" style="position: absolute; right: 10px; top: 2px" @click=""
                                        >获取验证码</el-button
                                    > -->
                                </div>
                            </el-form-item>
                            <div class="login-btn text-center">
                                <el-button type="primary" @click="submitForm()">下一步</el-button>
                            </div>
                        </el-form>
                    </div>
                    <div v-if="step == 1" class="padding text-center">
                        <div style="position: relative; width: 200px; height: 200px; margin: 0 auto">
                            <el-image style="width: 200px; height: 200px" :src="url" fit="cover"></el-image>
                            <div class="coverimg" v-if="freshTag" @click="getIMG">
                                <i class="el-icon-refresh-left"></i>二维码已失效，点击刷新
                            </div>
                        </div>

                        <p class="margin-top">请使用微信扫描二维码</p>
                        <p>打开“小移慧眼小程序”完成实名认证</p>
                        <div class="login-btn text-center margin-top">
                            <el-button type="primary" @click="step = 0">上一步</el-button>
                        </div>
                    </div>
                    <div v-if="step == 3" class="text-center">
                        <p class="text-green text-center"><i class="el-icon-success text-lg margin-right-sm"></i>实名认证成功</p>
                        <cert-info ref="certInfo"></cert-info>
                        <p class="margin-top">
                            <el-button type="primary" @click="backpre" style="width: 200px"> 返回 </el-button>
                        </p>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { createAuthCode, queryByWxApp, findCert, addCert } from '../../../api/user.js';
import CertInfo from '../../common/certInfo.vue';
import { setToken, getToken } from '@/utils/auth';
import { refreshToken } from '../../../api/user.js';
import bus from '../../common/bus';

let times = null;
export default {
    components: { CertInfo },
    data() {
        return {
            model: {
                userName: '',
                idNumber: '',
                type: '1'
            },
            userInfo: {},
            certInfo: {},
            step: 0,
            registerToken: '',
            freshTag: false,

            url: '' //require("../../../assets/img/sign.png")
        };
    },
    created() {
        //   this.GetInfo();
    },
    mounted() {
        //   this.$refs.certInfo.GetInfo(true);
    },
    beforeDestroy() {
        //   if (times) { //如果定时器还在运行 或者直接关闭，不用判断
        //     window.clearTimeout(times); //关闭
        //   }
    },

    methods: {
        backpre() {
            this.$router.go(-1);
        },
        getauth() {
            queryByWxApp({ registerToken: this.registerToken })
                .then(async (res) => {
                    if (res.data) {
                        this.step = 3;
                        // if(times){

                        //     window.clearTimeout(times);
                        //     times = null;
                        // }
                        let res = await refreshToken({ eid: 0 });
                        setToken(res.access_token);
                        this.$nextTick(() => {
                            bus.$emit('setDentiy');
                            this.$refs.certInfo.GetInfo(true);
                        });
                        // this.GetInfo(true);
                    } else {
                        window.setTimeout(() => {
                            this.getauth();
                        }, 2000);
                    }
                })
                .catch(() => {
                    //    window.clearTimeout(times);
                    times = null;
                    this.freshTag = true;
                });
        },
        submitForm() {
            this.$refs.agForm.validate((valid) => {
                if (valid) {
                    this.getIMG();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getIMG() {
            // if(times){
            //     window.clearTimeout(times);
            //     times = null;
            // }
            createAuthCode(this.model).then((res) => {
                this.url = 'data:image/png;base64,' + res.data.codeImage;
                this.freshTag = false;
                this.registerToken = res.data.registerToken;
                this.step = 1;
                times = window.setTimeout(() => {
                    this.getauth();
                }, 2000);
                // times = window.setInterval(() => {
                //         this.getauth();
                // }, 2000);
            });
        }
    }
};
</script>
<style lang="less">
.auth-box {
    width: 600px;
    margin: 20px auto 0;
    .el-card.is-always-shadow {
        box-shadow: 0px 0px 0px 0px #fff !important;
    }
}
.coverimg {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.9);
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
}
.fullheight {
    height: 100%;
    background: #fff;
    padding-top: 10px;
    margin-top: 10px;
}
</style>