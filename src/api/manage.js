import request from '../utils/request';
import { getToken } from '@/utils/auth'
import common from '@/assets/js/common.js'
export const manageList = data => {
    
    return request({
        url: common.base64DeCode('328B004E7EC2D460AE512A994AD7ED381DB1ED387AF14E76DF2E3D2C110F4853'),//'/api-message/open/file',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

 