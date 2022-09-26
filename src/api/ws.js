 
import store from '../store'
import { getToken } from '@/utils/auth'
import common from '@/assets/js/common.js'
let Base64 = require('js-base64').Base64;
export const messagews = data => {
    let url = common.base64DeCode2('79E4CB8D8A0DE9793DC04A77E3A6F1DD031314D6F25D09E9BCCAEF08AD86800C')
    return process.env.VUE_APP_WS_API+url+'?access_token='+getToken()+"&timestamp="+new Date().getTime();///api-message/websocket
};
export const rooms = data => {
 ///api-video/home/websocket?hid=1&access_token=&code=123
 let url = common.base64DeCode2('996822A18A67B1DCBA7DBB00F34B7ABEDA84BDDEB944972A0A460048840A88BB')
    return process.env.VUE_APP_WS_API+url+'?access_token='+getToken()+"&hid="+data.roomId+"&code="+data.roomCode;///api-video/room/websocket
};
 
 