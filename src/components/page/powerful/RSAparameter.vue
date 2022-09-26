<template>
	<div class="padding">
		<el-card>
			<div class="rsa-box">
				<div class="json-c">
					<span class="tit">Rsa签名方法示例(java)</span>
					<div class="base-to">
						/**<br/>
						
						 * 使用Rsa算法进行加密<br/>
						
						 *<br/>
						
						 * @param target<br/>
						
						 *            要加密的字符串<br/>
						
						 * @param charset<br/>
						
						 *            编码（请设置为UTF-8)<br/>
						
						 * @return 加密后的字符串<br/>
						
						 */<br/>
						
						public static String rsa256Sign(String content, String privateKey, String charset) throws RsaSignException {<br/>
						
						        try {<br/>
						
						            PrivateKey e = getPrivateKeyFromPKCS8("RSA", new ByteArrayInputStream(privateKey.getBytes()));<br/>
						
						            Signature signature = Signature.getInstance("SHA256WithRSA");<br/>
						
						            signature.initSign(e);<br/>
						
						            if (StringUtils.isEmpty(charset)) {<br/>
						
						                signature.update(content.getBytes());<br/>
						
						            } else {<br/>
						
						                signature.update(content.getBytes(charset));<br/>
						<br/>
						            }<br/>
						
						            byte[] signed = signature.sign();<br/>
						
						            return new String(Base64.encodeBase64(signed));<br/>
						
						        } catch (Exception var6) {<br/>
						
						            throw new RsaSignException("RSAcontent = " + content + "; charset = " + charset, var6);<br/>
						
						        }<br/>
						
						    }<br/>
						
						    public static PrivateKey getPrivateKeyFromPKCS8(String algorithm, InputStream ins) throws Exception {<br/>
						
						        if (ins != null && !StringUtils.isEmpty(algorithm)) {<br/>
						
						            KeyFactory keyFactory = KeyFactory.getInstance(algorithm);<br/>
						
						            byte[] encodedKey = StreamUtil.readText(ins).getBytes();<br/>
						
						            encodedKey = Base64.decodeBase64(encodedKey);<br/>
						
						            return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(encodedKey));<br/>
						
						        } else {<br/>
						
						            return null;<br/>
						
						        }<br/>
						
						    }<br/>
					</div>
				</div>
			</div>
		</el-card>

	</div>
</template>

<script>

	export default {
		components: {
			
		},
		data() {
			return {
				rsa:''
			};
		},
		created() {

		},

		methods: {

		}
	};
</script>
<style lang="less">
	.rsa-box {
		display: flex;
		justify-content: space-between;

		.json-c {
			width: 100%;
			height: auto;
		}

		.tit {
			margin-bottom: 20px;
			display: inline-block;
		}

		.base-to {
			height: 70vh;
			border: 1px solid #ddd;
			border-radius: 5px;
			text-align: justify;
			word-wrap: break-word;
			overflow-y: scroll;
			padding: 20px;
		}
	}
</style>
