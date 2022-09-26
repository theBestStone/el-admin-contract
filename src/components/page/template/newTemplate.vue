<!--  -->
<template>
	<div class="">
		<div class="cf sign-header">
            <div class="sign-left" @click="closeThis"><i class="el-icon-close"></i>关闭</div>
			<div class="sign-center text-center ag-steps" v-if="!sceneNo">
                <div class="steps-item">
                    <i class="steps-num steps-num-active ">1</i><span class="steps-title-active">签署设置</span>
                </div>
                <i class="steps-line"></i>
                <div class="steps-item"><i class="steps-num">2</i><span class="steps-title">指定签署位置</span></div>
			 
               
            </div>
            <div class="sign-center text-center ag-steps" v-if="sceneNo">
                <div class="steps-item">
                    <i class="steps-num steps-num-active ">1</i><span class="steps-title-active">签署设置</span>
                </div>
                <i class="steps-line"></i>
                <div class="steps-item"><i class="steps-num">2</i><span class="steps-title">指定签署位置</span></div>
				 
				 <i class="steps-line "></i>
					<div class="steps-item"><i class="steps-num  ">3</i><span class="steps-title">组件指定填写方</span></div>
				<i class="steps-line"></i>
				<div class="steps-item"><i class="steps-num">4</i><span class="steps-title">发起确认</span></div>
               
            </div>
            <div class="sign-right">
                <el-button @click="beforAdd(0)" v-if="type != -1">保存</el-button>
                <el-button @click="beforAdd(1)" v-if="model.isTemplate != 1" type="primary">下一步</el-button>
				<!-- <div class="cf">

					<div class="fr">
						<el-button @click="back">上一步</el-button>
						<el-button @click="tempAdd(0)" v-if="type==1||type==0">存草稿</el-button>
						<el-button @click="tempAdd(1)" type="primary">下一步</el-button>
					</div>
				</div> -->
            </div>
        </div>
		<div class="content90 sign-body">
			
			<el-form ref="agform" :inline="true" :model="model" :disabled="type==-1||type==2" label-width="80px">
				<el-card class="margin-top">
					<div slot="header" class="clearfix  text-xl">
						<span>基本信息</span>
					</div>
					<el-form-item label="主题" prop="templateName" verify contractName>
                        <el-input class="special-input" style="width: 400px;" v-model="model.templateName">
                            <template slot="append" style="background-color:#fff;">{{ model.templateName.length }}/{{ 50 }}</template>
                        </el-input>
                    </el-form-item>
					<!-- <el-form-item label="模版名称" prop="templateName" verify>
						<el-input v-model="model.templateName"></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark" verify>
						<el-input type="textarea" v-model="model.remark"></el-input>
					</el-form-item> -->

				</el-card>
				<el-card class="margin-top-sm">
					<!-- <div slot="header" class="clearfix  text-xl">
						<span>文件列表</span>
					</div> -->
					<div slot="header" class="clearfix text-xl">
						<span>签署文档</span>
						<div style="position: relative; top: 15px; font-size: 14px">
							文档
							<el-tooltip class="ag-tip" effect="dark" content="支持doc、docx、png、jpeg、jpg、pdf格式，文档大小不超过50M" placement="top-start">
								<i class="el-icon-warning-outline" style="#959595"></i>
							</el-tooltip>
							<el-button class="margin-left" @click="visibleTemp=true" v-if="sceneNo&&list.length==0" type="text">选择组件模板</el-button>
						</div>
					</div>
					<div>
                    <div class="signPdfList"> 
                        <div class="flex" style="align-items: center;flex-wrap: wrap;">
                            <div class="signPdf " v-for="(item, index) in list" :key="index">
                                <div class="flex">

                                    <div class="up-left"><img src="../../../assets/img/feature/pdf.png" alt=""></div>
                                    <div class="up-center"> 
                                        <div class="up-title">{{item.fileName}}</div>
                                        <div><span v-if="item.pages">共{{item.pages}}页</span><span style="margin-left:20px;" v-if="item.size">{{item.size|fileSize}} M</span></div></div>
									<div v-if="sceneNo&&list.length==1" style="width:80px;line-height: 76px;">
										<el-button @click="addElement(item,index)" type="primary">{{item.vars?'编辑':'添加组件'}}</el-button>
									</div>
                                    <div class="up-right"><i class="el-icon-view" @click="getPdfView(item)"></i><i v-if="type != -1" class="el-icon-delete" @click="delFile(index)"></i></div>
                                </div>
                                 <div ><el-progress v-if="item.status==0" style="height:3px;overflow: hidden;" :percentage="item.percentage"  :color="'#7886c2'" :show-text="false"></el-progress></div>
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
					<!-- <div>
						<uploads @successAuth="successAuth" @errorAuth="errorAuth" @beforeUpload="beforeUpload"
							:fileType="['pdf']" :btnTitle="'文件模版上传'" :btnType="'primary'"></uploads>

						<span class="text-gray">（支持多文件文件签署，请上传pdf格式文件）</span>
						 
						<el-table class="margin-top-sm" ref="table" v-loading="loading" :data="list"
							style="width: 100%;">

							<el-table-column :show-overflow-tooltip="true" width="600" prop="fileName" label="文件名称" />
							<el-table-column :show-overflow-tooltip="true" prop="fileStatus" label="状态">
								<template slot-scope="scope">
									<el-tag type="green" v-if="scope.row.status==1">已上传</el-tag>
									<el-tag v-if="scope.row.status==0">上传中</el-tag>
									<el-tag type="danger" v-if="scope.row.status==2">上传失败</el-tag>
								</template>
							</el-table-column>

							<el-table-column label="操作" width="300px" align="center">
								<template slot-scope="scope">
									<el-button @click="delFile(scope.row,scope.$index)" type="danger" size="mini">删除
									</el-button>

								</template>
							</el-table-column>
						</el-table>
						<p>
							<uploads @successAuth="successAuth2" @errorAuth="errorAuth2" @beforeUpload="beforeUpload2"
								:btnTitle="'添加附属文件'" :btnType="'text'"></uploads> <span>（{{list2.length}}/5）</span><span
								class="text-gray">（支持多文件文件签署，请上传word/pdf/jpg/png格式文件）</span>
						</p>
						<p>
							<span class="padding text-gray" v-if="list2.length==0">暂无附属文件</span>
							<a class=" margin-right" v-else style="position:relative;display:inline-block"
								v-for="(item,index) in list2" :key="index">
								<el-button class="upbtn" :loading="item.status==0">{{item.fileName}}</el-button>
								<i class="el-icon-error delbtn" @click="delFile2(index)"></i>
							</a>
						</p>
					</div> -->
				</el-card>
				<el-card class="margin-top-sm">
					<!-- <div slot="header" class="clearfix  text-xl">
						<span>添加签署对象</span>
						<span
							class="text-gray text-sm">（文件模板中的签约方标识，表示某一类签约方，例如：一个文件模板包含的签约方有”HR“、”员工“，那么”HR“或者”员工“就是一个签约）</span>
					</div> -->
					<div slot="header" class="clearfix text-xl">
						<span>签署流程</span>
					</div>
					<div>
						<!-- <div class="cf">

							<el-radio-group v-model="model.signType">
								<el-radio :label="0">顺序签署</el-radio>
								<el-radio :label="1">无序签署</el-radio>

							</el-radio-group>
							<div class="">
								<span v-if="model.signType==0" style="font-size:12px;" class="text-gray">将按照签署人顺序进行签署，第一位签署人签署完成，合同流转至第二位签署人，以此类推，您可点击 </span>
								<span v-if="model.signType==1" style="font-size:12px;" class="text-gray">签署人可用时进行签署操作，无先后顺序限制，您可点击 </span>
								<order :type="model.signType" :sendArr="sendArr" :sendType="1"></order>
							</div>
						</div> -->
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
									<el-switch style="position: relative; top: -5px" v-model="model.signType" :disabled="model.signProcess==1" @change="sortChange"  inactive-text="顺序签署">
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
                        <el-form :inline="true" style="width:100%;" ref="agform-send" :model="this" :disabled="type == -1 || type == 2">
                            <el-table :data="sendArr" label="签署" row-key="uuid" style="width: 100%;">
                                <el-table-column prop="index" label="签署" width="60">
                                    <template slot-scope="scope">
                                        <div class="text-center">
                                            <span v-if="!model.signType" class="sign-sort"></span>
                                            <span v-if="model.signType" class="sign-sort-active">{{ scope.$index + 1 }}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="主体" width="130">
                                    <template slot-scope="scope">
                                        <i v-if="model.signType" class="el-icon-sort" style="cursor:move;font-size:20px;"></i>
                                        <el-select
                                            style="display:inline-block;width:75px;margin:0 5px;"
                                            
                                            @change="changeArr($event, { key: 'type', list: 'sendArr', index: scope.$index })"
                                            v-model="scope.row.type"
                                           
                                            placeholder="请选择"
                                        >
                                        <!--  :disabled="true" !scope.row.orgName -->
                                            <el-option label="个人" :value="1"></el-option>
                                            <el-option label="企业" :value="2"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
								<el-table-column prop="name" label="参与要求" width="170">
                                    <template slot-scope="scope">
                                        <el-select
                                            style="display:inline-block;width:130px;margin:0 5px;"
                                            @change="changeArr($event, { key: 'requirement', list: 'sendArr', index: scope.$index })"
                                            v-model="scope.row.requirement"
                                            placeholder="请选择"
                                           
                                        >
                                            <el-option label="使用模板指定" :value="0"></el-option>
                                            <el-option label="固定成员" :value="1"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="参与方" width="540" prop="account">
                                    <template slot-scope="scope">
										<div v-if="scope.row.requirement==1">
										
											<el-form-item style="width:100px;margin-right:5px" :prop="'sendArr.'+ scope.$index + '.name'"  verify :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr'})" :watch="sendArr" empty-message="请输入姓名">
												<el-input
													@input="changeArr($event, { key: 'name', list: 'sendArr', index: scope.$index })"
													v-model="scope.row.name"
													placeholder="请输入姓名"
												></el-input
											></el-form-item>

											<el-form-item style="width:170px;margin-right:5px" :prop="'sendArr.'+ scope.$index + '.account'" verify agphone :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr'})" :watch="sendArr" empty-message="请输入手机号">
												<el-input
													
													@input="changeArr($event, { key: 'account', list: 'sendArr', index: scope.$index })"
													v-model="scope.row.account"
													placeholder="请输入手机号"
													
												>
													 <el-button slot="append" icon="el-icon-user-solid" @click="contsShow( scope.$index,'sendArr','one')"></el-button>
												</el-input>
											</el-form-item>
											<el-form-item  style="width:180px;" :prop="'sendArr.'+ scope.$index + '.orgName'" verify v-if="scope.row.type == 2" :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr'})" :watch="sendArr" empty-message="请输入企业名称">
											<el-input
												v-model="scope.row.orgName"
												@input="changeArr($event, { key: 'orgName', list: 'sendArr2', index: scope.$index })"
												placeholder="请输入企业名称"
												
												 
											></el-input>
											</el-form-item>
										</div>
										<div v-if="scope.row.requirement==0">——</div>
                                    </template>
                                </el-table-column>
								
                                <el-table-column prop="name" label="参与方式" width="150">
                                    <template slot-scope="scope">
                                        <el-select
                                            style="display:inline-block;width:100px;margin:0 5px;"
                                            @change="changeArr($event, { key: 'signType', list: 'sendArr', index: scope.$index })"
                                            v-model="scope.row.signType"
                                            placeholder="请选择"
                                            :disabled="!model.signType"
                                        >
                                            <el-option label="签署" :value="1"></el-option>
                                            <el-option label="审批" :value="2"></el-option>
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
                                                v-if="scope.row.type == 1&&scope.row.signType==1"
                                                v-model="scope.row.need"
                                                :checked="scope.row.need"
                                            >
                                                <el-radio :label="0">不限</el-radio>
                                                <el-radio :label="7">手绘签名</el-radio>
                                                <el-radio :label="8">标准签名</el-radio>
                                            </el-radio-group>
                                            <el-checkbox-group
                                                @change="changeArr($event, { key: 'need', list: 'sendArr', index: scope.$index })"
                                                :checked="scope.row.need"
                                                v-if="scope.row.type == 2&&scope.row.signType==1"
                                                v-model="scope.row.need"
                                                :min="1"
                                            >
                                                <el-checkbox :key="1" :label="1">企业章</el-checkbox>
                                                <!-- <el-checkbox :key="0" :label="0">法人章</el-checkbox> -->
                                                <el-checkbox :key="0" :label="0">经办人签名</el-checkbox>
                                            </el-checkbox-group>
                                        <!-- </el-form-item> -->
                                    </template>
                                </el-table-column>
                                <el-table-column label="" width="40" fixed="right">
                                    <template slot-scope="scope">
                                        <i class="el-icon-delete" style="cursor:pointer" @click="delSend(scope.$index, 1)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form>
                    </div>
						<!-- <div class="margin-top-sm">
							<div v-if="sendArr.length==0" class="text-gray text-center margin-tb-lg">暂无数据</div>

							<vuedraggable class="wrapper" handle=".dags" :animation="300" v-model="sendArr" v-else>
								<transition-group>
									<div class="text-center dashed margin-top dags" v-for="(item,index) in sendArr" :key="index">

										<el-row class="bg-gray cf">
											<el-col class="t-title tmy" :span="6">参与方</el-col>
											<el-col class="t-title tmy" :span="6">签约主体-{{item.type==1?"个人":"企业"}}
											</el-col>
											<el-col class="t-title tmy" :span="6">经办人账号</el-col>
											<el-col class="t-title tmy" :span="6">签署要求</el-col>
										</el-row>
										<el-row class="cf">
											<el-col class="t-td tmy" :span="6">
												<el-input v-model="item.name"></el-input>
											</el-col>
											<el-col class="t-td tmy text-red" :span="6">使用模版指定</el-col>
											<el-col class="t-td tmy text-red" :span="6">使用模版时，该角色由发起人指定</el-col>
											<el-col class="t-td tmy" :span="6">
												<el-checkbox-group v-model="item.checkList" v-if="item.type==2">
													<el-checkbox :label="2">企业章</el-checkbox>
													<el-checkbox :label="1">法定代表人章</el-checkbox>
												</el-checkbox-group>
												<div v-if="item.type!=2"> ——</div>
												<i class="el-icon-close delcon" @click="delFile3(index)"></i>
											</el-col>
										</el-row>
									</div>
								</transition-group>
							</vuedraggable>
						</div> -->
						<div class="margin-top-xl text-center">
							<el-button type="primary" @click="addSignUser(2,'sendArr')">添加企业方</el-button>
							<el-button type="primary" @click="addSignUser(1,'sendArr')">添加个人方</el-button>
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
							<el-form v-if="sendArr2.length>0" :inline="true" style="width:100%;margin-bottom:10px;" ref="agform-send2" :model="this" :disabled="type == -1 || type == 2">
							
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
									<el-table-column prop="name" label="参与要求" width="170">
                                    <template slot-scope="scope">
                                        <el-select
                                            style="display:inline-block;width:130px;margin:0 5px;"
                                            @change="changeArr($event, { key: 'requirement', list: 'sendArr2', index: scope.$index })"
                                            v-model="scope.row.requirement"
                                            placeholder="请选择"
                                           
                                        >
                                            <el-option label="使用模板指定" :value="0"></el-option>
                                            <el-option label="固定成员" :value="1"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
									<el-table-column label="参与方" prop="account">
									<template slot-scope="scope">
											<div v-if="scope.row.requirement==1">
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
													>
														<el-button slot="append" icon="el-icon-user-solid" @click="contsShow( scope.$index,'sendArr2','one')"></el-button>
													</el-input>
												</el-form-item>
												<el-form-item style="width:280px;" :prop="'sendArr2.'+ scope.$index + '.orgName'" verify v-if="scope.row.type == 2" :verify="(rule, val, callback)=>verifyre(rule, val, callback,{index:scope.$index,row:scope.row,arrKey:'sendArr2'})" :watch="sendArr2" empty-message="请输入企业名称">
												<el-input
													v-model="scope.row.orgName"
													@input="changeArr($event, { key: 'orgName', list: 'sendArr2', index: scope.$index })"
													
													 
													placeholder="请输入企业名称"
												></el-input>
												</el-form-item>
											</div>
											<div v-if="scope.row.requirement==0">——</div>
										</template>
										
									</el-table-column>
									<el-table-column label="" width="40">
										<template slot-scope="scope">
											<i class="el-icon-delete" style="cursor:pointer" @click="delSend(scope.$index, 2)"></i>
										</template>
									</el-table-column>
								</el-table>

								</el-form>
								<span class="addchao" @click="addSignUser(1, 'sendArr2')"> <i class="el-icon-plus"></i>添加个人抄送方 </span>
								<span class="addchao margin-left" @click="addSignUser(2, 'sendArr2')"> <i class="el-icon-plus"></i>添加企业抄送方 </span>
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
										@successAuth="successAuth2"
										@errorAuth="errorAuth2"
										@beforeUpload="beforeUpload2"
										:fileList="list2"
										:batchNo="batchNo"
										:btnTitle="'添加附属文件'"
										 :fileType="['pdf','doc','docx','png','jpg','jpeg','PDF','DOC','DOCX','PNG','JPEG','JPG']"
										:btnType="'text'"
										:type="2"
										:uploadUrl="'common'"
									></uploads>
								</p>
								<div class="signPdfList"> 
                                <div class="flex" style="align-items: center;flex-wrap: wrap;">

                                    <div class="signPdf signPdffu" v-for="(item, index) in list2" :key="index">
                                    <div class="flex">
    
                                        <div class="up-left">
											<i style="color:#f24731;font-size:30px" class="el-icon-document"></i>
											<!-- <img src="../../../assets/img/feature/pdf.png" alt=""> -->
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
			</el-form>
		</div>
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
		<el-dialog title="通讯录" :visible.sync="visibleUser" v-dialogDrag width="1000px">
            <contracts ref="contracts" :consType="consType" :userType="'2'" @setConts="setConts"></contracts>
        </el-dialog>
		<el-dialog title="" class="element-dialog" :fullscreen="true" :visible.sync="visibleSetElement" :modal-append-to-body="false" :append-to-body="true" >
            <set-element :key="muid" v-show="visibleSetElement" ref="setElement" :fileObj="fileObj"  @setFile="setFile" @closeme="visibleSetElement=false"></set-element>
        </el-dialog>
		<el-dialog title="选择组件模板"   :visible.sync="visibleTemp" :modal-append-to-body="false" :append-to-body="true" >
			<div style="max-height:500px;overflow-y:auto">
				<el-radio-group v-model="elemntIndex">
					 <div v-for="(item,index) in tempList" class="margin-top">
						 <el-radio :label="index" :key="index">{{item.templateName}}</el-radio>
					 </div>
				</el-radio-group>
			</div>
             <div class=" text-center" slot="footer">
				<el-button @click="visibleTemp = false">取 消</el-button>
				<el-button @click="getTempFile" type="primary">提交</el-button>
			</div>
        </el-dialog>
		<!--  -->
		 
		</div>
</template>

<script>
	import {
		addTemplate,
		editTemplate,
		findTemplate
	} from '../../../api/template.js';
	import {
		addShopTemplate,
		updateShopTemplate,
		findShopTemplateByNo
	} from '../../../api/business.js';
	
	import setElement from '../business/setElement.vue'
	import uploads from '../../../components/common/uploads'
	import contracts from '../../page/mine/contracts';
	import vuedraggable from 'vuedraggable'
	import Order from '../../../components/common/order'
	import '../../../assets/css/contract.less'
	import pdfContainer from '../../common/pdfContainer';
	import {downloadFile,downloadFileTemp} from '../../../api';
	import {uuid} from '@/components/page/contract/signUtile.js'
	import Sortable from 'sortablejs';
	import {tempFindSceneList} from '../../../api/business.js'
	export default {
		components: {
			uploads,
			vuedraggable,
			Order,
			pdfContainer,
			contracts,
			setElement
		},
		data() {

        let disabledDate = date => {
	        return date.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
	    };
			return {
				tempId: "",
				sceneNo:'',
				type: "",
				fileList: [],

				model: {
					templateName: "",
					remark: "",
					signType:  false,
					checkList: [],
					status: 0,
					players: [],
					files: [],
					deadLine: '',
                	signProcess:0,//签署流程(0共同签署 1独立签署)
				},
				sendArr: [],
				 sendArr2: [],
				loading: false,
				selections: [],
				list: [
				// 	{
					 
				// 	fileName: '3.pdf',
				// 	status: 1,
				// 	fileId: "498638f63e894b19886179fda58fdf6c",
				// 	signSetting: "",
				// 	uid: '1',
				 
				// 	percentage:100,
				// 	pages: 7,
				// 	size: 1889663
				// }
				],
				list2: [],
				signProcess:-1,
				visiblePdfView:false,
				imgUrlInfo:[],
				pdfShowTag:false,
				conWidth:0,
				conHeight:0,
				pdfUrl: '',
				visibleUser:false,
				consType:"",//'one'单选  more多选
				consIndex:'',//需要修改的对象及index
				acceptType:'',
				timmerObj:{},
				fileObj:{},
				activeIndex:0,
				visibleSetElement:false,
				visibleTemp:false,
				elemntIndex:'',
				tempObj:{},
				muid:1,
				pickerOptions: {
				disabledDate
				},
				tempList:[]

			}
		},
		created() {
			this.getId();
			 
			if (this.tempId) {
				this.getById();
			}
			if(this.sceneNo){
				this.tempFindSceneList()
			}
			this.getType();
		},
		mounted() {
			this.rowDrop();
		},

		methods: {
			back() {
				this.$router.go(-1) //返回上一层
				// this.$router.push({ path: '/template' });
			},
			closeThis(){
				if(this.sceneNo){
					this.$router.push({ path: '/business' });
				}else{

					this.$router.push({ path: '/template' });
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
				if(!this.model.templateName){
					this.model.templateName = item.fileName.split(".")[0];
				}
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
				let item = this.list2[num];
				this.$set(item, 'fileId', res.data.id)
				setTimeout(()=>{

					this.$set(item, 'status', 1)
				},600)
				this.$set(item, 'status', 1)
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
			getPdfView(row){
				this.visiblePdfView = true;
				if(this.tempId){
					this.pdfUrl =  downloadFileTemp(row.fileId)// row.url;
				}else{

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
			// successAuth(res, file) {

			// 	let item = this.list[this.list.length - 1];
			// 	item.fileId = res.data.id;
			// 	item.status = 1;

			// },
			// errorAuth() {
			// 	let item = this.list[this.list.length - 1];
			// 	item.status = 2;
			// },
			// beforeUpload(files) {


			// 	let obj = {
			// 		fileName: files.name,
			// 		status: 0,
			// 		fileId: "",
			// 		signSetting: ""
			// 	}
			// 	this.list.push(obj)

			// },
			// successAuth2(res, file) {

			// 	let item = this.list2[this.list2.length - 1];
			// 	item.fileId = res.data.id;
			// 	item.status = 1;

			// },
			// errorAuth2() {
			// 	let item = this.list2[this.list2.length - 1];
			// 	item.status = 2;
			// },
			// beforeUpload2(files) {
			// 	if (this.list2.length == 5) {
			// 		this.$message.error("最多上传5个附属文件")
			// 		return false;
			// 	}
			// 	let obj = {
			// 		fileName: files.name,
			// 		status: 0,
			// 		fileId: "",
			// 		signSetting: ""

			// 	}
			// 	this.list2.push(obj)

			// },
			// 	addSignUser(type, acceptType) {
			//     this.acceptType = acceptType;
			//     if (type == 1) {
			//         this.dialogVisible2 = true;
			//         // this.visibleUser = true;

			//         return;
			//     }
			//     // this.dialogVisible = true;
			//     this.visibleUser = true;
			// },
			addSignUser(type,acceptType) {
				
				let len = this[acceptType].length + 1;
				let title = '参与方'
				let signType = 1;
				let roleType = 1;
				if(acceptType=='sendArr2'){
					title = '抄送方'
					signType =3;
					roleType =2;
				}
				let obj = {
					uuid : uuid(),
					name:title + len,
					type: type,
					requirement:0,
					signType:signType,
					roleType:roleType
					 
				}
				if (type==2) {
					obj.need = [0,1]
                    
                } else {
                    obj.need =0
                   
                }
				// obj.signType = signType ;
				this[acceptType].push(obj)
			},
			delFile(row, index) {
				this.list.splice(index, 1);
			},
			delFile2(index) {
				this.list2.splice(index, 1);
			},
			delFile3(index) {
				this.sendArr.splice(index, 1);
				let ind = 0;
				this.sendArr.forEach(item => {
					if (item.name.indexOf("签署方") != -1) {
						ind++
						item.name = "签署方" + ind
					}
				})
			},
			async tempAdd(type) {
				if (this.type == -1 || this.type == 2) {
					this.$router.push({
						path: '/template/setTemplate',
					query:{
						tempId:this.tempId,
						temType:this.type,
						sceneNo:this.sceneNo
						
					}
					});
					return false;
				}
				this.model.files = [] //模板文件对象数组
				let model = JSON.parse(JSON.stringify(this.model))
				let userArr = await  this.getUser();
				let {
					arr,
					tag
				} = this.getFile();
				// console.log(arr,tag)
				// return false;
				// let userArr = this.getUser();
			 
				model.files = arr;
				model.players = userArr;
				if (tag ) {

					this.$message.error(tag)
					return false;
				}
				if (!userArr) {
					// this.$message.error("请检查签署要求是否选择完整")
					return false;
				}
				this.$refs.agform.validate(async valid => {
					if (valid) {
						// if (type == 1) {
							 
						// 	if (userArr.length == 0) {
						// 		this.$message.error("请添加签署对象")
						// 		return false;
						// 	}
						// }
						let data = ""
						 if(model.signType){
							model.signType = 0;
						}else{
							model.signType = 1;
                    	}
						if(this.sceneNo){
							model.sceneNo = this.sceneNo;

							if (this.tempId) {
								model.templateNo = this.tempId;
								let res = await updateShopTemplate(model);
								data = res.data;
							} else {
	
								let res = await addShopTemplate(model);
								data = res.data;
							}
						}else{

							if (this.tempId) {
								model.templateNo = this.tempId;
								let res = await editTemplate(model);
								data = res.data;
							} else {
	
								let res = await addTemplate(model);
								data = res.data;
							}
						}

						// this.$store.dispatch('setTempId', data.id);
						this.tempId = data.templateNo;
						this.$router.push({
								query: {...this.$route.query, tempId: data.templateNo} 
							})
 

						// this.getId();
						if (type == 0) {
							this.$message.success("保存成功");
							if(this.sceneNo){
								// this.tempId = data.templateNo
								this.getById();
							}else{

								this.setData(data)
							}
							
						} else {
							this.$message.success("已保存")
							this.$router.push({
								path: '/template/setTemplate',
								query:{
									tempId:data.templateNo,
									temType:0,
									sceneNo:this.sceneNo
								}
							})
						}

					}
				})
			},
			// getFile() {
			// 	let arr = [];
			// 	let tag = true;
			// 	if (this.list.length == 0) {
			// 		tag = false;
			// 	} else {

			// 		this.list.forEach(item => {
			// 			let obj = {}
			// 			obj.fileId = item.fileId,
			// 				obj.id = item.id;
			// 			obj.fileType = 1;
			// 			obj.signSetting = item.signSetting
			// 			arr.push(obj)
			// 		})
			// 	}
			// 	this.list2.forEach(item => {
			// 		let obj = {}
			// 		obj.fileId = item.fileId,
			// 			obj.id = item.id;
			// 		obj.fileType = 2;
			// 		obj.signSetting = item.signSetting
			// 		arr.push(obj)
			// 	})
			// 	return {
			// 		arr,
			// 		tag
			// 	};
			// },
			getFile() {
				let arr = [];
				let tag = '';
				let proChangeTag = this.signProcess==this.model.signProcess
				if (this.list.length == 0) {
					tag = '请上传模板文件';
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
						if(this.sceneNo){
							obj.vars = this.list.length==1?item.vars:''//文件多余1
						}
						obj.pages = item.pages;
						obj.size = item.size;
						arr.push(obj)
					})
					 
				}
			 
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
									roleType:1,//签署方
									type: item.type,
									processType:this.model.signProcess==1?'1':'0',
									requirement:item.requirement,
									signType:item.signType
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
								
								} 
								// else if (obj.type == 3||obj.type==6){
								// 	obj.orgName = item.orgName;
								// 	obj.creditCode = item.creditCode;
								// 	obj.method =9;
								
								// }
								arr.push(obj);
							})
							if(this.sendArr2.length>0){
								this.$refs['agform-send2'].validate(async valid => {
									if (valid) {
										this.sendArr2.forEach((item, index) => {
											let obj = {
												account:item.account,
												name:item.name,
												type:item.type,
												roleType:2,//审批方
												method :-1,
												sort:-1,
												signType:3
			
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
			// getUser() {
			// 	let arr = [];
			// 	let tag = true;
			// 	if (this.sendArr.length == 0) {
			// 		return [];
			// 	}
				 
			// 	this.sendArr.forEach((item, index) => {
			// 		let obj = {};
			// 		obj.name = item.name;
			// 		obj.type = item.type;
			// 		if (item.id) {
			// 			obj.id = item.id;
			// 		}
			// 		if (item.code) {
			// 			obj.code = item.code;
			// 		}
			// 		if (this.model.signType == 0) {
			// 			obj.sort = index + 1
			// 		} else {
			// 			obj.sort = -1
			// 		}
			// 		if (obj.type == 1) {
			// 			obj.method = 0;
			// 		} else {
			// 			if (item.checkList.length == 2) {
			// 				obj.method = 2;
			// 			} else if (item.checkList.length == 0) {
			// 				tag = false;
			// 				obj.method = -1;
			// 			} else {
			// 				if (item.checkList[0] == 2) {
			// 					obj.method = 1;
			// 				} else {
			// 					obj.method = 0;
			// 				}
			// 			}
			// 		}
			// 		arr.push(obj)
			// 	})
			// 	if (tag) {
			// 		return arr;
			// 	} else {
			// 		return false;
			// 	}
			// },
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
			getId(tag) {
				this.tempId = this.$route.query.tempId//this.$store.getters.tempId;
				this.sceneNo = this.$route.query.sceneNo
			},
			getType() {
				this.type = this.$route.query.tempType;//this.$store.getters.tempType;
			 
			},
			async getById() {
				let data = ''
				if(this.sceneNo){
					let res = await findShopTemplateByNo({
						templateNo: this.tempId
					});
					data = res.data;
				}else{

					let res = await findTemplate({
						templateNo: this.tempId
					});
					data = res.data;
				}
				
				 data.signType==1?data.signType=false:data.signType=true
				 this.model = data;
				this.setData(data)
				// this.$set(this.sendArr, index, item)

			},
			setData(data) {
				 
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
						// item.signType = 0;
						// item.requirement = 
						if (item.type == 1) {
							this.$set(item, 'need', item.method);
							// sendArrList.push(item);
						
						}else if(item.type==2){
							if(item.method!=2){

								this.$set(item, 'need', [item.method]);
							}else{
								this.$set(item, 'need', [0,1]);
							}
							// sendArrList.push(item);
						} 

						if(item.roleType==1){
							sendArrList.push(item);
						}else if(item.roleType==2){
							sendArrList2.push(item);
						}
						// else if(item.type==3){
						// 	if (item.orgName) {
						// 		item.type = 2;
						// 	} else {
						// 		item.type = 1;
						// 	}
						// 	sendArrList2.push(item);
						// }
						// else if(item.type==6){
						// 	if (item.orgName) {
						// 		item.type = 2;
						// 	} else {
						// 		item.type = 1;
						// 	}
						// 	item.typeWay = 6
						// 	sendArrList.push(item);
						// }
					});
				}

				this.sendArr = sendArrList;
				this.sendArr2 = sendArrList2;
        
			},
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
				}else if(obj.key=='signType'){
					if(value==1){
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
			contsShow(index,keyType,oneMoreType){
				this.consType = oneMoreType;
				this.acceptType = keyType;
				this.consIndex = index
				this.visibleUser = true;
				 //需要修改的对象及index
			},
			addElement(item,index){
				this.muid = uuid();
				this.fileObj = item;
				this.activeIndex = index;
				this.visibleSetElement = true;
				this.$nextTick(()=>{
					this.$refs.setElement.getFileView()
				})
			},
			setFile(rects,elementShort){
			 
				this.$set(this.list[this.activeIndex],'vars',rects);
				this.$set(this.list[this.activeIndex],'elementShort',elementShort);
				elementShort
				this.visibleSetElement=false
			},
		 
			setConts(arr) {
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
						item.signType = 1 ;
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
			signMean(val){
				console.log(val,"val")
				if(val==1){
					this.model.signType = false;
					this.sortChange(false)
				}else{
					this.model.signType = true;
				}
			},
			verifyre(rule, val, callback,{index,row,arrKey}){
				if(!row.account){
					console.log(row.account,"row.account")
					callback()
					return false;
				}
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
			async tempFindSceneList(){
				let {data} = await tempFindSceneList({
					pageNum: 1,
					pageSize: 99999999,
					sceneTypeNo: "",
					useType: 2
				});
       			 this.tempList = data.list
			},
			getTempFile(){
				
				
				let obj = this.tempList[this.elemntIndex];
				let objReal = {
					fileName: obj.templateName,
					status: 1,
					fileId: obj.fileId,
					signSetting: "",
					vars:obj.vars,
					uid: uuid(),
					size:obj.size,
					percentage:100,
					pages:obj.pages
				}
				this.list.push(objReal)
				this.visibleTemp = false;

			}
		}
	}
</script>
<style lang="less">
	.tmy {
		height: 40px;
		line-height: 40px;
	}

	.delcon {
		float: right;
		width: 20px;
		height: 20px;
		cursor: pointer;
		position: relative;
		top: -28px;
	}

	.delcon:hover {
		color: red;
	}

	.upbtn {
		padding: 9px 30px;
		border: 1px dashed #ccc;
	}

	.delbtn {
		position: absolute;
		right: 5px;
		top: 8px;
		color: #ccc;
		cursor: pointer;

	}

	.delbtn:hover {
		color: red;
	}

	.dags {
		cursor: move
	}
</style>
