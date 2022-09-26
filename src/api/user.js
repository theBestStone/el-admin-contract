import request from '../utils/request';
import { getToken } from '@/utils/auth';
import common from '@/assets/js/common.js'
export const changeIdentify = data => {
    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6764F84799F202CDB1678170A0D1E48D8D8524C29004C52DC80ADE0F03F06BCD5'),//'/api-user/orgAuthInfo/findAllOrgAuthInfoById',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const retrievePwd = data => {
    return request({
        url:common.base64DeCode('6D4102D653CC0C0229A43DCF09CB62CC3B74EEE713C38022F3CC713815F51CC2'),//'/api-user/account/retrievePwd',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const userInfo = data => {
    return request({
        url:common.base64DeCode('394E579503EB5F8E62866403A9388C2C509F272BBBA0518B0E214F3484EFDDEB'),//'/api-user/user/userInfo',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data
    });
};
export const updatePhone = data => {
    return request({
        url:common.base64DeCode('394E579503EB5F8E62866403A9388C2CFDA01267C486AA0D2C92B13DA26A238B'),//'/api-user/user/updatePhone',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const updateEmail = data => {
    return request({
        url:common.base64DeCode('394E579503EB5F8E62866403A9388C2C81CF493BDCCEF2571C543F6A8D1E39C1'),//'/api-user/user/updateEmail',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const checkIdentify = data => {
    console.log(data,"data")
    return request({
        url:common.base64DeCode('A4BD1ABF5854CB66D35C177D00BD02626B2B7185E201618723B8A72723333A44'),//'/api-user/user/checkIdentify',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const checkSmsCode = data => {
    console.log(data,"data")
    return request({
        url:common.base64DeCode('6D4102D653CC0C0229A43DCF09CB62CC0DDCB51A7760A38CA4E4FAC6B60DCFCA'),//'/api-user/account/checkSmsCode',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const setSignPw = data => {
    console.log(data,"data")
    return request({
        url:common.base64DeCode('3A8C19C36AB8FD3AA0EC54DF8366F160A7C06178025DB74A24AF45B25982B94C'),//'/api-user/user/setSignPwd',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const signPwdOnOff = data => {
    
    return request({
        url:common.base64DeCode('3A8C19C36AB8FD3AA0EC54DF8366F160A70A87323DB9BBFF5EFACA9633B6887F'),// '/api-user/user/signPwdOnOff',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const createAuthCode = data => {
    
    return request({
        url:common.base64DeCode('A4BD1ABF5854CB66D35C177D00BD0262FEC0F48DA15E9A5C0AA35AAEB44AEBAB'),//'/api-user/user/createAuthCode',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const queryByWxApp = data => {
    
    return request({
        url:common.base64DeCode('6D88C1E8C8216316117B77BBE0217972B7180B975C365165C0FFC65C7739E87F'),//'/api-user/user/queryByWxApp',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data,
        noneCover:true
    });
};
export const register = data => {
    
    return request({
        url:common.base64DeCode('C51877F561D509E45561A626102EA9EFA206AE105F7C4C72746A0937F1D232B9'),//'/api-user/protocol/register',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};
export const accoutClose = data => {
    
    return request({
        url:common.base64DeCode('D512F07D96BF56AEE00413829BC3110CBF6D6114FEE53B265AFFE0003246D332'),// '/api-user/user/accountCancel',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const accountBackOut = data => {
    
    return request({
        url:common.base64DeCode('D512F07D96BF56AEE00413829BC3110C6C25F7F7053C888B5A2383F37874E47F'),// '/api-user/user/accountBackOut',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};

export const refreshToken = data => {
    
    return request({
        url:common.base64DeCode('A4A4A67E23F6945507EC9165B52669BAD8CFD89AF6730C8D93481DB7A2A299D8'),//'/api-auth/oauth/refresh/token',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const findCert = data => {
    
    return request({
        url:common.base64DeCode('9DD395A92A58CB00184E3479630C63C632DA836161E9F610CF619FDA6D0D0DF8'),//'/api-ca/certInfo/findCert',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const addCert = data => {
    
    return request({
        url:common.base64DeCode('9DD395A92A58CB00184E3479630C63C628CA701A2BC3C1CB015721E535290FA5'),//'/api-ca/certInfo/addCert',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const profilePicture = data => {//用户-编辑头像
    
    return request({
        url:common.base64DeCode('9616C5495B41C04A39C3F567EE1B5731567FCE245BF1253474F9A9B146844955'),//'/api-user/user/profilePicture',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};


// params: query
