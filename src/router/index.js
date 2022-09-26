import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    
    
    routes: [
        {
            path: '/',
            redirect: '/admin'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/admin',
                    component: () => import( '../components/page/mainPage/admin.vue'),
                    meta: { title: '首页',header:true }
                },
                {
                    path: '/tokens',
                    component: () => import( '../components/page/mainPage/admin.vue'),
                    meta: { title: '首页',header:true }
                },
                {
                    path: '/contract',
                    name: 'contract',
                    component: () => import( '../components/page/contract/contract.vue'),
                    meta: { title: '文件管理',header:true }
                },
                {
                    path: '/business',
                    name: 'business',
                    component: () => import( '../components/page/business/business.vue'),
                    meta: { title: '业务管理',header:true }
                },
                
                {
                    path: '/contract/detaile',
                    component: () => import( '../components/page/contract/detaile.vue'),
                    meta: { title: '文件详情',header:true }
                },
                
                {
                    path: '/template',
                    component: () => import( '../components/page/template/template.vue'),
                    meta: { title: '模板管理',header:true }
                },
                {
                    path: '/notice',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/mainPage/notice.vue'),
                    meta: { title: '消息',header:true }
                },
                {
                    path: '/template/newTemplate',
                    component: () => import( '../components/page/template/newTemplate.vue'),
                    meta: { title: '新建模板' }//,keepAlive: true,isBack: false
                },
                
                {
                    path: '/template/setTemplate',
                    component: () => import( '../components/page/template/setTemplate.vue'),
                    meta: { title: '模板管理' }
                },
                {
                    path: '/contract/setContract',
                    component: () => import( '../components/page/contract/setContract.vue'),
                    meta: { title: '合同管理' }
                },
                {
                    path: 'confirmInitiation',
                    component: () => import( '../components/page/contract/confirmInitiation.vue'),
                    meta: { title: '发起签署' }
                },
                {
                    path: 'designateElment',
                    component: () => import( '../components/page/business/designateElment.vue'),
                    meta: { title: '指定签署方' }
                },
                {
                    path: 'writeElement',
                    component: () => import( '../components/page/business/writeElement.vue'),
                    meta: { title: '填写发起方内容' }
                },
                
                {
                    path: '/contract/newContract',
                    component: () => import( '../components/page/contract/newContract.vue'),
                    meta: { title: '新建合同' }//,keepAlive: true,isBack: false
                },
                {
                    path: '/contract/signContract',
                    component: () => import( '../components/page/contract/signContract.vue'),
                    meta: { title: '签署' }//,keepAlive: true,isBack: false
                },
                {
                    path: '/mine/authentication',
                    component: () => import( '../components/page/mine/authentication.vue'),
                    meta: { title: '实名认证',header:true }
                },
                {
                    path: '/company/authCompany',
                    component: () => import( '../components/page/company/authCompany.vue'),
                    meta: { title: '企业认证',header:true }
                },
                
                {
                    path: '/mine/closeAccount',
                    component: () => import( '../components/page/mine/closeAccount.vue'),
                    meta: { title: '账号注销',header:true }
                },
                
                {
                    path: '/sysnotice',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/mainPage/sysNotice.vue'),
                    meta: { title: '系统公告',header:true }
                },
                {
                    path: '/download',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/mainPage/download.vue'),
                    meta: { title: '产品状态',header:true }
                },
                {
                    path: '/videoList',
                    component: () => import( '../components/page/videoSign/videoList.vue'),
                    meta: { title: '签约列表',header:true }
                },
                {
                    path: '/videoRoom',
                    name: 'videoRoom',
                    component: () => import( '../components/page/videoSign/videoRoom.vue'),
                    meta: { title: '签约室' }
                },
                {
                    path: '/',
                    component: () => import(/* webpackChunkName: "home" */ '../components/common/secondHome.vue'),
                    children: [
                        {
                            path: '/mine/account',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/mine/mine.vue'),
                            name:"account",
                            meta: { title: '我的账号',header:true },
                        },{
                            path: '/mine/signManage',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/mine/signManage.vue'),
                            meta: { title: '我的账号',header:true }
                        },{
                            path: '/mine/contracts',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/mine/contracts.vue'),
                            meta: { title: '通讯录',header:true },
                        },{
                            path: '/company/userManage',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/userManage.vue'),
                            meta: { title: '成员管理',header:true },
                        },{
                            path: '/company/roleManage',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/roleManage.vue'),
                            meta: { title: '角色管理',header:true },
                        },{
                            path: '/company/signlist',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/signatureManage.vue'),
                            meta: { title: '印章管理',header:true },
                        },{
                            path: '/company/signtype',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/signatureType.vue'),
                            meta: { title: '印章类型',header:true },
                        },{
                            path: '/company/signLog',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/signLog.vue'),
                            meta: { title: '印章操作日志',header:true },
                        },{
                            path: '/company/accoutLog',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/accoutLog.vue'),
                            meta: { title: '账户管理日志',header:true },
                        },{
                            path: '/company/contractLog',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/contractLog.vue'),
                            meta: { title: '合同管理日志',header:true },
                        },{
                            path: '/company/prefer',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/filePrefer.vue'),
                            meta: { title: '文件偏好设置',header:true },
                        },
                        
                        {
                            path: '/company/companyManage',
                            name:'companyManage',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/company/companyManage.vue'),
                            meta: { title: '企业设置',header:true },
                        },
                        {
                            path: '/powerful/powerfulAPI',
                            name:'powerfulAPI',
                            component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/powerfulAPI.vue'),
                            meta: { title: 'API列表',header:true },
                        },
						{
						    path: '/powerful/sandboxTest',
						    name:'sandboxTest',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/sandboxTest.vue'),
						    meta: { title: '沙盒测试',header:true },
						},
						{
						    path: '/powerful/sandboxTestin',
						    name:'sandboxTestin',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/sandboxTestin.vue'),
						    meta: { title: '沙盒测试进入测试',header:true },
						},
						{
						    path: '/powerful/operationLog',
						    name:'operationLog',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/operationLog.vue'),
						    meta: { title: '操作日志',header:true },
						},
						{
						    path: '/powerful/callbackLog',
						    name:'callbackLog',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/callbackLog.vue'),
						    meta: { title: '接口回调日志',header:true },
						},
						{
						    path: '/powerful/dataStatis',
						    name:'dataStatis',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/dataStatis.vue'),
						    meta: { title: '数据统计',header:true },
						},
						{
						    path: '/powerful/countInfo',
						    name:'countInfo',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/countInfo.vue'),
						    meta: { title: '账户信息',header:true },
						},
						{
						    path: '/powerful/jsonOnline',
						    name:'jsonOnline',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/jsonOnline.vue'),
						    meta: { title: 'json在线解析',header:true },
						},
						{
						    path: '/powerful/countBase',
						    name:'countBase',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/countBase.vue'),
						    meta: { title: '计算文件Base64',header:true },
						},
						{
						    path: '/powerful/RSAparameter',
						    name:'RSAparameter',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/RSAparameter.vue'),
						    meta: { title: 'RSA参数签名示例',header:true },
						},
						{
						    path: '/powerful/getArea',
						    name:'getArea',
						    component: () => import(/* webpackChunkName: "icon" */ '../components/page/powerful/getArea.vue'),
						    meta: { title: '获取pdf坐标',header:true },
						},
                        
                        
                    ]

                },
                
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/reg',
            component: () => import(/* webpackChunkName: "reg" */ '../components/page/reg.vue'),
            meta: { title: '注册' }
        },
        {
            path: '/resetPass',
            component: () => import(/* webpackChunkName: "reg" */ '../components/page/resetPass.vue'),
            meta: { title: '重置密码' }
        },
        {
            path: '/editPass',
            component: () => import(/* webpackChunkName: "reg" */ '../components/page/editPass.vue'),
            meta: { title: '修改密码' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
