import CryptoJS from 'crypto-js'
let Base64 = require('js-base64').Base64;
let common = {
    base64DeCode(val) {
        return this.Decrypt(val);
    },
    base64DeCode2(val) {
        return this.Decrypt(val);
    },
    decodeArr: [
        
        { url: 'BEB838E69374DFD9A9F2601EBEE20EC6' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['userAccount', 'userName'] }] },//'findOrgUserList'
        { url: 'A894086E17FE6D552E449D229AC32F75890D1CAD3C0FCACA0652BC36275D2B52' , type: '1', deNameArr: ['userAccount', 'userName'] },//'findOrgUserListRealName'
        { url: '92F26B28E142DD7D9B722C5B73AC47CA' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['userAccount', 'userName'] }] },//'findUnAuditUser'
        { url:'963445839A400E7B0803AC6DCD7AD5DFBFEC88A3BB859896838CE4739BF0B23A' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['userAccount', 'userName'] }] },//'findAllOrgUserByRole'
        { url:'19A300316530B63A76C26AF19F3F85DEFD4116F8C2AB0626349DFC83F07923C6' , type: '1', deNameArr: ['cardNum', 'mobilePhone', 'email', 'username', 'password'] },//'/certInfo/addCert'
        { url:'9FE114DA7D8F93E3EB180A2E2D372B7043750603D7ECF084CE50BE39DF2A30B6' , type: '1', deNameArr: ['cardNum', 'mobilePhone', 'email', 'userName', 'password'] },//'/certInfo/findCert'
        { url:'AE30C4025EB9085A15E40ACE623003DB1C6E41017BE32F0C0330B19A7D041F7A' , type: '2', deNameArr: [{ 'dename': 'contract', type: 1, deNameArr: ['initiatorName', 'signer'] }, { 'dename': 'players', type: 2, deNameArr: ['name', 'account'] }] },//'/contract/findContract'
        { url:'2052369536C246EA87E2C8AA165AD72479D8488764B0E5EFD36704ED8904EEA2' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['initiatorName', 'signer'] }] },//'/contract/contractList'
        // { url:'7E7CF92C040915165E11293D1601D884F998CF136E18B1AEAA4753C7C48EA968' , type: '2', deNameArr: [{ 'dename': 'contract', type: 1, deNameArr: ['initiatorName', 'signer'] }, { 'dename': 'players', type: 2, deNameArr: ['name', 'account'] }] },//'/contract/saveDraftContract'
        // { url:'D89A3B7D0D3488FACA928BF1A8F34D854DE983BB5BF317DC59A3DADA58B8758B' , type: '2', deNameArr: [{ 'dename': 'contract', type: 1, deNameArr: ['initiatorName', 'signer'] }, { 'dename': 'players', type: 2, deNameArr: ['name', 'account'] }] },//'/contract/saveContract'
        {
            url: 'ADEC56010295505003E8202000C5A942' , type: '2', deNameArr: [
                { 'dename': 'contract', type: 1, deNameArr: ['initiatorName', 'signer'] }, { 'dename': 'players', type: 2, deNameArr: ['name', 'account'] }]
        },//'/contract/sign'
        // { url:'C86789767DB40E1AC193C7766CBAAE914B03126DA7F46CFC3BF1F0D9B7807DCD' , type: '2', deNameArr: [{ 'dename': 'contract', type: 1, deNameArr: ['initiatorName', 'signer'] }, { 'dename': 'players', type: 2, deNameArr: ['name', 'account'] }] },//'/contract/refuseSign'
        { url:'DF7CE73CCFC69D2735E54A514AB81D26FBA7A8D62ABCC1A77D4F71F85F1351CB' , type: '2', deNameArr: [{ 'dename': 'players', deNameArr: ['name'] }] },//'/template/findTemplate'
        { url:'65CD9EC38E720C6E63960C4FA4B1ED0D627FC5491FEBA6400CE8FF5FCB341EA4' , type: '2', deNameArr: [{ 'dename': 'players', deNameArr: ['name'] }] },//'/template/addTemplate'
        { url:'4129859D3C715ABDE82E40961F6666C97E05FD5247ED85C5D1A7AA15802B775B' , type: '2', deNameArr: [{ 'dename': 'players', deNameArr: ['name'] }] },//'/template/editTemplate'
        { url:'2011D8F00E16758FBA91E91869F54A2AA2314E6A2E5E62FE88C7BA8A885D8231' , type: '2', deNameArr: [{ 'dename': 'players', deNameArr: ['name'] }] },//'/template/duplicateTemplate'
        { url:'1F5048110ABD9651C4C28524557C1B6FFB11D83EB9619ADEB9235AA8BF1F9F7C' , type: '1', deNameArr: ['mail', 'name', 'account'] },//'/findContractPersonNow'
        { url:'F413D2B1D9430E91642C3E59C1EE67F50019F642784BA296F94D38743F565FC1' , type: '3', deNameArr: ['loginfo'] },//'findVideoContractLog'
        

        
        // { url:'217FC66D11D61EAB40773FA6D9AB1692F0AE402B19F220BBCFE20B3A079D05A6' , type: '1', deNameArr: ['email', 'userName', 'userAccount'] },//'/findContactList'
        { url: '217FC66D11D61EAB40773FA6D9AB1692F0AE402B19F220BBCFE20B3A079D05A6' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['email', 'userName', 'userAccount'] }] },//'/findContactList'
        { url:'F9F574F01F3F717CD42F67C7CD61E520D2C841EB374DDB76A7AE7893463CBED4FEE50C6A7DC16A791D3A4A1A63C35D87' , type: '1', deNameArr: ['email', 'userName', 'userAccount'] },//'/findContact'
        { url:'201943A83167F617E97366AA86B3CE00', type: '1', deNameArr: ['adminName'] },// '/findFirstPage'
        { url:'0C4F7746CEB6AD3EC0A2D83F1B1FEF9CF934A472280D499A32ECA5C0859B9C89', type: '1', deNameArr: ['legalPerson'] },// '/findOneOrgAuthInfoById'
        { url:'BCB771AF00F1032F7DC564CA2FF60A84C1C61C4D2A9E95C268731413952449C9' , type: '4', deNameArr: ['userName'] },//'/findAllOrgAuthInfoById'
        { url:'231E81E11AC6C9E914F7206498E6BD21FE5D7E03F2267FA389E465A4EF6BC849' , type: '3', deNameArr: ['relateName', 'relateAccount'] },//'/seal/relateList'
        { url:'CE5CDFB31AA9B7031D7CB867C2DC0CF0FDEC7A0FA661F376B3DA760620597795' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['relateName', 'relateAccount'] }] },//'/seal/auditSealList'
        { url:'54AF2D6F924DCC930ED99B8972E4268DD6920D5F823C1CE40DAA6D6226275E1221D3155A1AE3A7D8A36F8600584D0B9D' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['useName','useMember'] }] },//'/api-contract/contractLog/findContractLog'
        { url:'92532D52C40EEFC31904AF50561B1741637F8303F63C13D6178D7BDFF8B9D4FC8E86C83D487BEAA2C398D0DBC431EE96' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['operateUsername'] }] },//'/api-log/operateLog/operateLogList'
        { url:'54AF2D6F924DCC930ED99B8972E4268D31778383BD8028B73A6CFFDAC745658CB55B248F8C4E105D4567CE458FCEE5E2' , type: '2', deNameArr: [{ 'dename': 'list', type: 2, deNameArr: ['useName','useMember'] }] },//'/api-contract/contractLog/findSignLog'
       
    ],

    Encrypt(word) {
        let key = CryptoJS.enc.Base64.parse('HwAjAv7trJl0AP/+5yAVCg==');  //十六位十六进制数作为密钥
        let iv = CryptoJS.enc.Base64.parse('/xgA0AqJ7g0wmdyr/wgA3Q==');   //十六位十
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    },
    Decrypt(word) {
        // console.log(word, "Decrypt")
        if (!word) {
            return word;
        }
        word = (word + '').replace(/\n*$/g, '').replace(/\n/g, ''); //增加这一行，将换行符替换为空
        let key = CryptoJS.enc.Base64.parse('HwAjAv7trJl0AP/+5yAVCg==');  //十六位十六进制数作为密钥
        let iv = CryptoJS.enc.Base64.parse('/xgA0AqJ7g0wmdyr/wgA3Q==');   //十六位十
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();

    },
    IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';//edge
        } else if (isIE11) {
            return 11; //IE11  
        } else {
            return -1;//不是ie浏览器
        }
    },
    forMyCount(response) {
        let len = this.decodeArr.length
        
        for (let i = 0; i < len; i++) {
            if (response.config.url.indexOf( this.Decrypt(this.decodeArr[i].url)) != -1) {
                // console.log('我是加密接口',this.Decrypt(this.decodeArr[i].url),this.decodeArr[i].url)
                this.decodeArr[i].deNameArr.forEach(item => {

                    if (this.decodeArr[i].type == 1) {
                        try {
                            response.data.data[item] = this.Decrypt(response.data.data[item])
                        } catch (error) {
                            
                        }
                        
                    } else if (this.decodeArr[i].type == 2) {

                        item.deNameArr.forEach(element => {
                          
                            if (item.type == 1) {
                                // element

                                response.data.data[element] = this.Decrypt(response.data.data[element])
                            } else {
                                // console.log(response.config.url,"response.config.url")
                              
                                response.data.data[item.dename].forEach(tname => { 

                                    tname[element] = this.Decrypt(tname[element])
                                })
                            }
                        })
                        // response.data.data[item]
                        // response.data.data
                    } else if (this.decodeArr[i].type == 3) {
                        // console.log(response.data.data, "response.data.data")
                        response.data.data.forEach(item2 => {
                            // this.decodeArr[i].deNameArr.forEach(element=>{
                            item2[item] = this.Decrypt(item2[item])
                            // })
                        })
                    } else if (this.decodeArr[i].type == 4) {
                        response.data.data.forEach((item2, index) => {
                            // this.decodeArr[i].deNameArr.forEach(j=>{

                            if (index == 0) {
                                item2[item] = this.Decrypt(item2[item])
                            } else {

                                item2.forEach(element => {
                                    element[item] = this.Decrypt(element[item])

                                })
                            }
                            // })
                        })
                    }
                })
                // if(response.data.data.list){

                //     response.data.data.list.forEach(item=>{

                //     })
                // } 
                return false;
            }

        }
        // this.decodeArr.forEach(item=>{

        //     if(response.config.url.indexOf(item)!=-1){
        //         console.log( typeof response.data.data,"typeof response.data.data")
        //     }
        // })
        // response
    }

}
export default common