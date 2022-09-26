<template>
	<div class="padding">
		<el-card>
			<div class="count-box">
				<div>
					<span class="tit">企业名称</span>
					<el-input v-model="search.entName" :disabled="true" placeholder="企业名称">
					</el-input>
				</div>
				<div>
					<span class="tit">企业编号</span>
					<el-input v-model="search.eid" :disabled="true" placeholder="企业编号">
					</el-input>
				</div>
				<div>
					<span class="tit">企业邮箱</span>
					<el-input v-model="search.email" :disabled="true" placeholder="企业邮箱">
					</el-input>
				</div>
				<div  style="justify-content: initial;">
					<span class="tit">appKey</span>
					 <div>{{search.appKey}}</div>
					 <el-button class="tag-read" type="primary" :data-clipboard-text="search.appKey" @click="exportLogDay">复制</el-button>
				</div>
				<div>
					<span class="tit">公钥</span>
					<el-input v-model="search.publicKey" placeholder="公钥" type="textarea" :rows="6">
					</el-input>
				</div>
				<div>
					<span class="tit">私钥</span>
					<el-input v-model="search.privateKey" placeholder="私钥" type="textarea" :rows="6">
					</el-input>
				</div>
			</div>
			<div style="margin: 10px 0;">
				<el-button @click="generateEnt" type="primary">重新生成
				</el-button>
				<span style="font-size: 12px;margin-left: 20px;vertical-align: bottom;">重新生成后历史公钥私钥将立即失效</span>
			</div>
		</el-card>

	</div>
</template>

<script>
	import {
		findOpenEntKey,
		generateEntKey
	} from '../../../api/powerful.js'
	import Clipboard from 'clipboard'
	export default {
		data() {
			return {
				search:{},
			};
		},
		created() {
			this.getList();
		},

		methods: {
			
			//获取列表
			getList() {
				findOpenEntKey({}).then(res => {
					this.search = res.data;
				});
			},
			generateEnt() {
				let _this = this;
				generateEntKey({}).then(res => {
					_this.getList();
				});
			},
			exportLogDay(){
				let clipboard = new Clipboard('.tag-read')
				   clipboard.on('success', e => {
				      console.log('复制成功')
				   })
				    clipboard.on('error', e =>{
				     console.log('该浏览器不支持复制')
				   })
			}
		}
	};
</script>
<style lang="less">
	.count-box{
		div{
			display: flex;
			justify-content: space-between;
			height: 32;
			line-height: 32px;
			margin-bottom: 10px;
		}
		.tit {
			width: 100px;
			display: inline-block;
		}
		
		.el-input {
			width: 100%;
		}
		.tag-read{
			height: 32px;
			margin-left: 20px;
		}
	}
</style>
