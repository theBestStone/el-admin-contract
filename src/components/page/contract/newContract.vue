<!--  -->
<template>
    <div class="">
        <div class="cf sign-header">
            <div class="sign-left" @click="back"><i class="el-icon-close"></i>关闭</div>
            <div class="sign-center text-center ag-steps">
                <div class="steps-item">
                    <i class="steps-num steps-num-active el-icon-check"></i><span class="steps-title-active">签署设置</span>
                </div>
                <i class="steps-line"></i>
                <div class="steps-item"><i class="steps-num">2</i><span class="steps-title">指定签署位置</span></div>
                <i class="steps-line"></i>
                <div class="steps-item"><i class="steps-num">3</i><span class="steps-title">发起确认</span></div>
            </div>
            <div class="sign-right">
                <el-button @click="beforAdd(0)" v-if="type != -1">保存</el-button>
                <el-button @click="beforAdd(1)"  type="primary">下一步</el-button>
                <!-- v-if="model.isTemplate != 1" -->
            </div>
        </div>
        <div class="content90 sign-body">
            <el-form :inline="true" ref="agform" :model="model" :disabled="type == -1||model.isTemplate == 1 ">
            <!-- || type == 2 -->
                <el-card class="margin-top">
                    <div slot="header" class="clearfix text-xl">
                        <span>基本信息</span>
                    </div>

                    <el-form-item label="发起方" prop="initiatorName">
                        <el-input style="width: 400px" clear="el-input-style" :disabled="true" v-model="model.initiatorName"></el-input>
                    </el-form-item>
                    <el-form-item label="主题" label-width="200px" prop="contractName" verify contractName>
                        <el-input class="special-input" style="width: 400px;" v-model="model.contractName">
                            <template slot="append" style="background-color:#fff;">{{ model.contractName.length }}/{{ 50 }}</template>
                        </el-input>
                    </el-form-item>
                </el-card>
            </el-form>
            <el-card class="margin-top-sm">
                <div slot="header" class="clearfix text-xl">
                    <span>签署文档</span>
                    <div style="position: relative; top: 15px; font-size: 14px">
                        文档
                        <el-tooltip class="ag-tip" effect="dark" content="支持doc、docx、png、jpeg、jpg、pdf格式，文档大小不超过50M" placement="top-start">
                            <i class="el-icon-warning-outline" style="#959595"></i>
                        </el-tooltip>
                    </div>
                </div>
                <div>
                    <div class="signPdfList"> 
                        <div class="flex" style="align-items: center;flex-wrap: wrap;">
                            <div class="signPdf " v-for="(item, index) in list" :key="index">
                                <div class="flex">

                                    <div class="up-left">
                                        <img src="../../../assets/img/feature/pdf.png" alt="">
                                   
                                    </div>
                                    <div class="up-center"> 
                                        <div class="up-title">{{item.fileName}}</div>
                                        <div><span v-if="item.pages">共{{item.pages}}页</span><span style="margin-left:20px;" v-if="item.size">{{item.size|fileSize}} M</span></div></div>
                                    <div v-if="(sceneNo||model.contractStyle==2)&&list.length==1" style="width:80px;line-height: 76px;">
										<el-button @click="addElement(item,index)" type="primary">查看</el-button>
									</div>
                                    <div class="up-right"><i class="el-icon-view" @click="getPdfView(item)"></i><i v-if="model.isTemplate != 1" class="el-icon-delete" @click="delFile(index)"></i></div>
                                </div>
                                 <div ><el-progress v-if="item.status==0" style="height:3px;overflow: hidden;" :percentage="item.percentage" :color="'#7886c2'" :show-text="false"></el-progress></div>
                            </div>
                            <div style="width: 520px; height: 76px;margin:10px 10px 0 0">
                                <uploads
                                    v-if="type != 2"
                                    :type="3"
                                    @successAuth="successAuth"
                                    @errorAuth="errorAuth"
                                    @beforeUpload="beforeUpload"
                                    :fileList="list"
                                    :batchNo="batchNo"
                                    :fileType="['pdf','doc','docx','png','jpg','jpeg','PDF','DOC','DOCX','PNG','JPEG','JPG']"
                                    :btnTitle="'文件合同上传'"
                                    :btnType="'primary'"
                                >
                                </uploads>
                            </div>
                        </div>
                    </div>
                    <!-- list -->
                </div>
            </el-card>

            <el-card class="margin-top-sm">
                <div slot="header" class="clearfix text-xl">
                    <span>签署流程</span>
                </div>
                <div>
                    <div class="cf">
                        <el-radio-group style="width: 100%" v-model="model.signProcess" :disabled="type == -1 || type == 2" @change="signMean">
                            <el-radio :label="0" border
                                >共同签署<el-tooltip
                                    class="ag-tip"
                                    effect="dark"
                                    content="共同签署是指多个人在同一文件进行签署，最多支持200人"
                                    placement="top-start"
                                >
                                    <i class="el-icon-warning-outline"></i> </el-tooltip
                            ></el-radio>
                            <el-radio :label="1" border
                                >独立签署<el-tooltip
                                    class="ag-tip"
                                    effect="dark"
                                    content="独立签署是指每一个人单独签署一份文件"
                                    placement="top-start"
                                >
                                    <i class="el-icon-warning-outline"></i> </el-tooltip
                            ></el-radio>
                            <div style="float: right">
                                <el-switch style="position: relative; top: -5px" v-model="model.signType" :disabled="model.signProcess==1||model.isTemplate == 1" @change="sortChange"  inactive-text="顺序签署">
                                </el-switch>
                                <el-tooltip
                                    class="ag-tip"
                                    effect="dark"
                                    content="顺序签开启后，所有签署方将按照设置 "
                                    placement="top-start"
                                >
                                    <i style="font-size: 14px; line-height: 30px" class="el-icon-warning-outline"></i>
                                </el-tooltip>
                            </div>
                        </el-radio-group>
                    </div>
                    <div style="display: flex;margin-top: 24px;" class="draggable verify-table">
                        <el-form :inline="true" style="width:100%;" ref="agform-send" :model="this" :disabled="type == -1 ">
                            <el-table :data="sendArr" label="签署" row-key="uuid" style="width: 100%;">
                                <el-table-column prop="index" label="签署" width="60">
                                    <template slot-scope="scope">
                                        <div class="text-center">
                                            <span v-if="!model.signType" class="sign-sort"></span>
                                            <span v-if="model.signType" class="sign-sort-active">{{ scope.$index + 1 }}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="主体" width="150">
                                    <template slot-scope="scope">
                                        <i v-if="model.signType" class="el-icon-sort" style="cursor:move;font-size:20px;"></i>
                                        <el-select
                                            style="display:inline-block;width:100px;margin:0 5px;"
                                            
                                            @change="changeArr($event, { key: 'type', list: 'sendArr', index: scope.$index })"
                                            v-model="scope.row.type"
                                            :disabled="scope.row.requirement==1"
                                            placeholder="请选择"
                                        >
                                        <!-- !scope.row.orgName -->
                                            <el-option label="个人" :value="1"></el-option>
                                            <el-option label="企业" :value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="参与方" width="540" prop="account">
                                    <template slot-scope="scope">
                                        <el-form-item style="width:100px;margin-right:10px" :prop="'sendArr.'+ scope.$index + '.name'"  verify :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr'})" :watch="sendArr" empty-message="请输入姓名">
                                            <el-input
                                                @input="changeArr($event, { key: 'name', list: 'sendArr', index: scope.$index })"
                                                v-model="scope.row.name"
                                                placeholder="请输入姓名"
                                                :disabled="scope.row.requirement==1"
                                                 
                                            ></el-input
                                        ></el-form-item>

                                        <el-form-item style="width:180px;margin-right:10px" :prop="'sendArr.'+ scope.$index + '.account'" verify agphone  :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr'})" :watch="sendArr" empty-message="请输入手机号">
                                            <el-input
                                                @input="changeArr($event, { key: 'account', list: 'sendArr', index: scope.$index })"
                                                v-model="scope.row.account"
                                                placeholder="请输入手机号"
                                                :disabled="scope.row.requirement==1"
                                            ><el-button v-if="scope.row.requirement!=1" slot="append" icon="el-icon-user-solid" @click="contsShow( scope.$index,'sendArr','one')"></el-button></el-input>
                                        </el-form-item>
                                        <el-form-item style="width:180px;" v-if="scope.row.type == 2"  :prop="'sendArr.'+ scope.$index + '.orgName'" verify :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr'})" :watch="sendArr" empty-message="请输入公司名称">
                                          <el-input
                                              v-model="scope.row.orgName"
                                              @input="changeArr($event, { key: 'orgName', list: 'sendArr', index: scope.$index })"
                                              
                                              placeholder="请输入公司名称"
                                              :disabled="scope.row.requirement==1"
                                                
                                          ></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="参与方式" width="150">
                                    <template slot-scope="scope">
                                        <el-select
                                            style="display:inline-block;width:100px;margin:0 5px;"
                                            @change="changeArr($event, { key: 'typeWay', list: 'sendArr', index: scope.$index })"
                                            v-model="scope.row.typeWay"
                                            placeholder="请选择"
                                            :disabled="!model.signType||scope.row.requirement==1"
                                        >
                                            <el-option label="签署" :value="0"></el-option>
                                            <el-option label="审批" :value="6"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="签署要求" prop="need" width="280">
                                    <template slot-scope="scope">
                                        <!-- <el-form-item :prop="'sendArr.'+ scope.$index + '.need'" nonnull> -->
                                           
                                            <el-radio-group
                                                @change="
                                                    label => {
                                                        changeArr(label, { key: 'need', list: 'sendArr', index: scope.$index });
                                                    }
                                                "
                                                v-if="scope.row.type == 1&&scope.row.typeWay==0"
                                                v-model="scope.row.need"
                                                :checked="scope.row.need"
                                                :disabled="scope.row.requirement==1"
                                            >
                                                <el-radio :label="0">不限</el-radio>
                                                <el-radio :label="7">手绘签名</el-radio>
                                                <el-radio :label="8">标准签名</el-radio>
                                            </el-radio-group>
                                            <el-checkbox-group
                                                @change="changeArr($event, { key: 'need', list: 'sendArr', index: scope.$index })"
                                                :checked="scope.row.need"
                                                v-if="scope.row.type == 2&&scope.row.typeWay==0"
                                                v-model="scope.row.need"
                                                :min="1"
                                                :disabled="scope.row.requirement==1"
                                            >
                                                <el-checkbox :key="1" :label="1">企业章</el-checkbox>
                                                <!-- <el-checkbox :key="0" :label="0">法人章</el-checkbox> -->
                                                <el-checkbox :key="0" :label="0">经办人签名</el-checkbox>
                                            </el-checkbox-group>
                                        <!-- </el-form-item> -->
                                    </template>
                                </el-table-column>
                                <el-table-column label="" width="40" v-if="model.isTemplate != 1"  fixed="right">
                                    <template slot-scope="scope">
                                        <i class="el-icon-delete" style="cursor:pointer" @click="delSend(scope.$index, 1)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form>
                    </div>
                  
                    <div class="margin-top-xl text-center" v-if="type != 2||model.isTemplate != 1">
                        <div class="add-SignUser-button" type="primary" @click="addSignUser(2, 'sendArr')">
                            <i class="el-icon-plus"></i>添加参与方
                        </div>
                        <div class="add-SignUser-button2" type="primary" @click="addSignUser(1, 'sendArr')">
                            <i class="el-icon-plus"></i>模板导入参与方
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="margin-top-sm card-foot">
                <div slot="header" class="clearfix text-xl">
                    <span>选填项设置</span>
                </div>
                <div>
                    <div>
                        <span class="select-left">签署截止日期
                            <el-tooltip
                                class="ag-tip"
                                effect="dark"
                                content="日期设置是指，如设置时间，在设置时间内未完成签署，则该份合同任务自动过期，需要重新发起"
                                placement="top-start"
                            >
                                <i class="el-icon-warning-outline"></i> </el-tooltip>
                                </span>
                        <el-date-picker v-model="model.deadLine" type="date" :picker-options="pickerOptions" value-format="yyyy-MM-dd" placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="margin-top-sm flex">
                        <span class="select-left">抄送方
                            <el-tooltip
                                class="ag-tip"
                                effect="dark"
                                content="抄送方不可签署，仅支持查阅"
                                placement="top-start"
                            >
                                <i class="el-icon-warning-outline"></i> </el-tooltip>

                        </span>

                        <div class="add-cs verify-table send2-table">
                        <el-form v-if="sendArr2.length>0" :inline="true" style="width:100%;margin-bottom:10px;" ref="agform-send2" :model="this" :disabled="type == -1 ">
                          
                            <el-table :data="sendArr2" label="签署" row-key="uuid" style="width: 100%;">
                                <el-table-column prop="type" label="主体" width="150">
                                    <template slot-scope="scope">
                                        <el-select
                                            
                                            style="display:inline-block;width:100px;margin:0 5px;"
                                            @change="changeArr($event, { key: 'type', list: 'sendArr2', index: scope.$index })"
                                            v-model="scope.row.type"
                                            placeholder="请选择"
                                        >
                                            <el-option label="个人" :value="1"></el-option>
                                            <el-option label="企业" :value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="参与方" prop="account">
                                  <template slot-scope="scope">
                                        <el-form-item style="width:100px;margin-right:10px" :prop="'sendArr2.'+ scope.$index + '.name'"  verify :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr2'})" :watch="sendArr2" empty-message="请输入姓名">
                                            <el-input
                                                @input="changeArr($event, { key: 'name', list: 'sendArr2', index: scope.$index })"
                                                v-model="scope.row.name"
                                                 placeholder="请输入姓名"
                                                 
                                            ></el-input
                                        ></el-form-item>

                                        <el-form-item style="width:180px;margin-right:10px" :prop="'sendArr2.'+ scope.$index + '.account'" verify phone :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr2'})" :watch="sendArr2" empty-message="请输入手机号">
                                            <el-input
                                                @input="changeArr($event, { key: 'account', list: 'sendArr2', index: scope.$index })"
                                                v-model="scope.row.account"
                                                 placeholder="请输入手机号"
                                                
                                            ><el-button slot="append" icon="el-icon-user-solid" @click="contsShow( scope.$index,'sendArr2','one')"></el-button></el-input>
                                        </el-form-item>
                                        <el-form-item style="width:280px;" v-if="scope.row.type == 2" :prop="'sendArr2.'+ scope.$index + '.orgName'" verify  :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr2'})" :watch="sendArr2" empty-message="请输入公司名称">
                                          <el-input
                                              v-model="scope.row.orgName"
                                              @input="changeArr($event, { key: 'orgName', list: 'sendArr2', index: scope.$index })"
                                              
                                                 placeholder="请输入公司名称"
                                                 
                                          ></el-input>
                                        </el-form-item>
                                    </template>
                                    
                                </el-table-column>
                                <el-table-column label="" width="40" v-if="model.isTemplate != 1">
                                    <template slot-scope="scope">
                                        <i class="el-icon-delete" style="cursor:pointer" @click="delSend(scope.$index, 2)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>

                            </el-form>
                            <button class="addchao" :disabled="model.isTemplate == 1" @click="addSignUser(2, 'sendArr2')"> <i class="el-icon-plus"></i>添加抄送方 </button>
                        </div>
                    </div>
                    <div class="add-enclosure flex">
                        <span class="select-left"> 附件
                            <el-tooltip
                                class="ag-tip"
                                effect="dark"
                                content="仅用于查阅无需签署，附件不记入扣费套餐"
                                placement="top-start"
                            >
                                <i class="el-icon-warning-outline"></i> </el-tooltip>    
                        </span>
                        <div class="flex-sub">
                            <p style="width:120px">
                                <uploads
                                    v-if="model.isTemplate != 1"
                                    @successAuth="successAuth2"
                                    @errorAuth="errorAuth2"
                                    @beforeUpload="beforeUpload2"
                                    :fileList="list2"
                                    :fileType="['pdf','doc','docx','png','jpg','jpeg','PDF','DOC','DOCX','PNG','JPEG','JPG']"
                                    :batchNo="batchNo"
                                    :btnTitle="'添加附属文件'"
                                    :btnType="'text'"
                                    :type="2"
                                    :uploadUrl="'common'"
                                ></uploads>
                                <span class="text-gray" v-if="model.isTemplate == 1&&list2.length==0">附属文件为空</span>
                            </p>
                            <div class="signPdfList"> 
                                <div class="flex" style="align-items: center;flex-wrap: wrap;">

                                    <div class="signPdf signPdffu" v-for="(item, index) in list2" :key="index">
                                    <div class="flex">
    
                                        <div class="up-left">
                                            <!-- <img src="../../../assets/img/feature/pdf.png" alt=""> -->
                                             <i style="color:#f24731;font-size:30px" class="el-icon-document"></i>
                                            </div>
                                        <div class="up-center"> 
                                            <div class="up-title">{{item.fileName}}</div>
                                            <div><span style="" v-if="item.size">{{item.size|fileSize}} M</span></div></div>
                                        <div class="up-right"><i class="el-icon-delete" @click="delFile2(index)"></i></div>
                                    </div>
                                     <div ><el-progress v-if="item.status==0" style="height:3px;overflow: hidden;" :percentage="item.percentage"  :color="'#7886c2'" :show-text="false"></el-progress></div>
                                </div>
                                </div>
                            </div>
                            <!-- <p >
                                
                                <a
                                    class=" margin-right"
                                  
                                    style="position:relative;display:inline-block"
                                    v-for="(item, index) in list2"
                                    :key="index"
                                >
                                    <el-button class="upbtn" :loading="item.status == 0">{{ item.fileName }}</el-button>
                                    <i class="el-icon-error delbtn" @click="delFile2(index)"></i>
                                </a>
                            </p> -->
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <el-dialog title="通讯录" :visible.sync="visibleUser" v-dialogDrag width="1000px">
            <contracts ref="contracts" :consType="consType" :userType="'2'" @setConts="setConts"></contracts>
        </el-dialog>
        <!-- <contactsDialog :dialogVisible="dialogVisible" @closeContactsDialog="closeContactsDialog" @setConts="setConts"></contactsDialog> -->
        <templateImport @setConts="setConts" :dialogVisible="dialogVisible2" @closeContactsDialog="closeContactsDialog"></templateImport>
        <auth-code :visible="visibleCode" :phone="realPhone" @closepop="closepop" @toNext="toNext" :verifyTag="false"></auth-code>
        <el-dialog title="预览" :visible.sync="visiblePdfView" top="2%" @close="initPDFTag"  width="80%" >
          <div style="width:100%;height:80vh;overflow:hidden" ref="bbox">
          
            <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
            <pdf-container
                ref="pdfContainer" 
                :pdfConfig="{ type: 1}"
                :conWidth="conWidth" :conHeight="conHeight"
                :rects="rects"
                :imgUrlInfo="imgUrlInfo"
                @initPdf="initPdf2"
              
            >    
            </pdf-container>
          </div>
        </el-dialog>
        <el-dialog title="" class="element-dialog" :fullscreen="true" :visible.sync="visibleSetElement" :modal-append-to-body="false" :append-to-body="true" >
            <set-element :key="muid" v-show="visibleSetElement" ref="setElement" :fileObj="fileObj"  @setFile="setFile" @closeme="visibleSetElement=false"></set-element>
        </el-dialog>
    </div>
</template>

<script>
import { findTemplate } from '../../../api/template.js';
import setElement from '../business/setElement.vue'
import {
		addShopTemplate,
		updateShopTemplate,
		findShopTemplateByNo
	} from '../../../api/business.js';
import { saveDraftContract, findContract, saveContract,initBatchNo,delFileContract } from '../../../api/contract.js';
import AuthCode from '../../common/authCode';
import uploads from '../../../components/common/uploads';
import contracts from '../../page/mine/contracts';
import { queryCreditCodeByOrgName } from '../../../api/companyManage.js';
// import vuedraggable from 'vuedraggable';
import Sortable from 'sortablejs';

// import Order from '../../../components/common/order';
// import contactsDialog from './contactsDialog';
import templateImport from './templateImport';
import '../../../assets/css/contract.less'
import pdfContainer from '../../common/pdfContainer';
import {downloadFile,downloadFile2,downloadFileTemp,downloadFileScene} from '../../../api';
 import {uuid} from '@/components/page/contract/signUtile.js'
// import { clearInterval, setTimeout } from 'timers';
export default {//Order,
    components: { uploads, contracts, AuthCode,   templateImport,pdfContainer,setElement }, //contactsDialog,, vuedraggable
    data() {


        let disabledDate = date => {
	        return date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
	    };
        return {
            tempId: '',
            contId: '',
            sceneNo:'',
            myname:'',
            batchNo:'',
            type: '',
            dialogVisible: false,
            dialogVisible2: false,
            visiblePdfView:false,
            fileList: [],
            visibleUser: false,
            visibleCode: false,
            realPhone: '',
            userInfo: {},
            radio: '1',

            model: {
                contractName: '',
                remark: '',
                signType: false,
                // checkList: [],
                status: 0,
                players: [],
                files: [],
                deadLine: '',
                signProcess:0,//签署流程(0共同签署 1独立签署)

            },
            activeItem: {},
            sendArr:[],
            sendArr2: [],
            loading: false,
            selections: [],
            list: [],
            list2: [],
            signState: 0,

            acceptType: '',
            consType:"",//'one'单选  more多选
			consIndex:'',//需要修改的对象及index
            imgUrlInfo:[],
            pdfShowTag:false,
            conWidth:0,
            conHeight:0,
            pdfUrl: '',
            signProcess:-1,
            timmerObj:{},
            pickerOptions: {
              disabledDate
            },
            visibleSetElement:false,
            activeIndex:0,
            fileObj:{},
            muid:0
          
        };
    },
    created() {
        
        this.getId();
       

        if (this.contId) {
            this.getById2(true);
             
        } else {
           if (this.tempId) {
                this.getById(false);
                this.getType();
            } else {
                this.model.isTemplate = 0;
                // this.getBatchNo();
                this.getType();
                this.getinfo();
                
            }
        }
        
    },
    watch: {},
    mounted() {
        this.rowDrop();
    },
    

    methods: {
        back() {
            this.$router.go(-1); //返回上一层
        },
        async getBatchNo(){
            let { data } = await initBatchNo({ });
            this.batchNo = data.batchNo
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        successAuth(res, file) {
            // let item = this.list[this.list.length - 1];
            // item.fileId = res.data.id;
            // item.status = 1;
          
            let num = '';
            this.list.forEach((item, index) => {
                if (item.uid == file.uid) {
                    num = index;
                }
            })
            let item = this.list[num];
            this.$set(item, 'fileId', res.data.id)
            this.$set(item, 'pages', res.data.pages)
            this.$set(item, 'percentage', 100)
            setTimeout(()=>{

                this.$set(item, 'status', 1)
            },600)
            
            if(!this.model.contractName){
                this.model.contractName = item.fileName.split(".")[0];;
            }
        },
        timerpro(item,uid){
            this.timmerObj[String(uid)] = setInterval(()=>{
                let num  = item.percentage;
                if (num>=95){
                    num = 99;
                }else{
                    num +=Math.floor(Math.random()*5+5) + Math.ceil(Math.random()*10)/10;
                }
                
                if(item.status==1||item.status==2){
                    
                    clearInterval(this.timmerObj[uid])
                    this.timmerObj[uid] = null;
                }else{
                    this.$set(item, 'percentage',num)
                }
            
            }, 500);
            

        },
        errorAuth(file) {
           
            // this.list.splice(this.list.length - 1, 1);
            let num = '';
      
            this.list.forEach((item, index) => {
                if (item.uid == file.uid) {
                    num = index;
                }
            })
           
            this.list.splice(num , 1);
         
           
        },
        // beforeUpload(files) {
        //     let obj = {
        //         fileName: files.name,
        //         status: 0,
        //         fileId: '',
        //         signSetting: ''
        //     };
        //     this.list.push(obj);
        // },
        beforeUpload(files) {


                let obj = {
                    fileName: files.name,
                    status: 0,
                    fileId: "",
                    signSetting: "",
                    uid: files.uid,
                    size:files.size,
                    percentage:2
                }
                this.list.push(obj)
                let item = this.list[this.list.length-1]
                this.timerpro(item,files.uid)
            },
        successAuth2(res, file) {
            let num = '';
            this.list2.forEach((item, index) => {
                if (item.uid == file.uid) {
                    num = index;
                }
            })
            console.log(this.list2,file)
            let item = this.list2[num];
            this.$set(item, 'fileId', res.data.id)
             this.$set(item, 'pages', res.data.pages)
            this.$set(item, 'percentage', 100)
           setTimeout(()=>{

                this.$set(item, 'status', 1)
            },600)
            // let item = this.list2[this.list2.length - 1];
            // item.fileId = res.data.id;
            // item.status = 1;
        },
        errorAuth2(file) {
            let num = '';
         
            this.list2.forEach((item, index) => {
                if (item.uid == file.uid) {
                    num = index;
                }
            })
            // let item = this.list[num];
            this.list.splice(num , 1);
           
            // this.list2.splice(this.list.length - 1, 1);
            // let item = this.list2[this.list2.length - 1];
            // item.status = 2;
        },
        // beforeUpload2(files) {
        //     if (this.list2.length == 5) {
        //         this.$message.error('最多上传5个附属文件');
        //         return false;
        //     }
        //     let obj = {
        //         fileName: files.name,
        //         status: 0,
        //         fileId: '',
        //         signSetting: ''
        //     };
        //     this.list2.push(obj);
        // },
        beforeUpload2(files) {
            if (this.list2.length == 5) {
                this.$message.error("最多上传5个附属文件")
                return false;
            }
            let obj = {
                fileName: files.name,
                status: 0,
                fileId: "",
                signSetting: "",
                size:files.size,
                uid: files.uid,
                percentage:2

            }
            this.list2.push(obj)
            let item = this.list2[this.list2.length-1]
            this.timerpro(item,files.uid)
        },
        addSignUser(type, acceptType) {
            this.acceptType = acceptType;
            this.consType = 'more';
            if (type == 1) {
                this.dialogVisible2 = true;
                // this.visibleUser = true;

                return;
            }
            // this.dialogVisible = true;
            this.visibleUser = true;
        },
        contsShow(index,keyType,oneMoreType){
            this.consType = oneMoreType;
            this.acceptType = keyType;
            this.consIndex = index
            this.visibleUser = true;
                //需要修改的对象及index
        },

        closeContactsDialog() {
            this.dialogVisible = false;
            this.dialogVisible2 = false;
        },
        addSignUser2(type) {
            let len = this.sendArr2.length + 1;
            let obj = { type2: type };

            this.sendArr2.push(obj);
        },
        delFile(index) {
            // this.list.splice(index, 1);
            this.delPdfFile('list',index)
        },
        delFile2(index) {
             this.delPdfFile('list2',index)
            // this.list2.splice(index, 1);
        },

        delPdfFile(fileType,index){
            let item = this[fileType][index]
            delFileContract({
                batchNo:this.batchNo,
                fileId:item.fileId
            }).then(({data})=>{
                this[fileType].splice(index, 1);
                this.$message.success("删除成功")
            }).catch(({data})=>{
                 this.$message.error("删除失败")
            })


        },
        
        delSend(index, type) {
            if (type == 1) {
                this.sendArr.splice(index, 1);
                // let ind = 0;
                //  this.sendArr.forEach(item=>{
                //    if(item.name.indexOf("签署方")!=-1){
                //      ind++
                //      item.name = "签署方"+ind
                //    }
                //  })
            } else {
                this.sendArr2.splice(index, 1);
            }
        },
        beforAdd(type){
            if(this.signProcess!=-1&&(this.model.signProcess!=this.signProcess)){
                this.$confirm('检测到您修改了签署方式，此操作会删除已指定的签署位置, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.tempAdd(type)
                    }).catch(() => {
                             
                    });
            }else{
                this.tempAdd(type)
            }
        },
        async tempAdd(type, code) {

            if (this.type == -1) {
                this.$router.push({ path: '/contract/setContract',
                query:{
						contId: this.contId,
						temType:this.type,
                        myname:this.myname
					} });
                return false;
            }
            this.model.files = []; //合同文件对象数组
            let model = JSON.parse(JSON.stringify(this.model))

            let userArr = await  this.getUser();
           
            let {
                arr,
                tag
            } = this.getFile();
            if (tag ) {

                this.$message.error(tag)
                return false;
            }
            
            // console.log(arr,tag)
            // return false;
            

            model.files = arr;
            model.players = userArr;
            // if (!tag) {
            //     this.$message.error('请上传签署文档！');
            //     return false;
            // }
            if (!userArr) {
                // this.$message.error("请检查签署要求是否选择完整")
                return false;
            }
            this.$refs.agform.validate(async valid => {
                if (valid) {
                    // if (type == 1) {
                         
                    //     if (userArr.length == 0) {
                    //         this.$message.error('请添加签署对象');
                    //         return false;
                    //     }
                    // }

                    if (this.contId) {
                        model.contractNo = this.contId;
                        
                    }else{
                        if(this.sceneNo){
                            model.contractStyle = 2;
                        }else if(this.tempId){
                            model.contractStyle = 1;
                        }else {
                            model.contractStyle = 0;
                        }
                    }
                    if(this.batchNo){
                        model.batchNo = this.batchNo;
                    }
                    if(model.signType){
                        model.signType = 0;
                    }else{
                        model.signType = 1;
                    }
                    // let data = null;
                    // if (type == 2) {
                    //     model.verifyCode = code;
                    //     var { data } = await saveContract(model);
                    // } else {
                        var { data } = await saveDraftContract(model);
                    // }
                    // let {data} = await saveDraftContract(this.model);

                    // this.$store.dispatch('setContId', data.contractNo);
                    // this.getId(true);
                    this.contId = data.contractNo;
                    this.$router.push({
                        query: {...this.$route.query, contId: data.contractNo} 
                    })
                    if (type == 0) {
                        this.$message.success('保存成功');
                        this.getById2(true);
                    } else if (type == 1) {
                        this.$message.success('已保存');
                        this.$router.push({ path: '/contract/setContract',query: {
                            contId:data.contractNo,
                            tempId:this.tempId,
                            tempType:this.type,
                            myname:this.myname
                        } });
                    } else if (type == 2) {
                        this.$message.success('发起成功');
                        this.$router.push({ path: '/contract' });
                    }
                }
            });
        },
         verifyre(rule, val, callback,{index,row,arrKey}){
             
            let tag = true;
            this[arrKey].forEach((item,itemIndex)=>{
               
                if(row.account==item.account&&index!=itemIndex&&row.type==item.type&&row.orgName==item.orgName){
                     tag =false; 
                }
            })
            if(tag){
                callback()
            }else{
                callback(Error('用户重复'))
            }
            // callback(Error('该手机号已注册'))

        },
        getFile() {
            let arr = [];
            let tag = '';
            let proChangeTag = this.signProcess==this.model.signProcess
            if (this.list.length == 0) {
                tag = '请上传文件';
            } else {
                this.list.forEach(item => {
                    let obj = {}
                    if (item.status == 0 || item.status == '2') {
                        tag = '签署文件正在上传中。'//签署文件正在上传中或失败。
                    }

                    obj.fileId = item.fileId,
                    obj.id = item.id;
                    obj.fileType = 1;
                    obj.signSetting = proChangeTag?item.signSetting:''//如果从独立变成了
                    obj.vars = this.list.length==1?item.vars:''//文件多于1
                  
                    obj.pages = item.pages;
                    obj.size = item.size;
                    arr.push(obj)
                })
                // this.list.forEach(item => {
                //     let obj = {};
                //     (obj.fileId = item.fileId), (obj.id = item.id);
                //     obj.fileType = 1;
                //     obj.signSetting = item.signSetting;
                //     arr.push(obj);
                // });
            }
            // this.list2.forEach(item => {
            //     let obj = {};
            //     (obj.fileId = item.fileId), (obj.id = item.id);
            //     obj.fileType = 2;
            //     obj.signSetting = item.signSetting;
            //     arr.push(obj);
            // });
            // return { arr, tag };
            this.list2.forEach(item => {
                let obj = {}
                obj.fileId = item.fileId,
                    obj.id = item.id;
                obj.fileType = 2;
                obj.pages = item.pages;
                obj.size = item.size;
                obj.signSetting = item.signSetting
                if (item.status == 0 || item.status == '2') {
                    tag = '附属文件正在上传中或失败。'//附属文件正在上传中或失败。
                }
                arr.push(obj)
            })
            return {
                arr,
                tag
            };
        },
        getUser(){
            return new Promise((resolve, reject) => {

                let arr = [];
                if (this.sendArr.length == 0) {
                    // resolve([]); 
                    this.$message.error("请添加参与方");
                    return false;
                }
                this.$refs['agform-send'].validate(async valid => {
                    if (valid) {
                        this.sendArr.forEach((item, index) => {
                            let obj = {
                                account:item.account,
                                name:item.name,
                                type:item.typeWay==0? item.type:6,
                                processType:this.model.signProcess==1?'1':'0',
                                requirement:item.requirement?item.requirement:0
                            };
                            
                            if (item.id) {
                                obj.id = item.id;
                            }
                            if(item.bgClass){
                                obj.bgClass =item.bgClass//如果存在背景颜色
                            }
                            if (item.code) {
                                obj.code = item.code;
                            }
                            if (this.model.signType) {
                                obj.sort = index+1;
                            } else {
                                obj.sort = -1;
                            }
                            if (obj.type == 1) {

                                obj.method = item.need;
                                //  obj.need = item.need;
                            } else if (obj.type == 2){
                                obj.orgName = item.orgName;
                                obj.creditCode = item.creditCode;
                                obj.method = item.need.length==2?2:item.need[0];

                                // obj.need = item.need;
                            
                            } else if (obj.type == 3||obj.type==6){
                                if( item.type==2){

                                    obj.orgName = item.orgName;
                                    obj.creditCode = item.creditCode;
                                }
                                obj.method =9;
                            
                            }
                            arr.push(obj);
                        })
                        if(this.sendArr2.length>0){
                            this.$refs['agform-send2'].validate(async valid => {
                                if (valid) {
                                    this.sendArr2.forEach((item, index) => {
                                        let obj = {
                                            account:item.account,
                                            name:item.name,
                                            type:3,
                                            method :-1,
                                            sort:-1
        
                                        };
                                        if (item.id) {
                                            obj.id = item.id;
                                        }
                                        if (item.code) {
                                            obj.code = item.code;
                                        }
                                
                                    
                                        if (obj.type == 1) {
                                        
                                        } else {
                                            obj.orgName = item.orgName;
                                            obj.creditCode = item.creditCode;
                                        
                                        
                                        }
                                        arr.push(obj);
                                    })
                                    resolve(arr) ;
                                }else{
                                    
                                }
                            })
                        }else{
                            resolve(arr) ;
                        }
                        
                    }else{
                        
                    }
                })
                
            })

            
        },
       
        getId(tag) {
            this.tempId = this.$route.query.tempId; //this.$store.getters.tempId;
            this.contId =this.$route.query.contId; // this.$store.getters.contId;
            this.sceneNo = this.$route.query.sceneNo;
            this.myname = this.$route.query.myname
        },
        getType() {
            this.type =this.$route.query.tempType; // this.$store.getters.tempType;
            
        },
        async getById() {
            let data = '';
             if(this.sceneNo){
                let res = await findShopTemplateByNo({ templateNo: this.tempId });
                data  = res.data; 
            }else {

                let res = await findTemplate({ templateNo: this.tempId });
                data  = res.data;
            }
            data.contractName = data.templateName;
            data.id = '';
            data.createId = '';
            data.status = '';
            data.isTemplate = 1;
            data.signType==1?data.signType=false:data.signType=true
            this.model = data;
            this.getinfo();
            this.setModel(data,'temp');
            // let arr = data.files;
            // let arrList = [];
            // let arrList2 = [];
            // arr.forEach(item => {
            //     item.status = 1;
            //     if (item.fileType == 1) {
            //         arrList.push(item);
            //     } else {
            //         arrList2.push(item);
            //     }
            // });
            // this.list = arrList;
            // this.list2 = arrList2;
            // let sendArrList = [];

            // if (data.players.length > 0) {
            //     data.players.forEach(item => {
            //         item.id = null;
            //         if (item.method == 0) {
                        
            //             this.$set(item, 'checkList', [1]);
            //         } else if (item.method == 1) {
                         
            //             this.$set(item, 'checkList', [2]);
            //         } else if (item.method == 2) {
                         
            //             this.$set(item, 'checkList', [1, 2]);
            //         } else {
                        
            //             this.$set(item, 'checkList', []);
            //         }
            //         sendArrList.push(item);
            //     });
            // }

            // this.sendArr = sendArrList;
        },
        async getById2() {
            let { data } = await findContract({ contractNo: this.contId });

            if (data.isTemplate == 1) {
                this.type = 2;
            } else {
                this.getType();
            }
            data.signType==1?data.signType=false:data.signType=true
            this.model = data;
            this.getinfo();
            this.setModel(data);
        },
        setModel(data,tempOrCont){
            this.signProcess = data.signProcess;
            let arr = data.files;
            let arrList = [];
            let arrList2 = [];
            arr.forEach(item => {
                item.status = 1;
                if (item.fileType == 1) {
                    arrList.push(item);
                } else {
                    arrList2.push(item);
                }
            });
            this.list = arrList;
            this.list2 = arrList2;
            let sendArrList = [];
            let sendArrList2 = [];
            if (data.players.length > 0) {
                data.players.forEach(item => {
                    item.uuid = uuid();
                    if(tempOrCont){//模板的 是否是审批人以及是否是抄送方与合同有异同
                        

						if(item.roleType==1){
                            if (item.type == 1) {
                                this.$set(item, 'need', item.method);
                            
                            }else if(item.type==2){
                                if(item.method!=2){

                                    this.$set(item, 'need', [item.method]);
                                }else{
                                    this.$set(item, 'need', [0,1]);
                                }
                                
                            } 
                            if(item.signType==1){
                                item.typeWay = 0;
                            }else{
                                 item.typeWay = 6;
                            }
							sendArrList.push(item);
						}else if(item.roleType==2){
							sendArrList2.push(item);
						}
                    }else{

                        item.typeWay = 0;
                        if (item.type == 1) {
                            this.$set(item, 'need', item.method);
                            sendArrList.push(item);
                           
                        }else if(item.type==2){
                            if(item.method!=2){
    
                                this.$set(item, 'need', [item.method]);
                            }else{
                                 this.$set(item, 'need', [0,1]);
                            }
                            sendArrList.push(item);
                        } else if(item.type==3){
                            if (item.orgName) {
                                item.type = 2;
                            } else {
                                item.type = 1;
                            }
                            sendArrList2.push(item);
                        }else if(item.type==6){
                            if (item.orgName) {
                                item.type = 2;
                            } else {
                                item.type = 1;
                            }
                            item.typeWay = 6
                            sendArrList.push(item);
                        }
                    }
                });
            }

            this.sendArr = sendArrList;
            this.sendArr2 = sendArrList2;
        },
        getConts(item) {
          
            this.visibleUser = true;
            this.activeItem = item;
        },
        
        setConts(arr) {
            this.dialogVisible = false;
            this.dialogVisible2 = false;
            if(this.consType=='one'){
					let obj = arr[0]
				 
					let contsObj = this[this.acceptType][this.consIndex];
					contsObj.name = obj.userName;
					contsObj.account = obj.userAccount;
					if(contsObj.type ==2){
						contsObj.orgName = obj.orgName? obj.orgName:'';
					}
					 
					this.$set(this[this.acceptType],this.consIndex,contsObj)
            }else{
                
                let propsData = []
                arr = JSON.parse(JSON.stringify(arr))
                arr.forEach(item => {
                    item.uuid = uuid();
                    if (item.orgName) {
                        item.type = 2;
                        // item.checkList = [1];
                        this.$set(item, 'need', [0,1]);
                        // item.need = [4]
                    } else {
                        item.type = 1;
                        // item.checkList = [1];
                        this.$set(item, 'need', 0);
                        // item.need = 1
                    }
                    item.account = item.userAccount;
                    item.name = item.userName;
                    item.typeWay = 0 ;
                });
             
                if(this[this.acceptType].length==0){
                    propsData = arr;
                }else{
    
                    propsData = this.uquir(arr,this[this.acceptType])
                }
                
                this[this.acceptType].push(...propsData);
            }
            this.visibleUser = false;
            // console.log(this.sendArr,"this.sendArr")
        },
        uquir(jsonArr,jsonArr2){//去重
            jsonArr = JSON.parse(JSON.stringify(jsonArr))
            jsonArr2 = JSON.parse(JSON.stringify(jsonArr2))
            let length1 = jsonArr.length;
            let length2 = jsonArr2.length;
            for (let i = 0; i < length1; i++) {
                for (let j = 0; j < length2; j++) 
                {
                    //判断添加的数组是否为空了
                    if (jsonArr.length > 0) {
                        if (jsonArr[i]["id"] === jsonArr2[j]["id"]) {
                            jsonArr.splice(i, 1); //利用splice函数删除元素，从第i个位置，截取长度为1的元素
                            length1--; 
                             
                        }
                    }
                }

            } 
            
            // for (let n = 0; n < jsonArr2.length; n++) {
            //     jsonArr.push(jsonArr2[n]);
            // }
            console.log(jsonArr,"jsonArr")
            return jsonArr
        },
       
        // doConts(item) {
        //     if (this.activeItem.type == 2 || this.activeItem.type2 == 2) {
        //         this.activeItem.creditCode = item.creditCode;
        //         this.activeItem.orgName = item.orgName;
        //     }
        //     this.$set(this.activeItem, 'account', item.userAccount);
        //     this.$set(this.activeItem, 'name', item.userName);

        //     this.visibleUser = false;
        // },
        // async getEnt(item) {
        //     if (!item.orgName) {
        //         this.$message.error('企业名称为空');
        //         return false;
        //     }
        //     let { data } = await queryCreditCodeByOrgName({ orgName: item.orgName });
        //     if (data) {
        //         item.creditCode = data.creditCode;
        //     } else {
        //         this.$message.error('输入的企业不正确');
        //     }
        // },
        getinfo(tag) {

            let res = this.$store.getters.user;
            // this.$store.dispatch('GetInfo', tag).then(res => {
                this.userInfo = res;
                this.realPhone = res.realPhone;
                this.model.initiatorName = this.$store.getters.user.userName;
            // });
        },
        closepop(visible) {
            this[visible] = false;
        },
        async toNext(code) {
            this.tempAdd(2, code);
        },
        // getMsg() {
        //     this.model.files = []; //合同文件对象数组
        //     let { arr, tag } = this.getFile();
        //     // console.log(arr,tag)
        //     // return false;
        //     let userArr = this.getUser();

        //     this.model.files = arr;
        //     this.model.players = userArr;
        //     if (!tag) {
        //         this.$message.error('请上传文件合同');
        //         return false;
        //     }
        //     if (!userArr) {
        //         // this.$message.error("请检查签署要求是否选择完整")
        //         return false;
        //     }
        //     this.$refs.agform.validate(async valid => {
        //         if (valid) {
        //             this.visibleCode = true;
        //         }
        //     });
        // },
        changeArr(value, obj) {
            //动态表格绑定

            let listArr = this[obj.list];
            let item = JSON.parse(JSON.stringify(this[obj.list][obj.index]));
            if (obj.key == 'type') {
                if (value == 1) {
                    item.need = 0;
                } else {
                    item.need = [0,1];
                }
            }else if(obj.key=='typeWay'){
                if(value==0){
                     if(item.need==undefined){
                        if (item.type == 1) {
                            item.need = 0;
                        } else if(item.type == 2){
                            item.need = [0,1];
                        }
                     }
                }
            }
            // if(obj.key=='need'){
            //     let tag = value instanceof Array;
            //     if(tag){
            //         console.log(value,"value")
            //         if(value.length==0){
            //             return false;
            //         }
            //     }
            // }
            item[obj.key] = value;
            this.$set(listArr, obj.index, item);
            // this.visibleUser = false;
        },
        rowDrop() {
            // 此时找到的元素是要拖拽元素的父容器
            let tbody = document.querySelector('.draggable .el-table__body-wrapper tbody');
            let _this = this;
            Sortable.create(tbody, {
                //  指定父元素下可被拖拽的子元素
                draggable: '.draggable .el-table__row',
                handle: '.el-icon-sort',

                onEnd: ({ newIndex, oldIndex }) => {
                    let currentDragRow = _this.sendArr.splice(oldIndex, 1)[0]; // 当前拖拽行

                    _this.sendArr.splice(newIndex, 0, currentDragRow);
                }
            });
        },
       
        getPdfView(row){
            this.visiblePdfView = true;
            // this.pdfUrl =  downloadFile(row.fileId)// row.url;
         
            if(this.contId){
                 this.pdfUrl =  downloadFile2(row.fileId)// row.url;
            }else if(this.sceneNo){
                this.pdfUrl =  downloadFileScene(row.fileId)// row.url;
            }else  if(this.tempId){
                this.pdfUrl =  downloadFileTemp(row.fileId)// row.url;
            }else {
                this.pdfUrl =  downloadFile(row.fileId)// row.url;
            }
            this.$nextTick(()=>{
                this.conWidth = this.$refs.bbox.offsetWidth
                this.conHeight = this.$refs.bbox.offsetHeight
                this.initPDF()
            })
        },
        initPDF() {
            this.$refs.pdfContainer.pdfInit(this.pdfUrl)
          
        },
        initPdf2(){
            this.pdfShowTag = true;
        },
        signMean(val){
           
            if(val==1){
                this.model.signType = false;
                this.sortChange(false)
            }else{
                this.model.signType = true;
            }
        },
        verifyMoble(a,b,c,d){
            console.log(a,b, c,d)
        },
        sortChange(value){
            console.log(value)
            if(!value){
                this.sendArr.forEach(item=>{
                    this.$set(item,'typeWay',0)
                })
            }
        },
        addElement(item,index){
            this.muid = uuid();
            this.fileObj = item;
            this.activeIndex = index;
            this.visibleSetElement = true;
            this.$nextTick(()=>{
                this.$refs.setElement.getFileView('view')
            })
        },
    }
};
</script>
<style lang="less">
    
</style>
