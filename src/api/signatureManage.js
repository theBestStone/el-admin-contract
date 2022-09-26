import request from '../utils/request';
import common from '@/assets/js/common.js'
export const addSeal = data => {//印章-添加印章接口

    return request({
        url:common.base64DeCode('C6B7DCF9AF41BC4764ECA604E47AAFBAD441E943F95A9EB0BA691603E7F7F9D4'),//'/api-ca/seal/addSeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const cutoutSignBase64 = data => {//印章-预览签章抠图接口

    return request({
        url:common.base64DeCode('D8B8F2C542B9426D244B2C89F697313529F97F00BB321C14D7D55981116A7DAF'),//'/api-ca/seal/cutoutSignBase64',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const entSealList = data => {//印章-企业印章列表接口

    return request({
        url:common.base64DeCode('30ECA793915553949697E3E8C72BF0F7B07EED8726E5A2A67A27DC717F6B4F06'),//'/api-ca/seal/entSealList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const editSeal = data => {//.印章-编辑接口

    return request({
        url:common.base64DeCode('F018041EC4C1844359B9BDCDF4A6C8CA7BF4A8760BA304290A27AFA6264FB68C'),//'/api-ca/seal/editSeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteSeal = data => {//印章-删除接口

    return request({
        url:common.base64DeCode('F9242965C7D69A3E1CDF60887A485CA0FBA8A9F68063B19678D5CE41C6A534DF'),//'/api-ca/seal/deleteSeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const relateList = data => {//印章-持有列表接口


    return request({
        url:common.base64DeCode('FFEAD7F8517B85114F6A47B779C2AEA2345484DFF51D090B290A0E2A39FF7FF7'),//'/api-ca/seal/relateList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addSealUser = data => {//.印章-添加持有人接口

    return request({
        url:common.base64DeCode('C6B7DCF9AF41BC4764ECA604E47AAFBAA8B7EB62DFBDB55DFC5C8A7B6D070DF1'),//'/api-ca/seal/addSealUser',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addSealRole = data => {//印章-添加持有角色接口

    return request({
        url:common.base64DeCode('C6B7DCF9AF41BC4764ECA604E47AAFBA27A9E6FA40CE35945DB86076A1516E06'),//'/api-ca/seal/addSealRole',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteRelate = data => {//印章-删除持有接口


    return request({
        url:common.base64DeCode('F9242965C7D69A3E1CDF60887A485CA04D5A06347A41F9F1DCD8CE39DC5C47C5'),//'/api-ca/seal/deleteRelate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const auditSealList = data => {//印章-审核列表接口息

    return request({
        url:common.base64DeCode('D1EB53C58AB462E761F51E4DFD7B124274AC3F8D7CA2A6CF88E45962CD33677F'),//'/api-ca/seal/auditSealList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const applySeal = data => {//印章-申请接口

    return request({
        url:common.base64DeCode('E9EFCF9DB1EBD3C9E06FA9AB3199D6176C9121816755D0C87C9DC5003C2C9B5B'),//'/api-ca/seal/applySeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const auditSeal = data => {//印章-审核接口

    return request({
        url:common.base64DeCode('D1EB53C58AB462E761F51E4DFD7B12428D0F5B843D8508B219E3BBE79CE6E08F'),//'/api-ca/seal/auditSeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findSeal = data => {//印章-根据ID查询接口

    return request({
        url:common.base64DeCode('97EBB4EA9F6E037C4AF8C94C70AE8E530926FD02FB6E36114C85EC13F1CA5684'),//'/api-ca/seal/findSeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const signSealList = data => {//印章-签署印章列表接口

    return request({
        url:common.base64DeCode('316A95B4AF43C3845E6B1F39FC65002CFF02462D233539EBFB0700B574717AF6'),//'/api-ca/seal/signSealList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteBatch = data => {//印章-批量移除权限接口

    return request({
        url:common.base64DeCode('F9242965C7D69A3E1CDF60887A485CA06E7A8B718D83B52716DEBADDA4BF3EB8'),//'/api-ca/seal/deleteBatch',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const editRelate = data => {//印章-编辑持有时间接口

    return request({
        url:common.base64DeCode('F018041EC4C1844359B9BDCDF4A6C8CADE6D4D28D6C710863F27D752A3CFAA86'),//'/api-ca/seal/editRelate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findAuditReason = data => {// 

    return request({
        url:common.base64DeCode('97EBB4EA9F6E037C4AF8C94C70AE8E532B63DB3F3B23ED505FF2E01DC2D26AAB'),//'/api-ca/seal/findAuditReason',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

//0803-new
export const findSealTypeList = data => {// 

    return request({
        url:common.base64DeCode('C2DBFA20C406EBD0419A2934236423288A4F6A572CB7669778E42419C0A8CF6058E50ACAD60DDE1A39F31113A1BA7ECD'),//'/api-ca/sealType/findSealTypeList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const modelSealView = data => {// 

    return request({
        url:common.base64DeCode('AC2995B489B47A76F668FD151FB9788E472DB05BDE7ADAE60C8502F9EE596EC6'),//'/api-ca/seal/creatModelSeal',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const getSealType = data => {// 

    return request({
        url:common.base64DeCode('C2DBFA20C406EBD0419A293423642328E2ADD311065B963D8F495E4E77C9297D'),//'/api-ca/sealType/getSealType',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const setDefault = data => {//.印章-设置默认接口

    return request({
        url:common.base64DeCode('32B9FAF99A668F62815DFA794A29FE86EBF580843E24D055494F83D06C096929'),// '/api-ca/seal/setDefault',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const sealAuditRecordList = data => {//.印章-授权记录

    return request({
        url:common.base64DeCode('E0D5DB08AD21D3B2333AC3C0AEC98BADF59C6A618D625F188F6CA4B500A15F844478919371C558296536FCAA55F19946'),// '/api-ca/seal/sealAuditRecordList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
