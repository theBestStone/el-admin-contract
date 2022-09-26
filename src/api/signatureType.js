import request from '../utils/request';
import common from '@/assets/js/common.js'

export const findSealTypeList = data => {//印章类型-列表
    return request({
        url:common.base64DeCode('C2DBFA20C406EBD0419A2934236423288A4F6A572CB7669778E42419C0A8CF6058E50ACAD60DDE1A39F31113A1BA7ECD'),//'/api-ca/sealType/findSealTypeList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const addSealType = data => {//印章类型-添加
    return request({
        url:common.base64DeCode('C2DBFA20C406EBD0419A29342364232806F34448415FCB9BA2744AC5A0316831'),//'/api-ca/sealType/addSealType,
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const editSealType = data => {//印章类型-编辑
    return request({
        url:common.base64DeCode('C2DBFA20C406EBD0419A293423642328EE5C2CAE864E0E974651D7E71F36F2AE'),//'/api-ca/sealType/editSealType,
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const delSealType = data => {//印章类型-删除
    return request({
        url:common.base64DeCode('C2DBFA20C406EBD0419A293423642328732379A73292BC8076288DC6FB37ACFD'),//'/api-ca/sealType/removeSealType,
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

