<template>
	<div>
		<div class="padding ">
			<el-card class="content90">
				<div slot="header" class="clearfix">
					<span>系统消息</span>
				</div>
				<div class="container">
					<el-tabs v-model="message">
						<el-tab-pane label="未读消息" name="first">
							<el-table :data="unread" :show-header="false" style="width: 100%">
								<el-table-column>
									<template slot-scope="scope">
										<span class="message-title"
											@click="checkInfo(scope)">{{scope.row.notifyTitle}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="notifyTime" width="280"></el-table-column>
								<el-table-column width="120">
									<template slot-scope="scope">
										<el-button size="mini" @click="handleRead(scope.row)">标为已读</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination class="pageBox" @current-change="currchange" layout="prev, pager, next" background
								:total="total">
							</el-pagination>
							<div class="handle-row">
								<el-button type="primary" @click="allRead">全部标为已读</el-button>
							</div>
						</el-tab-pane>
						<el-tab-pane label="已读消息" name="second">
							<template v-if="message === 'second'">
								<el-table :data="read" :show-header="false" style="width: 100%">
									<el-table-column>
										<template slot-scope="scope">
											<span class="message-title"
												@click="checkInfo(scope)">{{scope.row.notifyTitle}}</span>
										</template>
									</el-table-column>

									<el-table-column prop="notifyTime" width="150"></el-table-column>
								</el-table>
								<el-pagination class="pageBox" @current-change="currchanger" layout="prev, pager, next" background
									:total="totalr">
								</el-pagination>
							</template>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-card>

		</div>

		<el-dialog title="消息" :visible.sync="conSts" v-dialogDrag width="620px">

			<div class="notify-box">
				<div>{{confirma.notifyTitle}}</div>
				<div>{{confirma.notifyTime}}</div>
				<div>
					{{confirma.notifyContext}}
					<!-- <span @click="jumpTo">查看</span> -->
				</div>
			</div>

			<div slot="footer" class="dialog-footer text-center">
				<el-button @click="conSts = false">关 闭</el-button>
				<el-button @click="jumpTo" type="primary">查看</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {notifyList,notifyRead,notifyReadAll} from '../../../api/notify.js'
	export default {
		name: 'tabs',
		data() {
			return {
				message: 'first',
				conSts: false,
				confirma: {},
				unread: [],
				read: [],
				path:'/website',
				pageNum:1,
				total: 0,
				pageNumr:1,
				totalr: 0,
			}
		},
		created() {
			this.getList();
			this.getListr();
		},
		methods: {
			jumpTo(){
				let notifyType = this.confirma.notifyType;
				if(notifyType == 'REGISTER_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'PERSONAL_REALNAME_AUTH_OK_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'PERSONAL_REALNAME_AUTH_FAIL_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'ORG_REALNAME_AUTH_OK_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'ORG_REALNAME_AUTH_FAIL_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'USER_PHONE_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'ACCOUNT_CANCEL_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'JOIN_ORG_CONMIT_EVENT'){
					this.$router.push('/mine/account')
				}else if(notifyType == 'JOIN_ORG_OK_EVENT'){
					this.$router.push('/company/userManage')
				}else if(notifyType == 'USER_JOIN_VERIFY_EVENT'){
					this.$router.push('/company/userManage')
				}else if(notifyType == 'SEAL_WAIT_VERIFY_EVENT'){
					this.$router.push('/company/signlist')
				}else if(notifyType == 'SIGN_START_EVENT'||notifyType == 'SIGN_FINISH_EVENT'||notifyType == 'SIGN_EXPIRE_EVENT'||notifyType == 'SIGN_REFUSE_EVENT'||notifyType == 'SIGN_CANCEL_EVENT'||notifyType == 'WAIT_SIGN_EVENT'||notifyType == 'WAIT_SIGN_EXPIRE_EVENT'||notifyType == 'WAIT_SIGN_WOULD_EXPIRE_EVENT'||notifyType == 'WAIT_SIGN_REFUSE_EVENT'||notifyType == 'WAIT_SIGN_CANCEL_EVENT'||notifyType == 'WAIT_SIGN_FINISH_EVENT'){
					this.$router.push('/contract')
				}
	   
			},
			currchange(v) {
				this.pageNum = v;
				this.getList();
			},
			currchanger(v) {
				this.pageNumr = v;
				this.getListr();
			},
			getList(){
				let params = {
					pageNum : this.pageNum,
					pageSize : 10,
					sourceType : 1,
					readStatus : 0,
				}
				notifyList(params).then(res => {
					res.data.list.forEach(item=>{
						item.sts = 1;
					})
					this.unread = res.data.list;
					this.total = res.data.total;
				});
			},
			getListr(){
				let params = {
					pageNum : this.pageNumr,
					pageSize : 10,
					sourceType : 1,
					readStatus : 1,
				}
				notifyList(params).then(res => {
					this.read = res.data.list;
					this.totalr = res.data.total;
				});
			},
			//标记已读
			handleRead(v) {
				notifyRead({id:v.id}).then(res => {
					this.getList();
					this.getListr();
				});
			},
			//全部已读
			allRead(v) {
				notifyReadAll({}).then(res => {
					this.getList();
					this.getListr();
				});
			},
			//查看消息
			checkInfo(v) {
			 
				this.conSts = true;
				this.confirma = v.row;
				if(v.row.sts == 1){
					notifyRead({id:v.row.id}).then(res => {});
				}
			},
		},
		computed: {
			unreadNum() {
				return this.unread.length;
			}
		},
		watch: {
			conSts(v) {
				if(!v&&this.confirma.sts == 1){
					this.getList();
					this.getListr();
				}
			}
		}
	}
</script>

<style lang="less">
	.message-title {
		cursor: pointer;
	}

	.handle-row {
		margin-top: 10px;
	}

	.notify-box {
		div:first-child {
			text-align: center;
			font-size: 16px;
			margin-bottom: 20px;
			color: #20A0FF;
		}
		div:nth-child(2) {
			text-align: right;
			// padding-right: 20px;
			margin-bottom: 15px;
		}
		div:last-child {
			text-align: justify;
			line-height: 30px;
			text-indent:20px;
			span{
				display: inline-block;
				font-size: 14px;
				color: #20A0FF;
			}
		}
	}
	.pageBox{
		text-align: right;
		margin-top: 10px;
	}
</style>
