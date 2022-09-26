import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API
let Base64 = require('js-base64').Base64;
import common from '@/assets/js/common.js'
const service = axios.create({
  timeout: 40000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  },
})
service.interceptors.request.use(
  config => {
    // config.url = common.base64DeCode2(config.url).replace("%3F","?");
    
    // if(config.method==common.base64DeCode('95F562C83E9DC158906711D6B8616121')){
    //   config.method = 'post'
    // }else{
    //   config.method = 'get'
    // }
    // config.method = common.base64DeCode2(config.method)
   
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
   
    const res = response.data
    return res
  },
  error => {
  }
)
export default service
