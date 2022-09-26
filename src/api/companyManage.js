import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
let Base64 = require('js-base64').Base64;
// export const findOrgAuthInfoList = data => {//企业管理-查看部门多级目录

//     return request({
//         url: '/api-user/orgInfo/findOrgAuthInfoList',
//         method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
//         data
//     });
// };

export const findOrgAuthInfoList = data => {//企业管理-查看部门多级目录

    return request({
        url: common.base64DeCode('7843EA2C68BA1CBFAFFC8E39D19DA10F4A66FA519432F7CA3FA25AC8C96398D9EEE88539787C5EF41EC82D5CAA7FB027'),//'/api-user/orgInfo/findOrgAuthInfoList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addOrgChannel = data => {//企业管理-查看部门多级目录

    return request({
        url: common.base64DeCode('7843EA2C68BA1CBFAFFC8E39D19DA10FD049704FC30ECEDFEF5B9688B2544933'),//'/api-user/orgInfo/addOrgChannel',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const editOrgChannel = data => { 

    return request({
        url:common.base64DeCode('7843EA2C68BA1CBFAFFC8E39D19DA10F987B4CEA19F5ED477D7D9FFCFABBC06A7ECEF77F2F994569F00002D8634F5823'),// '/api-user/orgInfo/editOrgChannel',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addOrgUser = data => {//成员管理-新增

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F36040F20DCD480F3C3B565695332298C'),//'/api-user/orgUser/addOrgUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addOrgUserExcel = data => {//成员管理-批量新增

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F8C2E59AFE0C55E30D4795DF2B64B7C412998DFEBA8FCEFCE1BFD04EC145CA07E'),//'/api-user/orgUser/addOrgUserExcel',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteUserDepartment = data => {//仅从部门删除成员

    return request({
        url:common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F00395032D6032F54EB4527B21A63F12DEE17CEF9985B394C4B071DD06494F1D7'),// '/api-user/orgUser/deleteUserDepartment',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteUserOrg = data => {//.成员管理-从公司删除成员

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983FED190DADDA0221158E240FF186D5A3E8'),//'/api-user/orgUser/deleteUserOrg',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const editOrgUser = data => {//成员管理-编辑企业人员

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F5D52E23E67645CC2AFAAAACA5C751906'),//'/api-user/orgUser/editOrgUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const editOrgUserDepart = data => {//成员管理-调整用户企业部门

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F80689919EAC9E997A28E2525A656E0FB46C2848FD56DD8DE9702BE88645AD752'),//'/api-user/orgUser/editOrgUserDepart',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findOrgUserList = data => {//成员管理-查看企业人员

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983FD97D366636CC81F291DDE0D16167AACBFBCDC1C7103A46626F3BF24D6B3F37C6'),//'/api-user/orgUser/findOrgUserList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findOrgUserListRealName = data => {//成员管理-查看实名企业人员

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983FD97D366636CC81F291DDE0D16167AACB38EE394E13B67E151E8B6093BBFD3CD9'),//'/api-user/orgUser/findOrgUserListRealName',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const addOrgAuthInfo = data => {//成员管理-查询未审核成员

    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6DF86A6E1973A810239589BA283470FCFEEC92BDC15D7543D1267549B02AE198F'),// '/api-user/orgAuthInfo/addOrgAuthInfo',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const doAuditUser = data => {//成员管理-审核成员

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F9F64C5584A150D1D38C8F871778F640A'),//'/api-user/orgUser/doAuditUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const turnByOnce = data => {// 

    return request({
        url: common.base64DeCode('FF5F5EC4AE700EAFBD8C4C6A2B8BDDDC184C699E4023ED8888CF1C79A158EF86'),//'/api-user/role/turnByOnce',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const vertifyOrgUserExcel = data => {//成员管理-校验Excel添加企业人员
    let url = common.base64DeCode2('7224CEB5467267E68BC1EA7E74A9983F388785B9D02FEA3BCD3CC58DEE8BE4B1CD85A60BA0143715B1134318B96DAFF3')
    return process.env.VUE_APP_BASE_API+url+'?t=' +Math.random()+'&access_token='+getToken()///api-user/orgUser/vertifyOrgUserExcel
    
};
export const turnByOnceBefore = data => {// 成员管理-查询一键转交是否拥有合同和印章

    return request({
        url: common.base64DeCode('FF5F5EC4AE700EAFBD8C4C6A2B8BDDDCA9C44030890D1A19ECF16D5B95406C32'),//'/api-user/role/turnByOnceBefore',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findUnAuditUser = data => {// 成员管理-查询未审核成员

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F81B8112D39E70F480535DF859A05358B4C57EAD1D77A4356F98EEC5AFF12294F'),//'/api-user/orgUser/findUnAuditUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const queryCreditCodeByOrgName = data => {// 企查查

    return request({
        url: common.base64DeCode('2658421CAAAB3BAA6AAF823A6A7247F8221494AFC794233E6324F27D946E024DEC9DC051F93484DC5E96F03DE54C3658'),//'api-user/orgAuthInfo/queryCreditCodeByOrgName',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data,
        noneCover:true
    });
};

export const searchOrgOrUser = data => {// 成员管理搜索

    return request({
        url: common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F8BA00616327383736B426DA6565721A1ACF91F1B53CC39D09FAB26B28047DBAD'),//'/api-user/orgUser/searchOrgOrUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
