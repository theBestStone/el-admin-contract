import axios from 'axios'
let Base64 = require('js-base64').Base64;
//  let a = common.base64DeCode2('L2FwaS11c2VyL29yZ0F1dGhJbmZvL2VudEVudGVyaW5nJTNGbm9uZUNvdmVy')
//  console.log(111,a.replace("%3F","?"))
import router from '@/router'
// import { bus.$notify } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
// import Config from '@/settings'
import bus from '../components/common/bus'
import Cookies from 'js-cookie'
// import ElementUI from 'element-ui'
// 创建axios实例
const service = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL:process.env.VUE_APP_BASE_API,// process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // api 的 base_url
  timeout: 999999// 请求超时时间
})
let loading = null;
let noticeStatus = null;
// request拦截器
service.interceptors.request.use(
  config => {
    console.log(config.noticeStatus);
      noticeStatus = config.noticeStatus;
    // config.url = common.base64DeCode2(config.url).replace("%3F","?");
   
    // if(config.method==common.base64DeCode('95F562C83E9DC158906711D6B8616121')){
    //   config.method = 'post'
    // }else{
    //   config.method = 'get'
    // }
    if (config.method === 'get') {
      //  给data赋值以绕过if判断
      config.data = true 
    }
 
    if(config.noneCover){
      // config.url = config.url.replace("?noneCover","")
    }else if(config.url.indexOf("?blob")!=-1){
      config.url = config.url.replace("?blob","")
      config.responseType="blob"//config.headers['Response-Type']="blob"//
      
    
    }else{  

      loading = bus.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    }
    
    if(config.url.indexOf("/token")!=-1||config.url.indexOf("/sms")!=-1){
      
      config.data = qs.stringify(config.data )
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      if (getToken()) {
       config.url = config.url+"?t=" +Math.random()+"&access_token="+getToken() 
         
      }else{
        config.url = config.url+"?t=" +Math.random()
      }
      // config.headers['eid'] = 0;
    }
    else{
     
      if (getToken()) {
       
        // config.params.access_token = getToken() 
       config.url = config.url+"?t=" +Math.random()+"&access_token="+getToken() 
        
        // config.headers['Authorization'] ='Bearer '+getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      // else if(config.url.indexOf("/register")==-1){

       
      //   store.dispatch('LogOut',true) 
      // }
      // if(config.url.indexOf("?blob")!=-1){
      //   config.url = config.url.replace("?blob","")
      //   config.headers['Content-Type'] = 'multipart/form-data'
      // }else{

        config.headers['Content-Type'] = 'application/json'
      // }
     
      
    }
   
    return config
  },
  error => {
    if(loading){
      loading.close()
    }
    
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
 
    if(loading){
      loading.close()
    }
    if (response.data instanceof Blob) {
      let blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel,charset=utf-8' //将会被放入到blob中的数组内容的MIME类型
      })
 
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
     
      // try {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // if(!decodeURI(response.headers['content-disposition'])){
          //   window.navigator.msSaveOrOpenBlob(blob,'合同文件.zip')
          // }else{
            // window.navigator.msSaveOrOpenBlob(blob,'合同文件.zip')
          
            window.navigator.msSaveOrOpenBlob(blob,decodeURI(response.headers['content-disposition'].split(';')[1].split('filename=')[1]))// 
            window.URL.revokeObjectURL(url)
          // }
        } else {
          // if(!decodeURI(response.headers['content-disposition'])){
          //   a.download = decodeURI('合同文件.zip')
          // }else{
            a.download = decodeURI(response.headers['content-disposition'].split(';')[1].split('filename=')[1])//
          // }
         
          a.click()
          window.URL.revokeObjectURL(url)
        }
       
      // } catch (error) {
      //   console.log(error);
     
      //   bus.$notify({
      //     message:  "文件下载异常",
      //     type: 'error'
      //   })
         
      // }
      return response
    }
    if (response.status === 200) {
      // response.data = bus.$common.Decrypt(response.data);
  
      let data = response.data
    
      if (data.code == 200||data.access_token) {
         
        // let decode = null;
        // if(!data.access_token){

        //   decode = bus.$common.Decrypt(response.data.data);
        //   if(decode){
        //     try {
        //       decode = JSON.parse(decode)
        //     } catch (error) {
              
        //     }
           
        //   }
        //   response.data =   decode;
        // }
        bus.$common.forMyCount(response);
        return  response.data
      }else if (data.code === 401){
        Cookies.set('point', 401)

        store.dispatch('LogOut',true) 
      } else if (data.code === 500) {
        if (noticeStatus !== 1) {
          console.log(noticeStatus);
          bus.$notify({
            message:  data.message,
            type: 'error'
          })
          throw response.data
        } else {
          console.log(111);
        }
      } else {
        bus.$notify({
          message:  data.message,
          type: 'error'
        })
        throw response.data
         
      }
    } else {
      
      Promise.reject()
    }
    
  },
  error => {
     
    // 兼容blob下载出错json提示
    if(loading){
      loading.close()
    }
 
    // if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
    //   const reader = new FileReader()
    //   reader.readAsText(error.response.data, 'utf-8')
    //   reader.onload = function(e) {
    //     const errorMsg = JSON.parse(reader.result).message
    //     bus.$notify.error({
    //       title: errorMsg,
    //       duration: 3000
    //     })
    //   }
    // } else {
      let code = 0
      
      try {
        code = error.response.data.code
       
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          bus.$notify.error({
            title: '网络请求超时',
            duration: 3000
          })
          return Promise.reject(error)
        }
      }
 
   
      if (code) {
        if (code == 400) {
        
          bus.$notify.error({
            title: error.response.data.message,
            duration: 3000
          })
        }else if (code == 401) {
          Cookies.set('point', 401)
          
          store.dispatch('LogOut',true) 
        } else if (code == 403) {
          router.push({ path: '/403' })
        } else if (data.code === 500) {
          if (noticeStatus !== 1) {
            console.log(noticeStatus);
            bus.$notify({
              message:  data.message,
              type: 'error'
            })
            throw response.data
          } else {
            console.log(111);
          }
        } else {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            bus.$notify.error({
              title: errorMsg,
              duration: 3000
            })
          }
        }
      } else {
        bus.$notify.error({
          title: '接口请求失败',
          duration: 3000
        })
      }
    // }
    return Promise.reject(error)
  }
)
export default service
