import request from '../utils/request';
import {Base64 } from 'js-base64';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
export const findSignLog = data => {// 

    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D31778383BD8028B73A6CFFDAC745658CB55B248F8C4E105D4567CE458FCEE5E2'),// '/api-contract/contractLog/findSignLog',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const exportSignLog = data => {
    let jiami = '54AF2D6F924DCC930ED99B8972E4268DEB75831435ED1A9E6382AB6007D27401A63F43976CE80250AEE3377D7661A45C';
   const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken()+data;///api-contract/contractLog/exportSignLog
   const a = document.createElement('a')
   a.href = url
   a.click()

};
export const findContractLog = data => {// 

    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DD6920D5F823C1CE40DAA6D6226275E1221D3155A1AE3A7D8A36F8600584D0B9D'),// '/api-contract/contractLog/findContractLog',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const exportContractLog = data => {
    let jiami = '54AF2D6F924DCC930ED99B8972E4268DEB75831435ED1A9E6382AB6007D27401096CD48B6B591C42907C1ABC1DEBCCB3';
   const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken()+data;///api-contract/contractLog/exportContractLog
   const a = document.createElement('a')
   a.href = url
   a.click()

};
export const operateLogList = data => {// 

    return request({
        url:common.base64DeCode('92532D52C40EEFC31904AF50561B1741637F8303F63C13D6178D7BDFF8B9D4FC8E86C83D487BEAA2C398D0DBC431EE96'),// '/api-log/operateLog/operateLogList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const exportOperateLog = data => {
    let jiami = '92532D52C40EEFC31904AF50561B174138C357C43DD0CFCF4A9E2F3190439100D5C6D909D357CE0E6DE00B2B3175A2A2';
   const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken()+data;///api-log/operateLog/exportOperateLog
   const a = document.createElement('a')
   a.href = url
   a.click()

};