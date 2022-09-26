<!-- 我的 -->
<template>
    <div class="fullheight">
        <!-- <div class="cf margin-sm padding bg-white text-xl text-bold">
            <div class="fl">成员管理</div>
            <el-button icon="el-icon-bell" @click="applyUser()" style="float: right; padding: 3px 0" type="text">新成员审核</el-button>
        </div> -->

        <el-card class="margin-sm fullcard">
            <div class="cf text-xl text-bold bordertitle">
                <div class="fl">成员管理</div>
                <!-- <el-button icon="el-icon-bell" @click="applyUser()" style="float: right; padding: 3px 0" type="text">新成员审核</el-button> -->
                 <el-badge is-dot class="item fr titlelist" ><span @click="applyUser()">新成员申请</span></el-badge>
            </div>
            <el-row :gutter="20">
                <el-col :xs="11" :sm="11" :md="7" :lg="6" :xl="4">
                    <div class="treebox" style="height:calc(100vh - 160px);">
                        <el-input placeholder="请搜索部门或成员" v-model="departmentSearch" class="input-with-select margin-bottom-xs">
                            <el-button slot="append" icon="el-icon-search" @click="searchdelOruser"></el-button>
                        </el-input>
                        <!-- <orgTree @handleNodeClick="handleNodeClick" ref="orgTree" :data="data" :searchValue="departmentSearch" :isUser="true"></orgTree> -->
                        <orgTree v-if="!issearch" @handleNodeClick="handleNodeClick" ref="orgTree" :data="data" :isUser="true"></orgTree>
                        <ul class="padding-right-sm" v-if="issearch">
                            <li class="margin-top-sm">
                                成员：
                            </li>
                            <li class="searchlist" v-for="(item) in searchUser" :key="item.id" @click="settabledata(item)">
                                {{item.userName}}
                            </li>
                            <li class="margin-top-sm">
                                部门：
                            </li>
                            <li class="searchlist" v-for="(item) in searchOrg" :key="item.id" @click="handleOrjlist(item)">
                                {{item.channelName}}
                            </li>
                        </ul>
                    </div>
                    
                    <!-- <el-tree class="margin-top" :highlight-current="true" :data="data" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true"></el-tree> -->
                </el-col>
                <el-col :xs="13" :sm="13" :md="17" :lg="18" :xl="20">
                    <div class="margin-sm">
                        <div style="overflow: hidden;">
                            <span style="font-size: 16px; color: #333;font-weight: 600;line-height:28px;">{{selectDep.join('/')}}</span>
                            <el-button size="mini" class="fr margin-left" :disabled="selections.length == 0" @click="userDepart">更换部门</el-button>
                            <el-button size="mini" class="fr margin-left" @click="doAddExcelArr">批量导入</el-button>
                            <el-button type="primary" size="mini" class="fr" @click="addUser(0)">添加新成员</el-button>
                        </div>
                    </div>
                    <!-- <div class="margin-sm margin-top-lg"> -->
                        
                        <!-- <el-button size="mini" type="danger" :disabled="selections.length == 0||org.parentId==0" @click="del(1)">从部门删除</el-button>
                        <el-button type="danger" style="width:100px" :disabled="selections.length == 0" @click="del(3)">批量删除</el-button>
                        <el-button type="primary" size="mini" @click="copy">成员邀请</el-button> -->
                    <!-- </div> -->
                    <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;" max-height="700" @selection-change="selectionChangeHandler">
                        <el-table-column :selectable="checkboxT" type="selection" width="55" />
                        <el-table-column  prop="userName" label="姓名" />
                        <el-table-column  prop="userAccount" label="手机号" width="100" />
                        <el-table-column  prop="channelNameAll" label="部门" />
                        
                        <el-table-column prop="roleNameAll" label="角色" />

                        <el-table-column label="状态" align="center" prop="enabled" width="170">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state==0 || scope.row.state==2">
                                未激活
                                </span>
                                <el-switch 
                                    v-if="scope.row.state==1 || scope.row.state==3"
                                    v-model="scope.row.stateswitch"
                                    @change="setUserSwitch($event,scope.row)"
                                    :active-text="scope.row.state == 1 ? '已启用' : '已停用'"
                                >
                                </el-switch>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column  prop="createTime" width="135" label="创建日期" /> -->
                        <el-table-column label="操作" width="170" align="center" fixed="right">
                            <template slot-scope="scope">
                                <!-- <el-button  type="success" size="mini">重新邀请</el-button> -->
                                <el-button type="text" size="mini" @click="addUser(1, scope.row)">编辑</el-button>
                                <span class="margin-left-xs margin-right-xs">|</span>
                                <el-button type="text" size="mini" @click="" v-if="scope.row.state == 0 || scope.row.state == 2">提醒激活</el-button>
                                <span class="margin-left-xs margin-right-xs" v-if="scope.row.state == 0 || scope.row.state == 2">|</span>
                                <el-button type="text" v-if="false" size="mini" @click="oneChange(scope.row)">一键转交</el-button>
                                <el-button @click="del(0, scope.row)" type="text" size="mini">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        class="fr margin-top-lg"
                        :current-page.sync="model.pageNum"
                        background
                        layout="total,prev, pager, next,sizes,jumper"
                        :total="pageTotal"
                        :page-size="model.pageSize"
                        @current-change="getUserList($event,'cur')"
                        @size-change="getUserList($event,'size')"
                    >
                    </el-pagination>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog :title="editType == 0 ? '新增部门' : '编辑部门'" :visible.sync="visibleEdit" v-dialogDrag width="500px">
            <el-form :model="editModel" ref="agForm" label-width="150px">
                <el-form-item label="上级部门名称" prop="parentChannelName" verify>
                    <el-input type="text" v-model="editModel.parentChannelName" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="channelName" verify>
                    <el-input type="text" v-model="editModel.channelName" placeholder="请输入部门名称"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="doEdit"  :disabled="editModel.parentId==0">保存</el-button>
                <el-button type="danger" v-if="editType == 1" @click="doDel"  :disabled="editModel.parentId==0">删除部门</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="addUserType == 0 ? '添加新成员' : '编辑'" :visible.sync="visibleAddUser" v-dialogDrag width="500px">
            <el-form :model="addUserModel" ref="agForm3" label-width="100px">
                <el-form-item label="姓名" prop="userName" verify>
                    <el-input type="text" v-model="addUserModel.userName" placeholder="请输入姓名" :disabled="addUserModel.state==1"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="userAccount" verify agphone>
                    <el-input type="text" v-model="addUserModel.userAccount" placeholder="请输入手机号" :disabled="addUserModel.state==1"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleIds" verify >
                    <el-select v-model="addUserModel.roleIds" multiple placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属部门" v-if="addUserType == 0" prop="orgIds" verify>
                    <orgTree @handleNodeClick="adduserClick" ref="orgTreeUser" :isoverflow="true"></orgTree>
                    
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleAddUser = false">取 消</el-button>
                <el-button type="primary" @click="doAddUser">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="调整所在部门" :visible.sync="visibleDep" v-dialogDrag width="500px">
            <orgTree @handleNodeClick="handleNodeClick2" ref="orgTree2" :data="data" :isoverflow="true"></orgTree>
            <span class="margin-top" style="color: #1257FF; display: block;">已选择:{{movedep.join('/')}}</span>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleDep = false">取 消</el-button>
                <el-button type="primary" @click="deptArr">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="批量导入" :visible.sync="visibleExcel"  width="700px">
            <div class="marign-tb-sm" >
                上传填写好的成员信息模板<el-upload
                    style="display:inline-block"
                    :action="action"
                    :on-error="errorAuth"
                    :on-success="successAuth"
                    :before-upload="beforeUpload"
                    :data="uploadData"
                    :show-file-list="false"
                >
                    <el-button type="text">上传模板</el-button>
                </el-upload>
                <a  class="fr" style="position:relative;top:-73px;right:40px;"  :href="downPer">下载成员信息模版</a> 
                <div class="mutibar">
                    <span>1.下载模板，批量填写参与方用户信息</span>
                    
                    <!-- <el-button type="primary" size="mini" @click="addExcelArr">下载</el-button> -->
                    <a :href="downPer" class="fr" style="color: unset;"><el-tag type="primary" size="mini">下载</el-tag></a>
                    
                </div>
                <div class="mutibar">
                    <span>2.上传填写好的参与方用户信息表</span>
                    <!-- <el-button type="primary" size="mini" ><a :href="downPer" style="color: unset;">上传</a></el-button> -->
                    <el-upload
                        style="display:inline-block"
                        :action="action"
                        :on-error="errorAuth"
                        :on-success="successAuth"
                        :before-upload="beforeUpload"
                        :data="uploadData"
                        :show-file-list="false"
                         class="fr"
                    >
                    <el-tag type="primary" size="mini" style="margin-top:10px" >上传</el-tag>
                    </el-upload>
                    
                </div>
                <!-- <uploads  @successAuth="successAuth"  :data="ExcelModel" @beforeUpload="beforeUpload" :btnTitle="btnTitle"></uploads> -->
            </div>
            <div v-if="listNew.length>0">
              <el-table ref="table" v-loading="loading2"  :data="listNew" style="width: 100%;">
                  <el-table-column type="index" width="50"> </el-table-column>
                  <el-table-column  prop="name" label="姓名" />
                  <el-table-column  prop="account" label="手机号" />
                  <el-table-column  prop="departNmae" label="部门" />
                  <el-table-column  prop="checkMessage" label="数据校验" />
              </el-table>
            </div>
              <!-- <div v-if="illegalList.length>0" class="margin-top-sm"> 
                  <div v-for="(item,index) in illegalList" :key="index">{{ index==illegalList.length-1?item:item+"；" }}</div> 信息填写错误{{goList.length==0?'，请修改后上传':'，是否继续导入正确成员信息'}} 
              </div> -->
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleExcel = false">取 消</el-button>
                <el-button type="primary" :disabled="goList.length==0"  @click="addExcelArr">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新成员申请" :visible.sync="visibleApply" v-dialogDrag width="900px">
             
            <div>
                <el-input style="width: 300px;" placeholder="请搜索姓名/手机号" v-model="auditUserModel.userName" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="applyUser()"></el-button>
                </el-input>
              <el-table ref="table" :data="listApply" style="width: 100%;margin-top: 20px;">
                  <el-table-column label="序号" type="index" width="50"> </el-table-column>
                  <el-table-column  prop="userName" label="姓名" />
                  <el-table-column  prop="userAccount" label="手机号" />
                  <el-table-column  prop="createTime" label="申请时间" />
                  <el-table-column  prop="status" label="状态" />
                  <!-- <el-table-column  prop="updateTime" :formatter="$util.YYMM"  label="审核时间" /> -->
                  <el-table-column label="操作" width="220" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="doApplyUser(10,scope.row)">同意加入</el-button>
                                <el-button type="danger" size="mini" @click="doApplyUser(2,scope.row)">拒绝加入</el-button>
                            </template>
                        </el-table-column>
              </el-table>
              <el-pagination
                  :current-page.sync="auditUserModel.pageNum"
                  background
                  layout="total,prev, pager, next,jumper"
                  :total="pageTotal2"
                  :page-size="auditUserModel.pageSize"
                  @current-change="applyUser">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="一键转交" :visible.sync="visibleoneChange" v-dialogDrag width="700px" class="onechange">
            <div class="margin-tb">
                <div class="margin-left text-gray" v-if="powerList.length==0">暂无权限，无法转交</div>
                <el-checkbox-group v-model="onChangeModel.content" v-if="powerList.length>0">
                    <el-checkbox v-for="(item,index) in powerList" :label="item" :key="index">{{item=='1'?'合同':'印章'}}</el-checkbox>
                    <!-- <el-checkbox :label="2">印章</el-checkbox> -->
                   
                </el-checkbox-group>
            </div>
            <el-row :gutter="20">
                <el-col :span="12"><orgTree  ref="orgTree3" @handleNodeClick="onChangeClick"></orgTree></el-col>
                <el-col :span="12">
                    <el-radio-group v-model="onChangeModel.newUid">
                        <p v-for="item in list2" style="margin-top:3px">
                            <el-radio :label="item.uid">{{item.userName}}</el-radio>
                        </p>
                       
                    </el-radio-group>
                    
                </el-col>
                
            </el-row>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleoneChange = false">取 消</el-button>
                <el-button type="primary" @click="doOneChange" :disabled="powerList.length==0">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新成员审核" :visible.sync="visibleApplyContent" v-dialogDrag width="500px">
            <div>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="审核意见"
                    v-model="applyModel.auditOpinion">
                    </el-input>
            </div>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleApplyContent = false">取 消</el-button>
                <el-button type="danger" @click="doApplyUser(2)">审核驳回</el-button>
                <el-button type="primary" @click="doApplyUser(10)">审核通过</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    findOrgUserList,
    findOrgUserListRealName,
    addOrgChannel,
    editOrgChannel,
    findUnAuditUser,
    doAuditUser,
    addOrgUser,
    addOrgUserExcel,
    deleteUserDepartment,
    deleteUserOrg,
    editOrgUser,
    editOrgUserDepart,
    vertifyOrgUserExcel,
    turnByOnce,
    turnByOnceBefore,
    searchOrgOrUser
} from '../../../api/companyManage.js';
import {
    deleteOrgChannel
} from '../../../api/company.js';

import { roleListByOrg,findMenuList } from '../../../api/role.js';
import { getDentify } from '@/utils/auth';
import uploads from '../../../components/common/uploads';
import common from '@/assets/js/common.js'
import orgTree from '../../common/orgTree';
import {downloadFileByid,downloadFile} from '../../../api/index.js'
import { Divider } from 'element-ui';
export default {
    components: { orgTree, uploads },
    data() {
        return {
            getDentify: {},
            org: '',
            pageTotal: 0,
            editType: 0,
            addUserType: 0,
            powerList:[],
            visibleEdit: false,
            visibleAddUser: false,
            visibleDep: false,
            visibleExcel: false,
            visibleoneChange:false,
            visibleApply: false,
            visibleApplyContent:false,
            downPer:"",
            editModel: {
                channelName: '',
                id: '',
                parentId: '',
                parentChannelName: ''
            },
            addUserModel: {
                state:0,
                orgIds: '',
                userName: '',
                userAccount: '',
                roleIds: ''
            },
            onChangeModel: {
                content:[],
                eid: '',
                newUid: '',
                oldUid: ''
            },
            applyModel: {
                 auditOpinion:"",
                 auditState:"",
                 uid:""
            },
            auditUserModel:{
                eid:"",
                userName:'',
                pageNum:1,
                pageSize:10
            },
            roleList: [],
            pageTotal:0,
            pageTotal2:0,
            
            model: {
                orgId: '',
                pageNum: 1,
                pageSize: 10
            },
            deptName: '',
            loading: false,
            loading2:false,
            selections: [],
            list: [],
            list2:[],
            data: [],
            listNew: [],
            listApply:[],
            illegalList: [],
            defaultProps: {
                children: 'orgInfoDtoList',
                label: 'channelName'
            },
            uploadData: {
                orgId: ''
            },
            action: '',
            btnTitle: '上传模板',
            nextExcelList: {},
            goList:[],
            departmentSearch:'',
            selectDep:[],
            adjustObj:{},
            issearch:false,
            searchUser:[],
            searchOrg:[],
            movedep:[]
        };
    },
    methods: {
        editOrg(type) {
            if (!this.org) {
                this.$message.error('请选择部门');

                return false;
            }
            this.editType = type;
            this.visibleEdit = true;
            if (type == 0) {
                this.$nextTick(() => {
                    this.$refs.agForm.resetFields();
                    this.editModel.parentChannelName = this.org.channelName;
                    this.editModel.parentId = this.org.id;
                });
            } else {
                this.$nextTick(() => {
                    this.$refs.agForm.resetFields();
                    this.editModel.parentChannelName = this.org.parentName;
                    this.editModel.channelName = this.org.channelName;
                    this.editModel.id = this.org.id
                    this.editModel.parentId =this.org.parentId; 
                
                });
            }
        },
        doEdit() {
            let type = this.editType;
            this.$refs.agForm.validate(valid => {
                if (valid) {
                    if (type == 0) {
                        addOrgChannel(this.editModel).then(res => {
                            this.$message.success('新增成功');
                            this.visibleEdit = false;
                            this.getOrgList();
                        });
                    } else {
                        editOrgChannel(this.editModel).then(res => {
                            this.$message.success('编辑成功');
                            this.org.channelName = this.editModel.channelName
                            this.visibleEdit = false;
                            this.getOrgList();
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async doDel(){
            this.$confirm("确认删除部门？", '温馨提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消'
            })
                .then(async () => {
                    await deleteOrgChannel({id:this.org.id });
                    this.visibleEdit = false;
                    this.$message.success('删除成功');
                    this.org = null;
                    this.getOrgList();
                })
                .catch(() => {});
        },
        adduserClick(item){
            this.addUserModel.orgIds = [item.id]
        },
        async addUser(type, row) {
            // if (!this.org) {
            //     this.$message.error('请选择部门');

            //     return false;
            // }
            
            this.addUserType = type;
            // this.addUserModel.orgIds = [this.org.id];
            this.visibleAddUser = true;

            if (type == 0) {
                this.$nextTick(() => {
                     this.addUserModel.state = 0;
                    this.$refs.agForm3.resetFields();
                    this.$refs.orgTreeUser.getOrgList();
                });
            } else {
                let arr = [];
                let newrow = JSON.parse(JSON.stringify(row))
                // let {data} =  await findMenuList({uid:row.uid,eid:row.orgId});
            
                // if(data.roleSet){
                //     data.roleSet.forEach(item=>{
                //         arr.push(item.id)
                //     })
                // }
                let names = row.roleNameAll.split('|')
                this.roleList.map((item)=>{
                    if(names.includes(item.roleName)){
                        arr.push(item.id)
                    }
                })
                // row.roleIds = arr;
                //     console.log(row)
                //     this.addUserModel = row;
                this.$nextTick(() => {
                    this.$refs.agForm3.resetFields();
                    newrow.roleIds = arr;
                    this.addUserModel = newrow;
                });
            }
        },
        
        
        async doAddUser() {
            if(this.addUserType==0){

                await addOrgUser(this.addUserModel)
            }else{
                await editOrgUser(this.addUserModel)
            }
             
            this.$message.success('提交成功');
            this.visibleAddUser = false;
            this.getUserList();
            
        },
        async del(type, row) {
            let arr = [];
            console.log(row)
            let str = '确认从部门删除成员？';
            if (type == 0) {
                arr.push(row.uid);
                this.org = row
            } else {
                this.selections.forEach(item => {
                    arr.push(item.uid);
                });
            }
            if (type == 3) {
                str = '删除后，成员将无法登录企业账号，确定删除吗？';
            }
            this.$confirm(str, '温馨提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消'
            })
                .then(async () => {
                    console.log(type)
                    // return false;
                    if (row.channelNameAll == '') {
                        await deleteUserOrg({ orgId: this.org.orgId.toString(), uids: arr });
                    } else {
                        console.log(this.org.id)
                        await deleteUserDepartment({ orgId: this.org.orgId.toString(), uids: arr });
                    }
                    this.$message.success('删除成功');
                    this.getUserList(1);
                })
                .catch(() => {});
        },
        copy(){
           
            let base = location.href.split("#")[0]+'#/login'
            this.$copyText(base).then(
		        res => {
		          console.log(res)
		          this.$message.success("链接已复制");
		        },
		        err => {
		          this.$message.error("复制失败");
		        }
		    )
        },
        userDepart() {
            this.visibleDep = true;
            this.$nextTick(res => {
                this.$refs.orgTree2.getOrgList();
            });
        },
        async oneChange(row){
            this.visibleoneChange = true;
            this.onChangeModel.oldUid = row.uid;
            this.onChangeModel.eid = this.getDentify.orgId;
            let {data} =await turnByOnceBefore(this.onChangeModel)
            this.powerList = data;
            this.$nextTick(res => {
                this.$refs.orgTree3.getOrgList();
            });
        },
        async doOneChange(){
            if(this.onChangeModel.content.length==0){
                this.$message("请选择转交权限")
                return false;
            }
            if(!this.onChangeModel.newUid){
                this.$message("请选择转用户")
                return false;
            }
           let {data} = await turnByOnce(this.onChangeModel)
           this.$message.success("转交成功")
           this.visibleoneChange = false;
           console.log(data)
        },
        onChangeClick(item){
          
            this.onChangeModel.orgId = item.id;
            this.getUserList2();
        },
        checkboxT(row, rowIndex) {
            return row.id !== 1;
        },
        selectionChangeHandler(val) {
            this.selections = val;
        },
        getdepInfo(item,list){
            if(item.parentId == 0){
                this.selectDep.push(item.channelName)
            } else{
                this.selectDep.push(item.channelName)
                list.map((obj,index)=>{
                    if(item.parentId == obj.id){
                        this.getdepInfo(obj,list)
                    }
                })
            }
        },
        handleNodeClick(item,list) {
            this.org = item;
            console.log(item)
            console.log(list)
            this.selectDep = []
            this.model.orgId = item.id;
            this.getdepInfo(item,list)
            this.selectDep = this.selectDep.reverse();
            console.log(this.selectDep)
            this.getUserList();
        },
        handleNodeClick2(item,list) {
            this.adjustObj = item
            this.movedep = []
            this.getdepInfo2(item,list)
            this.movedep = this.movedep.reverse();
        },
        getdepInfo2(item,list){
            if(item.parentId == 0){
                this.movedep.push(item.channelName)
            } else{
                this.movedep.push(item.channelName)
                list.map((obj,index)=>{
                    if(item.parentId == obj.id){
                        this.getdepInfo2(obj,list)
                    }
                })
            }
        },
        async deptArr() {
            // let arr = this.$refs.orgTree2.getTreeCheck();
            // if (arr.length == 0) {
            //     this.$message.error('请选择部门');
            //     return false;
            // }
            let arr = [this.adjustObj.id]
            let arr2 = [];
            this.selections.forEach(item => {
                arr2.push(item.uid);
            });
            let { data } = await editOrgUserDepart({ orgId: arr.toString(), uids: arr2 });
            this.$message.success('操作成功');
            this.getUserList(1);
            this.visibleDep = false;
        },
        getUserList(value,type) {
            // value ? (this.model.pageNum = value) : (this.model.pageNum = 1);
            if(type){
                if(type == 'cur'){
                    value ? (this.model.pageNum = value) : (this.model.pageNum = 1);
                } else if(type == 'size'){
                    value ? (this.model.pageSize = value) : (this.model.pageSize = 10);
                }
            }

            findOrgUserList(this.model).then(res => {
                console.log(res);
                this.list = res.data.list;
                this.list.map((item)=>{
                    if(item.state == 1){
                        item.stateswitch = true
                    } else if(item.state == 3){
                        item.stateswitch = false
                    }
                })
                this.pageTotal = res.data.total;
            });
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
        getOrgList() {
            this.$refs.orgTree.getOrgList();
        },
        async getRoleList() {
            //获取所有角色
            let { data } = await roleListByOrg({ eid: this.getDentify.orgId });

            this.roleList = data;
        },
        doAddExcelArr() {
            this.clearExcel()
            this.visibleExcel = true;
        },
        async applyUser(value){
            value ? this.auditUserModel.pageNum = value :this.auditUserModel.pageNum=1;
            this.auditUserModel.eid = this.getDentify.orgId;
            let {data} =await findUnAuditUser(this.auditUserModel)
     
             this.listApply = data.list
             this.pageTotal2 = data.total
            this.visibleApply = true;
        },
        applyContent(row){
             
            this.applyModel.uid = row.uid;
            this.applyModel.auditOpinion = ""
            this.visibleApplyContent = true;
        },
        async doApplyUser(state,row){
            console.log(row)
            let tempstr = ''
            if(state==10){
                // if(!this.applyModel.auditOpinion){
                //     this.$message.error("请填写审核意见")
                //     return false;
                // }
                 tempstr = '同意加入后“'+row.userName+'”将成为“'+this.getDentify.orgName+'”成员，确定同意吗？'
            } else if(state == 2){
                tempstr  = '拒绝加入后“'+row.userName+'”无法成为“'+this.getDentify.orgName+'”成员，确定拒绝吗？'
            }
            this.$confirm(tempstr, '操作提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.applyModel.auditState =state 
                    this.applyModel.uid =row.uid 
                    doAuditUser(this.applyModel);
                    this.visibleApply = false;
                    this.$message.success("已提交");
                    this.applyUser();
                }).catch(() => {
                           
                });
            
        },
        async addExcelArr() {
            //批量提交
            let {data} = await addOrgUserExcel(this.nextExcelList)
            this.$message.success("提交成功");
            this.visibleExcel = false;
            this.getOrgList();
            
        },
        beforeUpload(file) {
            this.loading2 = true;
        },
        successAuth(res, file) {
          
            if (res.code == 200) {
                this.$message.success("上传成功")
                this.nextExcelList = res.data;
                this.listNew = res.data.tempList;
                if(!res.data.errorMsg){
                    res.data.errorMsg = [];
                }
                this.illegalList = res.data.errorMsg//illegalList;
                this.goList = res.data.list;
                this.loading2 = false;
            } else {
                this.clearExcel()
                this.loading2 = false;
                if(res.message){
                    this.$message.error(res.message);
                }else{

                    this.$message.error('上传失败');
                }
            }
        },
        clearExcel(){
            this.listNew = [];
            this.illegalList = [];
            this.goList = [];
        },
        errorAuth(res) {
            this.loading2 = false;
            console.log(res)
            this.$message.error('上传失败');
        },
        searchdelOruser(){
            if(this.departmentSearch == ''){
                console.log(1)
                this.issearch = false
                this.$nextTick(()=>{
                    this.$refs.orgTree.getOrgList();
                }) 
            } else{
                let model = {
                    orgId: this.getDentify.orgId,
                    userName:this.departmentSearch
                }
                searchOrgOrUser(model).then(res => {
                    console.log(res)
                    this.searchOrg = res.data.orgInfoList
                    this.searchUser = res.data.userList
                    this.searchUser.map((item)=>{
                        item.userName = common.base64DeCode(item.userName)
                        item.userAccount = common.base64DeCode(item.userAccount)
                    })
                    this.issearch = true
                });
            }
        },
        handleOrjlist(obj){
            this.model.orgId = obj.id
            this.model.pageNum = 1;
            this.model.pageSize = 10;
            this.getUserList()
        },
        settabledata(obj){
            this.pageTotal = 1;
            this.list = [obj]
        },
        setUserSwitch(val,row){
            console.log(val)
            console.log(row)
        }
        
    },
    mounted() {
        this.getDentify = getDentify();
        this.selectDep = []
        this.selectDep.push(this.getDentify.orgName);
        this.getOrgList();
        this.getRoleList();
        this.model.orgId = this.getDentify.orgId
        this.getUserList();
        this.uploadData.orgId = this.getDentify.orgId;
        this.action = vertifyOrgUserExcel();
    },
    async created() {
        let {data} =await downloadFileByid(1);
       
        this.downPer = downloadFile(data.fileId)
    }
};
</script>
<style lang="less">
.onechange{
.el-dialog__body{
    padding:0px 20px;
}
}
.searchlist{
    text-indent: 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    &:hover{
        background: #73d7fb81;
    }
}
.bordertitle{
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    .titlelist{
        font-weight: 400;
        color: #1257ff;
        font-size: 14px;
    }
}
.treebox{
    padding-right:20px;
    margin-top: 20px;
    border-right:1px solid #ddd;
}
.fullheight{
    .fullcard{
        height: 100%;
    }
}
.mutibar{
    width: 100%;
    box-sizing: border-box;
    height: 45px;
    border-radius: 5px;
    background: #FAFBFD;
    padding: 0 10px;
    color: #333;
    line-height: 45px;
    margin-bottom: 10px;
    border: 1px solid rgba(226,237,255,1);
}
</style>
