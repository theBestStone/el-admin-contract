<template>
	<div class="padding">
		<el-card>
			<div class="json-box">
				<div class="json-c" @dblclick="vjson">
					<span class="tit">JSON在线解析(双击自动格式化)</span>
					<el-input v-model="vjsonfrom" placeholder="" type="textarea">
					</el-input>
					<el-button @click="vjson" type="primary">解析</el-button>
				</div>
				<div class="json-c">
					<span class="tit">解析结果</span>
					<div class="json-viewer">
						<json-viewer :value="vjsonto" :expand-depth="4" copyable sort></json-viewer>
					</div>
				</div>
			</div>
		</el-card>

	</div>
</template>

<script>
	import JsonViewer from 'vue-json-viewer'
	export default {
		components: {
			JsonViewer,
		},
		data() {
			return {
				vjsonfrom: null,
				vjsonto: '',
			};
		},
		created() {

		},

		methods: {

			//获取列表
			vjson() {
				try {
					var obj = JSON.parse(this.vjsonfrom);
					if (typeof obj == 'object' && obj) {
						this.vjsonto = JSON.parse(this.vjsonfrom)
						return true;
					} else {
						this.vjsonto = 'JSON格式错误'
						return false;
					}

				} catch (e) {
					this.vjsonto = 'JSON格式错误'
					return false;
				}
			},
		}
	};
</script>
<style lang="less">
	.json-box {
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

		.el-input {
			width: 100%;
		}

		.el-button {
			margin-top: 20px;
			float: right;
		}

		.el-textarea__inner {
			height: 70vh;
		}
	}

	.json-viewer {
		border: 1px solid #ddd;
		overflow-y: scroll;
		height: 70vh;
		border-radius: 5px;
	}
</style>
