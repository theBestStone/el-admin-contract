/**
 * 此处可直接引用自己项目封装好的 axios 配合后端联调
 */

import request from './../utils/axios' // 组件内部封装的axios
// import request from "@/api/axios.js"       //调用项目封装的axios
// import request from '@/utils/request';
// 获取验证图片  以及token
import common from '@/assets/js/common.js'
export function reqGet(data) {
  return request({
    url: common.base64DeCode('43DC4EF4219F033F5C769D7505CAB7A54CF6EC91B272BB0BB046372B1A519831'),//'/api-captcha/captcha/child/get',
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data
  })
}

// 滑动或者点选验证
export function reqCheck(data) {
  return request({
    url:common.base64DeCode('43DC4EF4219F033F5C769D7505CAB7A51C79F267FC3C42747BE439A7E9C76C7F7CF3825EA41D7C370E8D61EA83513310'),// '/api-captcha/captcha/child/check',
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data
  })
}

