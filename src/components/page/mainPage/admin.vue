<template>
    <div class="admin-box">
            <!-- <div>
                <div class="banner-box">

                </div>
            </div> -->
        <el-row :gutter="10">
            
            <div class="content90">
                <div style="overflow:hidden">

                    <div class="margin-tb shadow -black" style="">
                        <div class="bg-white padding round cf" style="overflow: hidden;">
                            <div class="fl padding-tb"><span class="text-df bg-gray padding-xs margin-right">系统公告</span>最新签约服务系统已上线</div>
                            <div class="fr padding-tb"><span @click="jump(3)" class="padding text-black888">更多</span></div>
                            
                        </div>
                    </div>
                </div>
               
                <el-col :span="17">
                    <el-card style="padding:15px">
                        <div slot="header" class="text-xl">
                            <span>发起签署</span>
                        </div>
                        <div class="text item" >
                            <div class="flex">
                                <div class="flex-sub" style="cursor:pointer" @click="jump(1)">
                                    <div class="signbox"> 

                                        <div class="fl">
                                             <!-- <img style="border-radius:100%;" class="shadow -black" src="../../../assets/img/admin/signstart.png" alt=""> -->
                                             <div class="contracticon1"></div>
                                             </div>
                                        <div class="fl margin-left">
                                            <p class="margin-top-xs text-xl titles">直接发起</p>
                                            <p class="margin-top-sm text-gray text-sm">本地文件发起签署，灵活配置</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-sub" style="cursor:pointer" @click="jump(2)">
                                    <div class="signbox"> 

                                        <div class="fl">
                                             <!-- <img style="border-radius:100%;" class="shadow -black" src="../../../assets/img/admin/tempsign.png" alt=""> -->
                                             
                                             <div class="contracticon2"></div>
                                             </div>
                                        <div class="fl margin-left">
                                            <p class="margin-top-xs text-xl titles">模板发起</p>
                                            <p class="margin-top-sm text-gray text-sm">模版发起签署，方便快捷</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                 <el-col :span="7">
                    <el-card style="padding:15px">
                        <div slot="header" class=" text-xl">
                            <span>基本信息</span>
                            <div class="fr"><span @click="toAccount" class="padding" style="font-size: 14px; color: #0C4BE0;cursor: pointer; font-weight: 400;">更多 > </span></div>
                        </div>
                        <div class="text item margin-top-lg">
                            <div class="flex">
                                <div style="width:63px;height:63px;">
                                    <img :src="headImg" class="ag-avatar" style="width:100%;height:100%" alt="">
                                </div>
                                <div class="flex-sub">
                                    <div class="margin-top-xs margin-left text-xxl">{{info.userName}}</div>
                                    <div class="margin-top-xs margin-left">手机号：{{info.phone}}</div>
                                   
                                </div>
                            </div>
                            <div class="padding-lr" >
                                <!-- <div class="margin-top-sm">注册时间：{{info.createTime}}</div> -->
                                <div class="margin-top-lg" >可签署份数：<span v-if="info.realNameState == 0">0份</span></div>
                                <div class="margin-top" v-if="info.realNameState == 1">套餐到期时间：</div>
                            </div>
                            <div class="padding-lr" style="line-height: 48px; height: 35px; text-align: center;" v-if="info.realNameState == 0">
                                <el-button type="text" size="mini"  @click="toAuth">去实名认证 > </el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="17" class="mt10">
                    <el-card style="padding:15px;margin-bottom: 10px;">
                        <div slot="header" class=" text-xl">
                            <span>待我处理</span>
                            <div class="fr"><span @click="toJump('1')" class="padding" style="font-size: 14px; color: #0C4BE0;cursor: pointer; font-weight: 400;">更多 > </span></div>
                        </div>
                        <div class="text item margin-top-sm margin-bottom-lg">
                             <el-tabs v-model="model1.signType" @tab-click="gettable1">
                                <el-tab-pane label="待我签署" name="1"></el-tab-pane>
                                <el-tab-pane label="待我审批" name="11"></el-tab-pane>
                            </el-tabs>
                              <el-table
                                :show-header="false"
                                :data="tableData1"
                                style="width: 100%;height:126px">
                                <el-table-column prop="contractName">
                                </el-table-column>
                                <el-table-column >
                                    <template slot-scope="scope">
                                        <p style="color: #333;font-size: 12px;">签署方：{{scope.row.signer}}</p>
                                        <p style="color: #959595;font-size: 12px;">截止时间：{{scope.row.deadLine}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="mini" v-if="model1.signType == '1'" @click="sign(scope.row,1)">签署</el-button>
                                        <el-button type="primary" size="mini" v-if="model1.signType == '11'" @click="sign(scope.row,2)">审批</el-button>
                                    </template>
                                </el-table-column>
                                </el-table>
                        </div>
                    </el-card>
                    <el-card style="padding:15px;margin-bottom: 10px;">
                        <div slot="header" class=" text-xl">
                            <span>待他处理</span>
                            <div class="fr"><span @click="toJump('2')" class="padding" style="font-size: 14px; color: #0C4BE0;cursor: pointer; font-weight: 400;">更多 > </span></div>
                        </div>
                        <div class="text item margin-top-sm margin-bottom-lg">
                             <el-tabs v-model="model2.signType" @tab-click="gettable2">
                                <el-tab-pane label="待他签署" name="1"></el-tab-pane>
                                <el-tab-pane label="待他审批" name="11"></el-tab-pane>
                            </el-tabs>
                              <el-table
                                :show-header="false"
                                :data="tableData2"
                                style="width: 100%;height:126px">
                                <el-table-column prop="contractName">
                                </el-table-column>
                                <el-table-column >
                                    <template slot-scope="scope">
                                        <p style="color: #333;font-size: 12px;">发起方：{{scope.row.initiatorName}}</p>
                                        <p style="color: #959595;font-size: 12px;">签署方：{{scope.row.signer}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="mini" v-if="model2.signType == '1'" @click="views(scope.row,2)">查看</el-button>
                                        <el-button type="primary" size="mini" v-if="model2.signType == '11'" @click="views(scope.row,2)">查看</el-button>
                                    </template>
                                </el-table-column>
                                </el-table>
                        </div>
                    </el-card>
                    <!-- <el-card style="padding:15px">
                        <div slot="header" class="text-xl">
                            <span>快捷入口</span>
                        </div>
                        <div class="text item">
                            <div class="flex">
                                <div class="flex-sub text-center " @click="toJump('1')">
                                    <p class="sign-door"><img src="../../../assets/img/admin/text3.png" alt=""></p>
                                    <p class="">{{numObj.mySignCount}}</p>
                                    <p>待我签署</p>
                                </div>
                                <div class="flex-sub text-center " @click="toJump('2')"><p class="sign-door"><img src="../../../assets/img/admin/text4.png" alt=""></p>
                                    <p class="">{{numObj.otherSignCount}}</p>
                                    <p>待TA签署</p>
                                </div>
                                <div class="flex-sub text-center " @click="toJump('6')">
                                    <p class="sign-door"><img src="../../../assets/img/admin/text5.png" alt=""></p>
                                    <p class="">{{numObj.expiringCount}}</p>
                                    <p>即将截止签约</p>
                                </div>
                                <div class="flex-sub text-center " @click="toJump('0')">
                                    <p class="sign-door"><img src="../../../assets/img/admin/text6.png" alt=""></p>
                                    <p class="">{{numObj.draftCount}}</p>
                                    <p>草稿箱 </p>
                                </div>
                            </div>
                        </div>
                    </el-card> -->
                    
                        <!-- <el-card class="margin-top-sm"  style="padding:15px">
                         
                            <div slot="header" class="text-xl">
                                <span>产品状态</span>
                                <div class="fr"><span @click="jump(4)" class="padding text-black888" style="font-size: 14px;cursor: pointer;">更多</span></div>
                            </div>
                            <div style="overflow:hidden;" :class="index==0?[]:['padding-top-sm','margin-top','solid-top']" v-for="(item,index) in mList">
                                <div class="down-title">
                                    <span class="text-xl" style="position: relative;top: 30px;">{{item.msgTitle}}</span>
                                        <a :href="item.downloadPath" type="primary">下载</a>
                                    
                                </div>
                                <div class="padding-tb text-black888">
                                    <p class="fr">{{item.publicTime}}</p>
                                </div>
                            </div> -->
                                <!-- <div class="padding-top-sm margin-top solid-top" style="overflow:hidden;">
                                    <div>
                                    <span class="text-xl">常见问题</span>
                                    <div class="text-black888" style="float: right; padding: 3px 0" type="text">更多</div>
                                </div>
                                <div class="padding-tb text-black888">
                                    <p class="fl">最新签约服务系统已上线</p>
                                    <p class="fr">2021-07-08</p>
                                </div>
                            </div> -->
                        <!-- </el-card> -->
                        
                     
                </el-col>
               
                
                 <el-col :span="7" class="mt10">
                    <el-card style="padding:15px">
                         <!-- <div slot="header" class="text-xl">
                            <span>联系我们</span>
                        </div>
                        <div>
                            <p><img style="position:relative;top:4px;" src="../../../assets/img/admin/text8.png" alt=""><span class="margin-left-xs">400-062-9669</span></p>
                            <p class="margin-top"><img  style="position:relative;top:4px;" src="../../../assets/img/admin/text9.png" alt=""><span class="margin-left-xs">微信咨询</span></p>
                            <div class="margin-top">
                                <div style="width:180px;margin:15px auto 0;">
                                    欢迎关注我们的微信公众号  时时关注我们的动态资讯
                                </div>
                            </div>
                            <div class="margin-top text-center">
                                <img style="width:130px;height:130px;" src="../../../assets/img/weixin.jpg" alt="">
                            </div>
                            <div class="margin-top text-center" style="padding-bottom:38px;">
                                <el-button disabled>关注微信公众号</el-button>
                            </div>
                        </div> -->
                        <div class="cardtitle">
                            <span>产品状态</span>
                            <span @click="jump(4)" class="fr" style="font-size: 14px; color: #0C4BE0;cursor: pointer; font-weight: 400;">更多 > </span>
                        </div>
                        <div style="overflow:hidden; border-bottom:1px solid #d3d3d3; padding-bottom: 20px;">
                            <div style="overflow:hidden; margin-top: 15px;" v-for="(item,index) in mList" :key="index">
                                <div class="down-title">
                                    <span>{{item.msgTitle}}</span>
                                        <!-- <a :href="item.downloadPath" type="primary">下载</a> -->
                                    
                                </div>
                                <div class="text-black888 fr">
                                    <p>{{item.publicTime}}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="cardtitle" style="margin-top: 15px;">
                            <span>问题指引</span>
                            <span  class="fr" style="font-size: 14px; color: #0C4BE0;cursor: pointer; font-weight: 400;">更多 > </span>
                        </div>
                        <div style="" class="infobox" >
                            <p>新用户怎么完成账号注册</p>
                            <p>怎么创建个人模版</p>
                            <p>新用户怎么创建个人模版</p>
                        </div>
                    </el-card>
                    <!-- <el-card class="margin-top-sm"  style="padding:15px">
                         
                            <div slot="header" class="text-xl">
                                <span>产品状态</span>
                                <div class="fr"><span @click="jump(4)" class="padding text-black888" style="font-size: 14px;cursor: pointer;">更多</span></div>
                            </div>
                            <div style="overflow:hidden;" :class="index==0?[]:['padding-top-sm','margin-top','solid-top']" v-for="(item,index) in mList">
                                <div class="down-title">
                                    <span class="text-xl" style="position: relative;top: 30px;">{{item.msgTitle}}</span>
                                        <a :href="item.downloadPath" type="primary">下载</a>
                                    
                                </div>
                                <div class="padding-tb text-black888">
                                    <p class="fr">{{item.publicTime}}</p>
                                </div>
                            </div> -->
                                <!-- <div class="padding-top-sm margin-top solid-top" style="overflow:hidden;">
                                    <div>
                                    <span class="text-xl">常见问题</span>
                                    <div class="text-black888" style="float: right; padding: 3px 0" type="text">更多</div>
                                </div>
                                <div class="padding-tb text-black888">
                                    <p class="fl">最新签约服务系统已上线</p>
                                    <p class="fr">2021-07-08</p>
                                </div>
                            </div> -->
                        <!-- </el-card> -->
                </el-col>
            </div>
        </el-row>
        <div  class="footer">
            5G随e签签约平台，保留一切权利
        </div>
      
     
    </div>
</template>

<script>
  
import bus from '../../common/bus';
import {manageList} from '../../../api/manage.js'
import {contractIndex,contractList} from '../../../api/contract.js'
import {preview,downloadFile} from '../../../api/index.js'
 
export default {
    name: 'dashboard',
    data() {
        return {
           info:{},
            mList:[],
            baseUrl: process.env.VUE_APP_BASE_API,
            numObj:{
                draftCount: 0,
                expiringCount: 0,
                mySignCount: 0,
                otherSignCount: 0,
            },
            tableData1:[],
            tableData2:[],
            model1:{
                pageNum:1,
                pageSize:2,
                fileStatusType:1,
                signType:'1'
            },
            model2:{
                pageNum:1,
                pageSize:2,
                fileStatusType:2,
                signType:'1'
            },
            headImg:require('../../../assets/img/admin/text7.png')
        };
    },
    components: {
        
    },
    computed: {
        role() {
             
        }
    },
    created() {
      this.info = this.$store.getters.user;
      console.log(this.info,111)
      this.info.createTime = this.$util.YYMM(null,null,this.info.createTime)
      if(this.info.fileId){
          this.headImg = preview(this.info.fileId)
      }
      this.manageList();
    //   this.contractIndex();
      this.gettable1()
      this.gettable2()
    },
    
    methods: {
        sign(row,type){
        this.$router.push({path:'/contract/signContract',query: {
              contId:row.contractNo,
              tempId:'',
              tempType:type
          }})
        },
        async views(row ,type){
            this.$router.push({path:'/contract/signContract',query: {
                contId:row.contractNo,
                tempId:'',
                tempType:type
            }})
        },
        toAuth() {
            this.$router.push({ path: '/mine/authentication' });
        },
        toAccount() {
            this.$router.push({ path: '/mine/account' });
        },
        gettable1(){
          if (this.info.realNameState === 1) {
            contractList(this.model1).then((res)=>{
                console.log(res)
                this.tableData1 = res.data.list
            })
           }
        },
        gettable2(){
          if (this.info.realNameState === 1) {
            contractList(this.model2).then((res)=>{
                console.log(res)
                this.tableData2 = res.data.list
            })
          }
        },
        jump(type) {
             if(type==1){
               if (this.info.realNameState === 1) {
                  if(this.checkPer(['admin', 'menu:contract'])){

                      // this.$store.dispatch('setContId', "");
                      // this.$store.dispatch('setTempId', "");
                      // this.$store.dispatch('setTempType', 0);
                        bus.$emit('scrollTop');
                      this.$router.push({path:"/contract/newContract",query:{
                              contId:'',
                              tempId:'',
                              tempType:0,
                             myname:'admin'
                          }})
                  }else{
                      this.$alert("您好，您没有代表企业发起文件的权限，请联系企业管理员！")
                  } 
                } else {
                  this.$alert("您尚未完成实名认证，请完成实名认证后操作！")
                }
             }else if(type==2){

                if (this.info.realNameState === 1) { 
                  if(this.checkPer(['admin', 'menu:model'])){

                      this.$router.push("/template")
                  } else{
                      this.$alert("您好，您没有代表企业发起文件的权限，请联系企业管理员！")
                  }
                } else {
                  this.$alert("您尚未完成实名认证，请完成实名认证后操作！")
                }
             }else if(type==3){
                 this.$router.push("/sysnotice")
             }else if(type==4){
                 this.$router.push("/download")
             }
        },
        async manageList(){
           
				let {data} = await manageList({
					pageNum: 1,
					pageSize: 3
				})
                data.list.forEach(item=>{
                    item.downloadPath = downloadFile(item.fileId)
                })
                this.mList = data.list;

			 
        },
        async contractIndex(){
            let {data} = await contractIndex();
            this.numObj = data;
        },
        toJump(status) {
            if(this.checkPer(['admin', 'menu:contract'])){

                this.$router.push({
                    name:'contract',
                    params: {
                        status
                    }
                })
            }else{
                this.$alert("您好，您没有代表企业发起文件的权限，请联系企业管理员！")
            } 
           
        }
       
    }
};
</script>


<style  lang="less" >
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info { 
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}
 
 
.banner-box{
    height: 408px;
    background: url('../../../assets/img/banners.jpg') center center no-repeat;
    background-size: cover;
 
}
.sendsign{
   border:none;
   padding:35px 100px;
  
}
.sendsign1{
     background-color: #f5f8f9;
}
.footer{
    background-color: #1752f1;
    margin-top:20px;
    line-height: 54px;
    color:#fff;
    text-align: center;
    height:54px;
    // margin-bottom:36px;
}
.signbox{
    width:280px;
    margin:0 auto;
    overflow: hidden;
    margin-top: 50px;
    margin-bottom: 45px;
    // height:100px;
    // line-height: 100px;
    // background: #f3f8fe;
    // text-align: center;
    img{
        // width:100px;
        width: 60px;
        height: 60px;
    }
    .titles{
        color: #333;
        font-size: 16px;
        font-weight: 600;
    }
}
.sign-door{
    img{
        border-radius: 100%;
        // border-bottom:1px solid #999;
        // border-top:1px solid #999;
        box-shadow: 0px 0px 16px 1px rgba(217,218,222,.35) !important;
    }
}
.admin-box{
    .el-card__body{
        padding:0;
    }
    .el-card__header{
        padding:0;
        span{
            font-size: 16px;
            color: #333333;
            font-weight: 600;
        }
    }
}
.down-title {
    // display: flex;
    // justify-content: space-between;
    float: left;
    font-size: 12px;
}
.flex-sub {
    cursor: pointer;
}
.contracticon1{
    width: 60px;
    height: 62px;
	background: url(../../../assets/img/iconsprite.png);
    background-size: 1136px 1505px;
    background-repeat: no-repeat;
    background-position: -485px -1053px;
}
.contracticon2{
    width: 60px;
    height: 62px;
	background: url(../../../assets/img/iconsprite.png);
    background-size: 1136px 1505px;
    background-repeat: no-repeat;
    background-position: -575px -1053px;
}
.cardtitle{
    font-size: 16px;
    color: #333333;
    font-weight: 600;
    overflow: hidden;
}
.infobox{
    padding-bottom: 20px;
    border-bottom:1px solid #d3d3d3;
    p{
        font-size: 12px;
        color: #333;
        margin-top: 15px;
    }
}
</style>
