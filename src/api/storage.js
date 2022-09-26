import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
let Base64 = require('js-base64').Base64;
export const isHeLogin = data => {//是否登陆
    return request({
        url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B410C86FF8363D7C14DFF31AF05BB1576BEB68E34DD8A5B413D20CB3BFBC0B2C48B'),//'/api-contract/storage/auth/checkLogin',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const isHeToken = data => {//是否登陆
    return request({
        url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B410C86FF8363D7C14DFF31AF05BB1576BEC5BDADFD779EFF357FD3A7A67E3A8B24'),//'/api-contract/storage/auth/checkToken',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const heGetSmsCode = data => {//1.验证短信验证码
    return request({
        url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B418323B23E6331862CB24DBCC747966B190A190F75C30E31603839F5EB9AD3F42E'),//'/api-contract/storage/auth/getSmsCode',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const heVerifySmsCode = data => {//2.验证短信验证码


    return request({
        url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B41C90E1ED107278C7CEAA8694EDCEECD19FAA6C91365BA4CA32F152E2124DC815B'),//'/api-contract/storage/auth/verifySmsCode',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const heUpload = data => {//合文件云存储到和彩云

    return request({
        url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B41386607E71A1635F4060C347490183B64'),//'/api-contract/storage/upload',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const heDownload = data => {//合下载存储到和彩云文件。
    let jiami = 'C9A1BF642A641AE05ACEDB9AC2236B41B29E744946852D405AA625AC2BFD0B5A';
    const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken()+'&contractNos='+data.contractNo;  //window.URL.createObjectURL(response.data)
    const a = document.createElement('a')
    a.href = url
    a.target='_blank'
    a.click()
    // return request({
    //     url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B41B29E744946852D405AA625AC2BFD0B5A'),//'/api-contract/storage/download',
    //     method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    //     data
    // });
};

export const newDownload = data => {//文件管理批量下载
    let jiami = '54AF2D6F924DCC930ED99B8972E4268DB2BD52156EF933A357144A3D2511377DE4DB3FEB72CBB355042BF05F32484003';
    const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken()+'&contractNo='+data.contractNo;  //window.URL.createObjectURL(response.data)
    const a = document.createElement('a')
    a.href = url
    a.target='_blank'
    a.click()
    // return request({
    //     url: common.base64DeCode('C9A1BF642A641AE05ACEDB9AC2236B41B29E744946852D405AA625AC2BFD0B5A'),//'/api-contract/storage/download',
    //     method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    //     data
    // });
};
 