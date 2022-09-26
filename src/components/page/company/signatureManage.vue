<!-- 我的 -->
<template>
  <div class="fullheight">
      <!-- <div class="cf margin-sm padding bg-white text-xl text-bold">
          <div v-if="!isdetail && !isadd" class="fl margin-top-sm margin-bottom-sm">印章管理</div>
          <div v-if="isadd" class="fl margin-top-sm margin-bottom-sm cursor-pointer" @click="isadd = false"> &lt; 新增企业印章</div>
          <div v-if="isdetail" class="fl margin-top-sm margin-bottom-sm cursor-pointer" @click="isdetail = false"> &lt; 印章详情</div>
      </div> -->
        <el-card class="margin-sm fullcard">
          <div class="cf text-xl text-bold bordertitle">
            <div v-if="!isdetail && !isadd" class="fl">印章管理</div>
            <div v-if="isadd" class="fl cursor-pointer" @click="isadd = false"> &lt; 新增企业印章</div>
            <div v-if="isdetail" class="fl cursor-pointer" @click="isdetail = false"> &lt; 印章详情</div>
          </div>
          <div v-if="!isdetail && !isadd">
          
            <el-tabs v-model="activeTab" @tab-click="handleTab">
              <el-tab-pane label="企业印章" name="1"></el-tab-pane>
              <el-tab-pane label="印章授权申请" name="2"></el-tab-pane>
            </el-tabs>
            <div v-if="activeTab == 1">
              <div class="funBar">
                <span style="margin-right: 10px;">印章类型</span>
                <el-select v-model="sealListModel.sealTypeName" clearable placeholder="请选择" @change="entSealList">
                  <el-option
                    v-for="item in typelist"
                    :key="item.id"
                    :label="item.sealTypeName"
                    :value="item.sealTypeName">
                  </el-option>
                </el-select>
                <el-button type="primary" class="fr"  @click="addnewSeal">新增企业印章</el-button>
              </div>
              <el-table ref="sealList" v-loading="loading" :data="sealTableList" style="width: 100%;margin-top: 15px;">
                  <!-- <el-table-column label="序号" type="index" width="50"> </el-table-column> -->
                  <el-table-column prop="relateName" label="印章样式" width="70">
                    <template slot-scope="scope">
                      <img :src="'data:image/png;base64,' + scope.row.realImg" style="width: 100%;" alt="">
                    </template>
                  </el-table-column>
                  <el-table-column prop="sealName" label="印章名称" >
                    <template slot-scope="scope">
                      <div class="position-relative">
                        <!-- <el-tag v-if="scope.row.defaultFlag == 1" class="defaultlogo">默认</el-tag> -->
                        <span>{{scope.row.sealName}}<el-tag v-if="scope.row.defaultFlag == 1">默认</el-tag></span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sealTypeName" label="印章类型" />
                  <el-table-column prop="eid" label="印章来源" width="220" >
                    <template slot-scope="scope">
                      <span>{{getDentify.orgName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="relateRole" label="持有角色" />
                  <el-table-column prop="relateUser" label="持有人数量" >
                    <template slot-scope="scope">
                      <el-link @click="gotouserlist(scope.row)" type="primary">{{scope.row.relateUser}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="印章状态" >
                    <template slot-scope="scope">
                      <span>已启用</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="220" align="center" fixed="right">
                      <template slot-scope="scope">
                          <!-- <el-button type="primary" size="mini" @click="applyContent(scope.row)">审核</el-button> -->
                          <el-button type="text" size="mini" @click="newaddRole(scope.row)">添加持有角色</el-button>
                          <span class="margin-left-xs margin-right-xs">|</span>
                          <el-button type="text" size="mini" @click="newaddUser(scope.row)">添加持有人</el-button>
                          <span class="margin-left-xs margin-right-xs">|</span>
                          <el-dropdown @command="handleCommand" class="margin-left-xs">
                            <!-- <span class="el-dropdown-link">| 更多
                            </span> -->
                            <el-button type="text" size="mini" class="el-dropdown-link ">更多</el-button>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item class="dropdownbtn" :command="beforeHandleCommand(scope.row,'view')">查看印章</el-dropdown-item>
                              <el-dropdown-item class="dropdownbtn" :command="beforeHandleCommand(scope.row,'del')">删除印章</el-dropdown-item>
                              <el-dropdown-item class="dropdownbtn" v-if="scope.row.defaultFlag == 0" :command="beforeHandleCommand(scope.row,'setDef')">设为默认</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                      </template>
                  </el-table-column>
              </el-table>
              <el-pagination
                :current-page.sync="sealListModel.pageNum"
                background
                layout="total,prev, pager, next,jumper"
                :total="sealListTotal"
                :page-size="sealListModel.pageSize"
                @current-change="entSealList"
              >
              </el-pagination>
            </div>
            <div v-if="activeTab == 2">
              <el-table ref="table"   :data="listApply" style="width: 100%;">
                    <el-table-column label="序号" width="50" align="center">
                      <template slot-scope="scope">{{scope.$index+1}}</template>
                    </el-table-column>
                    <el-table-column prop="applyName" label="申请人" />
                    <el-table-column prop="applyAccount" label="账号" />
                    <el-table-column prop="createTime" label="申请时间" />
                    <el-table-column prop="sealName" label="印章名称" />
                    <el-table-column label="操作" width="260" align="center" fixed="right">
                              <template slot-scope="scope">
                                  <el-button type="text" size="mini" >查看文件详情</el-button>
                                  <span class="margin-left-xs margin-right-xs">|</span>
                                  <el-button type="text" size="mini" @click="doApplySeal(1,scope.row)" >通过</el-button>
                                  <span class="margin-left-xs margin-right-xs">|</span>
                                  <el-button type="text" size="mini" @click="doApplySeal(2,scope.row)">驳回</el-button>
                                  <!-- <el-button type="primary" size="mini" @click="applyContent(scope.row)">审核</el-button> -->
                              </template>
                          </el-table-column>
                </el-table>
                <el-pagination
                  :current-page.sync="applyModelList.pageNum"
                  background
                  layout="total,prev, pager, next,jumper"
                  :total="pageTotal"
                  :page-size="applyModelList.pageSize"
                  @current-change="getapplyList"
              >
              </el-pagination>
            </div>
          </div>
          <div v-if="isadd">
            <el-form :model="addsealForm" ref="addsealForm" :rules="addrules" label-width="80px" style="margin-top:20px;">
              <el-form-item label="印章名称" prop="sealName" verify>
                <el-input v-model="addsealForm.sealName" style="width: 300px;" placeholder="仅用于区分印章，最多支持50个字符"></el-input>
              </el-form-item>
              <el-form-item label="印章类型" prop="sealTypeName" verify>
                <el-select v-model="addsealForm.sealTypeName" style="width: 300px;" placeholder="请选择印章类型">
                  <el-option
                    v-for="item in typelist"
                    :key="item.id"
                    :label="item.sealTypeName"
                    :value="item.sealTypeName">
                  </el-option>
                </el-select>
              </el-form-item>
              <p>印章制作</p>
              <el-button-group class="margin-top-lg">
                <el-button autofocus @click="setSealType(0)">模板印章</el-button>
                <el-button @click="setSealType(1)">本地上传</el-button>
              </el-button-group>
            </el-form>
            <div v-if="setSealStatus == 0" class="borderbox">
              <el-row :gutter="14">
                <el-col :span="16">
                  <div class="margin-top">
                    <span>选择印章样式</span>
                  </div>
                  <div style="overflow: hidden;">
                    <div class="sealSampleBox" v-for="(item,index) in sealsamplelist" :key="item" :class="{'active':index == checksample }" @click="handleSample(item,index)">
                      <div class="sealSample">
                        <img :src="item.sampleimg" alt="">
                      </div>
                      <p>{{item.name}}</p>
                    </div>
                  </div>
                  <div class="margin-top">
                    <span>设置印章规格</span>
                  </div>
                  <div class="margin-top">
                    <el-radio v-model="sealRadio" label="1">默认印章尺寸</el-radio>
                    <el-input  :value="defaultSize"  :disabled="true" style="width: 120px;"></el-input>
                  </div>
                  <div class="margin-top">
                    <el-radio v-model="sealRadio" label="2">自定义印章尺寸</el-radio>
                    长<el-input v-model="addsealForm.sealWidth" style="width: 50px;"></el-input>
                    *宽<el-input v-model="addsealForm.sealHeight" style="width: 50px;"></el-input>mm
                    <el-tooltip class="item" effect="dark" content="非标准比例可能会导致印章变形，请谨慎设置" placement="top">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </div>
                  <div class="margin-top">
                    <span>设置印章文字</span>
                  </div>
                  <div class="margin-top">
                    <span>环绕文字</span>
                    <el-input  :value="getDentify.orgName"  :disabled="true" style="width: 250px; margin-left:10px"></el-input>
                  </div>
                  <div class="margin-top">
                    <span>横排文字</span>
                    <el-input  v-model="addsealForm.centerText" style="width: 250px; margin-left:10px" placeholder="请输入横排文字"  maxlength="10" show-word-limit></el-input>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="margin-top">
                    <span>高清预览</span> <el-button class="margin-left" type="text" @click="getdeafultView">查看预览</el-button>
                  </div>
                  <div>
                    <div class="previewWrapper margin-top-xs">
                      <div :class="{ watermark: steps > 1 }"></div>
                      <img v-show="defaultViewimg != ''" ref="previewImg" :src="'data:image/png;base64,' + defaultViewimg" />
                    </div>
                    <div class="margin-top" >
                      <span>印章颜色</span>
                      <el-button class="colorBtns" style="background: #ff0000;" @click="addsealForm.sealColor = 'RED'"></el-button>
                      <el-button class="colorBtns" style="background: #0000ff;" @click="addsealForm.sealColor = 'BLUE'" ></el-button>
                      <el-button class="colorBtns" style="background: #000;" @click="addsealForm.sealColor = 'BLACK'" ></el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-button size="small" class="margin-top-lg" @click="isadd = false">取消</el-button>
              <el-button size="small" class="margin-top-lg" type="primary" @click="doaddSeal">完成</el-button>
            </div>
            <div v-if="setSealStatus == 1" class="borderbox">
              <add-seal ref="addSeal" :type="type" :id="id" @transImg="getUPloadImg"></add-seal>
              <el-button size="small" class="margin-top-lg" >取消</el-button>
              <el-button size="small" class="margin-top-lg" type="primary" @click="doaddSeal">完成</el-button>
            </div>
          </div>
          <div v-if="isdetail">
            <div class="detailbox">
              <div class="imgbox">
                <img  :src="'data:image/png;base64,' + selectedSign.realImg" alt="">
              </div>
              <div class="flexbox">
                <div class="detailRightBar">
                  <span class="infolabel">印章名称</span>
                  <span v-if="!iseditDetailName"><span>{{selectedSign.sealName}}</span><i class="el-icon-edit-outline" @click="editDetailName"></i></span>
                  <el-input v-if="iseditDetailName" v-model="detailsealName" @blur="nameBlur" style="width:250px" ref="detailsealName" placeholder="" maxlength="50" show-word-limit></el-input>
                </div>
                <div class="detailRightBar">
                  <span class="infolabel">印章类型</span>
                  <span v-if="!iseditDetailType"><span>{{selectedSign.sealTypeName}}</span><i @click="editDetailType" class="el-icon-edit-outline"></i></span>
                  <el-select v-if="iseditDetailType" v-model="detailSealType" ref="detailsealType" @blur="selBlur" @change="selchange"  placeholder="请选择">
                    <el-option
                      v-for="item in typelist"
                      :key="item.id"
                      :label="item.sealTypeName"
                      :value="item.sealTypeName">
                    </el-option>
                  </el-select>
                </div>
                <div class="detailRightBar">
                  <span class="infolabel">印章归属</span><span>{{getDentify.orgName}}</span>
                </div>
                <div class="detailRightBar">
                  <span class="infolabel">创建时间</span><span>{{selectedSign.createTime}}</span>
                </div>
              </div>
            </div>
              <el-tabs v-model="activeDetailTab">
                <el-tab-pane label="持有角色" name="1"></el-tab-pane>
                <el-tab-pane label="持有人" name="2"></el-tab-pane>
                <el-tab-pane label="印章授权记录" name="3"></el-tab-pane>
              </el-tabs>
              <div v-if="activeDetailTab == 1">
              <el-button type="primary" size="mini" @click="newaddRole(selectedSign)" class="margin-bottom">添加持有角色</el-button>
                <el-table :data="roletable" style="width: 100%">
                  <el-table-column prop="relateName" label="持有角色"></el-table-column>
                  <el-table-column  label="持有有效期" width="270">
                    <template slot-scope="scope">
                      <span v-if="scope.row.startTime != ''">{{scope.row.startTime}} 至 {{scope.row.endTime}}</span>
                      <span v-else>长期有效</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createName" label="授权人"></el-table-column>
                  <el-table-column prop="createTime" label="授权时间"></el-table-column>
                  <el-table-column label="操作" align="center" fixed="right" >
                    <template slot-scope="scope">
                      <el-button  type="text" size="mini" @click="detailedit(scope.row)">编辑</el-button>
                      <span class="margin-left-xs margin-right-xs">|</span>
                      <el-button  type="text" size="mini" @click="detaildel(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="activeDetailTab == 2">
                <el-button type="primary" size="mini" @click="newaddUser(selectedSign)" class="margin-bottom">添加持有人</el-button>
                <el-table :data="usertable" style="width: 100%">
                  <el-table-column prop="relateName" label="持有人"></el-table-column>
                  <el-table-column  label="持有有效期" width="270">
                    <template slot-scope="scope">
                      <span v-if="scope.row.startTime">{{scope.row.startTime}} 至 {{scope.row.endTime}}</span>
                      <span v-else>长期有效</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="createName" label="授权人"></el-table-column>
                  <el-table-column prop="createTime" label="授权时间"></el-table-column>
                  <el-table-column label="操作" align="center" fixed="right" >
                    <template slot-scope="scope">
                      <el-button  type="text" size="mini" @click="detailedit(scope.row)">编辑</el-button>
                      <span class="margin-left-xs margin-right-xs">|</span>
                      <el-button  type="text" size="mini" @click="detaildel(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              
              <el-table v-if="activeDetailTab == 3" :data="recordtable" style="width: 100%">
                <el-table-column prop="contractName" label="合同名称"></el-table-column>
                <el-table-column prop="applyName" label="申请人"></el-table-column>
                <el-table-column prop="applyAccount" label="账号"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间" width="170"></el-table-column>
                <el-table-column prop="approveName" label="审核人"></el-table-column>
                <el-table-column prop="approveTime" label="审核时间" width="170"></el-table-column>
                <el-table-column prop="status" label="状态">
                  <template slot-scope="scope">
                      <span v-if="scope.row.status == 0">待审批</span>
                      <span v-if="scope.row.status == 1">审批通过</span>
                      <span v-if="scope.row.status == 2">审批驳回</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="驳回原因"></el-table-column>
              </el-table>
          </div>
        </el-card>
        
        <!-- <el-row :gutter="5" class="bg-gray padding-sm">
         
            
                <el-col :xs="10" :sm="7" :md="6" :lg="5" :xl="5" class="">
                <el-card class="bg-white">
                  <div class="head-container">
                    <el-button type="primary"  @click="addSealData(1)">编辑印章</el-button>
                    <el-button type="primary"   @click="addSealData(0)">新增印章</el-button>
                  </div>
                  <ul class="role-list">
                    <li v-for="item in roleList" :key="item.id" :class="{active:activeSeal.id==item.id}" @click="getActive(item)">{{item.sealName}}</li>
                    
                  </ul>
                </el-card>
              </el-col>
               
              <el-col :xs="14" :sm="17" :md="18" :lg="19" :xl="19" class="">
                <div v-if="!activeSeal.sealName" class="text-center margin">
                  暂无数据
                </div>
              <div v-if="activeSeal.sealName">
                <el-card class=" bg-white">
                  <div class="margin-sm">
                      <p class="margin-top-sm">{{activeSeal.sealName}}</p>
                      <p class="margin-top-sm">
                          <el-image
                              style="width: 100px; height: 100px"
                              :src="sealFile"
                              fit="contain"></el-image>
                      </p>
                      <p class="margin-top-sm"> 
                        <el-button  type="primary" size="mini" @click="addRole">添加持有角色</el-button>
                        <el-button size="mini" @click="addUserTag">添加持有人</el-button>
                        <el-button  type="danger" :disabled="selections.length==0" size="mini" @click="deleteBatch">批量移除</el-button>
                      </p>
                  </div>
                  <el-table ref="table" v-loading="loading" :data="list" style="width: 100%;" @selection-change="selectionChangeHandler">
                  <el-table-column :selectable="checkboxT" type="selection" width="55" />
                  <el-table-column prop="relateName" label="持有人" />
                  <el-table-column prop="nickName" label="持有时间">
                    <template slot-scope="scope">
                       {{scope.row.startTime}}至 {{scope.row.endTime}}
                    </template>
                  </el-table-column>
                  <el-table-column
                
                    label="操作"
                    width="300 "
                    align="center"
                    fixed="right"
                  >
                    <template slot-scope="scope">
                      <el-button  type="primary" size="mini" @click="addRole2(scope.row)">编辑</el-button>
                      <el-button  type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                      
                    </template>
                  </el-table-column>
                
                </el-table>
              </el-card>
            </div>
            </el-col>
        </el-row> -->
        <add-seal v-if="companyVisible" ref="addSeal" :type="type" :id="id" @closeDialog="closeDialog"></add-seal>
        <el-dialog :title="detailtitle + '持有角色'" :visible.sync="visibleAddRole" v-dialogDrag width="600px">
            <el-form :model="addRoleModel" ref="agForm3" label-width="140px">
                
                <el-form-item label="角色" prop="relateIds" verify>
                    <el-select v-model="addRoleModel.relateIds" multiple placeholder="请选择">
                        <el-option v-for="item in roleList2" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="印章使用日期"  prop="times" v-if="addRoleModel.long" >
                  <date-range-picker value-format="yyyy-MM-dd" range-separator="至" :pickerOptions='false' v-model="addRoleModel.times" class="date-item" />
                </el-form-item>
                <el-form-item label="印章使用日期"  prop="times" verify v-else>
                  <date-range-picker value-format="yyyy-MM-dd" range-separator="至" :pickerOptions='false' v-model="addRoleModel.times" class="date-item" />
                </el-form-item>
                <el-form-item label="" >
                  <el-checkbox v-model="addRoleModel.long">长期有效</el-checkbox>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleAddRole = false">取 消</el-button>
                <el-button type="primary" @click="doAddRole">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑持有角色" :visible.sync="visibleAddRole2" v-dialogDrag width="600px">
            <el-form :model="addRoleModel2" ref="agForm4" label-width="140px">
                
               <el-form-item label="角色" prop="relateName" verify>
                    <el-select v-model="addRoleModel2.relateName" multiple placeholder="请选择" disabled="">
                        <el-option v-for="item in roleList2" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="印章使用日期"  prop="times" v-if="addRoleModel2.long">
                  <date-range-picker value-format="yyyy-MM-dd" range-separator="至" :pickerOptions='false' v-model="addRoleModel2.times" class="date-item" />
                </el-form-item>
                <el-form-item label="印章使用日期"  prop="times" verify v-else>
                  <date-range-picker value-format="yyyy-MM-dd" range-separator="至" :pickerOptions='false' v-model="addRoleModel2.times" class="date-item" />
                </el-form-item>
                <el-form-item label="" >
                  <el-checkbox v-model="addRoleModel2.long">长期有效</el-checkbox>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleAddRole2 = false">取 消</el-button>
                <el-button type="primary" @click="doAddRole2">保存</el-button>
            </div>
        </el-dialog>
        <add-user ref="addUser" @change="change" @edit="viewDetail(2)"></add-user>
        <el-dialog title="印章审核" :visible.sync="visibleApply" v-dialogDrag width="900px">
             
            <div>
              <el-table ref="table"   :data="listApply" style="width: 100%;">
                  <el-table-column label="序号" type="index" width="50"> </el-table-column>
                  <el-table-column prop="relateName" label="申请人" />
                  <el-table-column prop="relateAccount" label="账号" />
                  <el-table-column prop="createTime" label="申请时间" />
                  <el-table-column prop="sealName" label="印章名称" />
                  <el-table-column label="操作" width="150" align="center" fixed="right">
                            <template slot-scope="scope">
                            
                                <el-button type="primary" size="mini" @click="applyContent(scope.row)">审核</el-button>
                            </template>
                        </el-table-column>
              </el-table>
              <el-pagination
                :current-page.sync="applyModelList.pageNum"
                background
                layout="total,prev, pager, next,jumper"
                :total="pageTotal"
                :page-size="applyModelList.pageSize"
                @current-change="getapplyList"
            >
            </el-pagination>
            </div>
        </el-dialog>
         <el-dialog title="驳回原因" :visible.sync="visibleApplyContent" v-dialogDrag width="700px">
           <el-form :model="applyModel" ref="appForm" label-width="140px">
            <el-form-item label="审核意见"  prop="remark" >
                <el-input
                    type="textarea"
                    :rows="4" 
                    v-model="applyModel.remark">
                    </el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleApplyContent = false">取 消</el-button>
                <el-button type="danger" @click="rejectapply()">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import {entSealList,findSeal,addSealUser,relateList,addSealRole,auditSealList,auditSeal,editRelate,deleteRelate,deleteBatch,findSealTypeList,modelSealView,addSeal,getSealType,setDefault,deleteSeal,sealAuditRecordList,editSeal} from '../../../api/signatureManage.js';
import common from '@/assets/js/common.js'
import { roleListByOrg } from '../../../api/role.js';
import AddSeal from './signatureWin/AddSeal'
import {getDentify} from '@/utils/auth';
import {parseTime} from '@/utils/index';
import {preview,uploadBase64 } from '../../../api/index.js';
import DateRangePicker from '../../common/DateRangePicker';
import addUser from './roleWin/addUser'
export default {
  components: {AddSeal,DateRangePicker,addUser},
  data() {
    return {
      
      // sampleimg:require("../../../assets/img/sign.png"),
      defaultViewimg:'',
      imgfileid:'',
      companyVisible:false,
      visibleAddRole:false,
       visibleAddRole2:false,
      visibleApply:false,
      visibleApplyContent:false,
      type: 1,
      activeTab:'1',
      addRoleModel:{
        sealId:"",
        relateIds:[],
        startTime:"",
        endTime:"",
        times:"",
        long:false
      },
      addRoleModel2:{
        id:"",
        startTime:"",
        endTime:"",
        times:"",
        relateName:'',
        long:false
      },
      applyModel: {
        remark:"",
        status:"",
        id:"",
        // startTime:"",
        // endTime:"",
        // times:[]
      },
      applyModelList:{
        pageNum:1,
        pageSize:10,
         
      },
      pageTotal:0,
      getDentify:{},
      deptName:"",
      loading:false,
      selections:[],
      id: '',
      list:[],
      roleList:[
       
      ],
       listApply:[],
      roleList2:[],
      roleActive:1,
      activeSeal:{
        sealName:''
      },
      sealFile:"",
      typelist:[],
      selectedSignType:'',
      isadd:false,
      isdetail:false,
      sealTableList:[],
      sealListModel:{
        sealTypeName:'',
        pageNum:1,
        pageSize:10,
      },
      sealListTotal:0,
      selectedSign:{},
      addsealForm:{
        sealName:'',
        sealTypeName :'',
        mainText:'',
        centerText:'',
        sealColor:'RED',
        sealStyle:1,
        isDefault:true,
        sealWidth:0,
        sealHeight:0
      },
      addrules: {
          name: [
            { required: true, message: '请输入印章名称', trigger: 'blur' },
            { min: 0, max: 50, message: '长度在 50 个字符以内', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择印章类型', trigger: 'change' }
          ]
      },
      setSealStatus:0,
      uploadImgsrc:'',
      sealsamplelist:[
        {
          sampleimg:require("../../../assets/img/sign1.png"),
          name:'法定名称章',
          size:'42*42mm',
          sealStyle:1
        },
        {
          sampleimg:require("../../../assets/img/sign2.png"),
          name:'专用章',
          size:'38*38mm',
          sealStyle:2
        },
        {
          sampleimg:require("../../../assets/img/sign3.png"),
          name:'椭圆章',
          size:'45*30mm',
          sealStyle:3
        },
      ],
      checksample:0,
      sealRadio:'1',
      sealSize:{
        width:0,
        height:0
      },
      defaultSize:'42*42mm',
      detailsealName:'',
      detailSealType:'',
      iseditDetailName:false,
      iseditDetailType:false,
      activeDetailTab:'1',
      roletable:[
        // {
        //   roleName:'主管理员',
        //   times:'2022-07-09 00:00:00 至 2022-07-09 23:59:59',
        //   au:'娜娜',
        //   aut:'2022-7-1',
        // }
      ],
      usertable:[
        // {
        //   userName:'娜娜',
        //   times:'2022-07-09 00:00:00 至 2022-07-09 23:59:59',
        //   au:'娜娜',
        //   aut:'2022-7-1',
        // }
      ],
      recordtable:[
        
      ],
      detailtitle:'新建'
    };
  },
  methods: {
    checkboxT(row, rowIndex) {
      return row.id !== 1
    },
    selectionChangeHandler(val){
      this.selections = val
    },
    handleNodeClick(data) {
    },
    async deleteBatch(){
      this.$confirm('确认删除?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
          let arr = [];
          this.selections.forEach(item=>{
            arr.push(item.id)
          })
            let { data } = await deleteBatch({ ids: arr});
            this.$message.success('删除成功');
            this.relateList();
        })
        .catch(() => {});
    },
    async entSealList(val){// 印章列表
    // let tempstr = ''
    // if(val) tempstr = val;
    this.loading = true
      let {data}= await entSealList(this.sealListModel);
      this.sealListTotal = data.total
      //处理持有关系数据
      data.list.map((item)=>{
        item.relateUser = 0;
        item.relateRole = ''
        if(item.relateList.length != 0){
          item.relateList.map((obj)=>{
            //0是用户  1是角色
            if(obj.relateType == 0){
              item.relateUser += 1;
            } else{
              item.relateRole = item.relateRole + common.base64DeCode(obj.relateName) + ','
            }
          })
        }
      })
      this.sealTableList = data.list
      this.loading = false
      // this.roleList = data.list;
      // if(data.length>0){
      //   if(!this.activeSeal.id&&!tag){
      //     console.log(1)
      //     this.activeSeal = data[0];
      //     this.findSeal();
      //   }
      // }
    },
    async findSeal(){// 
     
      let {data}= await findSeal({id:this.activeSeal.id});
        this.sealFile = "data:image/jpg;base64,"+data.waterImg //preview(data.fileId)
       this.relateList();
    },
    async relateList(){// 
      let {data}= await relateList({id:this.activeSeal.id});
      this.list = data;
    },
    
    
    async closeDialog() {
        this.companyVisible = false
        // this.userVisible = false
        if(!this.activeSeal.id){
            this.entSealList(false);
        }else{
          this.entSealList(true);
          this.findSeal();
        }
       
        // this.findSeal();
    },
    addSealData(type, data) {
      // this.type = type
        this.companyVisible = true;
      let row = ''
      if (type == 0) {
        row = this.getDentify 
      }else{
        if(!this.activeSeal.id){
          this.$message.error("请选择印章")
          return false;
        }
        row = JSON.parse(JSON.stringify(this.activeSeal))
        row.imgseal =  this.sealFile
        // row.sealFile = this.sealFile;
      }
      this.$nextTick(()=>{
        this.$refs.addSeal.init(type,row)
      })
     
      
    }, 
    getActive(row){
      this.activeSeal = row;
      this.findSeal()
    },
    async doApplySeal(state,row){
        // if(state==2){
        //     if(!this.applyModel.remark){
        //         this.$message.error("请填写审核意见")
        //         return false;
        //     }
        // }
        // if(state==1){

        //   if(this.applyModel.times.length==0){
        //     this.$message.error("请选择有效时间")
        //           return false;
        //   }
        //   this.applyModel.startTime = this.applyModel.times[0];
        //   this.applyModel.endTime = this.applyModel.times[1];
        // }else{
        //   this.applyModel.startTime = "";
        //   this.applyModel.endTime = ""

        // }
        //   this.applyModel.status =state 
        // await auditSeal(this.applyModel);
        // this.visibleApplyContent = false;
        // this.$message.success("提交成功");
        // this.getapplyList();
        // this.relateList();
        console.log(row)
        this.applyModel.status = state 
        this.applyModel.id = row.id 
        if(state == 1){
          //通过
          this.$confirm('通过后企业成员可在该文档上加盖印章，确定通过该审核吗？', '通过审核', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          })
          .then(async () => {
            this.applyModel.remark = ''
            await auditSeal(this.applyModel);
            this.$message.success('操作成功');
            this.getapplyList();
          })
          .catch(() => {});
        } else{
          this.visibleApplyContent = true
        }
    },
    async rejectapply(){
      await auditSeal(this.applyModel);
      this.$message.success('操作成功');
      this.visibleApplyContent = false
      this.getapplyList();
    },
    
    async getRoleList(){//获取所有角色
      
            //获取所有角色
            let { data } = await roleListByOrg({ eid: this.getDentify.orgId });

            this.roleList2 = data;
        
    },
    addRole(){
      this.visibleAddRole = true;
      // activeSeal
      this.addRoleModel.sealId = this.activeSeal.id;
      
      this.$nextTick(() => {
        this.$refs.agForm3.resetFields();
      });
    },
    addRole2(row){
      this.visibleAddRole2 = true;
      // activeSeal
      this.addRoleModel2.id = row.id;
      this.addRoleModel2.times = [row.startTime,row.endTime]
      this.$nextTick(() => {
        
        // this.$refs.agForm4.resetFields();
      });
    },
    async del(row){
        this.$confirm('确认删除?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            let { data } = await deleteRelate({ id: row.id });
            this.$message.success('删除成功');
            // this.relateList();
        })
        .catch(() => {});
      },
    async doAddRole(){
      
      this.$refs.agForm3.validate(valid => {
            if (valid) {
              if(this.addRoleModel.long){
                this.addRoleModel.startTime = '';
                this.addRoleModel.endTime = '';
              } else{
                this.addRoleModel.startTime = this.addRoleModel.times[0];
                this.addRoleModel.endTime = this.addRoleModel.times[1];
              }
              addSealRole(this.addRoleModel).then(res => {
                  this.$message.success('操作完成');
                  this.visibleAddRole = false;
                  if(this.isdetail) this.viewDetail()
                  // this.relateList();
                  this.entSealList()
              });
            } else {
                    
                return false;
            }
        });
      
    },
    async doAddRole2(row){
      
      this.$refs.agForm4.validate(valid => {
            if (valid) {
              // this.addRoleModel2.startTime = this.addRoleModel2.times[0];
              // this.addRoleModel2.endTime = this.addRoleModel2.times[1];
              if(this.addRoleModel2.long){
                this.addRoleModel2.startTime = '';
                this.addRoleModel2.endTime = '';
              } else{
                this.addRoleModel2.startTime = this.addRoleModel2.times[0];
                this.addRoleModel2.endTime = this.addRoleModel2.times[1];
              }
              editRelate(this.addRoleModel2).then(res => {
                  this.$message.success('操作完成');
                  this.visibleAddRole2 = false;
                  if(this.isdetail) this.viewDetail()
                  // this.relateList();
              });
            } else {
                    
                return false;
            }
        });
      
    },
    change(){
      // this.relateList();
      this.entSealList('')
    },
    addUserTag(){
      // this.visibleUserAdd= true;
      this.$refs.addUser.init('addOwner',this.activeSeal);
    },
    applySeal(){
      this.getapplyList();
      
      this.visibleApply = true;
    },
    async getapplyList(value){
      value ? (this.applyModelList.pageNum = value) : (this.applyModelList.pageNum = 1);
      let {data} =await auditSealList(this.applyModelList)
      this.listApply = data.list;
      this.listApply.map((item)=>{
        item.applyAccount = common.base64DeCode(item.applyAccount)
        item.applyName = common.base64DeCode(item.applyName)
        item.createTime = parseTime(item.createTime)
      })
      this.pageTotal = data.total;
       
    },
     applyContent(row){
             
        this.applyModel.id = row.id;
        this.applyModel.remark = ""
        this.applyModel.times = ''
        this.visibleApplyContent = true;
    },
    // async doApplySeal(state){
    //   if(state==2){
    //       if(!this.applyModel.auditOpinion){
    //           this.$message.error("请填写审核意见")
    //           return false;
    //       }
    //   }
    //   this.applyModel.auditState =state 
    //   await auditSeal(this.applyModel);
    //   this.visibleApplyContent = false;
    //   this.$message.success("已提交");
    //   this.applyUser();
    // }
    async getsignType(){//获取类型列表
      let {data}= await findSealTypeList({});
      this.typelist = data
    },
    addnewSeal(){
      this.isadd = true;
    },
    beforeHandleCommand(row,command){
        return {
            'row': row,
            'command':command
        }
    },
    handleCommand(command){
      if(command.command == 'del'){
        this.$confirm('<p style="font-size:15px">删除后该印章将无法使用，是否确定删除？</p><span style="font-size:12px">印章名称:'+command.row.sealName + '</span>', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          deleteSeal({id:command.row.id}).then((res)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.entSealList()
          })
          
        }).catch(() => {
                   
        });
      } else if(command.command == 'view'){
        this.isdetail = true;
        this.selectedSign = command.row
        console.log(this.selectedSign)
        this.viewDetail()
      } else if(command.command == 'setDef'){
        setDefault({id:command.row.id}).then((res)=>{
            this.$message.success('设置成功');
            this.entSealList('')
        })
      }
    },
    viewDetail(tab){
      console.log(this.selectedSign)
      relateList({id:this.selectedSign.id}).then((res)=>{
        console.log(res)
        this.iseditDetailName= false
        this.iseditDetailType= false
        this.usertable = []
        this.roletable = []
        res.data.map((item)=>{
          // item.relateName = common.base64DeCode(item.relateName) 
          // item.relateAccount = common.base64DeCode(item.relateAccount)
          common.base64DeCode(item.relateName)
          //0是用户  1是角色
            if(item.relateType == 0){
              this.usertable.push(item)
            } else{
              this.roletable.push(item)
            }
        })
        if(tab){
          this.activeDetailTab = tab;
        } else{
          this.activeDetailTab = '1';
        }
      })
      this.getrecordlist();
        
    },
    setSealType(type){
      this.setSealStatus = type
    },
    doaddSeal(){
      if(this.setSealStatus == 1){
        //上传印章
        this.$refs.addSeal.getimg();
        console.log(this.uploadImgsrc)
        this.$refs.addsealForm.validate(async valid => {
          if(valid){
              if(this.uploadImgsrc){
                let {data} = await uploadBase64({
                  base64:this.uploadImgsrc,
                  fileName:"viewImg.png",
                  channelNo:"anysign",
                  storeType:"1"
                });
                let submits = {
                  fileId:data.id,
                  sealName:this.addsealForm.sealName,
                  sealTypeName:this.addsealForm.sealTypeName,
                  eid:this.getDentify.orgId,
                  weight:this.sealSize.width,
                  height:this.sealSize.height
                }
                addSeal(submits).then((res)=>{
                  console.log(res)
                  if(res.code == 200){
                  this.$message.success('新增成功');
                  this.isadd = false;
                  this.entSealList('');
                  }
                })
              } else {
                this.$message.error('请先查看印章预览');
              }
              
          }
        })
      } else {
        //模板制章
        if(this.imgfileid){
          let submits = {
            fileId:this.imgfileid,
            sealName:this.addsealForm.sealName,
            sealTypeName:this.addsealForm.sealTypeName,
            eid:this.getDentify.orgId
          }
          addSeal(submits).then((res)=>{
            console.log(res)
            if(res.code == 200){
            this.$message.success('新增成功');
            this.isadd = false;
            this.entSealList('');
            }
          })
        } else{
          this.$message.error('请先查看印章预览');
        }
      }
    },
    getUPloadImg(src,obj){
      this.uploadImgsrc = src
      this.sealSize = obj
    },
    handleSample(item,index){
      this.checksample = index;
      this.defaultSize = item.size
      this.addsealForm.sealStyle = item.sealStyle
    },
    newaddRole(obj){
      this.activeSeal = obj
      this.detailtitle = '新建'
      this.addRole()
    },
    newaddUser(obj){
      this.activeSeal = obj
      
      this.$refs.addUser.init('addOwner',this.activeSeal,'add');
      // this.addUser()
    },
    editDetailName(){
      this.iseditDetailName = true
      this.detailsealName = this.selectedSign.sealName
      this.$nextTick(()=>{
        this.$refs.detailsealName.focus()
      })
    },
    editDetailType(){
      this.iseditDetailType = true
      this.detailSealType = this.selectedSign.sealTypeName
    },
    nameBlur(){
      this.selectedSign.sealName = this.detailsealName
      this.iseditDetailName = false
      let obj ={
        id:this.selectedSign.id,
        fileId:this.selectedSign.fileId,
        sealName:this.detailsealName,
        sealTypeName:this.selectedSign.sealTypeName
      }
      editSeal(obj).then((res)=>{
          this.viewDetail()
        })
    },
    selBlur(e){
      // console.log(e.target.value)
      // console.log( this.detailSealType)
      // if(this.detailSealType != ''){
      //   this.selectedSign.sealTypeName = this.detailSealType
      //   this.iseditDetailType = false
      // }
      // if(e.target.value != ''){
      //     this.selectedSign.sealTypeName =e.target.value
      //     this.iseditDetailType = false
      // } else{
      //   // this.selectedSign.sealTypeName = this.detailSealType
      //   // this.
      // }
      // this.selectedSign.sealTypeName = this.detailSealType
      // this.iseditDetailType = false
    },
    selchange(val){
      this.detailSealType = val
      this.selectedSign.sealTypeName = this.detailSealType
      this.iseditDetailType = false
      let obj ={
        id:this.selectedSign.id,
        fileId:this.selectedSign.fileId,
        sealName:this.selectedSign.sealName,
        sealTypeName:val
      }
        editSeal(obj).then((res)=>{
          this.viewDetail()
        })
      // this.$nextTick(()=>{
      //   this.$refs.detailsealType.focus()
      // })
    },
    detailedit(row){
      console.log(row)
      if(row.relateType == 1){
        this.visibleAddRole2 = true
        this.detailtitle = '编辑'
        this.activeSeal = row
        this.addRoleModel2.relateName = [row.relateName]
        this.addRoleModel2.id = row.id
        if(row.startTime == null && row.endTime == null){
          this.addRoleModel2.long = true
        } else{
          this.addRoleModel2.long = false
          this.addRoleModel2.times = [row.startTime,row.endTime]
        }
        
        console.log(this.addRoleModel2)
        this.$nextTick(() => {
            this.$forceUpdate()
          });
      } else{
        this.$refs.addUser.setDetaildata(row)
      }
    },
    detaildel(row){
      console.log(row)
      let delhint = ''
      let delinfo = ''
      if(row.relateType == 1){
        delhint = '删除持有角色'
        delinfo = '删除后该角色将不再拥有本印章的使用权限，是否确定删除？'
      } else{
        delhint = '删除持有人'
        delinfo = '删除后该员工将不再拥有本印章的使用权限，是否确定删除？'
      }
      this.$confirm(delinfo, delhint, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            let { data } = await deleteRelate({ id: row.id });
            this.$message.success('删除成功');
            this.viewDetail(this.activeDetailTab)
        })
        .catch(() => {});
    },
    getdeafultView(){
      if(this.sealRadio == 1){
        if(this.addsealForm.sealStyle == 1){
          this.addsealForm.sealWidth = 42;
          this.addsealForm.sealHeight = 42;
        } else if(this.addsealForm.sealStyle == 2){
          this.addsealForm.sealWidth = 38;
          this.addsealForm.sealHeight = 38;
        } else if(this.addsealForm.sealStyle == 3){
          this.addsealForm.sealWidth = 45;
          this.addsealForm.sealHeight = 30;
        }
      } 
      this.addsealForm.mainText = this.getDentify.orgName
      this.addsealForm.isDefault = this.sealRadio == 1
      console.log(this.addsealForm)
      modelSealView(this.addsealForm).then((res)=>{
        console.log(res)
        if(res.data) {
          this.defaultViewimg = res.data.sealBase64
          this.imgfileid = res.data.fileId
        }
      })
    },
    gotouserlist(row){
      this.isdetail = true;
      this.selectedSign = row
      this.viewDetail('2')
    },
    async getrecordlist(){
      let {data} = await sealAuditRecordList({id:this.selectedSign.id});
      console.log(data)
      this.recordtable = data.list;
      this.recordtable.map((item)=>{
        item.applyAccount = common.base64DeCode(item.applyAccount)
        item.applyName = common.base64DeCode(item.applyName)
        item.createTime = parseTime(item.createTime)
        item.updateTime = parseTime(item.updateTime)
      })
    }
    
  },
  mounted(){
      this.getDentify = getDentify();
      console.log(this.getDentify)
      this.entSealList('');
      this.getRoleList();
      this.getsignType();
      this.getapplyList();
    }
  }

</script>
<style lang="less">
.role-list{
  margin-top:10px;
  li{
    height:32px;
    line-height: 32px;
    padding:0 20px;
    cursor: pointer;
  } 
  .active{
    background-color: #edf6ff;
    color:#228FFE;
  }
}
.funBar{
  margin-top: 10px;
}
.sealSampleBox{
  float: left;
  margin-right: 15px;
  cursor: pointer;
  &.active{
    .sealSample{
      border-color: blue;
    }
    p{
      color: blue;
    }
  }
  .sealSample{
    width: 120px;
    height: 120px;
    border:1px solid #d3d3d3;
    border-radius: 8px;
    display: flex;
    align-items: center;
    img{
      width: 90px;
      // height: 90px;
      margin:15px;
    }
  }
  p{
    text-align: center;
    margin-top: 10px;
  }
}
.previewWrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border: 1px solid #cccccc;
  overflow: hidden;
  img{
    width: 80%;
  }
}
.borderbox{
  border: 1px solid #d3d3d3;
  margin-top: 20px;
  padding:20px;
}
.detailbox{
  width: 100%;
  display: flex;
  margin-top: 20px;
  .imgbox{
    width: 150px;
    height: 150px;
    border:1px solid #d3d3d3;
    img{
      width: 120px;
      height: 120px;
      margin:15px;
    }
  }
  .flexbox{
    flex-grow: 1;
    height: 200px;
    margin-left: 20px;
    .detailRightBar{
      height: 30px;
      line-height: 30px;
      margin-top: 5px;
      i{
        cursor: pointer;
      }
      .infolabel{
        color: #d3d3d3; margin-right: 10px;
      }
    }
  }
}
.defaultlogo{
  position: absolute;
  top:0;
  left:0;
}
.colorBtns{
    width: 20px;
    height: 20px;
    padding:0;
    border-radius: 3px;
    margin-left:10px;
}
.bordertitle{
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
}
</style>