<template>
	<div class="padding">
		<el-card>
			<div class="send-box">
				<div class="send-l">
					<span class="tit">
						{{urlInfo.apiName}}
					</span>

					<el-form :model="infoLists" ref="infoLists" class="over-box" name="over-box">
						<div v-for="(item,index) in infoLists" class="line">
							<!-- <div v-if="infoLists[index].jsonStr=='pre'">{</div> -->
								<span class="span-box" :style="'padding-left:'+item.level*20+'px;'">
									
									<span v-if="item.fieldIsRequired==1" style="color: red;">*</span>
									<span>{{item.filed}}</span>
									
									<el-tooltip style="diaplay:inline" effect="dark" :content="item.filedName"
										placement="top">
										<i class="el-icon-question" style="color:#1257FF;margin-left:3px;" />
									</el-tooltip>
								</span>
							<!-- <div v-if="infoLists[index].jsonStr=='end'">}</div> -->
							<el-form-item :prop="item.filed" verify v-if="item.fieldIsRequired==1&&item.children.length==0">
								<el-input v-if="item.fieldType!='File'&&item.fieldType!='JSON'" v-model="infoLists[item.filed]" @input='inputc'>
								</el-input>
								<el-input type="textarea" v-if="item.fieldType!='File'&&item.fieldType=='JSON'" v-model="infoLists[item.filed]" @input='inputc'>
								</el-input>
								<el-upload
									class="upload-demo"
									v-if="item.fieldType=='File'"
									:show-file-list="false"
									:name="item.filed"
									:on-change='getFile'
									:auto-upload="false">
									<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
								</el-upload>
							</el-form-item>
							<el-form-item  :prop="item.filed" v-if="item.fieldIsRequired==1&&item.children.length!=0" style="position:relative;">
								<el-input disabled></el-input>
							</el-form-item>
							<!-- <div class="fl" >{{infoLists[index].jsonStr}}</div> -->
							<el-form-item  :prop="item.filed" v-if="item.fieldIsRequired==0">
							 
								 
								<el-input v-if="item.fieldType!='File'&&item.fieldType!='JSON'" v-model="infoLists[item.filed]" @input='inputc'>
								</el-input>
								<el-input type="textarea" v-if="item.fieldType!='File'&&item.fieldType=='JSON'" v-model="infoLists[item.filed]" @input='inputc'>
								</el-input>
								<el-upload
									class="upload-demo"
									v-if="item.fieldType=='File'"
									:show-file-list="false"
									:name="item.filed"
									:on-change='getFIle'
									:auto-upload="false">
									<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
								</el-upload>
							</el-form-item>
						 
						</div>
					</el-form>



					<el-button @click="callApi" type="primary" style="float: right;">调用</el-button>
				</div>
				<div class="send-r">
					<span class="tit">请求头信息摘要</span>
					<div>
						{{headerinfo}}
					</div>
					<span class="tit">请求内容</span>
					<div>
						{{backinfo}}
					</div>
					<span class="tit">返回结果</span>
					<div>
						{{backresult}}
					</div>
				</div>
			</div>
		</el-card>

	</div>
</template>

<script>
	import {
		openApiDetail,
		openApitop,
		openApitog
	} from '../../../api/powerful.js'
	export default {
		components: {

		},
		data() {
			return {
				id: '',
				infoDatas: [],
				infoLists: [],
				requestMethod: '',
				apiUrl: '',
				backinfo: null,
				backresult: null,
				headerinfo: null,
				urlInfo: {},
				edata:{},
				FileTag:false,
			};
		},
		created() {
			this.id = this.$route.query.id;
			this.getList()
		},

		methods: {
			//获取列表
			getList() {
				openApiDetail({
					id: this.id
				}).then(res => {
					// res.data.params[5].children[2].children=[
					// 	{filed:'cs',fieldIsRequired:0,children:[]},
					// 	{filed:'cs2',fieldIsRequired:1,children:[]},
					// ]
					this.infoDatas = res.data.params;
					this.infoLists = [];
					this.datachange(res.data.params,0,this.infoLists)
					console.log(this.infoLists,"infoLists")
					this.urlInfo = res.data
				 
					this.apiUrl = res.data.apiUrl;
					this.requestMethod = res.data.requestMethod;
				});
			},
			jsonArr(item){
				console.log(item,"item");
				item = JSON.parse(JSON.stringify(item));
				
				let tagIndex = item.children.length+1||1;
				// splice
			 
				this.infoLists.forEach((o,index) =>{
					if(o.code==item.code){
						tagIndex += index;
					}
					if(item.code==o.parentCode){

					}
				})
				let arr1 = this.infoLists.slice(0,tagIndex);
				let arr2 = []
				if(tagIndex<this.infoLists.length){
					arr2 =  this.infoLists.slice(tagIndex,this.infoLists.length);
				}
				console.log(arr1,tagIndex)
			 
				this.datachange([item],item.level,arr1);
				arr1.push(...arr2);
				console.log(arr1)
				this.infoLists = arr1;
				// console.log(this.infoLists.slice(0,tagIndex),"tagIndex",this.infoLists)
			},
			datachange(v,level,arr,jsonTag){
				let len = v.length
				v.forEach((item,index) => {
					item.level = level;
					if(jsonTag){
						if(index==0){
							item.jsonStr = 'pre'
						}else if(index==len-1){
							item.jsonStr = 'end'
						}
					}
					let toTag = false;
					if(item.fieldType=="File"){
						this.FileTag = true;
					}else if(item.fieldType=="JSON"){
						toTag = true;
					}
					 
					arr.push(item)
					if (item.children.length != 0) {
						this.datachange(item.children,level+1,arr,toTag)
					}
				})
			},
			enddata(v,n){
				for (let i = 0; i < v.length; i++) {
					if(v[i].fieldType=='JSON'){
					 
						try {
							 
							n[v[i].filed] = JSON.parse(this.infoLists[v[i].filed].replace(/\s+/g,""))
						} catch (error) {
							n[v[i].filed] = []
						}
					}else{

						n[v[i].filed] = this.infoLists[v[i].filed]||''
					}
					if(v[i].children.length!=0){
						n[v[i].filed]={}
						this.enddata(v[i].children,n[v[i].filed])
					}
				}
			},
		 
			callApi() {
				let _this = this;
				let params = {};
				let p = {};
				// console.log(document.forms.namedItem('over-box'),"this.infoDatas")
				// let ab = new FormData(document.forms.namedItem('over-box'))
				// console.log(ab.userName)
				// if(this.FileTag){
				// 	this.endFormData(this.infoDatas,this.edata);
				// }else{
				this.enddata(this.infoDatas,this.edata);

				// }
			 
				this.$refs.infoLists.validate(valid => {
					if (valid) {
						params.info = this.edata;
						params.url = this.apiUrl;
						this.backinfo = params.info;
						let req = new XMLHttpRequest();
						req.open('GET', document.location, false);
						req.send(null);
						this.headerinfo = req.getAllResponseHeaders().toLowerCase();

						if ((this.requestMethod).toLocaleUpperCase() == 'GET') {

							openApitog(params).then(res => {
								_this.backresult = res.data;
							}).catch(res => {
								_this.backresult = res;
							});
						} else {
							openApitop(params).then(res => {
								_this.backresult = res.data;
							}).catch(res => {
								_this.backresult = res;
							});
						}
					} else {
						return false;
					}
				});

			},
			inputc() {
				console.log(1)
				this.$forceUpdate()
			},
			getFile(e,a){
				console.log(e,a)
			}
		}
	};
</script>
<style lang="less">
	.send-box {
		display: flex;
		justify-content: space-between;

		.send-l {
			width: 35%;
			// padding-right: 40px;
			height: 80vh;
			overflow: hidden;
		}
		.over-box{
			overflow-y: scroll;
			height: 70vh;
			position: relative;
			right: -20px;
			padding-right: 20px;
		}
		.line{
			display: flex;
			line-height: 32px;
			.span-box{
				line-height: 32px;
				display: flex;
				min-width: 120px;
				justify-content: flex-end;
				padding-right: 10px;
				i{
					line-height: 32px;
				}
			}
			.el-form-item{
				width: 70%;
			}
		}

		.send-r {
			width: 63%;

			div {
				border: 1px solid #ddd;
				border-radius: 5px;
				height: 15vh;
				word-wrap: break-word;
				overflow-y: scroll;
				margin-bottom: 20px;
				padding: 20px;
			}
		}

		.tit {
			margin-bottom: 20px;
			display: inline-block;
		}

		.el-input {
			width: 100%;
		}
		.addarr{
			color:#1257FF;font-size:30px;position:absolute;
			right:0;
			top:2px;
			cursor: pointer;
		}
	}
</style>
