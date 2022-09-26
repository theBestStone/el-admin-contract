import request from '../utils/request';
import common from '@/assets/js/common.js'
export const updateVideoPermission = data => {//1.音视频签约 权限获取

    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABE68B5E9C6FDD078173E360815347C72F6D50FF99C41D6D10C63790F445F4A0DF7'),//'/api-video/room/updateVideoPermission',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const saveContract = data => {//2.合同- 发起签署，保存合同

    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA5965A1F09E7281413C5766A48E417BB719A63836CF6046C5B50AF01A70A128C63'),//'/api-video/videoContract/saveContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const findVideoContractFileList = data => {//合同- 查合同文件
    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA5F5375DED4A9DA534B7EAAD0F1BA2770CED2F6D67B4DDAA52813A815ECB26AECBE2555E65C4E1A87DACB68744DF1D6641'),//'/api-video/videoContract/findVideoContractFileList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data
    });
};
export const signContract = data => {//合同- 签署
    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA56B013603CE8A815A9C991EFD85654FE3F75F0FA70623098EBD5940F859AB559A'),//'/api-video/videoContract/signContract',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const findVideoContractList = data => {//5.合同- 查当前企业的合同

    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA5F5375DED4A9DA534B7EAAD0F1BA2770CB1BA0FFC37C6E2F581D6AF610629DAC2'),//'/api-video/videoContract/findVideoContractList',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const findVideoContractLog = data => {//合同- 查单个合同日志
 
    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA5F5375DED4A9DA534B7EAAD0F1BA2770C92494A9C80D4EB49ECADAAF9BC25070A'),//'/api-video/videoContract/findVideoContractLog',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const roomInfo = data => {//合同- 查单个合同日志
 
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABEF748673267C6598B62A92FADF09DC32B'),//'/api-video/room/info',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};

////////////////////
export const list = data => {//房间- 房间列表

    
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABEEFB16B909632AD84E85A4DAF359AFB3D'),//'/api-video/room/list',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data,
        noneCover:true
    });
};
export const createRoom = data => {//房间- 房间创建
    
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABE8F3E9193194800B1853C28094C167546'),//'/api-video/room/create',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const join = data => {///房间- 进入房间
    
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABEF9050EF2D4AF3FD29CE06BEC4604E251'),//'/api-video/room/join',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};
export const roomUsers = data => {//房间- 房间用户
    
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABE854A7EEC848F2120A0505A2FB461A8B0'),//'/api-video/room/users',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data,
        noneCover:true
    });
};
export const roomClose = data => {
    
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABE9324762CF0437BEF2444C3702B61B85A'),//'/api-video/room/close',
        method: common.base64DeCode('CBCAF99642BBB033F8BEAA6EE2D86CDF'),
        params:data
    });
};
export const roomEdit = data => {//.房间- 编辑
    
    return request({
        url:common.base64DeCode('996822A18A67B1DCBA7DBB00F34B7ABE6D39D696E61A013A2C7BCE61EE15EA9D'),//'/api-video/room/edit',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const findContractPersonNow = data => {//.
    
    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA5ECB776DFBBC9F8ED4820E9ADB51DCD039AF9CE1287CE1F39CF4274823E07E6BD'),//'/api-video/videoContract/findContractPersonNow',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
export const downloadVideoContract = data => {//.
    
    return request({
        url:common.base64DeCode('8BD77E55CD6874B3F73E598095EBDEA5CA317B3BFDE521EE2D1889C1CE0EE1849AA7CF55DF63972409FD51ADC4D3074DD79168A458EC2604501C05D154FEE7EA'),//'/api-video/videoContract/downloadVideoContract?blob',
        method: common.base64DeCode('95F562C83E9DC158906711D6B8616121'),
        data:data
    });
};
 
// params: query
