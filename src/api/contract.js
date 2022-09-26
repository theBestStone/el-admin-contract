import request from '../utils/request';
import common from '@/assets/js/common.js'
import { getToken } from '@/utils/auth'
let Base64 = require('js-base64').Base64;
export const findContract = data => {//1.合同-根据ID查询


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DF07080227985AAA83316B62F2B1E5BAE3A81105C9BD5176517AD55B6AE2FC669'),//'/api-contract/contract/findContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const contractList = data => {//合同-分页查询（个人）

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D73DA363799C2D32AA3B77F23A2943B08DCC10FC95B0CAD2F2BA4A117E96D4D32'),//'/api-contract/contract/contractList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const contractListDepart = data => {//3.合同-分页查询（部门）

    
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D73DA363799C2D32AA3B77F23A2943B086313F1269910C789B630A14DB3BB376E'),//'/api-contract/contract/contractListDepart',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
         data
    });
};
export const contractListEnt = data => {// 4.合同-分页查询（企业）

    
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D73DA363799C2D32AA3B77F23A2943B0894EF001EEB3449BB8286910B9F9145B0'),//'/api-contract/contract/contractListEnt',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const saveDraftContract = data => {//5.合同-保存草稿


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D92BFB6DBDDE7AD4F2401CAB6145D77F8EDE04AFD90B5655E4B87149D40693E00'),//'/api-contract/contract/saveDraftContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findTime = data => {//.6.合同-获取当前时间


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D7495BDD18D92570DEAA530A2B5BC881B'),//,///api-contract/contract/findTime',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const saveContract = data => {//7.合同-发起签署


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DB4266E0D589D6A43CF18F712221EAE8F838349B90529D6FD6DF23A0B6D3A66C3'),//'/api-contract/contract/saveContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const sign = data => {//8.合同-签署



    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DC99C72DBB3166DFA56BAD5DC5DAF3E73'),//'/api-contract/contract/sign',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const downloadContractFiles = data => {//9.合同-下载文件
         let jiami = '54AF2D6F924DCC930ED99B8972E4268DB2BD52156EF933A357144A3D2511377DE4DB3FEB72CBB355042BF05F32484003';
        const url =process.env.VUE_APP_BASE_API+common.base64DeCode2(jiami)+'?t=' +Math.random()+"&access_token="+getToken()+'&contractNo='+data.contractNo;  ///api-contract/contract/downloadContractFiles
        const a = document.createElement('a')
        a.href = url
 
        a.click()
   
};
export const refuseSign = data => {//10.合同-拒签

 
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DB3E7504FB16B81FE8AADA4C4A68F8BF3633FC4DC04477501AD98A336098F65E5'),//'/api-contract/contract/refuseSign',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const withoutContract = data => {//11.合同-撤销

    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D12EDEDBA93B4C3A2EDB082A4606D6708029F89318F1E408F6E8A0B28E864AF14'),// '/api-contract/contract/withoutContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const urgeContract = data => {//12.合同-催办


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D9A001C7EDD35D73DAC1330C8CC18F7F68D14DF677B520A0EAB3F4B3DEB8BC702'),//'/api-contract/contract/urgeContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteContract = data => {//13.合同-删除

    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D6D9684B2B99E5312F1577435F7051491EF515472F0F01F8C93A778B42C8C93BE'),// '/api-contract/contract/deleteContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const myPlayer = data => {//合同-查询我是哪个参与人

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D4185B205845BD7E4E5816DE97E4A1CF3'),//'/api-contract/contract/myPlayer',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const contractIndex = data => {//合同-首页指标

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D90E4F34852690FD11076112F483C59B237F1EF63CF1B5903D78692C17299F70A'),//'/api-contract/contract/contractIndex',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const initBatchNo = data => {//14.合同-查询批次号


    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DADF4D895932F307E8D320C13EB3DE4FC025DD6713C3E882893D531D8D50A34C5'),//'/api-contract/contract/initBatchNo',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};
export const uploadFileContract = data => {//15.合同-文件上传
    let url = common.base64DeCode2('54AF2D6F924DCC930ED99B8972E4268DB281CDB19CBDCC8326EB52EADF9B50F7878E7398970E64E721B3D291A1D669E2')
    return process.env.VUE_APP_BASE_API+url+'?t' +Math.random()+'&access_token='+getToken()///api-contract/contract/uploadFile
    // return request({
    //     url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DB281CDB19CBDCC8326EB52EADF9B50F7878E7398970E64E721B3D291A1D669E2'),//'/api-contract/contract/uploadFile',
    //     method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
    //     data
    // });
};
export const delFileContract = data => {//16.合同-发起批次文件删除

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DEE984A354C619A0AC4A0929B2BFB521C'),//'/api-contract/contract/delFile',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const uploadStatus = data => {//16.合同-发起批次文件删除

    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D96920DBB2143F01D09B3698B09047894A2EF07062B3683B12D490E20179D0579'),//'/api-contract/contract/uploadStatus',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};

export const independentSignList = data => {// 独立签署列表查询
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D2CE6FF581A9C3ACAFDD472295E507F3FAD3BD3F9FF6930F51C56A18DE83E3083'),//'/api-contract/contract/independentSignList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}
export const independentDetailList = data => {// 独立签署子任务列表查询
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D2CE6FF581A9C3ACAFDD472295E507F3FEAA05C55E1E908493984BC5B84B35EA2D7540D415ACA6E6E0F299B88631736AB'),//'/api-contract/contract/independentSignDetailList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
}
export const setting = data => {// 签署意愿
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DF6B8263A8AD9624556760913A1A8DF9446B2CC52E003D952C76AF2AD65B91174'),//'/api-contract/contract/intent/setting',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data,
        noneCover:true
    });
}
export const faceResult = data => {// 人脸结果
   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DDEF2762FE96061FCE515154A3394D60712B26998088F3C91EE2763EC650261DA'),//'/api-contract/contract/intent/faceResult',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data,
        noneCover:true
    });
}
export const approvalSign = data => {//22.合同-文件审批(通过/驳回)

   
    return request({
        url: common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268DB0668CC13D099186A995F8E42B77159CCD65C57639632DE4A42019ABBF8BD4A7'),//'/api-contract/contract/approvalSign',
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

