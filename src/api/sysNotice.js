import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
let Base64 = require('js-base64').Base64;
export const getList = data => {
 
    return request({
        url:common.base64DeCode('328B004E7EC2D460AE512A994AD7ED38C029F733CCF0DC6D0FB322A139CF2553'),//'/api-message/open/notice/EWEB',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const getNoticeById = id => {
    let url = common.base64DeCode2('7B30EE82B81AED1F22FAC0C956931F60C5BF3D64099267BD38F9E1D546C0982A')+id
    return request({
        url:url,// `/api-manage/open/notice/get/${Base64.encode(id)}`,
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF')
    });
};
 

