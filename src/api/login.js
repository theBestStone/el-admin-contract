import request from '../utils/request';
import common from '@/assets/js/common.js'
export function loginCode(data) {
  return request({
    url:common.base64DeCode('CD51AB561D84317D243CF9FC069C1438A03112A322A1A2BC489DFB9628A4615C'),//'/api-auth/authentication/sms',
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data: data
  })
}
export function loginPass(data) {
  return request({
    url:common.base64DeCode('A4A4A67E23F6945507EC9165B52669BAB60DA69A7EF82A802EB68188F035E3B7'),//'/api-auth/oauth/token',
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data: data
  })
}
export function accountCheck(data) {
  return request({
    url:common.base64DeCode('6D4102D653CC0C0229A43DCF09CB62CCEA92A3406B296259998609AA957E3039'),// '/api-user/account/accountCheck',
    method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
    params: data,
    noneCover:true,
    noticeStatus: 1
  })
}
export function register(data) {
  return request({
    url:common.base64DeCode('6D4102D653CC0C0229A43DCF09CB62CCDC7F94002F8721780EC209B9A172AA63'),//'/api-user/account/register',
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data: data
  })
}
export function agreement(data) {
  return request({
    url:common.base64DeCode('6D4102D653CC0C0229A43DCF09CB62CC865174116C441404B4322A76A7AC00EE'),//'/api-user/account/agreement',
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data: data
  })
}
export function viewAgreement(data) {
  return request({
    url:common.base64DeCode('C51877F561D509E45561A626102EA9EFA206AE105F7C4C72746A0937F1D232B9'),//'/api-user/protocol/register',
    method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
  })
}


 

// export function getCodeImg() {
//   return request({
//     url:common.base64DeCode('YXV0aC9jb2Rl'),//'auth/code',
//     method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
//   })
// }

export function logout() {
  return request({
    url:common.base64DeCode('171B5380FAD901F756A0F60DD2F993CF1F4C967B590698C1DB6186FE84F36F4C'),// '/api-user/user/logout',
    method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
  })
}
