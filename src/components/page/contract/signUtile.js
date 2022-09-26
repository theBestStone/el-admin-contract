import bus from '@/components/common/bus';

export const ChapterTypes = {
    SIGN: 1,//签字
    SEAL: 2,//印章
    SIGNAREA: 3,//签字域
    SEALAREA: 4,//印章域
    TIMAREA: 5,//时间域
    FORMALTIME: 6,//时间
    TEXTAREA:'textArea',//文本域
    TEXT:'text',//文本
    PERFORATIONAREA:'perforationArea',//骑缝章域
    PERFORATION:'perforation',//骑缝章
    TEXTELEMENTAREA:'textElementArea',//组件域
    TEXTELEMENT:'textElement',//组件
    
   
};
export const dlObj = {
    '0':'3,5,textArea',
    '1':'4,5,textArea,perforationArea',
    '2':'3,4,5,textArea,perforationArea',
    '7':'3,5,textArea',
    '8':'3,5,textArea',
}
export const verifyAreaObj = {
    '0':'3',
    '1':'4',
    '2':'3,4',
    '7':'3',
    '8':'3',
}
export const verifySignObj = {
    '0':'1',
    '1':'2',
    '2':'1,2',
    '7':'1',
    '8':'1',
}

export const TypeList = [
    {value:1,name:'签字'},
    {value:2,name:'印章'},
    {value:3,name:'签字'},
    {value:4,name:'印章'},
    {value:5,name:'时间'},
    {value:6,name:'时间'},
    {value:'textArea',name:'文本'},
    {value:'text',name:'文本'},
    {value:'perforationArea',name:'文本'},
    {value:'perforation',name:'骑缝章'},
]
export const StatusList = [
    {
        name:"待TA签",
        status:"0" 
    },{
    name:"待签署",
    status:"1",
    color:'#959595',
  },{
    name:"已签署",
    status:"10",
    color:'#1C5BEF'
  },{
    name:"已撤销",
    status:"3"
  },{
    name:"已拒签",
    status:"4"
  },{
    name:"待TA签",
    status:"2"
  },{
    name:"解约中",
    status:"6"
  },{
    name:"部分解约",
    status:"7"
  },{
    name:"已解约",
    status:"8"
  },
  {
        name:"待TA签",
        status:"0-1" 
    },
  {
    name:"待审批",
    status:"1-1",
    color:'#959595',
  },{
    name:"已审批",
    status:"10-1",
    color:'#1C5BEF'
  },{
    name:"已撤销",
    status:"3-1"
  },{
    name:"已拒签",
    status:"4-1"
  },{
    name:"待TA签",
    status:"2-1"
  },{
    name:"解约中",
    status:"6-1"
  },{
    name:"部分解约",
    status:"7-1"
  },{
    name:"已解约",
    status:"8-1"
  }
]
export const sendArrFommat={
    '1':'sign',
    '2':'seal',
    '6':'time',
    'text':'textarea',
    'perforation':'crossPage',
    'textElement':'textElement'
}
export const timeArr = ['YYYY年MM月DD日', 'YYYY/MM/DD', 'YYYY-MM-DD', 'YYYY年MM月', 'YYYY/MM', 'YYYY-MM'
    
]
export function TimeInitialize(tObj) {
     
    return  Object.assign(tObj, {
       
        
        id: tObj.id,
        chapterType: ChapterTypes.FORMALTIME,
       
        degree: 0,
        deletable: true,
        isDraggable: true,
        resizable: true,
        width: tObj.width || 130,
        height: tObj.height || 20,
        imgUrl: '',
        valSetting:{
            content:'',
            fontColor:'#000000'
            
        }
    });
}
export function SignInitialize(tObj) {
    return Object.assign(tObj, {
        // left: tObj.left || 10,
        // top: tObj.top || 10,
        // x1:tObj.x1,//基于原始pdf的x
        // y1:tObj.y1,//基于原始pdf的y
        // code: tObj.code,
        // method: tObj.method,
        width: tObj.width || 55,
        height: tObj.height || 28,
        // width2: tObj.width2 || 55,
        // height2: tObj.height2 || 28,
        bgClass: '#a6d6f8',
        isDraggable: true,
        deletable: true,
     
        hideDel: false,
        lock:true,
        
        degree: tObj.degree || 0,
    }); 
}
export function SealInitialize(tObj) {
   
    return  Object.assign(tObj, {
        // left: tObj.left || 10,
        // top: tObj.top || 10,
        // x1:tObj.x1,//基于原始pdf的x
        // y1:tObj.y1,//基于原始pdf的y
        // code: tObj.code,
        // method: tObj.method,
        width: tObj.width || 120,
        height: tObj.height || 120,
        // width2: tObj.width2 || 55,
        // height2: tObj.height2 || 28,
        bgClass: '#a6d6f8',
        isDraggable: true,
        deletable: true,
        resizable: false,
        hideDel: true,
        lock:true,
        degree: tObj.degree || 0,
    } )
    // {
    //     left: tObj.left || 10,
    //     top: tObj.top || 10,
    //     x1:tObj.x1,//基于原始pdf的x
    //     y1:tObj.y1,//基于原始pdf的y
    //     code: tObj.code,
    //     method: tObj.method,
    //     width: tObj.width || 55,
    //     height: tObj.height || 28,
    //     width2: tObj.width2 || 55,
    //     height2: tObj.height2 || 28,
    //     hideTag: false,
    //     chapterType: tObj.chapterType,
    //     bgClass: '',
    //     page: tObj.page,
    //     sealId: tObj.sealId,

    //     imgUrl: tObj.imgUrl,
    //     isDraggable: true,
    //     deletable: true,
    //     fileId: tObj.fileId,
    //     hideDel: true,lock:true,
    //     content: '',
    //     dateSwitchDown: false,
    //     isSub: tObj.isSub,
    //     degree: tObj.degree || 0,
    //     guid: tObj.guid,
    //     valSetting:tObj.valSetting,
    // };
}
export function perforationInitialize(tObj) {
    
    return Object.assign(tObj, {
        // left: tObj.left || 10,
        // top: tObj.top || 10,
        // x1:tObj.x1,//基于原始pdf的x
        // y1:tObj.y1,//基于原始pdf的y
        // code: tObj.code,
        // method: tObj.method,
        width: tObj.width || 55,
        height: tObj.height || 28,
        // width2: tObj.width2 || 55,
        // height2: tObj.height2 || 28,
        bgClass: '#a6d6f8',
        isDraggable: true,
        deletable: true,
     
        hideDel: true,
        lock:true,
        degree: tObj.degree || 0,
        axis:"y",
        parent:true
         
    } )
     
}
export function TextInitialize(tObj) {
    return Object.assign(tObj, {
        hideTag: false,
        isDraggable: true,
        deletable: false,
        resizable: false,
        hideDel: true,lock:true,
        dateSwitchDown: false,
        degree: tObj.degree || 0
        
    });
}
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
export function calNum({rects,fileList,comArr,activeFileIndex}) {//实时计算当前文件的控件数量
    let obj = {};
    let rects2 = JSON.parse(JSON.stringify(rects))
    let rectsArr = [];
    let signArr = [ChapterTypes.SIGN,ChapterTypes.SEAL,ChapterTypes.SIGNAREA,ChapterTypes.SEALAREA,ChapterTypes.PERFORATIONAREA,ChapterTypes.PERFORATION];//签署控件名单
    let textArr = [ChapterTypes.TEXT,ChapterTypes.TEXTAREA]//文本控件名单
    rects2.forEach((item,index)=>{//去除骑缝章
        if(!obj[item.uuid]&&!item.hideTag){
            obj[item.uuid]=true;
            rectsArr.push(JSON.parse(JSON.stringify(item)))
        }
    })
    comArr.forEach((comItem,comIndex)=>{
        let signNum = 0;
        let textNum = 0;
        rectsArr.forEach((item,index)=>{
            if(item.code==comItem.code){
                item.userName=comItem.name
                if(signArr.indexOf(item.chapterType)!=-1){
                    signNum++
                }
                if(textArr.indexOf(item.chapterType)!=-1){
                    textNum++
                }
            }
        })
        comArr[comIndex].signNum = signNum;
        comArr[comIndex].textNum = textNum
    })
    
    // fileList.forEach((fileItem,fileIndex)=>{//file文件签署方的添加
        // let fileItem = fileList[activeFileIndex];//file文件签署方的添加
        let userArr = [];
        let fileObj = {}
        rectsArr.forEach((item,index)=>{
            if(!fileObj[item.code]){
                fileObj[item.code] = true;
                userArr.push(item.userName)
               
            }
        })
        console.log(userArr,"userArr")
        fileList[activeFileIndex].userArr = userArr;
    // })
    
     
}
export function calNumArea({fileList,comArr}){//计算所有文件的签署人
    fileList.forEach((fileItem,fileIndex)=>{//file文件签署方的添加
        let userArr = [];
        let fileObj = {}
        let setting = fileItem.signSetting2;
        if(setting.length>0){
            setting.forEach(setItem=>{
                if(setItem.fileId==fileItem.fileId&&!fileObj[setItem.code]){
                    fileObj[setItem.code] = true;
                    let arr =  comArr.filter(comImte=>{
                        return comImte.code==setItem.code
                    })
                    userArr.push(arr[0].name)
                }
            })
        }
        fileList[fileIndex].userArr = userArr;
    })
}
export function writerReact({activeFileIndex,fileList,comArr,rects,temp}){
    let rectsArr = [];
    rects.forEach(i=>{//将当前
        if(!i.hideTag){
            rectsArr.push(i)
        }
    })
    bus.$set(fileList[activeFileIndex],'signSetting2',JSON.parse(JSON.stringify(rectsArr)))  
    fileList.forEach(fileItem=>{//循环file
        let setting = fileItem.signSetting2;
        if(setting.length>0){
            
            let vars = []
           
            setting.forEach(setItem=>{//循环setting
                if(setItem.chapterType==ChapterTypes.TEXTELEMENTAREA||setItem.chapterType==ChapterTypes.TEXTELEMENT){//如果是模板组件   需要去除
                    vars.push(setItem)
                }
            })
            let aisi = vars.length==0?'':JSON.stringify(vars)
            
            fileItem.vars = aisi;//JSON.stringify
        }
    })
}

export function verifyElementVal({activeFileIndex,fileList,comArr,rects,temp}){
    let rectsArr = [];
    rects.forEach(i=>{//将当前
        if(!i.hideTag){
            rectsArr.push(i)
        }
    })
    bus.$set(fileList[activeFileIndex],'signSetting2',JSON.parse(JSON.stringify(rectsArr)))  
    let obj ={}
    let arrData = []
    fileList.forEach(fileItem=>{//循环file
        let setting = fileItem.signSetting2;
        let str = ''
       
        if(setting.length>0){
            let arr = [];
            setting.forEach(setItem=>{//循环setting
                
                
                if((setItem.chapterType==ChapterTypes.TEXTELEMENTAREA||setItem.chapterType==ChapterTypes.TEXTELEMENT)){
                    arr.push(setItem)
                    if(setItem.code==-99){

                        if(!setItem.valSetting.content&&setItem.valSetting.isVerify){
                            intoErrorObj(fileItem,{
                                name:'必填组件“'+setItem.valSetting.textTitle+'”未填写'
                            })
                            
                        }else{
                            let strChap = '';
                            if(sendArrFommat[setItem.chapterType]){
                                strChap = sendArrFommat[setItem.chapterType]
                            }
                        
    
                            let signObj ={
                                fileId:setItem.fileId,
                                type:strChap,
                                x:setItem.x1,
                                y:setItem.y1,
                                
                                rotate:setItem.degree,
                                signW:setItem.width,
                                signH:setItem.height,
                                page:setItem.page
    
                            }
                            if(strChap=='textElement'){
                                signObj.valSetting = setItem.valSetting;
                            }
                            arrData.push(signObj)
                            // 
                        }
                    }
                 } 
                
                //TEXTELEMENTAREA:'textElementArea',//组件域
                // TEXTELEMENT:'textElement',//组件
            })
           
            let aisi = arr.length==0?'':JSON.stringify(arr)
            fileItem.vars = aisi ;//JSON.stringify(fileItem.signSetting2);

        }
    })
    return {errorObj:obj,arrData};
    function intoErrorObj(fileItem,errObj){
        if(obj[fileItem.fileId]){
                            
            obj[fileItem.fileId].errorArr.push(errObj)
        }else{
            obj[fileItem.fileId] = {}
            obj[fileItem.fileId].fileName = fileItem.fileName;
            obj[fileItem.fileId].errorArr = [errObj];
        }
     }
}
export function verifySignArea({activeFileIndex,fileList,comArr,rects,temp}){
    //组合数据前先存储当前页面数据
    let rectsArr = [];
    rects.forEach(i=>{//将当前
        if(!i.hideTag){
            rectsArr.push(i)
        }
    })
    bus.$set(fileList[activeFileIndex],'signSetting2',JSON.parse(JSON.stringify(rectsArr)))  
    let fileObj = {}
    let arr = [];
    
    let obj ={}
    fileList.forEach(fileItem=>{//循环file
        let setting = fileItem.signSetting2;
        let str = ''
        comArr.forEach(comItem=>{//循环签署人
            let myTrueTag
            if(temp==1){
                myTrueTag = comItem.roleType==1
            }else{
                myTrueTag = comItem.type==1||comItem.type==2||comItem.type==4;
            }
            // if(comItem.type==1||comItem.type==2||comItem.type==4){
            if(myTrueTag){//需要填写的组件类型
                let veriobj = verifyAreaObj[comItem.method]
                comItem.veriobj = {}
                veriobj = veriobj.split(",")
                veriobj.forEach(i=>{
                    comItem.veriobj[i] = 0;
                })
                comItem.veriobj.otherModule = false;
                comItem.veriNum = veriobj.length;
                // for(let i in veriobj){
                //     comItem.veriobj[i] = 0;
                // }
                
            }
        })
        if(setting.length>0){
            let arr = [];
            // let otherModule = false;
            setting.forEach(setItem=>{//循环setting
                comArr.forEach(comItem=>{//循环签署人

                     if(setItem.code==comItem.code){//code相同是同一个人
                      
                        if(comItem.veriobj[setItem.chapterType]==0){//上面设置过 method不同 必加的组件不同
                            comItem.veriobj[setItem.chapterType]++;
                        }else if(setItem.chapterType==ChapterTypes.TEXTAREA){
                            if(!setItem.valSetting.textTitle){
                                intoErrorObj(comItem,fileItem,'文本组件未填写控件名称')
                                // arr.push(`${fileItem.fileName}下的${comItem.name}的文本组件未填写控件名称`)
                            }
                        }
                        if(setItem.chapterType==ChapterTypes.TEXTAREA||setItem.chapterType==ChapterTypes.TIMAREA||setItem.chapterType==ChapterTypes.PERFORATIONAREA){
                            comItem.veriobj.otherModule = true;
                        }
                        // comItem.veriobj[i] = false;
                     }
                        // comItem.veriobj[i] = false;
                    
                })
                if(setItem.chapterType!=ChapterTypes.TEXTELEMENTAREA&&setItem.chapterType!=ChapterTypes.TEXTELEMENT){//如果是模板组件   需要去除
                    arr.push(setItem)
                }
                
                //TEXTELEMENTAREA:'textElementArea',//组件域
                // TEXTELEMENT:'textElement',//组件
            })
            comArr.forEach(comItem=>{
                if(comItem.veriobj.otherModule){
                    if(comItem.method==2){//如果是既签字又盖章 则需要判断两个填全
                        if(comItem.veriobj['3']==1&&comItem.veriobj['4']==0){
                            intoErrorObj(comItem,fileItem,'缺少企业印章组件')
                        }else if(comItem.veriobj['4']==1&&comItem.veriobj['3']==0){
                            intoErrorObj(comItem,fileItem,'缺少签字组件')
                          
                        }else if(comItem.veriobj['4']==0&&comItem.veriobj['3']==0){
                            intoErrorObj(comItem,fileItem,'缺少签字组件')
                            intoErrorObj(comItem,fileItem,'缺少企业印章组件')
                           
                        }
                    }else if(comItem.method==1){
                        if(comItem.veriobj['4']==0){
                            intoErrorObj(comItem,fileItem,'缺少企业印章组件')
                        }
                    }else if(comItem.method==0||comItem.method==7||comItem.method==8){
                        if(comItem.veriobj['3']==0){
                            intoErrorObj(comItem,fileItem,'缺少企业印章组件')
                        }
                    }
                }else{

                    if(comItem.method==2){//如果是既签字又盖章 则需要判断两个填全
                        if(comItem.veriobj['3']==1&&comItem.veriobj['4']==0){
                            // arr.push(`请添加文件《${fileItem.fileName}》下的${comItem.name}的签章组件`)
                            intoErrorObj(comItem,fileItem,'缺少企业印章组件')
                        }else if(comItem.veriobj['4']==1&&comItem.veriobj['3']==0){
                            intoErrorObj(comItem,fileItem,'缺少签字组件')
                            // arr.push(`请添加文件《${fileItem.fileName}》下的${comItem.name}的签字组件`)
                        }
                    }
                }
 
                 
            })//循环签署人
            let aisi = arr.length==0?'':JSON.stringify(arr)
            fileItem.signSetting = aisi ;//JSON.stringify(fileItem.signSetting2);
        }
    })
    return {errorObj:obj};
    function intoErrorObj(player,fileItem,errObj){
        if(obj[player.code]){
            // obj[player.code].userName = player.name;
            if(obj[player.code][fileItem.fileId]){
                obj[player.code][fileItem.fileId].errorArr.push(errObj)
            }else{
                obj[player.code][fileItem.fileId] = {}
                obj[player.code][fileItem.fileId].fileName = fileItem.fileName;
                obj[player.code][fileItem.fileId].errorArr = [errObj];
            }

            // if(obj[player.code][fileItem.fileId])       
            
        }else{
            obj[player.code] = {}
            obj[player.code].name =player.name;
            obj[player.code][fileItem.fileId] = {}
            obj[player.code][fileItem.fileId].fileName = fileItem.fileName;
            obj[player.code][fileItem.fileId].errorArr = [errObj];
            
        }
     }
   
}
export function verifySign({activeFileIndex,fileList,activeCom,rects}){
     //组合数据前先存储当前页面数据
     let arrData = []
     let rectsArr = [];
     rects.forEach(i=>{//将当前
         if(!i.hideTag){
             rectsArr.push(i)
         }
     })
     bus.$set(fileList[activeFileIndex],'signSetting2',JSON.parse(JSON.stringify(rectsArr)))  
     let arr = [];
     let obj ={}
    let signMustTag = signMust(activeCom.method)
    let sealMustTag = sealMust(activeCom.method)
     fileList.forEach(fileItem=>{

        if(fileItem.signingTag){
            let setting = fileItem.signSetting2;
            let signTag = false;
            let sealTag = false;
            let crossPageObj = {}
            let crossPageArr = []
            setting.forEach(setItem=>{//循环setting
                 if(setItem.chapterType==ChapterTypes.TEXT||setItem.chapterType==ChapterTypes.TEXTAREA||setItem.chapterType==ChapterTypes.TEXTELEMENTAREA||setItem.chapterType==ChapterTypes.TEXTELEMENT){
                    if(!setItem.valSetting.content&&setItem.valSetting.isVerify){
                        intoErrorObj(fileItem,{
                            name:'必填组件 “'+setItem.valSetting.textTitle+' ”未填写'
                        })
                        
                    }
                 }
                 if(setItem.chapterType==ChapterTypes.SIGN){
                    signTag = true;
                 }
                 if(setItem.chapterType==ChapterTypes.SEAL){
                    sealTag = true;
                 }
                 if(!setItem.hideTag){//组装最后的数据
                    let strChap = '';
                    if(sendArrFommat[setItem.chapterType]){
                        strChap = sendArrFommat[setItem.chapterType]
                    }
                  

                    let signObj ={
                        fileId:setItem.fileId,
                        type:strChap,
                        x:setItem.x1,
                        y:setItem.y1,
                        
                        rotate:setItem.degree,
                        signW:setItem.width,
                        signH:setItem.height,
                        page:setItem.page

                    }
                    console.log(setItem,"setItem")
                    if(setItem.writeId){
                        signObj.writeId = setItem.writeId
                    }else{
                        signObj.sealId = setItem.sealId
                    }
                    if(strChap=='time'||strChap=='textarea'||strChap=='textElement'){
                        signObj.valSetting = setItem.valSetting;
                    }
                    if(strChap=='crossPage'){//如果是骑缝章  只需要一条数据
                        if(!crossPageObj[setItem.uuid]){
                            crossPageObj[setItem.uuid]= true;
                            crossPageArr.push(signObj)
                        }
                    }else{
                        arrData.push(signObj)

                    }

                 }

            })
            arrData.push(...crossPageArr)
            if(signMustTag&&!signTag){
                intoErrorObj(fileItem,{
                    name:'缺少经办人签名'
                })
            }
            if(sealMustTag&&!sealTag){
                intoErrorObj(fileItem,{
                    name:'缺少企业印章'
                })
            }
        }
     })//循环file
     return {errorObj:obj,arrData};
     function intoErrorObj(fileItem,errObj){
        if(obj[fileItem.fileId]){
                            
            obj[fileItem.fileId].errorArr.push(errObj)
        }else{
            obj[fileItem.fileId] = {}
            obj[fileItem.fileId].fileName = fileItem.fileName;
            obj[fileItem.fileId].errorArr = [errObj];
        }
     }
     function signMust(method){
        if (method == 0 || method == 2 || method == 8||method == 7) {//不限，经办人签字 标准签字 手写签字

            return true;
          }else{
            return false;
          }
     }
     function sealMust(method){
         
        if (method== 1|| method== 2 ) {//
  
          return true;
        }else{
          return false;
        }
      }
}
export function getStatusName(status){
    let activeArr = StatusList.filter(item=>{
        return item.status==status
    })
    if(activeArr.length>0){
        return {name:activeArr[0].name,color:activeArr[0].color}
    }else{
        return {name:'',color:''}
    }
}
export function calcWH(obj,item2,scale = 1,width2 = 'width2',height2 = 'height2'){
    //图片分竖着的和横着的，最大程度的缩放到签字域的大小
    let h1 = obj.baseHeight;
    let w1 = obj.baseWidth;
    let width,height;
    if ((w1/h1)>(item2[width2]/item2[height2])){
      //宽比高大，width占100%
      let widthP = Number(item2[width2])
      width = Number((widthP * Number(scale)).toFixed(2))
      height = Number(((h1 * widthP / w1) * Number(scale)).toFixed(2))
    } else {
      //高比宽大，height占100%
      let heightP = Number(item2[height2])      
      width = Number(((w1 * heightP / h1) * Number(scale)).toFixed(2)) //Number((w1 * Number(_this.pdfConfig.scale)).toFixed(2));
      height = Number((heightP * Number(scale)).toFixed(2))
    }
    return {width,height};
  }
  export function needToSign(fileList,info){//此方法判断是否可以签署且判断是否有时间，文本区域
    let otherTag = false;//判断是否设置了签署区域
    let setTag = false;//判断是否设置了签署区域
    fileList.forEach((item,index)=>{//第一次循环 获取文件是否设置签署区域且
        if(item.signSetting){
            setTag = true;
            let signSetting = JSON.parse(item.signSetting)
            signSetting.forEach(element=>{
                if(element.code==info.code){//区域code相等 属于当前签署人
                    if(element.chapterType==ChapterTypes.SIGNAREA||element.chapterType==ChapterTypes.SEALAREA){//必须设置了签字或印章才算设置了
                        otherTag = true;
                    }
                }
            })
        }
    })
    fileList.forEach((item,index)=>{//第二次循环 根据参数设置signSetting2以及筛掉不符的设置
        let timeTag = false;
        let areaTag = false;
        let signSetting = []
        if(item.signSetting){//setting的默认设置
            // let signSetting2 = JSON.parse(item.signSetting);
            signSetting.push(...JSON.parse(item.signSetting)) ;
        } 
        if(item.vars){//将组件数据放到这里
            signSetting.push(...JSON.parse(item.vars))
        }
        if(signSetting.length>0){//当前文件设置了区域
            bus.$set(item,'firstShowRects',1)//设置最初始的
            // let signSetting = JSON.parse(item.signSetting);
            let signingTag = false;
            let signSetting2 = [];
            let signSettingOther = [];
            
            signSetting.forEach(element=>{//循环区域
              
                if(element.code==info.code){//区域code相等 属于当前签署人

                    if(element.chapterType==ChapterTypes.SIGNAREA||element.chapterType==ChapterTypes.SEALAREA){//必须设置了签字或印章才算设置了
                        signingTag = true;
                        if((info.method==0||info.method==7||info.method==8||info.method==2)&&element.chapterType==ChapterTypes.SIGNAREA){
                            addKey(element)
                            signSetting2.push(element)
                        }else if((info.method==1||info.method==2)&&element.chapterType==ChapterTypes.SEALAREA){
                            addKey(element)
                            signSetting2.push(element)
                        }
                    }else{
                        
                        if(element.chapterType==ChapterTypes.PERFORATIONAREA){//骑缝也是章
                            if(info.method==2||info.method==1){
                                addKey(element)
                                signSetting2.push(element)
                            }
                        }else{
                            if(element.chapterType==ChapterTypes.TIMAREA){//如果有时间区域
                                timeTag = true;
                               
                            }if(element.chapterType==ChapterTypes.TEXTAREA||element.chapterType==ChapterTypes.TEXTELEMENTAREA){//如果有文本区域或者组件区域
                                areaTag = true;
                            }
                            // 
                            addKey(element)
                            signSetting2.push(element)
                        }
                    }
                    
                    // if()//

                    // }
                    
                }else{
                    signSettingOther.push(element)
                }
            })
            if(signingTag){//如果是有当前人的区域

                item.signingTag = signingTag;//查看设置的
                item.isArea = true;
            }else{//如果是没有当前人的区域
                if(otherTag){//设置的区域中至少有一个签署控件属于当前签署人
                    item.signingTag = false;//这个文件当前签署人不可签
                }else{
                    item.signingTag = true;//这个文件当前签署人可签
                }
                item.isArea = false;
            }
            item.timeTag = timeTag;//未设置区域  可以加时间
            item.areaTag = areaTag;//未设置区域  不可以加区域
            bus.$set(item,'signSettingOther',signSettingOther)
            bus.$set(item,'signSetting2',signSetting2)
        }else{//当前文件没设置区域
            if(setTag){//所有文件中至少一个文件设置了区域
                if(otherTag){//设置的区域中至少有一个签署控件属于当前签署人
                    item.signingTag = false;//这个文件当前签署人不可签
                }else{
                    item.signingTag = true;//这个文件当前签署人可签

                }
            }else{//所有文件都未设置区域
                item.signingTag = true;//这个文件当前签署人可签
            }
            item.isArea = false;
            item.timeTag = true;//未设置区域  可以加时间
            item.areaTag = false;//未设置区域  不可以加区域
        }
    })
     
  }
  export function addKey(item){
    bus.$set(item,'signAndArea',true)
    bus.$set(item,'bgClass','#a6d6f8')
    bus.$set(item,'isDraggable',false)
    bus.$set(item,'hideDel',true)
    bus.$set(item,'resizable',false)
   
  }
  export function AreaToSign(activeFileObj,{signMust,sealMust,timeMust},{defaultSignObj,dragDate,defaultSealObj}){//区域转为area的方法
    // console.log(fileList,"signSetting")
    let signSetting = activeFileObj.signSetting2;
    signSetting.forEach((item,index)=>{
        // defaultText
        if(signMust&&defaultSignObj.fileImg){
            if(item.chapterType==ChapterTypes.SIGNAREA){

                bus.$set(item,'chapterType',ChapterTypes.SIGN)//改类型
                bus.$set(item,'imgUrl',defaultSignObj.fileImg)//改图片
                bus.$set(item,'sealId',defaultSignObj.id)//改id
                bus.$set(item,'resizable',true)//改id
            
            }

        }
        if(sealMust&&defaultSealObj.fileImg){
            if(item.chapterType==ChapterTypes.SEALAREA){

                bus.$set(item,'chapterType',ChapterTypes.SEAL)//改类型
                bus.$set(item,'imgUrl',defaultSealObj.fileImg)//改图片
                bus.$set(item,'sealId',defaultSealObj.id)//改id
                // bus.$set(item,'resizable',true)//改id
            }
            if(item.chapterType==ChapterTypes.PERFORATIONAREA){

                bus.$set(item,'chapterType',ChapterTypes.PERFORATION)//改类型
                bus.$set(item,'imgUrl',defaultSealObj.fileImg)//改图片
                bus.$set(item,'sealId',defaultSealObj.id)//改id
                // bus.$set(item,'resizable',true)//改id
            }
            bus.$set(item,'sealWidth',defaultSealObj.sealWidth||42)//改实际宽高
            bus.$set(item,'sealHeight',defaultSealObj.sealHeight||42)//改实际宽高
             
             
        }
        if(timeMust){
            if(item.chapterType==ChapterTypes.TIMAREA){
                bus.$set(item,'resizable',true)//改id
                bus.$set(item,'chapterType',ChapterTypes.FORMALTIME)//改类型
                bus.$set(item,'valSetting',{
                    content:dragDate
                })//改图片
                
            }
             

        }
        if(item.chapterType==ChapterTypes.TEXTELEMENTAREA&&item.valSetting.defaultText){//组件文本如果有默认  则显示为默认

            bus.$set(item,'chapterType',ChapterTypes.TEXTELEMENT)//改类型
         
            bus.$set(item,'content',item.valSetting.defaultText)//改类型
        
        }
    })
    
   
  }

export const elementSettingFake = [{"left":371,"top":46,"width":102,"height":38,"hideTag":false,"chapterType":"textElementArea","page":1,"isDraggable":true,"fileId":"1ca5bccd815d4633a137f268ade4fd2c","hideDel":false,"content":"","remark":"","active":false,"uuid":"24463986-3950-47ad-9a40-49c03cd06702","valSetting":{"isVerify":true,"mark":"","fontColor":"#000000","textTitle":"","defaultText":"","fontSize":"13","textAlign":"center","fontFamily":"宋体","textTitle":"日期日期日期日期日期日期日期日期","elementType":"date","length":"","defultValue":""},"lock":false,"lock2":false,"rotatable":true,"degree":0,"resizable":false,"width2":102,"height2":38,"y1":"46.00","x1":"371.00","yc":"65.00","xc":"422.00"},{"left":296,"top":138,"width":102,"height":38,"hideTag":false,"chapterType":"textElementArea","page":1,"isDraggable":true,"fileId":"1ca5bccd815d4633a137f268ade4fd2c","hideDel":false,"content":"","remark":"","active":false,"uuid":"0d247a94-f86c-4461-b0e6-0afb31859940","valSetting":{"isVerify":true,"mark":"","fontColor":"#000000","textTitle":"","defaultText":"","fontSize":"13","textAlign":"center","fontFamily":"宋体","textTitle":"单行文本","elementType":"text","length":18,"defultValue":""},"lock":false,"lock2":false,"rotatable":true,"degree":0,"resizable":false,"width2":102,"height2":38,"y1":"138.00","x1":"296.00","yc":"157.00","xc":"347.00"},{"left":157,"top":552.5,"width":160,"height":50,"hideTag":false,"chapterType":"textElementArea","page":1,"isDraggable":true,"fileId":"1ca5bccd815d4633a137f268ade4fd2c","hideDel":false,"content":"","remark":"","active":false,"uuid":"5d470bd6-c351-4730-84d1-c7b58f09228c","valSetting":{"isVerify":true,"mark":"","fontColor":"#000000","textTitle":"","defaultText":"","fontSize":"13","textAlign":"center","fontFamily":"宋体","textTitle":"多行文本","elementType":"textarea","length":60,"defultValue":""},"lock":false,"lock2":false,"rotatable":true,"degree":0,"resizable":false,"width2":160,"height2":50,"y1":"552.50","x1":"157.00","yc":"577.50","xc":"237.00"},{"left":216,"top":284,"width":102,"height":38,"hideTag":false,"chapterType":"textElementArea","page":1,"isDraggable":true,"fileId":"1ca5bccd815d4633a137f268ade4fd2c","hideDel":false,"content":"","remark":"","active":false,"uuid":"b06dbac1-f216-4ca8-8cf7-53f2f58c792e","valSetting":{"isVerify":true,"mark":"","fontColor":"#000000","textTitle":"","defaultText":"","fontSize":"13","textAlign":"center","fontFamily":"宋体","textTitle":"身份证号","elementType":"text","length":18,"defultValue":""},"lock":false,"lock2":false,"rotatable":true,"degree":0,"resizable":false,"width2":102,"height2":38,"y1":"284.00","x1":"216.00","yc":"303.00","xc":"267.00"},{"left":166,"top":60,"width":102,"height":38,"hideTag":false,"chapterType":"textElementArea","page":1,"isDraggable":true,"fileId":"1ca5bccd815d4633a137f268ade4fd2c","hideDel":false,"content":"","remark":"","active":false,"uuid":"b73e6d1e-cda1-4e7b-a993-0e69b8e99780","valSetting":{"isVerify":true,"mark":"","fontColor":"#000000","textTitle":"","defaultText":"","fontSize":"13","textAlign":"center","fontFamily":"宋体","textTitle":"姓名","elementType":"text","length":4,"defultValue":""},"lock":false,"lock2":false,"rotatable":true,"degree":0,"resizable":false,"width2":102,"height2":38,"y1":"60.00","x1":"166.00","yc":"79.00","xc":"217.00"}]