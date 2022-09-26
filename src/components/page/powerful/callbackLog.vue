<template>
	<div class="padding">
		<el-card>
			<div class="searchBox">
				<div>
					<span class="tit">产品名称</span>
					<el-input v-model="search.name" placeholder="产品名称">
					</el-input>
					<span class="tit">调用时间</span>
					<el-date-picker :append-to-body="false" v-model="search.time" type="daterange" format="yyyy-MM-dd"
						start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-button class="btn-check" type="primary" icon="el-icon-search" @click="searchInfo(1)">查询
					</el-button>
					<el-button class="btn-check" type="info" @click="searchInfo(2)" icon="el-icon-refresh">重置
					</el-button>
					<el-button class="btn-check" @click="exportCallBack" type="primary">导出
					</el-button>
				</div>
			</div>

			<div style="margin-top: 20px;min-height:50vh">
				<el-table class="com-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" size="small"
					border style="width: 100%">
					<el-table-column prop="apiName" label="产品名称">
					</el-table-column>
					<el-table-column prop="status" label="回调状态">
						<template slot-scope="scope">
							{{scope.row.status==0?'成功':'失败'}}
						</template>
					</el-table-column>
					<el-table-column prop="callBackUrl" label="回调地址">
					</el-table-column>
					<el-table-column prop="createTime" label="调用时间">
					</el-table-column>
					<el-table-column prop="fromIp" label="调用IP地址">
					</el-table-column>
				</el-table>
				<el-pagination class="pageBox" @current-change="currchange" layout="total, prev, pager, next, jumper" background
					:total="total">
				</el-pagination>
			</div>
		</el-card>

	</div>
</template>

<script>
	import {
		callbackLogList,exportCallBackLog
	} from '../../../api/powerful.js'
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
					this.search.time ? this.params.startTime = this.getLocalTime(this.search.time[0]) : '';
					this.search.time ? this.params.endTime = this.getLocalTime(this.search.time[1]) : '';
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
				callbackLogList(this.params).then(res => {
					this.tableData = res.data.list;
					this.total = res.data.total;
				});
			},
			exportCallBack(){
				this.params.pageNum = this.pageSize;
				this.params.pageSize = 10;
				exportCallBackLog(this.params)
			},
			getLocalTime(ns) {
				var time = new Date(ns);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				return y + '-' + this.add0(m) + '-' + this.add0(d);
			},
			add0(m) {
				return m < 10 ? '0' + m : m
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
		text-align: left;
		margin-top: 10px;
	}

	.diaform {
		.el-select {
			width: 100%;
		}
	}
</style>
