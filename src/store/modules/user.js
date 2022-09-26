import { loginCode,loginPass, logout} from '@/api/login'
import { userInfo} from '@/api/user'
import {getToken, removeToken, setToken,removeDentify,getDentify} from '@/utils/auth';
import { findMenuList } from '@/api/role.js';
import common from '@/assets/js/common.js'
// import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'
 
const user = {
  state: {
    user:{},
    roles:null,
    token: getToken()
  },
  
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
     
      state.roles = roles
    },
    RESET_USER: (state,) => {
     
      state.user = {};
      state.roles = null
    }
    
    
  },
  actions: {
    // 登录
    loginCode({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        loginCode( loginForm
        ).then(data => {
          
            setToken(data.access_token);
            commit('SET_TOKEN', data.access_token)

          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    loginPass({commit, state}, loginForm) {
 
        return new Promise((resolve, reject) => {
            loginPass( loginForm
          ).then(data => {
              
            // if (data.result === "success") {
                //cookie中保存前端登录状态
                setToken(data.access_token);
                commit('SET_TOKEN', data.access_token)
               
            //   }
            resolve(data);
          }).catch(err => {
            reject(err)
          })
        })
      },
    // 获取用户信息
    GetInfo({commit, state},reload) {
      
      return new Promise((resolve, reject) => {
        if(state.user.phone&&!reload){
          
          resolve(state.user);
        }else{

          userInfo({}).then(async res => {
            
            let { data } =  res;
           
            if(data.realNameState==1){
              data.userName = common.Decrypt(data.userName)
            }
           
            data.realPhone = common.Decrypt(data.phone);
            var pat=/(\d{3})\d*(\d{4})/
             data.email = common.Decrypt(data.email);
            data.phone = data.realPhone.replace(pat,'$1****$2');
            
            commit('SET_USER', data);
            let dentify = getDentify();
            if(!dentify){
              dentify = {orgId:0}
            }
            findMenuList({uid:data.loginId,eid:dentify.orgId}).then(res2=>{
              
              if(dentify.orgId==0){
                if(data.realNameState==1){

                  commit('SET_ROLES', ['admin']);
                }else{
                  commit('SET_ROLES', ['disReal']);
                }
              }else{
                if(!res2.data.menuSet){
                  res2.data.menuSet = [];
                }
                res2.data.menuSet.push("comper")
                console.log(res2.data.menuSet)
                commit('SET_ROLES', res2.data.menuSet);
              }
              
              resolve(data)
            })
          }).catch(error => {
            reject(error)
          })
        }
      })
    },
    
    setUserInfo(res, commit)  {
        // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
     
       
        commit('SET_USER', res.user)
      },
    // 登出
    LogOut({commit},tag) {
       
        // removeToken()
      if(tag){
        removeToken();
        removeDentify();
        commit('RESET_USER')
        router.push({ path: '/index' });
      }else{

        return new Promise((resolve) => {
           
          commit('SET_USER', null)
          logout().then(data => {
            commit('RESET_USER')
            removeToken()
            removeDentify();
            resolve(data);
          }).catch(() => {
            commit('RESET_USER')
            removeToken()
            removeDentify();
            resolve();
          })
        })
      }
    },
    
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default user