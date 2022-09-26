import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
export const addContact = data => {//用户中心/通讯录。
    return request({
        url: common.base64DeCode('F9F574F01F3F717CD42F67C7CD61E520CFB3E8D6FE398FEC7F3FD065F6A7BA8E'),//'/api-message/contact/addContact',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const saveContact = data => {//.通讯录-编辑接口
    return request({
        url: common.base64DeCode('F9F574F01F3F717CD42F67C7CD61E5209DE4630A03343A18F6A53B0B3FBC0676E619695D04D7D4E22E76FCF3E7732433'),//'/api-message/contact/saveContact',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findContactList = data => {//3.通讯录-分页查询接口

    return request({
        url: common.base64DeCode('F9F574F01F3F717CD42F67C7CD61E520D2C841EB374DDB76A7AE7893463CBED45EB459FAC28E00926AFF9380F144598E'),//'/api-message/contact/findContactList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findContact = data => {//4.通讯录-根据ID查询接口

    return request({
        url: common.base64DeCode('F9F574F01F3F717CD42F67C7CD61E520D2C841EB374DDB76A7AE7893463CBED4FEE50C6A7DC16A791D3A4A1A63C35D87'),//'/api-message/contact/findContact',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const deleteContact = data => {//.通讯录-删除接口
    return request({
        url:common.base64DeCode('F9F574F01F3F717CD42F67C7CD61E52062DDF97FC94B75950F9B03CC8B2744629480F8E35B496098229E07ADB34B3B5D'),// '/api-message/contact/deleteContact',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const deleteRecentContact = data => {//.通讯录-删除最近联系人接口
    return request({
        url:common.base64DeCode('766B5F6C9772774730C709E9E1FCC1E4D4EA182513CD4CF56EB3C1A88652FE9C3C909823A4A2EF1A2953909E3AD6CB65'),// '/api-message/contact/deleteContact',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const findContactEntList = data => {//通讯录-企业下拉框接口
   
    return request({
        url: common.base64DeCode('F9F574F01F3F717CD42F67C7CD61E520D2C841EB374DDB76A7AE7893463CBED4949899747B4EA7498B52D3473A27D8E4'),//'/api-message/contact/findContactEntList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}// params: query
export const recentContactLis = data => {//通讯录-企业下拉框接口
   
    return request({
        url: common.base64DeCode('766B5F6C9772774730C709E9E1FCC1E4CF497FE7C0A858EB1113C613E3A13DCFD6ECCE2F9588D4025502B0579A6B7E68'),//'/api-user/recent-contact/recentContactList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}//
export const parseModelExcel = data => {//通讯录-企业下拉框接口
    let url = common.base64DeCode2('F9F574F01F3F717CD42F67C7CD61E520366D37DADC1C16FCD69DC2A85569FAC93D28F5C39775BCFA837336F6E634ECF2')
    return process.env.VUE_APP_BASE_API+url+'?t' +Math.random()+'&access_token='+getToken()//'/api-message/contact/parseModelExcel'
   
}//
export const downloadSignUserModelFile = data => {//通讯录-企业下拉框接口
    let jiami = 'F9F574F01F3F717CD42F67C7CD61E520F38DC44C8660C5BC8B8EF0F59D9DE0DA9EBF218CD89D0129F5040EBBA10F13EE';
    const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken() ///api-message/contact/downloadSignUserModelFile
    console.log(url,"url")
    const a = document.createElement('a')
    a.href = url

    a.click()
       
    
     
}//
