import Cookies from 'js-cookie'
// import Config from '@/settings'

const TokenKey = "anySign"//Config.TokenKey
const dentify = 'dentify'//
const rolePower = 'rolePower'
export function getToken() {
   return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  // if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: 7 })
  // } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getDentify() {
  let obj = Cookies.get(dentify);
  if(obj){
    obj = JSON.parse(obj)
  }
  return obj;
}
export function setDentify(channal, rememberMe) {
  return Cookies.set(dentify, JSON.stringify(channal), { expires: 7 })
}

export function removeDentify() {
return Cookies.remove(dentify)
}
export function setRolePower(powerList, rememberMe) {
   return Cookies.set(rolePower, JSON.stringify(powerList), { expires: 7 })
}

export function removeRolePower() {
 return Cookies.remove(rolePower)
}
export function getRolePower() {
  let obj = Cookies.get(rolePower);
  if(obj){
    obj = JSON.parse(obj)
  }
  return obj;
}


