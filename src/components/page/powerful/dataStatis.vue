<template>
	<div class="padding">
		<el-card>
			<div class="data-box">
				<div>
					<span>今日总调用量</span>
					<span>{{logindex.todayUseIndex}}</span>
				</div>
				<div>
					<span>今日调用成功量</span>
					<span>{{logindex.todayUseSucceedIndex}}</span>
				</div>
				<div>
					<span>累计总调用量</span>
					<span>{{logindex.allUseIndex}}</span>
				</div>
				<div>
					<span>累计调用成功量</span>
					<span>{{logindex.allUseSucceedIndex}}</span>
				</div>
			</div>
			<div class="searchBox">
				<div>
					<!-- <span class="tit">产品名称</span>
					<el-input v-model="search.name" placeholder="产品名称">
					</el-input> -->
					<span class="tit">调用时间</span>
					<el-date-picker :append-to-body="false" v-model="search.time" type="daterange" format="yyyy-MM-dd"
						start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-button class="btn-check" type="primary" icon="el-icon-search" @click="searchInfo(1)">查询
					</el-button>
					<el-button class="btn-check" type="info" @click="searchInfo(2)" icon="el-icon-refresh">重置
					</el-button>
					<el-button class="btn-check" @click="exportLogDay" type="primary">导出
					</el-button>
				</div>
			</div>

			<div style="margin-top: 20px;min-height:50vh">
				<el-table class="com-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" size="small"
					border style="width: 100%">
					<el-table-column prop="createDate" label="日期(按日统计)">
					</el-table-column>
					<el-table-column prop="count" label="总调用量">
					</el-table-column>
					<el-table-column prop="successCount" label="成功总调用量">
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
		findLogIndex,
		findLogDayIndexList,
		exportLogDayIndex
	} from '../../../api/powerful.js'
	export default {
		data() {
			return {
				search: {},
				params: {},
				pageSize: 1,
				total: 0,
				tableData: [],
				dentify: {},
				logindex: {}
			};
		},
		created() {
			this.getlogindex();
			this.getList(1);
		},

		methods: {
			getlogindex(v) {
				findLogIndex(this.params).then(res => {
					this.logindex = res.data
				});
			},
			currchange(v) {
				this.pageSize = v;
				this.getList();
			},
			searchInfo(v) {
				if (v == 1) {
					this.params = {};
					// this.search.name ? this.params.apiName = this.search.name : '';
					this.search.time ? this.params.startTime = this.getLocalTime(this.search.time[0]) : '';
					this.search.time ? this.params.endTime = this.getLocalTime(this.search.time[1]) : '';
					this.pageSize = 1;
					this.getList();
				} else {
					this.search = {}
				}
			},
			//获取列表
			getList(v) {
				if(v){
					let data = new Date();
					this.params.startTime=this.getLocalTime(data)
					this.params.endTime=this.getLocalTime(data)
					console.log(this.params)
				}
				this.params.pageNum = this.pageSize;
				this.params.pageSize = 10;
				findLogDayIndexList(this.params).then(res => {
					this.tableData = res.data.list;
					this.total = res.data.total;
				});
			},
			exportLogDay(){
				this.params.pageNum = this.pageSize;
				this.params.pageSize = 10;
				exportLogDayIndex(this.params)
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
	.data-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;

		div {
			width: 23%;
			border: 1px solid #ddd;
			padding: 20px 0;
			border-radius: 5px;

			span {
				display: block;
				text-align: center;
				padding: 5px 0;
			}

			span:last-child {
				color: #1F81E5;
			}
		}
	}

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
