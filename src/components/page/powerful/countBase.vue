<template>
	<div class="padding">
		<el-card>
			<div class="base-box">
				<div class="json-c">
					<span class="tit">选择文件</span>
					<div>
						<uploads @beforeUpload="openBrowse" :btnTitle="'上传文件'" :type="'primary'"></uploads>
					</div>
				</div>
				<div class="json-c">
					<span class="tit">base64</span>
					<div class="base-to">{{dataURL}}</div>
					<div class="btn-box">
						<el-button @click="dataURL = ''" type="primary">清空</el-button>
						<el-button class="tag-read" type="primary" :data-clipboard-text="dataURL" @click="exportLogDay">复制</el-button>
					</div>
				</div>
			</div>
		</el-card>

	</div>
</template>

<script>
	import uploads from '../../common/uploads.vue'
	import Clipboard from 'clipboard'

	export default {
		components: {
			uploads,
		},
		data() {
			return {
				dataURL: '',
			};
		},
		created() {

		},

		methods: {
			openBrowse(file) {
				let _this = this;
				let fileReader = new FileReader();
				fileReader.readAsDataURL(file);
				fileReader.onload = function(ev) { //文件读取成功完成时触发
					_this.dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
				}
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
	.base-box {
		display: flex;
		justify-content: space-between;

		.json-c {
			width: 48%;
			height: auto;
		}

		.tit {
			margin-bottom: 20px;
			display: inline-block;
		}

		.base-to {
			height: 60vh;
			border: 1px solid #ddd;
			border-radius: 5px;
			text-align: justify;
			word-wrap: break-word;
			overflow-y: scroll;
			padding: 20px;
		}
		.btn-box{
			height: 10vh;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			button{
				height: 30px;
			}
		}
	}
</style>
