<template>
    <div class="header agheader" :style="{ backgroundColor: bgColor }">
        <div class="content90" :class="{ content100: !isAdmin }">
            <i v-if="isCompany" class="el-icon-close closeIcon" @click="goback"></i>
            <div class="logo" :class="{ logo2: !isAdmin }"><img :src="logo" alt="" /></div>
            <span v-if="isCompany" class="compname">{{ dentify.orgName }}</span>
            <div v-if="!isCompany" class="header-left">
                <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    :background-color="bgColor"
                    :text-color="textColor"
                    :active-text-color="activetext"
                >
                    <el-menu-item index="admin"> 首页 </el-menu-item>
                    <el-menu-item index="contract" v-if="checkPer(['admin', 'menu:contract'])"> 文件管理 </el-menu-item>
                    <!-- v-if="checkPer(['admin', 'menu:contract'])" -->
                    <el-menu-item index="template" v-if="checkPer(['admin', 'menu:model'])"> 模板管理 </el-menu-item>
                    <el-menu-item index="business" v-if="checkPer(['admin', 'menu:business'])"> 场景管理</el-menu-item>

                    <el-menu-item index="mine"> 用户中心 </el-menu-item>
                    <el-menu-item index="videoList" v-if="checkPer(['comper'])"> 音视频签约 </el-menu-item>
                    <el-menu-item index="powerful" v-if="checkPer(['comper'])"> 能力开放平台 </el-menu-item>
                </el-menu>
            </div>
            <div v-if="!isCompany" class="header-right">
                <div class="header-user-con" :style="{ color: textColor }">
                    <div v-if="dentify.orgId != 0" class="position-relative">
                        <router-link :to="{ path: '/company/companyManage' }"
                            ><el-button class="createComBtn">企业控制台</el-button>
                        </router-link>
                    </div>
                    <div v-if="dentify.orgId == 0" class="position-relative">
                        <el-button class="createComBtn" @click="createCom">新建企业</el-button>
                    </div>
                    <!-- 全屏显示 -->
                    <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div> -->
                    <!-- 消息中心 -->
                    <div class="btn-bell">
                        <el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
                            <router-link to="/notice">
                                <div>
                                    <i class="el-icon-bell" :style="{ color: textColor }"></i>
                                    <span>消息</span>
                                </div>
                            </router-link>
                        </el-tooltip>
                        <span class="btn-bell-badge" v-if="message"></span>
                    </div>
                    <span class="divider">|</span>
                    <!-- 用户头像 -->
                    <!-- <div class="user-avator">
                        <img src="../../assets/img/img.jpg" />
                    </div> -->
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link" :style="{ color: textColor }">
                            {{ dentify.orgName }}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided v-for="item in channalList" @click.native="setDentiy(item)" :key="item.id">{{
                                item.orgName
                            }}</el-dropdown-item>

                            <el-dropdown-item divided class="text-blue" command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <websoket ref="ws" @onmessage="wsonmessage"></websoket>
        <el-dialog
            title="检测到您的企业没有能力开发者权限，可申请开通"
            :modal-append-to-body="false"
            :visible.sync="visiblePower"
            v-dialogDrag
            width="600px"
        >
            <el-form :model="powerModel" ref="powerful" label-width="100px">
                <el-form-item label="当前企业" prop="entName" verify>
                    <el-input disabled="" v-model="powerModel.entName" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="企业邮箱" prop="email" verify email>
                    <el-input v-model="powerModel.email" placeholder="请输入企业邮箱"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" prop="professionIds" verify>
                    <el-cascader
                        :show-all-levels="false"
                        v-model="powerModel.professionIds"
                        :options="professionList"
                        :props="{ value: 'id', label: 'name' }"
                    ></el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visiblePower = false">取 消</el-button>
                <el-button type="primary" @click="toPower">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="检测到您的企业没有音视频签约权限，可申请开通"
            :modal-append-to-body="false"
            :visible.sync="visibleVideo"
            v-dialogDrag
            width="600px"
        >
            <el-form label-width="100px">
                <el-form-item label="当前企业" verify>
                    <el-input disabled="" v-model="dentify.orgName" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleVideo = false">取 消</el-button>
                <el-button type="primary" @click="getVideo">下一步</el-button>
            </div>
        </el-dialog>
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext"></auth-code>
        <el-dialog title="" :modal-append-to-body="false" :visible.sync="visibletip1" v-dialogDrag width="600px">
            <div>
                {{ tiptitle1 }}
                <el-button v-if="visibletip11 == 2 || visibletip11 == 3" type="text" @click="createCom2(1)">创建企业</el-button>
                <span v-if="visibletip11 == 3">或</span>
                <el-button v-if="visibletip11 == 1 || visibletip11 == 3" type="text" @click="createCom2(2)">继续认证</el-button>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibletip1 = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="" :modal-append-to-body="false" :visible.sync="visibletip2" v-dialogDrag width="600px">
            <div>
                {{ tiptitle1 }}
                <el-button v-if="visibletip21 == 2 || visibletip21 == 3" type="text" @click="createCom2(1)">创建企业</el-button>
                <span v-if="visibletip21 == 3">或</span>
                <el-button v-if="visibletip21 == 1 || visibletip21 == 3" type="text" @click="createCom2(2)">继续认证</el-button>
            </div>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibletip2 = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
import { getDentify, removeDentify, setDentify, getToken, setToken } from '@/utils/auth';
import { changeIdentify, refreshToken } from '../../api/user.js';
import { findFirstPage } from '../../api/company.js';
import { updateVideoPermission } from '../../api/video.js';
import { openProfessionList, applyOpenEnt, profilePicheckOpenEntcture } from '../../api/powerful.js';
import AuthCode from '../common/authCode';
import websoket from './websoket';

export default {
    components: { websoket, AuthCode },
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'hui',
            message: 0,
            activeIndex2: '',
            bgColor: '',
            scroll: 0,
            isAdmin: false,
            isCompany: false,
            textColor: '',
            activetext: '',
            logo: require('../../assets/img/colourful-logo.png'),
            channalList: [],
            dentify: {
                orgId: 0,
                orgName: '未实名'
            },
            powerModel: {
                entName: '',
                email: '',
                professionIds: [],
                professionId: ''
            },
            companyInfo: {},
            visiblePower: false,
            visibleVideo: false,
            visibleCode: false,
            visibletip1: false,
            visibletip11: 1,
            visibletip2: false,
            visibletip21: 1,
            tiptitle1: '',
            list1: [],
            professionList: [],
            userInfo: {},
            realPhone: '',
            cheackToken: '',
            getDentify: {},
            useRelStatus: 0
        };
    },
    watch: {
        $route() {
            this.headerColor();
            this.iscompany();
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    async beforeDestroy() {
        //页面销毁时关闭长连接
        await this.$refs.ws.closed();
    },
    methods: {
        closepop(visible) {
            this.visibleCode = false;
        },
        async toNext(cheackToken) {
            // this.msgCode = code;
            // checkIdentify({verifyCode:code}).then(res=>{

            // this.cheackToken = cheackToken;
            let { data, message } = await updateVideoPermission({ token: cheackToken });
            this.visibleCode = false;

            this.$store.dispatch('GetInfo', true).then(() => {
                this.$message.success(message);
            });
            // })
        },
        getChangeIdentify() {
            let obj = { orgName: '未实名', orgId: 0 };
            let dentify = getDentify();
            // if(dentify){
            //     this.dentify = getDentify();
            // }else{
            //     this.dentify =obj;
            // }

            changeIdentify({}).then(async (res) => {
                if (res.data[0]) {
                    //下拉的显示
                    res.data[0].orgName = res.data[0].userName;
                    res.data[0].orgId = 0;
                    this.channalList = res.data[1];
                    obj = { orgName: res.data[0].orgName, orgId: 0 };
                    this.channalList.unshift(obj);
                }
                //
                if (dentify) {
                    if ((dentify.orgName == '未实名' || dentify.orgName.indexOf('**') != -1) && this.userInfo.realNameState == 1) {
                        dentify.orgName = this.userInfo.name;
                    }
                    this.dentify = dentify;
                    setDentify(dentify);

                    if (this.dentify.orgId != 0) {
                        this.findFirstPage();
                    }
                } else {
                    if (this.userInfo.realNameState == 0) {
                        obj.orgName = this.userInfo.userName || '未实名';
                        //实名后的添加
                    }

                    this.dentify = obj;
                    setDentify(obj);
                }
                console.log(this.dentify, 'this.dentify ');
            });
        },
        headerColor() {
            // admin
            let path = this.$route.path.split('/');
            path = path[0] || path[1];
            this.activeIndex2 = path;

            if (this.$route.path != '/admin') {
                this.isAdmin = false;
                this.bgColor = '#fff';
                // this.bgColor = '#3e52c0';
                this.textColor = '#333';

                this.activetext = '#1257FF';
                // this.logo = require("../../assets/img/colourful-logo.png")
            } else {
                this.isAdmin = false;
                // this.bgColor = '#0640d7';
                this.bgColor = '#fff';

                this.textColor = '#333';
                this.activetext = '#1257FF';
                // this.logo = require("../../assets/img/white-logo.png")
            }
        },
        iscompany() {
            let path = this.$route.path;
            // if(path.indexOf('/company/')){

            // }
            this.isCompany = path.indexOf('/company/') > -1;
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                this.$store
                    .dispatch('LogOut')
                    .then((res) => {
                        //  location.reload()
                        this.$router.push({ path: '/login' });
                    })
                    .catch((res) => {
                        //  location.reload()
                        this.$router.push({ path: '/login' });
                    });
                // localStorage.removeItem('ms_username');
                // this.$router.push('/login');
            }
        },
        goback() {
            this.$router.push({ path: '/admin' });
        },
        createCom() {
            if (this.dentify.orgName == '未实名') {
                this.$confirm('您尚未完成实名认证，请完成实名认证后操作', '提示', {
                    confirmButtonText: '去实名认证',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$router.push('/mine/authentication');
                });
            } else {
                this.$router.push('/company/authCompany');
            }
        },
        wsonmessage(data) {
            if (data != 'heart') {
                data = JSON.parse(data);
                if (data.type == 11) {
                    this.message = data.data;
                }
            }
        },
        async setDentiy(item) {
            if (item.orgId == this.dentify.orgId) {
                return false;
            }

            // this.refreshToken(item);
            let res = await refreshToken({ eid: item.orgId });

            setToken(res.access_token);

            // res
            this.dentify = item;
            setDentify(item);

            let rout = this.$route;
            this.$message.success({
                message: '切换成功',
                offset: 60
            });
            this.$store.dispatch('GetInfo', true).then(() => {
                if (this.checkPer(['admin', 'menu:contract']) && rout.name == 'contract') {
                    location.reload();
                } else {
                    if (item.orgId == 0) {
                        if (rout.name != 'account' && rout.fullPath !== '/template') {
                            this.$router.push('/mine/account');
                        } else {
                            location.reload();
                        }
                    } else {
                        this.findFirstPage();
                        if (rout.name != 'companyManage' && rout.fullPath !== '/template') {
                            this.$router.push('/company/companyManage');
                        } else {
                            location.reload();
                        }
                    }
                }
            });

            //  location.reload();
        },
        async refreshToken(item) {
            let res = await refreshToken({ eid: item.orgId, access_token: getToken() });
            setToken(res.access_token);
            this.findFirstPage();
        },
        handleSelect(e) {
            if (e == 'videoList') {
                //powerful

                this.setVideo();
            } else if (e == 'powerful') {
                this.setPower();
            } else {
                if (e == 'mine') {
                    e = 'mine/account';
                }
                e = '/' + e;
                this.$router.push({ path: e });
            }
        },
        async setPower() {
            if (this.companyInfo.exchangeAdmin) {
                if (this.companyInfo.orgAuthInfo.state != 10) {
                    this.tiptitle1 = '检测到您当前关联企业未完成实名认证，请';
                    this.visibletip1 = true;
                    this.visibletip11 = 3;
                } else {
                    let { data } = await profilePicheckOpenEntcture({});

                    if (data.code == 2001) {
                        this.powerModel.entName = this.dentify.orgName;
                        let { data } = await openProfessionList({});

                        let arr = [];
                        data.forEach((item) => {
                            if (item.level == 1) {
                                item.children.forEach((i) => {
                                    i.children = false;
                                });
                                arr.push(item);
                            }
                        });
                        this.professionList = arr;
                        this.visiblePower = true;
                    } else {
                        this.$router.push({ path: '/powerful/powerfulAPI' });
                    }
                }
            } else {
                if (this.companyInfo.orgAuthInfo.state != 10) {
                    this.tiptitle1 = '检测到您当前关联企业未完成实名认证，请联系企业管理员申请，或';
                    this.visibletip1 = true;
                    this.visibletip11 = 2;
                } else {
                    let { data } = await profilePicheckOpenEntcture({});

                    if (data.code == 4003) {
                        this.visibletip1 = true;
                        this.visibletip11 = 2;
                        this.tiptitle1 = '检测到您的企业没有开发者权限，请联系企业管理员申请，或';
                    } else {
                        this.$router.push({ path: '/powerful/powerfulAPI' });
                    }
                }
            }
            // this.$router.push({ path: '/powerful/powerfulAPI' });
        },
        async toPower() {
            this.$refs.powerful.validate(async (valid) => {
                if (valid) {
                    this.powerModel.professionId = this.powerModel.professionIds[this.powerModel.professionIds.length - 1];
                    let { data } = await applyOpenEnt(this.powerModel);
                    this.$message.success('申请成功');
                    this.visiblePower = false;
                }
            });
        },
        async setVideo() {
            if (this.companyInfo.exchangeAdmin) {
                if (this.companyInfo.orgAuthInfo.state != 10) {
                    this.tiptitle1 = '检测到您当前关联企业未完成实名认证，请';
                    this.visibletip2 = true;
                    this.visibletip21 = 3;
                } else if (!this.checkPer(['permission:videoPermission'])) {
                    //  this.tiptitle1 = '检测到您的企业没有音视频签约权限，请联系企业管理员申请，或 '
                    this.visibleVideo = true;
                } else {
                    this.$router.push({ path: '/videoList' });
                }
            } else {
                if (this.companyInfo.orgAuthInfo.state != 10) {
                    this.tiptitle1 = '检测到您当前关联企业未完成实名认证，请联系企业管理员申请，或';
                    this.visibletip2 = true;
                    this.visibletip21 = 2;
                } else if (!this.checkPer(['permission:videoPermission'])) {
                    this.visibletip2 = true;
                    this.tiptitle1 = '检测到您的企业没有音视频签约权限，请联系企业管理员申请，或 ';
                    this.visibletip21 = 2;
                } else {
                    this.$router.push({ path: '/videoList' });
                }
            }
        },
        async findFirstPage() {
            let { data } = await findFirstPage({});
            this.companyInfo = data;
        },
        getVideo() {
            this.visibleCode = true;
            this.visibleVideo = false;
        },

        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        menu(scrolls) {
            this.scroll = scrolls;
        },
        createCom2(type) {
            this.visibletip1 = false;
            this.visibletip2 = false;
            let rout = this.$route;

            if (rout.path != '/company/authCompany') {
                if (type == 1) {
                    this.$router.push('/company/authCompany');
                } else {
                    this.$router.push('/company/authCompany?type=edit');
                }
            } else {
                if (type == 1) {
                    this.$router.push('/company/authCompany');
                } else {
                    this.$router.push('/company/authCompany?type=edit');
                }
                location.reload();
            }
        },
        joninCom() {}
    },
    mounted() {
        // this.dentify = getDentify();
        this.userInfo = this.$store.getters.user;
        this.getChangeIdentify();
        this.realPhone = this.userInfo.realPhone;
        if (document.body.clientWidth < 1300) {
            this.collapseChage();
        }
        this.$refs.ws.isWho('message');
    },
    created() {
        this.headerColor();
        this.iscompany();
        // this.dentify = getDentify();
        console.log();
        if (this.$store.getters.user) {
            this.useRelStatus = this.$store.getters.user.realNameState;
        }
        this.getDentify = getDentify();
        bus.$on('setDentiy', (msg) => {
            this.getChangeIdentify();
        });
    }
};
</script>
<style lang="less">
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 14px;
    color: #333;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 60px;
}
.header {
    overflow: hidden;
}
.header .logo {
    float: left;
    width: 186px;
    line-height: 60px;
    height: 60px;
    overflow: hidden;
    position: relative;
    top: -2px;
    z-index: 99;
    img {
        width: 80px;
        margin: 11px 3px 0 50px;
    }
}
.header .logo2 {
    // background-color: #293aa7;
}
.scrollActive {
    background-color: #0640d7 !important;
}
.scrollActive2 {
    background-color: #00245f !important;
}
.agheader {
    z-index: 100;
    .compname {
        color: #333;
        font-size: 14px;
        line-height: 60px;
    }
    .closeIcon {
        position: absolute;
        left: 15px;
        top: 17px;
        font-size: 25px;
        cursor: pointer;
        position: relative;
        z-index: 999;
        float: left;
    }
    .header-right {
        float: right;
        padding-right: 50px;
    }
    .header-user-con {
        display: flex;
        height: 60px;
        align-items: center;
        // color:#333;
        .createComBtn {
            border: 1px solid rgba(18, 87, 255, 1);
            border-radius: 2px;
            width: 100px;
            height: 30px;
            font-size: 14px;
            color: #1257ff;
            padding: 0;
            margin-right: 30px;
        }
    }
    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 65px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell {
        div {
            overflow: hidden;
        }
        i {
            margin-top: 7px;
            font-size: 18px;
            float: left;
        }
        span {
            color: #333;
            float: left;
            margin-left: 5px;
            margin-top: 6px;
        }
        .btn-bell-badge {
            position: absolute;
            right: 44px;
            top: 3px;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #f56c6c;
            margin: 0;
        }
    }
    .btn-bell .el-icon-bell {
        // color: #fff;
    }
    .divider {
        margin-right: 3px;
    }
    .user-name {
        margin-left: 10px;
    }
    .user-avator {
        margin-left: 20px;
    }
    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-link {
        // color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
    .header-left {
        float: left;
        height: 100%;
    }

    .el-menu--horizontal > .el-menu-item {
        height: 46px;
        line-height: 60px;
        padding: 0 0;
        margin: 0 20px;
    }
    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }
    .header {
        position: relative;
        z-index: 10;
    }
    .el-menu-demo .el-menu-item {
        background-color: transparent !important;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom-width: 0;
        font-weight: 700;
    }
}
</style>
