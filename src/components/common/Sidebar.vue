<template>
    <div class="sidebar">
         <!-- :collapse="collapse" -->
         <el-card class="titlecard" style="margin-top: 10px" v-if=" dentify && dentify.orgId != 0">
            <span style="font-size: 14px; color: #333333;">企业控制台</span>
        </el-card>
        <el-menu
            class="sidebar-el-menu  padding-top"
            :default-active="onRoutes"
           
            background-color="#fff"
            text-color="#333"
            active-text-color="#1664ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs&&checkPer(item.checkPer)">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs&&checkPer(subItem.checkPer)"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-if="!subItem.subs&&checkPer(subItem.checkPer)"
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-if="!item.subs&&checkPer(item.checkPer)">
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                        <i class="el-icon-arrow-right" style="position:absolute;right:0;top:20px;"></i>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';

import {getDentify} from '@/utils/auth';
export default {
    data() {
        return {
            collapse: false,
            items: [
                
               
                 
            ],
            roles:[],
            dentify:{}
        };
    },
    computed: {
        onRoutes() {
            
            return this.$route.path//.replace('/', '');
        }
    },
    watch:{
        
        $route(){
           
            this.menu();
        }
    },
    methods:{
        async menu(){
         
            
            
            let tag = this.$route.path.indexOf("mine");
            if(tag!=-1){
                this.items = [
                    {icon: 'el-icon-lx-copy',index: '/mine/account',title: '我的账号',checkPer:["admin","comper",'disReal']},
                    {icon: 'el-icon-lx-copy',index: '/mine/signManage',title: '印章管理',checkPer:["admin","comper"]},
                    {icon: 'el-icon-lx-copy',index: '/mine/contracts',title: '通讯录',checkPer:["admin","comper"]}
                ]
            }else if(this.$route.path.indexOf("company")!=-1){
                this.items = [
                    {icon: 'el-icon-lx-copy',index: '3',title: '企业设置',checkPer:["comper"],
                        subs: [
                            {index: '/company/companyManage',title: '企业设置',checkPer:["comper"]},
                            { index: '/company/userManage',title: '成员管理',
                        checkPer:["permission:orgUserManage"]}
                        ]
                    },
                    {icon: 'el-icon-lx-copy',index: '4',title: '角色管理',
                        subs: [
                            {index: '/company/roleManage',title: '角色管理',
                        checkPer:["permission:roleManage"]},
                        ],
                        checkPer:["permission:roleManage"]
                    },
                    {icon: 'el-icon-lx-copy',index: '5',title: '印章管理',
                        subs: [
                            {index: '/company/signlist',title: '印章管理',
                        checkPer:["permission:sealManage"]},
                        {index: '/company/signtype',title: '印章类型',
                        checkPer:["menu:sealType"]}
                        ],
                        checkPer:["menu:seal"]
                         
                    },{icon: 'el-icon-lx-copy',index: '6',title: '文件归档',
                        subs: [
                            {index: '/company/filecollect',title: '文件归档',
                        checkPer:["menu:tranche"]}
                        ],
                        checkPer:["menu:tranche"]
                    },
                    {icon: 'el-icon-lx-copy',index: '7',title: '审计日志',
                        subs: [
                            {index: '/company/signLog',title: '印章操作日志',
                        checkPer:["permission:sealOperationLog"]},
                            { index: '/company/accoutLog',title: '操作日志',
                        checkPer:["permission:accountOperationLog"]},
                            { index: '/company/contractLog',
                        checkPer:["permission:contractManageLog"],title: '合同管理日志'}
                        ],
                        checkPer:["menu:log"]
                    },{icon: 'el-icon-lx-copy',index: '8',title: '文件偏好设置',
                        subs: [
                            {index: '/company/prefer',title: '文件偏好设置',
                        checkPer:["menu:filePreferences"]}
                        ],
                        checkPer:["menu:filePreferences"]
                    },
                ]
            }else{
                this.items = [
                    {icon: 'el-icon-lx-copy',index: '/powerful/powerfulAPI',title: 'API列表',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/sandboxTest',title: '沙盒测试',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/operationLog',title: '操作日志',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/callbackLog',title: '接口回调日志',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/dataStatis',title: '数据统计',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/countInfo',title: '账户信息',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/jsonOnline',title: 'json在线解析',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/countBase',title: '计算文件Base64',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/RSAparameter',title: 'RSA参数签名示例',checkPer:["comper"]},
                    {icon: 'el-icon-lx-copy',index: '/powerful/getArea',title: '获取pdf坐标',checkPer:["comper"]},
                ]
            }
            // console.log(this.$route,1)
        }
    },
    created() {
        this.dentify = getDentify();
        console.log(this.dentify)
        this.menu();
        
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style >
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 56px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar .titlecard /deep/ .el-card__body{
    padding:10px 20px;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 185px;
}
.sidebar > ul {
    height: calc(100% - 80px);
}
.sidebar-el-menu .el-submenu .el-menu-item{
    min-width: 0;
}
.el-menu-item.is-active{
    background-color: #E2EDFF !important;
    color: #175BEC;
}
.el-menu-item:hover{
    color: #175BEC;
}
</style>
