import request from '../utils/request';
import common from '@/assets/js/common.js'
export const findTemplate = data => {//1.模板-根据ID查询


    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB54EB9E0D2DD5C71496E6470E7ECCE575499AA719A7774DC396926355D1D471E00'),//'/api-contract/template/findTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const duplicateTemplate = data => {// 8.模板-复制
    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB54DE22AC1C0AB8E7038B2600518975D03C0F798D30E3FCCD1ECE079C70A1928F6'),//'/api-contract/template/duplicateTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteTemplate = data => {// 7.模板-删除

    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB59821004FA588DE5C057E468CC0982560AE240F4C22380990A1CCC8A082479882'),//'/api-contract/template/deleteTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const addTemplate = data => {//2.模板-添加

  console.log(data);
    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB54B8A1FF2B17EC99E9F10EEFA18A11F8EA0028315F882F03232822A249DE2BC4D'),//'/api-contract/template/addTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const signArea = data => {//3.模板-设置签署区域

    
    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB545D2E0E299D7C35E878694A56D559C9F'),// '/api-contract/template/signArea',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data
    });
};
export const templateList = data => {// 4.模板-查询列表

    
    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB5A856D3FB384638791411028A8EDE48DA5F276D0751CAC5A5C7129F452D0ECB04'),//'/api-contract/template/templateList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const editTemplate = data => {//模板-编辑

    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB5033235CB50687B8F108EA27EF4CFEB3C817F3B844B436B3ACB494D672F99A501'),// '/api-contract/template/editTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const completeTemplate = data => {//模板-完成

    return request({
        url:common.base64DeCode('4151B396B07B7967CDAF401820BC6FB5E306547C90F9D248C4ADAC78FB9F8DC5832822E125547FE5E6B42A358B0FB324'),// '/api-contract/template/completeTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const startUsingTemplate = data => {//模版-启用停用
  return request({
    url: common.base64DeCode('4151B396B07B7967CDAF401820BC6FB5E70B5B2CD82C936A290651AFC3F5063A78BD0BB9963A2A160D5F74EAACDA879B'),// '/api-contract/template/enableTemplate'
    method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    data
  })
}