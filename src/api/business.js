import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
let Base64 = require('js-base64').Base64;
export const findSceneTypeList = data => {//1.场景业务类型-列表(毕书豪)


    return request({//

        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D7A40AC452E65CC516EFBBC52ADEE113EE200F8764B74316C3A0CE6E1E415E921ABA51D1D987C398B17638F11E2B8B33D'),//'/api-contract/contractSceneType/findSceneTypeList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addSceneType = data => {//2.场景业务类型-新增


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D7A40AC452E65CC516EFBBC52ADEE113E1842BAB6539986D1AC33F77C5FBE09A3'),//'/api-contract/contractSceneType/addSceneType',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const updateSceneType = data => {//3.场景业务类型-编辑


    
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D7A40AC452E65CC516EFBBC52ADEE113E26B8E47AC9DCC5D54C44271720F86C58'),//'/api-contract/contractSceneType/updateSceneType',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
         data
    });
};
export const findSceneList = data => {// 4.场景列表

    
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D4FD77AEBF22B0F8784395958F2D8D1DC8872B3AE7DAA48A65BD736A5B992F9A0'),//'/api-contract/contractScene/findSceneList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const addScene = data => {//5.场景-新增


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D627E5478BCB9F3061E3EE22A5D7D84AEDE6A7944FA14D5B24980CF25E2FDD867'),//'/api-contract/contractScene/addScene',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const hiddenScene = data => {//.6.场景-上/下架


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D100CFF1337320CE659F7B1BD4A4FA26E1ED9EFF238A5E7866FBF4D01ECA4F251'),//,///api-contract/contractScene/hiddenScene',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const tempFindSceneList = data => {//7.模板列表


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DE9ACA8FE5334EB1BDCD29ACA88A0C11ECD56F59A0A0E662861C2DBB958F4E0C8F6F4244F6F942E5A34E21FCB9375F5D8'),//'/api-contract/contractShopTemplate/findShopTemplateList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addShopTemplate = data => {//8.合同-签署



    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DE9ACA8FE5334EB1BDCD29ACA88A0C11EF624CCB8911F7023DC89CF3B6CE851C64B489CE7D057EB02E5C38F548FB9EBEB'),//'/api-contract/contractShopTemplate/addShopTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
 

       
export const updateShopTemplate = data => {//9.场景模板-编辑

 
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DE9ACA8FE5334EB1BDCD29ACA88A0C11EEC22120C27DBC985D98316C55C18F281318F99A9BD7F5947A43CAC5A70411DE2'),//'/api-contract/contractShopTemplate/updateShopTemplate',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findShopTemplateByNo = data => {//10.详情

    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DE9ACA8FE5334EB1BDCD29ACA88A0C11ECD56F59A0A0E662861C2DBB958F4E0C83E56E6423B56512D582DFFF53948E5A1'),// '/api-contract/contractShopTemplate/findShopTemplateByNo',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const addTemplateModule = data => {//11组件模板-新增


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DE9ACA8FE5334EB1BDCD29ACA88A0C11E76368E8B80C10F029D3D25F105C459D152589FCABF1D14610F327084F395A729'),//'/api-contract/contractShopTemplate/addTemplateModule',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const updateTemplateModule = data => {//12.组件模板-编辑

    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DE9ACA8FE5334EB1BDCD29ACA88A0C11E225DAFCA1CEF763A498EC02C6CA0A34E2D1680EB6FB4E1EDF73854570503C360'),// '/api-contract/contractShopTemplate/updateTemplateModule',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const myPlayer = data => {//合同-查询我是哪个参与人

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D4185B205845BD7E4E5816DE97E4A1CF3'),//'/api-contract/contractSceneType/myPlayer',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const contractIndex = data => {//合同-首页指标

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D90E4F34852690FD11076112F483C59B237F1EF63CF1B5903D78692C17299F70A'),//'/api-contract/contractSceneType/contractIndex',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const initBatchNo = data => {//14.合同-查询批次号


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DADF4D895932F307E8D320C13EB3DE4FC025DD6713C3E882893D531D8D50A34C5'),//'/api-contract/contractSceneType/initBatchNo',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};
export const uploadFileContract = data => {//15.合同-文件上传
    let url = common.base64DeCode2('54AF2D6F924DCC930ED99B8972E4268DB281CDB19CBDCC8326EB52EADF9B50F7878E7398970E64E721B3D291A1D669E2')
    return process.env.VUE_APP_BASE_API+url+'?t' +Math.random()+'&access_token='+getToken()///api-contract/contractSceneType/uploadFile
    // return request({
    //     url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DB281CDB19CBDCC8326EB52EADF9B50F7878E7398970E64E721B3D291A1D669E2'),//'/api-contract/contractSceneType/uploadFile',
    //     method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    //     data
    // });
};
export const delFileContract = data => {//16.合同-发起批次文件删除

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DEE984A354C619A0AC4A0929B2BFB521C'),//'/api-contract/contractSceneType/delFile',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const uploadStatus = data => {//16.合同-发起批次文件删除

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D96920DBB2143F01D09B3698B09047894A2EF07062B3683B12D490E20179D0579'),//'/api-contract/contractSceneType/uploadStatus',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};

export const independentSignList = data => {// 独立签署列表查询
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D2CE6FF581A9C3ACAFDD472295E507F3FAD3BD3F9FF6930F51C56A18DE83E3083'),//'/api-contract/contractSceneType/independentSignList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}
export const independentDetailList = data => {// 独立签署子任务列表查询
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D2CE6FF581A9C3ACAFDD472295E507F3FEAA05C55E1E908493984BC5B84B35EA2D7540D415ACA6E6E0F299B88631736AB'),//'/api-contract/contractSceneType/independentSignDetailList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}
export const setting = data => {// 签署意愿
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DF6B8263A8AD9624556760913A1A8DF9446B2CC52E003D952C76AF2AD65B91174'),//'/api-contract/contractSceneType/intent/setting',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data,
        noneCover:true
    });
}
export const faceResult = data => {// 人脸结果
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DDEF2762FE96061FCE515154A3394D60712B26998088F3C91EE2763EC650261DA'),//'/api-contract/contractSceneType/intent/faceResult',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}
export const approvalSign = data => {//22.合同-文件审批(通过/驳回)

   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DB0668CC13D099186A995F8E42B77159CCD65C57639632DE4A42019ABBF8BD4A7'),//'/api-contract/contractSceneType/approvalSign',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}
// export const faceResult = data => {// 人脸结果
   
//     return request({
//         url: common.base64DeCode('FD27CB0DE1B2C70A1C540831F68705CA5588514328C1228C5F095CC52811858F'),//'/contract/intent/faceResult',
//         method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
//         data:data
//     });
// }

