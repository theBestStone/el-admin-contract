
/*

element-ui-verify自定义验证规则

https://github.com/aweiu/element-ui-verify
maxLength: 最大文本长度校验
idcard: 身份证号校验
num: 数字格式校验
ltdatenow: 不能大于当前日期校验
*/
import util from '../util';
 
// 最大文本长度
export default [{
    rule: {
      name: 'maxLength',
      type: Number
    },
    ruleMethod: maxLength => ({
      max: maxLength,
      message: '长度在 ' + maxLength + ' 个字符内'
    })
  },
  {
    rule: {
      name: 'idcard',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        if (!val || util.verifyIdCard(val)) {
          callback()
        } else callback('无效的身份证号')
      }
    })
  },
 
  {
    rule: {
      name: 'agpass',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
 
        if (!val ||pwdReg.test(val)) {
          callback()
        } else callback('请输入8-16位数字和字母组合（区分大小写）')
      }
    })
  },
  {
    rule: {
      name: 'agsignpass',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        var signReg = /^\d{6}$/;
  
        if (!val ||signReg.test(val)) {
          callback()
        } else callback('请输入6位数字')
      }
    })
  },
  {
    rule: {
      name: 'agphone',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        if (!val || util.verifyMobile(val)) {
          callback()
        } else callback('手机号码不正确')
      }
    })
  },{
    rule: {
      name: 'numOrTh',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
           
        let tag = true;
        
        if(util.verifyNumber(val)){
          
          tag = true;
        }else if(typeof(val)=="string"){
          var ab = val.replace(/,/g,"");
            if(util.verifyNumber(ab)){
              tag = true;
            }else{
              tag = false;
            }
          
        }

        if (!val || tag) {
          callback()
        } else callback('填写正确金额')
      }
    })
  },
  {
    rule: {
      name: 'num',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        if (!val || util.verifyNumber(val)) {
          callback()
        } else callback('非数字格式')
      }
    })
  },
  {
    rule: {
      name: 'ltdatenow',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        if (!val || util.verifyLTDateNow(val)) {
          callback()
        } else callback('不能大于当前日期')
      }
    })
  },
    {
    rule: {
      name: 'gtdatenow',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        if (!val || util.verifyGTDateNow(val)) {
          callback()
        } else callback('不能小于当前日期')
      }
    })
  },
  {
    rule: {
      name: 'contractName',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        
        if (!val || val.length<=50) {
          callback()
        } else callback('主题长度需小于50')
      }
    })
  },
  {
    rule: {
      name: 'nonnull',
    },
    ruleMethod: () => ({
      validator(rule, val, callback) {
        let tag = val instanceof Array;
        console.log(tag)
        // alert(1)
        if(tag){
          if(val.length.length==0){
            callback('请选择签署要求')
          }else{
            callback()
          }
        }else{

          if (!val) {
            callback()
          } else callback('请选择签署要求')
        }
      }
    })
  },
];
