import request from '../utils/request';
import { getToken } from '@/utils/auth'
import common from '@/assets/js/common.js'
let Base64 = require('js-base64').Base64;
export const notifyList = data => {
    
    return request({
        url:common.base64DeCode('E542D48CB76A58E9F6004C15E64BC4E1CD4413A648865E95AE5CE9CBE8EAB1EE'),//'/api-message/notify/page',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};

export const notifyRead = data => {
    let url = common.base64DeCode2('E542D48CB76A58E9F6004C15E64BC4E13427CFDB81BC4BF89A69EC16B628475A')+data.id
    
    return request({
        url:url,//'/api-message/notify/read/'+data.id,
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};

export const notifyReadAll = data => {
    
    return request({
        url:common.base64DeCode('E542D48CB76A58E9F6004C15E64BC4E198416C9432C5B7E85C81DCB63BE5A3E4'),//'/api-message/notify/readAll',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};

export const wsNotifyList = data => {
    let url = common.base64DeCode2('E542D48CB76A58E9F6004C15E64BC4E1CD4413A648865E95AE5CE9CBE8EAB1EE')
    return process.env.VUE_APP_WS_API+ulr+'?t=' +Math.random()+'&access_token='+getToken()///api-message/notify/page
};

