import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
let Base64 = require('js-base64').Base64;
// export const fetchData = query => {
//     return request({
//         url: './table.json',
//         method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
//         params: query
//     });
// };
export const getCodeMsg = data => {
    return request({
        url:common.base64DeCode('A44772E64BE0EF211A695DD92CE909A025E234198C053FD61FA0506FFF9D11FF'),// '/api-auth/sms/send',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};
export const uploadFile = data => {
    let url = common.base64DeCode2('34DE11141E3CD11B3215785BE3CA8518246D9FEA22B67EEA23C0BFAB2A8A61B5')
    return process.env.VUE_APP_BASE_API+url+'?t' +Math.random()+'&access_token='+getToken()///api-file/file/upload
    // return request({
    //     url: '/api-file/file/upload',
    //     method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    //     data
    // });
};
export const downloadFile = data => {
    let url = common.base64DeCode2('8C945A015EE57430F206C1CD9CC4C774F5F2BBAEBD5BBFBBB971037BC316CA00')
    return process.env.VUE_APP_BASE_API+url+data+'?t=' +Math.random()+'&access_token='+getToken()
    // return request({
    //     url: '/api-file/file/download/'+data,
    //     method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    // });
};
export const downloadFile2 = data => {
    let url = common.base64DeCode2('54AF2D6F924DCC930ED99B8972E4268DAA3AE70CB1BDEA17CB034CC4F2AA6B55')
    return process.env.VUE_APP_BASE_API+url+data+'?t=' +Math.random()+'&access_token='+getToken()
    // return request({
    //     url: '/api-contract/contract/preview/'+data,
    //     method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    // });
};
export const downloadFileTemp = data => {
    let url = common.base64DeCode2('4151B396B07B7967CDAF401820BC6FB51304390053D48DDEC2B76479F7E41DDE')
    return process.env.VUE_APP_BASE_API+url+data+'?t=' +Math.random()+'&access_token='+getToken()
    // return request({
    //     url: '/api-contract/template/preview/'+data,
    //     method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    // });
};
export const downloadFileScene = data => {//场景预览
    let url = common.base64DeCode2('54AF2D6F924DCC930ED99B8972E4268DD95125548DA3FF72C58A3D7E9DE4B924D2F588B1AEE54F9748205E08679B86EC')
    return process.env.VUE_APP_BASE_API+url+data+'?t=' +Math.random()+'&access_token='+getToken()
    // return request({
    //     url: '/api-contract/contractScene/preview/'+data,
    //     method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    // });
};
export const downloadAuthTemplate = data => {
    let jiami = '4A76A5BD832FD2EC97CB10A214CEABC67167C783F8F8B85EF44E7EA9D87840390ECD297AF8182515678EB8D22D454FB2';
        const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken();  //// '/api-user/orgAuthInfo/downloadAuthTemplate?blob',
        const a = document.createElement('a')
        a.href = url
 
        a.click()
    // return request({
    //     url:common.base64DeCode('L2FwaS11c2VyL29yZ0F1dGhJbmZvL2Rvd25sb2FkQXV0aFRlbXBsYXRlJTNGYmxvYg',// '/api-user/orgAuthInfo/downloadAuthTemplate?blob',
    //     method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    //     data
    // });
};
///api-manage/open/file/get/{id}
export const downloadFileByid = data => {
    // return process.env.VUE_APP_BASE_API+'/api-manage/open/file/get/'+data+'?t=' +Math.random()+'&access_token='+getToken()
  
    let url = common.base64DeCode2('7B30EE82B81AED1F22FAC0C956931F60CDFF452D44A78666D395B5DC909914B0')+data
   
  
    return request({
        url:url,//'/api-manage/open/file/get/'+data,
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    });
};
export const uploadBase64 = data => {
    return request({
        url:common.base64DeCode('34DE11141E3CD11B3215785BE3CA85181285C74CCA99434F140370A2C323626B'),// '/api-file/file/uploadBase64',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const downloadBase64 = data => {
    return request({
        url:common.base64DeCode('8C945A015EE57430F206C1CD9CC4C774FBF374B8552692F93BE01F89F42A1B5D'),// '/api-file/file/downloadBase64',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    });
};
export const preview = data => {
    let url = common.base64DeCode2('5A0B2E7581A5CABE1789C8824AAC068A5A89D427606A3CA02E064D28C36F70DF')
    return process.env.VUE_APP_BASE_API+url+data+'?t=' +Math.random()+'&access_token='+getToken()///api-file/file/preview/
    
};
export const del = data => {
    return request({
        url: common.base64DeCode('5A0B2E7581A5CABE1789C8824AAC068AE599D66EAA8F3A8D2D57F1648230BC02'),//'/api-file/file/preview',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    });
}; 