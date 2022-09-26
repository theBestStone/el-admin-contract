<!--  -->
<template>
    <div style="height: 100%">
        <div class="content100" style="height: 100%">
            <el-row :gutter="20" class="margin-top-xs" style="height: 100%">
                <el-col :span="4" style="height: 100%; padding-right: 3px">
                    <el-card class="leftcard" style="height: calc(100% - 40px); padding: 20px 0">
                        <div style="padding: 0 20px">
                            <p class="text-center">
                                <el-button
                                    type="primary"
                                    v-if="checkPer(['admin', 'permission:localFilePlayBegin'])"
                                    style="width: 90%; height: 40px; font-size: 14px"
                                    @click="useInfo"
                                    icon="el-icon-plus"
                                >
                                    发起签署
                                </el-button>
                            </p>
                            <p class="text-center margin-top">
                                <el-button
                                    v-if="checkPer(['admin', 'permission:localFilePlayBegin'])"
                                    style="
                                        width: 90%;
                                        height: 40px;
                                        background: #e7eeff;
                                        color: #1257ff;
                                        font-size: 14px;
                                        line-height: 10px;
                                    "
                                    @click="useTemp"
                                >
                                    <el-image class="" style="margin-right: 3px" :src="buttonicon"></el-image>
                                    模板发起
                                </el-button>
                            </p>
                        </div>

                        <ul class="title-ul margin-top-sm">
                            <li
                                @click="netType(index, item)"
                                :class="{ active: index == titleActive }"
                                v-for="(item, index) in titleList"
                                :key="index"
                            >
                                <el-image class="" style="" :src="item.icon"></el-image>
                                {{ item.name }}
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <el-col :span="20" style="padding-left: 2px">
                    <el-card class="bg-white" v-if="model.fileStatusType != 0">
                        <el-tabs
                            v-model="model.signType"
                            v-if="model.fileStatusType == 1 || model.fileStatusType == 2"
                            @tab-click="switchclick"
                        >
                            <el-tab-pane :label="'待' + meorhe + '签署'" name="1"></el-tab-pane>
                            <el-tab-pane :label="'待' + meorhe + '审批'" name="11"></el-tab-pane>
                        </el-tabs>
                        <div>
                            <el-form
                                class="cf"
                                ref="agform"
                                :model="model"
                                label-width="110px"
                                :inline="true"
                                @submit.native.prevent
                                @keyup.enter.native="doSearch(1)"
                            >
                                <el-row v-if="model.fileStatusType != 99">
                                    <el-form-item label="主题" prop="contractName">
                                        <el-input placeholder="请输入签署任务主题" v-model="model.contractName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="文件状态" prop="status">
                                        <!-- <el-select :disabled="disabled" filterable v-model="model.status" placeholder="请选择...">
                      <el-option v-for="(item,index) in titleList" :key="item.status" :label="item.name" :value="item.status"></el-option>
                      
                    </el-select> -->
                                        <div class="statusbox">
                                            <div
                                                v-for="(item, index) in statusList"
                                                :class="{ active: model.statusList.includes(item.status) }"
                                                :key="item.status"
                                                @click="statusClickHandle(item)"
                                            >
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </el-form-item>
                                </el-row>

                                <el-form-item v-if="model.fileStatusType != 99" label="发起人" prop="initiator">
                                    <el-input placeholder="请输入发起人" v-model="model.initiator"></el-input>
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType != 99" label="接收方" prop="signer">
                                    <el-input placeholder="请输入接收方" v-model="model.signer"></el-input>
                                </el-form-item>

                                <el-form-item v-if="model.fileStatusType != 99" label="创建时间" prop="times">
                                    <date-range-picker
                                        v-model="model.times"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        class="date-item"
                                    />
                                    <!-- <el-cascader filterable :options="optionData" v-model="model.enterpriseCode" :props="props" @change="$refs.elcascader.dropDownVisible = false" ref="elcascader" expand-trigger="hover" style="width:100%;"> </el-cascader> -->
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType == 99 && !ischild" label="独立签署主题" prop="contractName">
                                    <el-input placeholder="请输入独立签署任务主题" v-model="indepentModel.contractName"></el-input>
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType == 99 && !ischild" label="发起时间">
                                    <date-range-picker
                                        v-model="indepentModel.initTimes"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        class="date-item"
                                    />
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType == 99 && !ischild" label="截止时间" prop="deadLine">
                                    <date-range-picker
                                        v-model="indepentModel.deadTimes"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        class="date-item"
                                    />
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType == 99 && ischild" label="子任务主题" prop="contractName">
                                    <el-input placeholder="请输入子任务主题" v-model="model.contractName"></el-input>
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType == 99 && ischild" label="子任务状态" prop="status">
                                    <div class="statusbox">
                                        <div
                                            v-for="(item, index) in statusList"
                                            :class="{ active: model.statusList.includes(item.status) }"
                                            :key="item.status"
                                            @click="statusClickHandle(item)"
                                        >
                                            {{ item.name }}
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item v-if="model.fileStatusType == 99 && ischild" label="当前节点签署方" prop="signer">
                                    <el-input placeholder="请输入姓名/企业名称/联系方式" v-model="model.signer"></el-input>
                                </el-form-item>
                                <div class="herderFlexFooter">
                                    <el-button @click="doSearch((model.pageNum = 1))" type="primary">搜索</el-button>
                                    <el-button @click="resetForm('agform')">重置</el-button>
                                </div>
                            </el-form>
                        </div>
                    </el-card>

                    <el-card class="bg-white margin-top-xs">
                        <div class="margin-bottom-lg">
                            <span v-if="model.fileStatusType != 1" class="margin-right-lg">已选择 {{ selections.length | 0 }} 条记录</span>
                            <el-button
                                v-if="[2, 3].includes(model.fileStatusType) || ischild"
                                :disabled="selections.length == 0"
                                @click="multiHandle('cui')"
                                >催办</el-button
                            >
                            <el-button
                                v-if="[2, 3].includes(model.fileStatusType) || ischild"
                                :disabled="selections.length == 0"
                                @click="multiHandle('che')"
                                >撤销</el-button
                            >
                            <el-button
                                v-if="[3, 4, 5, 6, 7].includes(model.fileStatusType) || ischild"
                                :disabled="selections.length == 0"
                                @click="multiHandle('xia')"
                                >下载</el-button
                            >
                            <el-button v-if="model.fileStatusType == 6" :disabled="selections.length == 0" @click="multiHandle('cun')"
                                >转存</el-button
                            >
                            <el-button
                                v-if="[0, 3, 4, 7].includes(model.fileStatusType)"
                                :disabled="selections.length == 0"
                                @click="multiHandle('shan')"
                                >删除</el-button
                            >

                            <el-button v-if="ischild" type="primary" class="fr" @click="backMain">返回主任务</el-button>
                        </div>
                        <el-table
                            ref="table"
                            class="nobgtable"
                            v-loading="loading"
                            :data="list"
                            style="width: 100%"
                            @selection-change="selectionChangeHandler"
                        >
                            <!-- <el-table-column
                type="selection"
                width="55"
                 align="center"
                >
              </el-table-column> -->
                            <el-table-column
                                v-if="model.fileStatusType != 99"
                                prop="contractName"
                                label="主题"
                                width="200px"
                                :show-overflow-tooltip="true"
                            />
                            <el-table-column
                                v-if="model.fileStatusType == 99 && !ischild"
                                prop="contractName"
                                label="独立签署主题"
                                :show-overflow-tooltip="true"
                            />
                            <el-table-column
                                v-if="model.fileStatusType == 99 && ischild"
                                prop="contractName"
                                label="子任务主题"
                                :show-overflow-tooltip="true"
                            />
                            <el-table-column
                                v-if="model.fileStatusType != 0 && model.fileStatusType != 99"
                                prop="initiatorName"
                                label="发起方"
                            />
                            <el-table-column
                                v-if="model.fileStatusType != 0 && model.fileStatusType != 99"
                                prop="signer"
                                label="签署方"
                                :show-overflow-tooltip="true"
                                width="150px"
                            />
                            <el-table-column
                                v-if="model.fileStatusType != 0 && !ischild"
                                prop="initiatorTime"
                                label="发起时间"
                                sortable
                                width="150px"
                            />
                            <el-table-column v-if="model.fileStatusType != 0 && model.fileStatusType != 99" prop="status" label="文件状态">
                                <template slot-scope="scope">
                                    <el-tag type="info" v-if="scope.row.status == 0">草稿</el-tag>
                                    <el-tag v-if="scope.row.status == 1">签署中</el-tag>
                                    <el-tag type="success" v-if="scope.row.status == 10">已完成</el-tag>
                                    <el-tag v-if="scope.row.status == 3">已撤销</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 4">已拒签</el-tag>
                                    <el-tag type="warning" v-if="scope.row.status == 2">已逾期</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 6">解约中</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 7">部分解约</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 8">已解约</el-tag>
                                    <el-tag v-if="scope.row.status == 11">审批中</el-tag>
                                    <el-tag v-if="scope.row.status == 12">审批驳回</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="model.fileStatusType == 99 && !ischild" label="任务进度" width="150px">
                                <template slot="header" slot-scope="scope">
                                    任务进度
                                    <el-tooltip effect="dark" content="已完成子任务数/子任务总数" placement="top">
                                        <i class="el-icon-warning-outline"></i>
                                    </el-tooltip>
                                </template>
                                <template slot-scope="scope"> {{ scope.row.childTaskFinishSum }}/{{ scope.row.taskSum }} </template>
                            </el-table-column>
                            <!-- <el-table-column  prop="remark" label="备注" width="150px" :show-overflow-tooltip="true"/> -->
                            <el-table-column
                                v-if="model.fileStatusType == 99 && ischild"
                                prop="name"
                                label="当前节点签署方"
                                :show-overflow-tooltip="true"
                            />
                            <el-table-column
                                v-if="(model.fileStatusType != 0 && model.fileStatusType != 99) || ischild"
                                prop="signTime"
                                label="签署完成时间"
                                sortable
                                width="150px"
                            />
                            <el-table-column v-if="model.fileStatusType == 99 && ischild" label="子任务状态" width="150px">
                                <template slot-scope="scope">
                                    <el-tag type="info" v-if="scope.row.status == 0">草稿</el-tag>
                                    <el-tag v-if="scope.row.status == 1">签署中</el-tag>
                                    <el-tag type="success" v-if="scope.row.status == 10">已完成</el-tag>
                                    <el-tag v-if="scope.row.status == 3">已撤销</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 4">已拒签</el-tag>
                                    <el-tag type="warning" v-if="scope.row.status == 2">已逾期</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 6">解约中</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 7">部分解约</el-tag>
                                    <el-tag type="danger" v-if="scope.row.status == 8">已解约</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-if="model.fileStatusType != 0 && !ischild"
                                prop="deadLine"
                                label="截止时间"
                                sortable
                                width="150px"
                            />
                            <el-table-column
                                v-if="model.fileStatusType == 0 && model.fileStatusType != 99"
                                prop="createTime"
                                label="创建时间"
                            />
                            <el-table-column
                                v-if="model.fileStatusType == 0 && model.fileStatusType != 99"
                                prop="updateTime"
                                label="最近操作时间"
                            />
                            <el-table-column label="操作" width="150px" align="center" fixed="right">
                                <template slot-scope="scope">
                                    <el-button
                                        v-if="model.fileStatusType == 1 && model.signType == '1'"
                                        type="text"
                                        size="mini"
                                        @click="sign(scope.row, 1)"
                                        >签署</el-button
                                    >
                                    <el-button
                                        v-if="model.fileStatusType == 1 && model.signType == '11'"
                                        type="text"
                                        size="mini"
                                        @click="sign(scope.row, 1)"
                                        >审批</el-button
                                    >
                                    <el-button v-if="scope.row.status == 0" type="text" size="mini" @click="edit(scope.row, 1)"
                                        >编辑</el-button
                                    >

                                    <el-button
                                        v-if="
                                            (model.fileStatusType != 1 && model.fileStatusType != 0) || (ischild && scope.row.status == 10)
                                        "
                                        type="text"
                                        size="mini"
                                        @click="views(scope.row, 1)"
                                        >查看<span v-if="model.fileStatusType == 99 && ischild == false">子任务详情</span></el-button
                                    >
                                    <el-button
                                        type="text"
                                        size="mini"
                                        v-if="ischild && scope.row.status == 1"
                                        @click="urgeContract(scope.row)"
                                        >催办</el-button
                                    >
                                    <el-button
                                        type="text"
                                        size="mini"
                                        v-if="ischild && scope.row.status == 1"
                                        @click="withoutContract(scope.row)"
                                        >撤销</el-button
                                    >
                                    <el-button
                                        type="text"
                                        size="mini"
                                        v-if="ischild && scope.row.status == 10"
                                        @click="storageStatus(scope.row, 2)"
                                        >下载</el-button
                                    >

                                    <!-- <el-button v-if="scope.row.status==2||scope.row.status==3||scope.row.status==4||scope.row.status==5" type="text" size="mini" @click="views(scope.row,2)">查看 </el-button> -->
                                    <el-dropdown
                                        @command="handleCommand"
                                        v-if="
                                            !(model.fileStatusType == 2 && scope.row.initiatorUid != userInfo.loginId) &&
                                            !ischild &&
                                            !(model.fileStatusType == 1 && model.signType == '11')
                                        "
                                    >
                                        <span class="el-dropdown-link">| <i class="el-icon-more" style="cursor: pointer"></i> </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="model.fileStatusType == 1 && model.signType == '1'"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'reject')"
                                                >拒签</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="
                                                    (scope.row.status == 11) &&
                                                        (scope.row.initiatorUid == userInfo.loginId) ||
                                                    model.fileStatusType == 99
                                                "
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'urge')"
                                                >催办</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="
                                                    (scope.row.status == 11) &&
                                                        (scope.row.initiatorUid == userInfo.loginId) ||
                                                    model.fileStatusType == 99
                                                "
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'revoke')"
                                                >撤销</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="[2, 4, 6, 7, 8, 10, 12].includes(scope.row.status) || model.fileStatusType == 99"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'down')"
                                                >下载</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="scope.row.status == 10"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'save')"
                                                >转存</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="[6, 7, 10].includes(scope.row.status)"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'cancel')"
                                                >解约</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="scope.row.status == 10"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'continue')"
                                                >续签</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="scope.row.status == 0"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'edit')"
                                                >编辑</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="dropdownbtn"
                                                v-if="[0, 2, 3, 4, 12].includes(scope.row.status)"
                                                :command="beforeHandleCommand(scope.$index, scope.row, 'del')"
                                                >删除</el-dropdown-item
                                            >
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <!-- <el-button  v-if="scope.row.status==2&&scope.row.isMine==1"  type="text" size="mini" @click="urgeContract(scope.row)">催办</el-button>
                        <el-button v-if="scope.row.status==2&&scope.row.isMine==1" type="text" size="mini" @click="withoutContract(scope.row)">撤销</el-button>
                        <el-button v-if="scope.row.status==0&&scope.row.isMine==1" type="text" size="mini" @click="del(scope.row)">删除</el-button>
                        
                        <el-button v-if="scope.row.status==0"  type="text" size="mini" @click="edit(scope.row,1)">编辑</el-button>
                        <el-button v-if="scope.row.status!=0" type="text" size="mini" @click="views(scope.row,2)">查看详情</el-button>
                        <el-button v-if="scope.row.status==10&&scope.row.isStorage==0" type="text" size="mini" @click="storageStatus(scope.row,1)">一键转存</el-button>
                         <el-button v-if="scope.row.status==10&&scope.row.isStorage==1" type="text" size="mini" @click="storageStatus(scope.row,2)">一键下载</el-button>     -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            :current-page.sync="model.pageNum"
                            background
                            layout="total,prev, pager,sizes, next,jumper"
                            :total="pageTotal"
                            :page-size="model.pageSize"
                            @current-change="doSearch"
                        >
                        </el-pagination>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="温馨提示" :visible.sync="visibleHe" v-dialogDrag width="500px" :before-close="handleClose">
            <div class="text-center">
                <span class="shadow -black" style="display: inline-block; padding: 10px">
                    <el-image style="width: 200px; height: 200px" class="" :src="imageUrl" fit="contain"></el-image>
                </span>
                <p class="margin-top text-gray"><i class="el-icon-warning-outline text-red"></i>您暂无和彩云账户，请扫码完成注册</p>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleHe = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="请选择拒签原因" :visible.sync="visibleRefuse" v-dialogDrag width="400px">
            <div>
                <div class="margin-bottom-lg">
                    <el-radio v-model="refuseRadio" label="1">文件内容有异议</el-radio>
                </div>
                <div class="margin-bottom-lg">
                    <el-radio v-model="refuseRadio" label="2">不知道如何操作</el-radio>
                </div>
                <div class="margin-bottom-lg">
                    <el-radio v-model="refuseRadio" label="3">其他</el-radio>
                </div>
                <el-input
                    v-if="refuseRadio == 3"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入拒签原因(必须填写)"
                    maxlength="200"
                    show-word-limit
                    v-model="refuseObj.refuseReason"
                >
                </el-input>
            </div>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleRefuse = false">取 消</el-button>

                <el-button
                    type="primary"
                    :disabled="refuseRadio == 3 ? (refuseObj.refuseReason.length > 0 ? false : true) : refuseRadio == ''"
                    @click="doRefuse()"
                    >拒签</el-button
                >
            </div>
        </el-dialog>
        <hecaiyunauth-code
            :random="random"
            :visible="visibleCode"
            :phone="realPhone"
            @closepop="closepop"
            @toNext="toNext"
            :verifyTag="true"
        ></hecaiyunauth-code>
    </div>
</template>

<script>
import DateRangePicker from '../../common/DateRangePicker';
import Treeselect from '@riophae/vue-treeselect';
import { getDentify, getToken } from '@/utils/auth';
import HecaiyunauthCode from '../../common/hecaiyunauthCode';
import {
    contractList,
    urgeContract,
    deleteContract,
    withoutContract,
    refuseSign,
    independentSignList,
    independentDetailList
} from '../../../api/contract.js';
import { heGetSmsCode, heVerifySmsCode, heUpload, heDownload, isHeLogin, isHeToken, newDownload } from '../../../api/storage.js';
export default {
    components: { DateRangePicker, Treeselect, HecaiyunauthCode },
    data() {
        return {
            deptName: '',
            visibleHe: false,
            visibleCode: false,
            visibleRefuse: false,
            refuseObj: {
                refuseReason: '',
                id: ''
            },
            dentify: {},
            loading: false,
            selections: [],
            list: [],
            random: '',
            disabled: false,
            ischild: false, //是否为独立签署的子任务
            titleList: [
                {
                    name: '待我处理',
                    icon: require('../../../assets/img/file/1.png'),
                    status: '1',
                    list: [
                        {
                            name: '签署中',
                            status: '1'
                        }
                    ]
                },
                {
                    name: '待他人处理',
                    icon: require('../../../assets/img/file/2.png'),
                    status: '2',
                    list: [
                        {
                            name: '签署中',
                            status: '1'
                        }
                    ]
                },
                {
                    name: '我发起的',
                    icon: require('../../../assets/img/file/3.png'),
                    status: '3',
                    list: [
                        {
                            name: '签署中',
                            status: '1'
                        },
                        {
                            name: '已完成',
                            status: '10'
                        },
                        {
                            name: '已撤销',
                            status: '3'
                        },
                        {
                            name: '已拒签',
                            status: '4'
                        },
                        {
                            name: '已逾期',
                            status: '2'
                        },
                        {
                            name: '解约中',
                            status: '6'
                        },
                        {
                            name: '部分解约',
                            status: '7'
                        },
                        {
                            name: '已解约',
                            status: '8'
                        },
                        {
                            name: '审批中',
                            status: '11'
                        },
                        {
                            name: '审批驳回',
                            status: '12'
                        }
                    ]
                },
                {
                    name: '独立签署',
                    icon: require('../../../assets/img/file/2.png'),
                    status: '99',
                    list: [
                        {
                            name: '签署中',
                            status: '1'
                        },
                        {
                            name: '已完成',
                            status: '10'
                        },
                        {
                            name: '已撤销',
                            status: '3'
                        },
                        {
                            name: '已拒签',
                            status: '4'
                        },
                        {
                            name: '已逾期',
                            status: '2'
                        },
                        {
                            name: '解约中',
                            status: '6'
                        },
                        {
                            name: '部分解约',
                            status: '7'
                        },
                        {
                            name: '已解约',
                            status: '8'
                        }
                    ]
                },
                {
                    name: '我收到的',
                    icon: require('../../../assets/img/file/4.png'),
                    status: '4',
                    list: [
                        {
                            name: '签署中',
                            status: '1'
                        },
                        {
                            name: '已完成',
                            status: '10'
                        },
                        {
                            name: '已撤销',
                            status: '3'
                        },
                        {
                            name: '已拒签',
                            status: '4'
                        },
                        {
                            name: '已逾期',
                            status: '2'
                        },
                        {
                            name: '解约中',
                            status: '6'
                        },
                        {
                            name: '部分解约',
                            status: '7'
                        },
                        {
                            name: '已解约',
                            status: '8'
                        },
                        {
                            name: '审批中',
                            status: '11'
                        },
                        {
                            name: '审批驳回',
                            status: '12'
                        }
                    ]
                },
                {
                    name: '抄送我的',
                    icon: require('../../../assets/img/file/5.png'),
                    status: '5',
                    list: [
                        {
                            name: '已完成',
                            status: '10'
                        }
                    ]
                },
                {
                    name: '签署完成',
                    icon: require('../../../assets/img/file/6.png'),
                    status: '6',
                    list: [
                        {
                            name: '已完成',
                            status: '10'
                        }
                    ]
                },
                {
                    name: '签署失效',
                    icon: require('../../../assets/img/file/7.png'),
                    status: '7',
                    list: [
                        {
                            name: '已撤销',
                            status: '3'
                        },
                        {
                            name: '已拒签',
                            status: '4'
                        },
                        {
                            name: '已逾期',
                            status: '2'
                        },
                        {
                            name: '审批驳回',
                            status: '12'
                        }
                    ]
                },
                {
                    name: '草稿箱',
                    icon: require('../../../assets/img/file/8.png'),
                    status: '0',
                    list: []
                }
            ],
            statusList: [
                {
                    name: '签署中',
                    status: '1'
                }
            ],
            // model.statusList:[],
            buttonicon: require('../../../assets/img/file/buttonicon.png'),
            imageUrl: require('../../../assets/img/hecaiy.png'),
            roleList: [
                { id: 1, name: '管理员' },
                { id: 2, name: '管理员3' },
                { id: 3, name: '管理员4' }
            ],
            heAccesstoken: '',
            titleActive: this.$router.currentRoute.query.active,
            model: {
                contractName: '',
                enterpriseCode: '',
                initiator: '',
                // status: '',
                fileStatusType: 1,
                statusList: [],
                times: '',
                startTime: '',
                endTime: '',
                signer: '',
                pageNum: 1,
                pageSize: 10,
                signType: '1'
            },
            indepentModel: {
                deadTimes: '',
                initTimes: '',
                contractName: '',
                initiatorTimeStart: '',
                initiatorTimeEnd: '',
                deadLineStart: '',
                deadLineEnd: '',
                accessToken: getToken()
            },
            indepentDetail: {
                parentNo: '',
                contractName: '',
                status: '',
                name: '' //参与方
            },
            pageTotal: 0,
            realPhone: '',
            userInfo: {},
            heTag: 0,
            refuseRadio: '',
            meorhe: '我'
        };
    },
    methods: {
        doAdd() {},
        multiHandle(type) {
            console.log(type);
            let tempstr = '';
            switch (type) {
                case 'cui':
                    tempstr = '催办';
                    break;
                case 'xia':
                    tempstr = '下载';
                    break;
                case 'cun':
                    tempstr = '转存';
                    break;
                case 'che':
                    tempstr = '撤销';
                    break;
                case 'shan':
                    tempstr = '删除';
                    break;
            }
            this.$confirm(
                '你有' + this.selections.length + '个文档任务可批量' + tempstr + '，确定要批量' + tempstr + '吗?',
                tempstr + this.selections.length + '份文档',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            )
                .then(async () => {
                    switch (type) {
                        case 'cui':
                            // tempstr = '催办'
                            let cuis = this.selections.map((item) => {
                                return item.contractNo;
                            });
                            urgeContract({ contractNos: cuis }).then(() => {
                                this.doSearch(1);
                            });
                            break;
                        case 'xia':
                            // tempstr = '下载'
                            let xias = this.selections.map((item) => {
                                return item.contractNo;
                            });
                            xias = xias.join(',');
                            newDownload({ contractNo: xias }).then((res) => {
                                // this.doSearch()
                            });
                            break;
                        case 'cun':
                            // tempstr = '转存'
                            this.savetoHeCaiYun();
                            break;
                        case 'che':
                            // tempstr = '撤销'
                            let ches = this.selections.map((item) => {
                                return item.contractNo;
                            });
                            withoutContract({ contractNos: ches }).then((res) => {
                                this.doSearch(1);
                            });
                            break;
                        case 'shan':
                            // tempstr = '删除'
                            let contractNos = this.selections.map((item) => {
                                return item.contractNo;
                            });
                            let { data } = await deleteContract({ contractNos: contractNos });
                            this.doSearch(1);
                            break;
                    }
                    if (tempstr != '转存') {
                        this.$message({
                            type: 'success',
                            message: tempstr + '成功!'
                        });
                    }
                })
                .catch(() => {});
        },
        getinfo(tag) {
            this.$store.dispatch('GetInfo', tag).then((res) => {
                this.userInfo = res;
                this.realPhone = res.realPhone;
                console.log(this.userInfo);
            });
        },
        edit(row, type) {
            // this.$store.dispatch('setContId', row.contractNo);
            // this.$store.dispatch('setTempId', "");
            // this.$store.dispatch('setTempType', type);
            if (type == 2) {
                this.$router.push({
                    path: '/contract/newContract',
                    query: {
                        contId: row.contractNo,
                        tempId: '',
                        tempType: type,
                        myname:'contract'
                    }
                });
            } else {
                this.$router.push({
                    path: '/contract/newContract',
                    query: {
                        contId: row.contractNo,
                        tempId: '',
                        tempType: type,
                        myname:'contract'
                    }
                });
            }
        },
        async withoutContract(row) {
            this.$confirm('撤销的文件对方无法继续签署，是否继续？', '温馨提示', {
                confirmButtonText: '继续撤销',
                cancelButtonText: '取消'
            })
                .then(async () => {
                    if (this.ischild) {
                        let { data } = await withoutContract({ contractNos: [], parentNo: row.parentNo });
                    } else {
                        let { data } = await withoutContract({ contractNos: [row.contractNo] });
                    }

                    this.$message.success('撤销成功');
                    this.doSearch(1);
                })
                .catch(() => {});
        },
        async urgeContract(row) {
            let { data } = await urgeContract({ contractNos: [row.contractNo] });
            this.$message.success('催办成功');
        },
        sign(row, type) {
            // this.$store.dispatch('setContId', row.contractNo);
            // this.$store.dispatch('setTempId', "");
            // this.$store.dispatch('setTempType', type);
            this.$router.push({
                path: '/contract/signContract',
                query: {
                    contId: row.contractNo,
                    tempId: '',
                    tempType: type
                }
            });
        },
        backMain() {
            this.ischild = false;
            this.doSearch();
        },
        async views(row, type) {
            if (this.model.fileStatusType == 99) {
                //独立签署
             
                if (!this.ischild) {
                    this.ischild = true;
                    // this.indepentDetail.contractNo = row.contractNo
                    this.indepentDetail.parentNo = row.parentNo;
                    this.doSearch();
                } else {
                    this.$router.push({
                        path: '/contract/signContract',
                        query: {
                            contId: row.contractNo,
                            tempId: '',
                            tempType: type
                        }
                    });
                }
            } else {
                // this.$store.dispatch('setContId', row.contractNo);
                // this.$store.dispatch('setTempId', "");
                // this.$store.dispatch('setTempType', type);
                if (type == 1) {
                    this.$router.push({
                        path: '/contract/signContract',
                        query: {
                            contId: row.contractNo,
                            tempId: '',
                            tempType: type
                        }
                    });
                } else {
                    this.$router.push({
                        path: '/contract/signContract',
                        query: {
                            contId: row.contractNo,
                            tempId: '',
                            tempType: type
                        }
                    });
                }
            }
        },
        async storageStatus(row, type) {
            console.log(row);
            this.heObj = {
                tag: 1, //cun
                contractNo: row.contractNo
            };

            let { data } = await isHeLogin();
            console.log(data);
            if (data.code == 51002) {
                //未注册
                this.visibleHe = true;
            } else if (data.code == 200) {
                //登陆失败或转存失败
                // let {data} =  await isHeToken();
                // if(data.code==51001){//登陆过期
                //   this.visibleCode = true;
                //   this.random = data.random
                // }if(data.code==200){//登陆失败或转存失败
                if (data.random) {
                    this.visibleCode = true;
                    this.random = data.random;
                } else {
                    this.heAccesstoken = data.accessToken;
                    if (type == 1) {
                        this.storage(row);
                    } else {
                        this.storageDown(row);
                    }
                }
                // }
            }
        },
        async storage(list) {
            let { data } = await heUpload({ contractNos: this.heObj.contractNos });
            if (data) {
                this.$message.error(data.message);
            } else {
                this.$message.success('转存成功');
                this.visibleCode = false;
                this.doSearch();
            }
        },
        async storageDown(row) {
            let { data } = await newDownload({ contractNo: row.contractNo });
            this.visibleCode = false;
        },
        async del(row) {
            this.$confirm('确认删除合同?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    let { data } = await deleteContract({ contractNos: [row.contractNo] });
                    this.$message.success('删除成功');
                    this.doSearch(1);
                })
                .catch(() => {});
        },
        netType(index, item) {
            this.$router.push({
                path: this.$router.path,
                query: {
                    active: index
                }
            });
            this.titleActive = index;
            this.ischild = false;
            if (index == 0) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
            // this.model.status=item.status;
            this.model.fileStatusType = parseInt(item.status);
            if (item.status == 1) {
                this.meorhe = '我';
                this.model.signType = '1';
            } else if (item.status == 2) {
                this.meorhe = 'TA';
                this.model.signType = '1';
            } else {
                this.model.signType = '';
            }
            this.statusList = item.list;
            this.model.statusList = [];
            this.doSearch(1);
        },
        async doSearch(value) {
            if (this.model.fileStatusType == 99) {
                if (this.ischild) {
                    independentDetailList(this.indepentDetail).then((res) => {
                        this.list = res.data.list;
                        this.pageTotal = res.data.total;
                    });
                } else {
                    if (this.indepentModel.initTimes.length > 1) {
                        this.indepentModel.initiatorTimeStart = this.indepentModel.initTimes[0];
                        this.indepentModel.initiatorTimeEnd = this.indepentModel.initTimes[1];
                    }
                    if (this.indepentModel.deadTimes.length > 1) {
                        this.indepentModel.deadLineStart = this.indepentModel.deadTimes[0];
                        this.indepentModel.deadLineEnd = this.indepentModel.deadTimes[1];
                    }
                    this.indepentModel.accessToken = getToken();
                    independentSignList(this.indepentModel).then((res) => {
                        this.list = res.data.list;
                        this.pageTotal = res.data.total;
                    });
                }
            } else {
                // contractList
                value ? (this.model.pageNum = value) : (this.model.pageNum = 1);
                if (this.model.times) {
                    this.model.startTime = this.model.times[0];
                    this.model.endTime = this.model.times[1];
                }
                contractList(this.model).then((res) => {
                    this.list = res.data.list;
                    this.pageTotal = res.data.total;
                });
            }
        },
        checkboxT(row, rowIndex) {
            return row.id !== 1;
        },
        selectionChangeHandler(val) {
            this.selections = val;
        },
        handleNodeClick(data) {
            console.log(data);
        },
        useInfo() {
            // this.$store.dispatch('setContId', "");
            // this.$store.dispatch('setTempId', "");
            // this.$store.dispatch('setTempType', 0);
            this.$router.push({
                path: '/contract/newContract',
                query: {
                    contId: '',
                    tempId: '',
                    tempType: 0,
                    myname:'contract'
                }
            });
        },
        useTemp() {
            this.$router.push({ path: '/template' });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.model.statusList = [];
        },
        closepop(visible) {
            this[visible] = false;
        },
        toNext(data) {
            console.log(data, '返回data');
            this.heObj.token = data.accessToken;
            if (this.heObj.tag == 1) {
                this.storage(this.heObj);
            } else if (this.heObj.tag == 2) {
                this.storageDown(this.heObj);
            }
        },
        statusClickHandle(obj) {
            let num = this.model.statusList.indexOf(obj.status);
            if (num >= 0) {
                this.model.statusList.splice(num, 1);
            } else {
                this.model.statusList.push(obj.status);
            }
        },
        beforeHandleCommand(index, row, command) {
            return {
                index: index,
                row: row,
                command: command
            };
        },
        handleCommand(command) {
            switch (command.command) {
                case 'reject': //拒签
                    this.Refuse(command.row);
                    break;
                case 'urge': //催办
                    this.urgeContract(command.row);
                    break;
                case 'revoke': //撤销
                    this.withoutContract(command.row);
                    break;
                case 'down': //下载
                    this.storageStatus(command.row, 2);
                    break;
                case 'save': //转存
                    // this.storageStatus(command.row,1);
                    this.savetoHeCaiYun(command.row);
                    break;
                case 'cancel': //解约
                    break;
                case 'continue': //续签
                    break;
                case 'edit': //编辑
                    this.edit(command.row, 1);
                    break;
                case 'del': //删除
                    this.del(command.row);
                    break;
            }
        },
        async savetoHeCaiYun(row) {
            console.log(row);
            if (row && row.contractNo) {
                // this.heObj.contractNos =[row.contractNo]
                this.heObj = {
                    tag: 1, //cun
                    contractNos: [row.contractNo]
                };
            } else {
                // let templist = []
                // this.selections.map((item)=>{
                //   templist.push(item.contractNo)
                // })
                let cuns = this.selections.map((item) => {
                    return item.contractNo;
                });
                this.heObj = {
                    tag: 1, //cun
                    contractNos: cuns
                };
            }
            let { data } = await isHeLogin();
            console.log(data);
            if (data.accesstoken) {
                console.log(123);
                this.storage();
            } else {
                this.visibleCode = true;
            }
        },
        Refuse(row) {
            this.refuseObj.id = row.id;
            this.visibleRefuse = true;
        },
        doRefuse() {
            refuseSign(this.refuseObj).then((res) => {
                // this.doSearch()
                this.visibleRefuse = false;
                this.doSearch();
            });
        },
        switchclick() {
            if (this.model.signType == 1) {
                this.statusList = [
                    {
                        name: '签署中',
                        status: '1'
                    }
                ];
            } else if (this.model.signType == 11) {
                this.statusList = [
                    {
                        name: '审批中',
                        status: '11'
                    }
                ];
            }
            this.doSearch();
        }
    },
    created() {
        this.getinfo();
    },
    mounted() {
        if (this.$route.params && this.$route.params.status) {
            this.model.fileStatusType = this.$route.params.status;
            this.titleActive = this.titleList.findIndex((item) => item.status == this.model.fileStatusType);
            console.log(this.titleActive, 'this.titleActive');
        }
        this.dentify = getDentify();
        this.doSearch();
    }
};
</script>
<style lang="less" >
.leftcard {
    .el-card__body {
        padding: 0;
    }
    .title-ul {
        width: 100%;
        margin-top: 25px;
        li {
            width: 70%;
            padding: 0 15%;
            height: 45px;
            line-height: 45px;
            margin: 0 auto;
            cursor: pointer;
            overflow: hidden;
            .el-image {
                float: left;
                margin-right: 10px;
                margin-top: 15px;
            }
        }
        .active {
            color: #175bec;
            font-weight: 700;
            background: #e2edff;
            .el-image {
                filter: drop-shadow(#175bec 100px 0);
                left: -100px;
            }
        }
    }
}
.date-item {
    width: 280px !important;
}
.statusbox {
    div {
        float: left;
        // width: 60px;
        padding: 0 10px;
        height: 30px;
        color: #333;
        border: 1px solid rgba(232, 232, 232, 1);
        border-radius: 2px;
        margin-right: 10px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        &.active {
            background: #e2edff;
            border-color: #e2edff;
            color: #1257ff;
        }
    }
}
.herderFlexFooter {
    float: right;
    .el-button {
        font-size: 14px;
    }
}
.nobgtable /deep/ .el-table tr {
    background: none;
}
.el-pagination {
    margin-top: 20px;
    text-align: right;
}
</style>