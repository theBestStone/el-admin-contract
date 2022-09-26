import request from '../utils/request';
import common from '@/assets/js/common.js'
export const createQrCode = data => {//手写板-生成二维码接口

    return request({
        url:common.base64DeCode('0FA7AC58C3F34934B3CF5EE5982DDE75EBFB80159F8B7275B67EDF5A6BC518C8'),//'/api-ca/signPage/createQrCode',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const qrSealSave = data => {//手写板-保存接口

    return request({
        url:common.base64DeCode('0FA7AC58C3F34934B3CF5EE5982DDE75D0E545C6060582AF64667ECF92237568'),//'/api-ca/signPage/qrSealSave',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const getQrCodeRes = data => {//手写板-查看图片接口
    
    return request({
        url:common.base64DeCode('0FA7AC58C3F34934B3CF5EE5982DDE75DECFA359B32A1370515DA2CBD3616F65'),// '/api-ca/signPage/getQrCodeRes',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data,
        noneCover:true
    });
};
export const mySealList = data => {// 
    
    return request({
        url:common.base64DeCode('D17CB8F9074EE14D07169BAF08E49520230C7434EBFA9E108871C2908557C154'),//'/api-ca/seal/mySealList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};

export const addSign = data => {//签名-添加签名接口

    return request({
        url:common.base64DeCode('C6B7DCF9AF41BC4764ECA604E47AAFBAE753FB6AC5ADADB062AC7B61D37D821C'),//'/api-ca/seal/addSign',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const setDefault = data => {//.签名-设置默认接口

    return request({
        url:common.base64DeCode('32B9FAF99A668F62815DFA794A29FE86EBF580843E24D055494F83D06C096929'),// '/api-ca/seal/setDefault',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const signList = data => {//名-查询列表接口

    return request({
        url:common.base64DeCode('316A95B4AF43C3845E6B1F39FC65002C0CF93F5C7D8DCC9ACA7192F8458C9409'),//'/api-ca/seal/signList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const deleteSign = data => {//签名-删除接口


    return request({
        url:common.base64DeCode('F9242965C7D69A3E1CDF60887A485CA0A6E5D082A3F30C69C06057FB268A261A'),//'/api-ca/seal/deleteSign',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findSignLogById = data => {//.日志-印章使用记录



    return request({
        url:common.base64DeCode('54AF2D6F924DCC930ED99B8972E4268D31778383BD8028B73A6CFFDAC745658CFAEBB3490418D655C296BC7355DF43DF'),//'/api-contract/contractLog/findSignLogById',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findDefault = data => {//.8.签名-查询默认接口




    return request({
        url:common.base64DeCode('97EBB4EA9F6E037C4AF8C94C70AE8E53B4B44ED5397A35FACB8C0F5D220B5203'),//'/api-ca/seal/findDefault',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
