<template>
	<div class="padding">
		<el-card>
			<div class="searchBox">
				<div>
					<span class="tit">产品名称</span>
					<el-input v-model="search.name" placeholder="产品名称">
					</el-input>
					<el-button class="btn-check" type="primary" icon="el-icon-search" @click="searchInfo(1)">查询
					</el-button>
					<el-button class="btn-check" type="info" @click="searchInfo(2)" icon="el-icon-refresh">重置
					</el-button>
				</div>
			</div>

			<div style="margin-top: 20px;min-height:50vh">
				<el-table class="com-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" size="small"
					border style="width: 100%">
					<el-table-column prop="apiName" label="产品名称">
					</el-table-column>
					<el-table-column prop="apiDesc" label="产品简述">
					</el-table-column>
					<el-table-column prop="apiNo" label="产品编码">
					</el-table-column>
					<el-table-column prop="applyStatus" label="申请状态">
					</el-table-column>
					<el-table-column prop="remark" label="申请状态原因">
					</el-table-column>
					<el-table-column prop="applyTime" label="申请时间">
					</el-table-column>

					<el-table-column label="操作" width="220px" align="center">
						<template slot-scope="scope">
							<el-button size="mini" v-if="scope.row.applyStatus != '已申请'"
								type="primary" @click="applyOpen(scope.row)">申请</el-button>
							<el-button size="mini" type="primary" @click="download(scope.row)">接口文档</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination class="pageBox" @current-change="currchange" background
					:total="total" layout="total, prev, pager, next, jumper">
				</el-pagination>
			</div>
		</el-card>

	</div>
</template>

<script>
	import {
		apiList,
		applyOpenApi
	} from '../../../api/powerful.js'
	import {
		downloadFile
	} from '../../../api/index.js'
	export default {
		data() {
			return {
				search: {},
				params: {},
				pageSize: 1,
				total: 0,
				tableData: [],
				dentify: {}
			};
		},
		created() {
			this.getList();
		},

		methods: {
			currchange(v) {
				this.pageSize = v;
				this.getList();
			},
			searchInfo(v) {
				if (v == 1) {
					this.params = {};
					this.search.name ? this.params.apiName = this.search.name : '';
					this.pageSize = 1;
					this.getList();
				} else {
					this.search = {}
				}
			},
			//获取列表
			getList() {
				this.params.pageNum = this.pageSize;
				this.params.pageSize = 10;
				apiList(this.params).then(res => {
					res.data.list.forEach(item => {
						if (item.applyStatus == 0) {
							item.applyStatus = "审核中"
						}
						if (item.applyStatus == 1) {
							item.applyStatus = "已申请"
						}
						if (item.applyStatus == 2) {
							item.applyStatus = "审批驳回"
						}
						if (item.applyStatus == -1) {
							item.applyStatus = "未申请"
						}
					})
					this.tableData = res.data.list;
					this.total = res.data.total;
				});
			},


			//申请
			applyOpen(v) {
				applyOpenApi({
					apiId: v.id
				}).then(res => {
					this.$message.success('申请成功');
					this.getList();
				});
			},

			download(v) {
				let file = downloadFile(v.fileId);
				window.location.href = file;
			},
		}
	};
</script>
<style lang="less">
	.searchBox {
		.tit {
			margin: 0 10px 0 20px;
			display: inline-block;
		}

		.tit:first-child {
			margin-left: 0;
		}

		.el-input {
			width: 240px;
		}
	}

	.btn-check {
		margin-left: 20px;
	}

	.pageBox {
		text-align: left!important;
		margin-top: 10px;
	}

	.diaform {
		.el-select {
			width: 100%;
		}
	}
</style>
