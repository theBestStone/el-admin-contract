import request from '../utils/request';
import common from '@/assets/js/common.js'
export const addRole = data => {//角色管理-新增角色

    return request({
        url:common.base64DeCode('BC9DED7DDEE747BBB69F16C6C7B162A169D76B9296EFA05E1FD6B45E66F3F1F3'),//'/api-user/role/addRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const editRole = data => {//角色管理-编辑角色

    return request({
        url:common.base64DeCode('6F2BAF991240390911A861301878698DE0B7B6CB81239ADEBD6CEB813B0116FF'),// '/api-user/role/editRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteRole = data => {//角色管理-删除角色

    return request({
        url:common.base64DeCode('269BF9545EADBD4477795EF3C180476457F130315944E7C49370BA1B9318D43C'),//'/api-user/role/deleteRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addOrgUserInRole = data => {//角色管理-角色处添加成员

    return request({
        url:common.base64DeCode('BC9DED7DDEE747BBB69F16C6C7B162A108A0C7C5533FF577BF555FAE6F20F5AF'),//'/api-user/role/addOrgUserInRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteOrgUserInRole = data => {//角色管理-角色处批量删除成员


    return request({
        url:common.base64DeCode('269BF9545EADBD4477795EF3C1804764D9E84D577F5D8123C01E87F55C58A59DF783C452A79FFC5076E46F2DBC62066F'),//'/api-user/role/deleteOrgUserInRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findAllMenu = data => {//.角色管理-查询全部三级菜单权限

    return request({
        url:common.base64DeCode('FDF1B988B3F4DF643679E77A213612948CEAAA8F3BEFF807D34D516CB65C6712'),//'/api-user/role/findAllMenu',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findAllOrgUserByRole = data => {//角色管理-按角色查询用户完整信息列表

    return request({
        url:common.base64DeCode('FDF1B988B3F4DF643679E77A2136129455A283A3B306A6F08F8372B66B5AA1B68E43C61C3ACF09378AC997D2D2BDB23E'),// '/api-user/role/findAllOrgUserByRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findMenuByRole = data => {//角色管理-按角色查询，二级菜单汉字拼接权限

    return request({
        url:common.base64DeCode('FDF1B988B3F4DF643679E77A21361294E8729D94098D655AC6724E12F7010410'),//'/api-user/role/findMenuByRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findMenuList = data => {//角色管理-查看公司，个人角色和权限去重列表信息

    return request({
        url:common.base64DeCode('FDF1B988B3F4DF643679E77A2136129448DA902D427F2BA7A56C5E65E9020B9C'),// '/api-user/role/findMenuList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addOrgAuthInfo = data => {//成员管理-查询未审核成员

    return request({
        url:common.base64DeCode('4A76A5BD832FD2EC97CB10A214CEABC6DF86A6E1973A810239589BA283470FCFEEC92BDC15D7543D1267549B02AE198F'),//'/api-user/orgAuthInfo/addOrgAuthInfo',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const doAuditUser = data => {//成员管理-审核成员

    return request({
        url:common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F9F64C5584A150D1D38C8F871778F640A'),//'/api-user/orgUser/doAuditUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const vertifyOrgUserExcel = data => {//成员管理-校验Excel添加企业人员

    return request({
        url:common.base64DeCode('7224CEB5467267E68BC1EA7E74A9983F388785B9D02FEA3BCD3CC58DEE8BE4B1CD85A60BA0143715B1134318B96DAFF3'),//'/api-user/orgUser/vertifyOrgUserExcel',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const roleListByOrg = data => {//企业管理-按公司角色

    return request({
        url:common.base64DeCode('944FD39AB6024A67FD1EF031087176D5750C815714B6B48A7529AFFD43D7F615'),//'/api-user/role/roleListByOrg',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findMenuIdsByRole = data => {//企业管理-按角色查询权限回填

    return request({
        url:common.base64DeCode('FDF1B988B3F4DF643679E77A21361294EFA4287468A69B73682AF3C3D81BCC887AD633E8816E2647C0769E77D070AF8B'),//'/api-user/role/findMenuIdsByRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const countOrgUserByRole = data => {//企业管理-查角色人数

    return request({
        url:common.base64DeCode('AE23DA795FB4783110B4CBB2EA8235D773E3C984B186B0CD4F257A40B6EA8E9914CDB0B6DA5E127ADA3C9245317F2FE0'),//'/api-user/role/countOrgUserByRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};