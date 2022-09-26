import request from '../utils/request';
import common from '@/assets/js/common.js'
export const queryEntName = data => {
    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6CF9713EBEB72166854D0358E7DBC3339973576924AA1ECF455033825DF1E8DFA'),// '/api-user/orgAuthInfo/entEntering',//用户-查询待加入企业名称接口
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data,
        noneCover:true
    });
};
 
export const joinEnt = data => {//用户-申请加入企业接口
    return request({
        url:common.base64DeCode('36AFD6A3C4675608A83CA161B356AC50BADDD92A73BC344D0D37FAE986E21379'),// '/api-user/user/joinEnt',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const comFindById = data => {//查找特定一个企业实名信息

    return request({
        url: common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6E27F851550B67068963567307D03E3D104503859968DC386784BAF2445F12FC2'),//'/api-user/orgAuthInfo/findOneOrgAuthInfoById',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const accountAuthBegin = data => {//8.企业实名-对公账户打款发起

    return request({
        url: common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6C064E0B439FFFA7DFCC131870BCB9D627FAF38DB8F39B24E197EE7EE260E6149'),//'/api-user/orgAuthInfo/accountAuthBegin',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const accountAuthCheck = data => {//对公账户打款用户验证

    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6C064E0B439FFFA7DFCC131870BCB9D623C72A08AD366B50A7C124ED81862F8BE'),// '/api-user/orgAuthInfo/accountAuthCheck',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const agencyAuth = data => {//10.企业实名-授权委托书认证


    return request({
        url: common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6350C904F795120150DF6093871CF39B72072768410492DFC9B3E1D58C69E15B4'),//'/api-user/orgAuthInfo/agencyAuth',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteOrgChannel = data => {//.企业管理-删除

    return request({
        url: common.base64DeCode('7843EA2C68BA1CBFAFFC8E39D19DA10F2EB68E4A48400086EDAED2AA696E824D748813E44910970CF100220F5A89D0C6'),//'/api-user/orgInfo/deleteOrgChannel',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addOrgAuthInfo = data => {//.企业管理-编辑

    return request({
        url: common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6DF86A6E1973A810239589BA283470FCFEEC92BDC15D7543D1267549B02AE198F'),//'/api-user/orgAuthInfo/addOrgAuthInfo',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const bankInfo = data => {//.企业管理-编辑

    return request({
        url: common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6B0DA1758EA664A603548EEC4F9264E7A'),//'/api-user/orgAuthInfo/bankInfo',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const countOrgUser = data => {// 企业管理-查企业或部门人数

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F0394D33758F12A8490D36CB0B1FCF5B7'),//'/api-user/orgUser/countOrgUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const turnByOnceBefore = data => { 

    return request({
        url:common.base64DeCode('FF5F5EC4AE700EAFBD8C4C6A2B8BDDDCA9C44030890D1A19ECF16D5B95406C32'),// '/api-user/role/turnByOnceBefore',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findFirstPage = data => {// 首页信息四个显示

    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC690F1094B0186CEA40A5A8E3368935ED2A9722626DAF648E6B81BEDE35DD66371'),// '/api-user/orgAuthInfo/findFirstPage',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteOrgAuthInfo = data => {// 企业实名-删除企业


    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6B5B3C54D13800C28D93EB7ED9F6F94F1560131484FBBD58D7969F54F32D04A71'),// '/api-user/orgAuthInfo/deleteOrgAuthInfo',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const updateAdmin = data => {// 企业实名-删除企业


    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6352F11365CD289B93F4F2B50D093F337960342B5E2C957FE5ADBAAC22E029460'),// '/api-user/orgAuthInfo/updateAdmin',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const ocr = data => {//ocr


    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC673467E13B53A604119D3B29C2BDEB075'),// '/api-user/orgAuthInfo/ocr',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findProtocol = data => {//findProtocol


    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC65BB43AFC28C7FE746BB87937A8E6D9394DE8E683A6368089ECC97057C74CE4A5'),// '/api-user/orgAuthInfo/findProtocol',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const getCity = data => {//


    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6588E02883E48D19035831005E9BE76BF'),// '/api-user/orgAuthInfo/city',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

// params: data
