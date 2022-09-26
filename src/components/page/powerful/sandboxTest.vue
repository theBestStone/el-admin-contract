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
					<el-table-column label="操作" width="160px" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="download(scope.row)">接口文档</el-button>
						</template>
					</el-table-column>
					<el-table-column label="沙箱测试" width="160px" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="jumpInfo(scope.row)">进入测试</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="apiUrl" label="正式地址">
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
		openTestList,
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
				openTestList(this.params).then(res => {
					this.tableData = res.data.list;
					this.total = res.data.total;
				});
			},


			//申请
			jumpInfo(v) {
				this.$router.push({
					path: "/powerful/sandboxTestin",
				    query:{
				        id:v.id
				    }
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
		text-align: left;
		margin-top: 10px;
	}

	.diaform {
		.el-select {
			width: 100%;
		}
	}
</style>
