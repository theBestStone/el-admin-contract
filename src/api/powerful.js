import request from '../utils/request';
import { getToken } from '@/utils/auth'
import common from '@/assets/js/common.js'
let Base64 = require('js-base64').Base64;
//企业能力-行业下拉框
export const openProfessionList = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FAE9348A514629BB89F87FE59FC0D3C961410D8753219A4CB606913B8F6D08204'),// '/api-openapi/openEntKey/openProfessionList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};
export const profilePicheckOpenEntcture = data => {//11.企业能力-检查权限

    
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F22A26CF8B620AF0AD785145047E3481C0EA00431A8AB88591421804F9B7DAC0F'),//'/api-openapi/openEntKey/checkOpenEnt',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
//企业能力-申请
export const applyOpenEnt = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F10F221F1C25F8EF368F25C5DF65013DF0AAA881377CBC6D4F2515A3EE730BF43'),//'/api-openapi/openEntKey/applyOpenEnt',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//api-列表
export const apiList = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F2C977B37585BDABC0A97D375D8B8915F'),//'/api-openapi/openApi/apiList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};
//api-申请
export const applyOpenApi = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FB5EBC2FAFE1D719155CB720945EE894B18790EB19BCA0231B05A196CF712C4C7'),//'/api-openapi/openApi/applyOpenApi',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//沙盒-列表
export const openTestList = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F28EA0E7D2C1A07646956E529A5F401160EF3BC327E15225167A61A9F260CE5E4'),//'/api-openapi/openApi/openTestList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//沙盒-测试
export const openApiDetail = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FCAD041E03F400B0E570E357BE335ABCFE0ED16F7A329550E6B1A4EE32F9D048D'),///api-openapi/openApi/openApiDetail',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//沙盒-请求
export const openApitop = data => {
    return request({
        url: process.env.VUE_APP_BASE_API+'/'+data.url,
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data.info
    });
};

export const openApitog = data => {
    return request({
        url: process.env.VUE_APP_BASE_API+'/'+data.url,
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data.info
    });
};

//账户信息
export const findOpenEntKey = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F7185A749DAD15E693B57A7840AD24ECCCD3DED4E4313605CF3027908A7C3469C'),//'/api-openapi/openEntKey/findOpenEntKey',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//重新生成账户信息
export const generateEntKey = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FAC60F36B125D73196F7A318E2D7C56438D74FC4F97EEFE0F420E6977D56A4B26'),//'/api-openapi/openEntKey/generateEntKey',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//操作日志-列表
export const openApiLogList = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FC9A0FFBBBE18EF7C72D3BDE6817A901ED93DA8E87C72DF13A8E4F2A8BE4690A5'),//'/api-openapi/openApiLog/openApiLogList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//操作日志回调-列表
export const callbackLogList = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F5E5FD8BE929AA92E0C8D84CCBBC257D36D4926F6346C15502D0BCC75B30EC0B0'),//'/api-openapi/openCallbackLog/callbackLogList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//操作日志-导出
export const exportOpenApiLog = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F19BBC5B50D6AC5F1377E43CF6D6E7796AF2DA1CAEF6E0D00AE6DC12CA61A74B4'),//'/api-openapi/openApiLog/exportOpenApiLog?blob',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data
    });
};

//操作日志回调-导出
export const exportCallBackLog = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F15C2A796CD9771A06AFFA5EBD9F287C9BC057BE3323B171C3C1E793836CE46802F69B98458FA2352879C0A3C4BD1FE18'),//'/api-openapi/openCallbackLog/exportCallBackLog?blob',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data
    });
};

//数据指标-导出
export const exportLogDayIndex = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FB95CC6BAF8F773AD70944718F1EC5E8994B3627B232EFE987A08C7A66CEB1F4F'),//'/api-openapi/openApiLog/exportLogDayIndex?blob',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params: data
    });
};

//数据指标
export const findLogIndex = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35F8C5071AA94DE20BC711219CF472C2B096E27979D252478A17BF910CE02091897'),//'/api-openapi/openApiLog/findLogIndex',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};

//数据指标列表
export const findLogDayIndexList = data => {
    return request({
        url:common.base64DeCode('B6DA5250199AC6F017FB1101C19CF35FEC6462FE4CE80FC861629B185CF15B4BED0C67F4AC6E623DD4C0E878B4477CA0'),//'/api-openapi/openApiLog/findLogDayIndexList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data: data
    });
};