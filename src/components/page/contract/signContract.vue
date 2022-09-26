<!--  -->
<template>
  <div class="tempbox" style="height:100%;overflow:hidden;">
    <div class=" bg-white tempbox flex flex-direction" style="height:100%;overflow: hidden;">
      <div class="cf padding-sm" style="height:53px;box-sizing: border-box;cursor:pointer">
        <div class="fl" @click="backToHome"><i class="el-icon-arrow-left"></i> 返回首页</div>

        <div class="fr ">
          <el-button @click="back">返回</el-button>
          <el-button @click="refuseSign" type="primary" v-if="tempInfo.status == 1 && type == 1">拒签</el-button>
          <el-button @click="getMsg(1)" :disabled="settingDo" type="primary" v-if="tempInfo.status == 1 && type == 1">签署</el-button>


          <el-button @click="refuseSign2" type="primary" v-if="activeCom.status == 11 && type == 1">驳回</el-button>
          <el-button @click="getMsg(11)"  type="primary" v-if="activeCom.status == 11 && type == 1">通过</el-button>
        </div>
      </div>
      <div class=" flex flex-sub" style="overflow: hidden;">
        <div class="leftbox " :class="leftShowTag ? '' : 'leftboxHide'">
          <div class="to-left-side" @click="leftShowTag = !leftShowTag">
            <img v-if="leftShowTag" src="../../../assets/img/feature/coolLeft.png" alt="">
            <img v-if="!leftShowTag" src="../../../assets/img/feature/coolLeft2.png" alt="">
          </div>
          <div class="flex h100 flex-direction" style="overflow:hidden">

            <div class="contract-title margin-bottom-sm">文档列表</div>
            <div class="pre-view-box flex-sub padding-lr-sm" ref="prePdf">

              <el-collapse class="pre-view-collapse" @change="selectFile" v-model="activeFileIndexCopy" accordion>
                <el-collapse-item :title="item.fileName" v-for="(item, index) in fileList" :key="index" :name="index">
                  <template slot="title">
                    {{ item.fileName }}
                  </template>
                  <div class="pdf-scroll" :style="{ height: containerHeightpre + 'px' }">
                    <pdf-container ref="pdf" :conWidth="220" :conHeight="containerHeightpre"
                      :brotherIndex="brotherIndex" :imgUrlInfo="imgUrlInfo2" :pdfConfig="{ type: 'none', sizeType: type }"
                      @broindex="broindex">
                    </pdf-container>
                  </div>
                </el-collapse-item>

              </el-collapse>
            </div>
            <div class="pre-view-bottom-box flex flex-direction" :style="{height:preHeight+'px'}">
              <div class="flex align-center ">
                <div class="pre-view-bottom-title">附件</div>
                <span class="pre-view-bottom-down">全部下载</span>
                <div class="pre-view-bottom-num cursor-pointer" @click="fuChange">共{{fileList2.length}}份 <i :class="fuTag?'el-icon-arrow-down':'el-icon-arrow-right' " ></i></div>
              </div>
               <div class="flex-sub buity-scroll" style="overflow-y:auto;">
                <!-- el-collapse-transition -->
                 
                 <div v-if="fuTag">
                   <div class="flex align-center fu-li " v-for="(item, itemIndex) in fileList2" :key="itemIndex">
                       <div class="fu-name" :title="item.fileName">  
                         
                           <span> {{ item.fileName }} </span>
                          
                     </div>
                     <div class="fu-size" > 
                       <i style="font-size:16px;cursor:pointer" class="el-icon-download text-blue dpn"></i>
                       <span class="real-size">{{item.size|fileSize}} M</span>
   
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
          <!-- <pdf-container
                            ref="pdf" 
                            :conWidth="150" :conHeight="containerHeight"
                            :brotherIndex="brotherIndex"
                            :imgUrlInfo="imgUrlInfo2"
                            :pdfConfig="{ type: 'none',sizeType:type }"
                            @broindex="broindex"
                        >    
                        </pdf-container> -->

        </div>
        <!-- @scroll="windowScroll" -->
        <div class="flex-sub h100 center-box">
          <div class="pdfboxtop" ref="pdfboxtop">
            <!-- v-if="tagtrue" :page_num="page_num"-->

            <!-- <canvas id="the-canvas" class="canvasstyle" ></canvas> -->
            <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
            <pdf-container ref="pdfContainer" :key="pdfTagNum" :pdfConfig="{ type: 1, sizeType: type }"
              :conWidth="containerWidth" :conHeight="containerHeight" :activeFileObj="activeFileObj"
              :activeCom="activeCom" :imgUrlInfo="imgUrlInfo" @initPdf="initPdfText" @finishPdf="finishPdf">
            </pdf-container>
            
          </div>
        </div>
        <div class="rightbox h100" style="" :class="rightShowTag ? '' : 'leftboxHide'">

          <div class="to-right-side" @click="rightShowTag = !rightShowTag">
            <img v-if="rightShowTag" src="../../../assets/img/feature/coolRight.png" alt="">
            <img v-if="!rightShowTag" src="../../../assets/img/feature/coolRight2.png" alt="">
          </div>
          <div class="padding-sm h100" >

            <el-tabs v-model="leftTabName" class="h100" style="overflow-y:auto;">
              <el-tab-pane :label="activeCom.status==1?'添加信息':'文件审批'" v-if="activeFileObj.signingTag||activeCom.status==11" name="first" class="flex">
                <div v-if="activeCom.status==11">
                    <el-alert
                    title="请您仔细阅读文件后，进行审批操作。"
                    type="info"
                    :closable="false"
                    >
                  </el-alert>
                </div>
                <div class="flex-sub seal-img-box" >
                  <div v-if="sealMust()">
                  <div class="sign-way-title cf"  @click="viewAllSeal('view')"><div class="fl text-cut" style="width:170px;">{{dentify.orgName}}</div> <span class="fr all" style="color: #7C7C7C;">全部</span></div>
                    <el-carousel height="300px" class="signboximg "  :autoplay="false"
                          arrow="always" ref="sealboximg">
                          <!--  -->
                          
                          <el-carousel-item v-for="(item, index) in sealPage" :key="index">
                  
                             <div  class="flex flex-wrap" style="overflow-y:hidden;" :style="{height:signatureList.length-index*4<3?'127px':'224px'}">
                              <div class="text-center margin-tb-sm basis-df dargtipbox" v-for="(item2,index2) in 4" :key="index2" :style="{'cursor':activeFileObj.isArea?'not-allowed':'move'}">
                                <template  v-if="signatureList[index*4+index2]">

                                <!-- {{activeFileObj.isArea||!(!signatureList[index*4+index2].status||signatureList[index*4+index2].valid==0)}} -->
                                  <span class="dragtip" v-if="!activeFileObj.isArea&&!(!signatureList[index*4+index2].status||signatureList[index*4+index2].valid==0)">按住鼠标左键，拖动至签署区</span>
                                  <div style="position:relative;margin:0 4px;" v-signDrag="{'not-allowed':activeFileObj.isArea||!(!signatureList[index*4+index2].status||signatureList[index*4+index2].valid==0)?true:false}" @mousedown="setNowData(signatureList[index*4+index2], ChapterTypes.SEAL)">
                                      
                                      <el-image     style="height:80px;"  :src="signatureList[index*4+index2].fileImgWater" ref="sign1img" class="avatar2 drag-tool" fit="contain">  加载中<span class="dot">...</span></el-image>
                                      
                                      <div v-if="!signatureList[index*4+index2].status||signatureList[index*4+index2].valid==0" style="position:absolute;width:100%;left:0;height:100%;background:#000;opacity:.6;top:0;z-index:100"><div slot="placeholder" class="image-slot">
                                      </div></div>
                                      <p v-if="!signatureList[index*4+index2].status||signatureList[index*4+index2].valid==0" style="position:absolute;left:0;top:0;width:100%;z-index: 101;">
                                        <el-button style="width:100%" size="mini" v-if="(!signatureList[index*4+index2].status&&signatureList[index*4+index2].status!=0)" type="primary" @click="getAuthSign(signatureList[index*4+index2])">获取授权</el-button>
                                      <el-button style="width:100%" size="mini" v-if="signatureList[index*4+index2].status==0" >审核中</el-button>
                                      <el-button style="width:100%" size="mini" v-if="signatureList[index*4+index2].status==2||signatureList[index*4+index2].valid==0" type="primary" @click="getAuthSign(signatureList[index*4+index2])">重新获取授权{{signatureList[index*4+index2].valid==0?'（过期）':''}}</el-button>
                                      <el-button size="mini" v-if="signatureList[index*4+index2].status==2" type="primary" @click="getRemark(signatureList[index*4+index2])">查看驳回原因</el-button>
                                  </p>
                                  </div>
                                  <p>
                                      <span class="margin-top-sm text-bold">{{signatureList[index*4+index2].sealName}}</span>
                                  </p>
                                </template>
                                  
                                  
                              </div>
                          </div>
                          </el-carousel-item>
                        </el-carousel>
                    </div>
                  <div v-if="signMust()">
                    <div class="sign-img-box">
                      <div class="sign-way-title" @click="viewAllSign('view')">个人签名 <span class="fr all">全部</span></div>
  
                      <div>
                        
                        <el-carousel height="86px" @change="changeSignPage" class="signboximg dargtipbox" :style="{'cursor':activeFileObj.isArea?'not-allowed':'move'}" :autoplay="false"
                          arrow="always" ref="signboximg">
                          <span class="dragtip" v-if="!activeFileObj.isArea">按住鼠标左键，拖动至签署区</span>
                          <el-carousel-item v-for="(item, index) in signList" :key="index">
                            <div class="flex justify-center align-center drag-tool" style="position:relative;height:68px;"
                              v-signDrag="{'not-allowed':activeFileObj.isArea?true:false}" @mousedown="setNowData(item, ChapterTypes.SIGN)">
                              
                              <a v-if="item.defaultFlag == 1"
                                style="position:absolute;right:0;top:2px;padding:4px;border-radius:5px;"
                                class="bg-blue text-white">默认签名</a>
                              <div style="height:68px" class="drag-tool">
                                <el-image cls style="height:100%;" :src="item.waterImg" class="avatar2 " fit="contain">
                                </el-image>
                              </div>
                            </div>
                          </el-carousel-item>
                        </el-carousel>
                        <div class="text-center">标准签名 {{ signPage }}/{{ signList.length }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="margin-top-sm" v-if="writeMust()">
                    <div class="sign-way-title ">手绘签名 <span class="fr re-white" v-if="writeObj.writeId"
                        @click="getQr(false)">重写</span></div>
                    <div class="white-sign dargtipbox">
                      
                      <div class="white-tip" @click="getQr(false)" v-if="!writeObj.writeId"> <img style="width:30px;"
                          src="../../../assets/img/feature/sign-gray.png" alt=""> 扫码手绘签名</div>
                      <div class="h100" :style="{'cursor':activeFileObj.isArea?'not-allowed':'move'}" v-if="writeObj.writeId" v-signDrag="{'not-allowed':activeFileObj.isArea?true:false}" @mousedown="setNowData(writeObj, ChapterTypes.SIGN)">
                        <div class="h100">
                          
                          <span class="dragtip" v-if="!activeFileObj.isArea">按住鼠标左键，拖动至签署区</span>
                          <div style="height:88px;line-height:88px;width:240px;" class="drag-tool flex justify-center align-center">
                          
                            <el-image  style="height:80%"  :src="writeObj.fileImg"></el-image>
                          </div>
                        </div>
  
                      </div>
                    </div>
                  </div>
                  
                  <div class="margin-top-sm" v-if="activeCom.status!=11">
                  <!-- activeFileObj.timeTag&& -->
                    <div class="sign-way-title">日期格式 <span class="fr " 
                        @click="visibleDate=true" style="font-weight:500;cursor:pointer">切换格式</span>
                    </div>
                    <div  @mousedown="setNowData({time:dragDate}, ChapterTypes.FORMALTIME)" v-signDrag="{'not-allowed':(activeFileObj.isArea&&activeFileObj.timeTag)?true:false}" :style="{'cursor':activeFileObj.isArea&&activeFileObj.timeTag?'not-allowed':'move'}">
                      <!-- <ag-date ref="ag-date"></ag-date> -->
                      <div class="date-info drag-tool" >{{dragDate}}</div>
                    </div>
                  </div>
                  <div class="margin-top-sm" v-if="activeFileObj.areaTag">
                    <div class="sign-way-title">待填写内容 
                     
                    </div>
                    <div>
                       <div v-for="(item,index) in rectsPrint" :key="index">
                         <template  v-if="item.chapterType==ChapterTypes.TEXTAREA||item.chapterType==ChapterTypes.TEXT||item.chapterType==ChapterTypes.TEXTELEMENTAREA||item.chapterType==ChapterTypes.TEXTELEMENT">

                         </template>
                          <p> <span v-if="item.valSetting.isVerify" class="text-red">*</span> {{item.valSetting.textTitle}}</p>
                          <p>
                            <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                v-if="item.chapterType==ChapterTypes.TEXTAREA||item.chapterType==ChapterTypes.TEXT"
                                v-model="item.valSetting.content"
                                :maxlength="item.valSetting.textareaRow*item.valSetting.textareaTotal"
                                :ref="'text-input'+index"
                                @input="operationText($event,{operType:'changeText','batch':'one',index})"
                                show-word-limit
                              >
                              </el-input>
                            <!-- 文本填写 -->
                            <el-input
                                type="input"
                                placeholder="请输入内容"
                                v-if="(item.chapterType==ChapterTypes.TEXTELEMENTAREA||item.chapterType==ChapterTypes.TEXTELEMENT)&&item.valSetting.elementType=='text'"
                                v-model="item.valSetting.content"
                                :maxlength="item.valSetting.length"
                                :ref="'text-input'+index"
                                @input="operationText($event,{operType:'changeElementText','batch':'one',index})"
                                :show-word-limit="item.valSetting.length?true:false"
                              >
                              </el-input>
                              <!-- 组件填写单行文本类型 -->
                              <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                v-if="(item.chapterType==ChapterTypes.TEXTELEMENTAREA||item.chapterType==ChapterTypes.TEXTELEMENT)&&item.valSetting.elementType=='textarea'"
                                v-model="item.valSetting.content"
                                :maxlength="item.valSetting.length"
                                :ref="'text-input'+index"
                                @input="operationText($event,{operType:'changeElementText','batch':'one',index})"
                                :show-word-limit="item.valSetting.length?true:false"
                              >
                              </el-input>
                              <!-- 组件填写多行文本类型 -->
                            <el-input
                                type="number"
                                placeholder="请输入内容"
                                v-if="(item.chapterType==ChapterTypes.TEXTELEMENTAREA||item.chapterType==ChapterTypes.TEXTELEMENT)&&item.valSetting.elementType=='number'"
                                v-model="item.valSetting.content"
                                :maxlength="item.valSetting.length"
                                :ref="'text-input'+index"
                                @input="operationText($event,{operType:'changeElementText','batch':'one',index})"
                                :show-word-limit="item.valSetting.length?true:false"
                              >
                              </el-input>
                              <!-- 组件填写数字类型 -->
                              <el-date-picker
                              
                                placeholder="请输入内容"
                                v-if="(item.chapterType==ChapterTypes.TEXTELEMENTAREA||item.chapterType==ChapterTypes.TEXTELEMENT)&&item.valSetting.elementType=='date'"
                                v-model="item.valSetting.content"
                                :maxlength="item.valSetting.length"
                                :ref="'text-input'+index"
                                @change="operationText($event,{operType:'changeElementText','batch':'one',index})"
                              
                              >
                              </el-date-picker>
                              <!-- 组件填写日期类型 -->

                          </p>
                       </div>
                    </div>
                  </div>
                </div>
                
              </el-tab-pane>
              <el-tab-pane label="任务详情" name="second">
                <div class="rightbox-title">{{ tempInfo.contractName }}</div>
                <div class=" right-box-info">
                  <div class="flex">
                    <div class="info-left">状态：</div>
                    <div class="info-right">{{statusListStr( tempInfo.status)}}</div>
                  </div>
                  <div class="flex">
                    <div class="info-left">发起方：</div>
                    <div class="info-right">{{ tempInfo.initiatorName }}</div>
                  </div>
                  <div class="flex">
                    <div class="info-left">发起时间：</div>
                    <div class="info-right">{{ tempInfo.initiatorTime }}</div>
                  </div>
                  <div class="flex">
                    <div class="info-left">截止日期：</div>
                    <div class="info-right">{{ tempInfo.deadLine ? tempInfo.deadLine : '长期有效' }}</div>
                  </div>
                </div>
                <div class="rightbox-title">签署流程<span style="font-size:12px;color:#959595">（{{ signName }}）</span></div>
                <div class="sign-timeline">
                  <el-timeline>
                    <el-timeline-item v-for="(item, index) in comArr" :key="index"
                      :color="item.statusColor" size="normal">
                      <template  v-if="item.type == 1 || item.type == 2||item.type==6">

                      <div>
                        <div class="flex">
                          <div class="flex-sub">
                            <div>{{ item.name }} <el-tag size="mini">{{ item.type == 1 ? '个人' : '企业' }}</el-tag>
                            </div>

                            <div style="color: #959595;font-size: 10px;margin-top:4px;">{{ item.account }}</div>
                          </div>
                          <div style="width:50px;">
                            <span class="" style="font-size: 12px;"
                              :style="{ color: item.statusColor }">{{ item.statusName }}</span>
                          </div>
                        </div>
                      </div>
                      </template>

                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-tab-pane>

            </el-tabs>
          </div>
          <!-- <div class="teptitle margin-sm">文件列表</div>
                    <ul class="tempList">
                        <li :title="item.fileName" v-for="(item, index) in fileList" @click="selectFile(item,index)" :class="{ active: activeIndex == item.id }">
                            <i class="el-icon-document"></i>{{ item.fileName }}
                        </li>
                    </ul>
                    <div v-if="activeCom.method==0||activeCom.method==2" class="teptitle margin-sm"><span >签名</span> </div>
                    <ul class="companyList text-center margin-tb" v-if="activeCom.method==0||activeCom.method==2">
                         <el-image v-if="signObj" @click="beforSetReacts(1,signObj)" style="height:60px;width:112px;cursor:pointer;margin-top:10px"  :src="signObj.fileImg2" ref="sign2img" class="avatar2" fit="contain"><div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div></el-image>
                        
                         <el-button @click="toSign" type="primary" v-if="!signObj">添加签字</el-button>
                    </ul>
                    <div v-if="activeCom.method==1||activeCom.method==2" class="teptitle margin-sm" ref="ddd" >印章</div>
                    <div style="padding-bottom:40px;" v-if="activeCom.method==1||activeCom.method==2">
                         <div class="text-center margin-tb" v-for="item in signatureList">
                             <div style="position:relative">
                               
                                 
                                 <el-image @click="beforSetReacts(2,item)"  style="height:121px;cursor:pointer"  :src="item.fileImgWater" ref="sign1img" class="avatar2" fit="contain">  加载中<span class="dot">...</span></el-image>
                                 <div v-if="!item.status||item.valid==0" style="position:absolute;width:50%;left:25%;height:100%;background:#000;opacity:.6;top:0;z-index:100"><div slot="placeholder" class="image-slot">
                                  
                                </div></div>
                             </div>
                             <p>
                                <span class="margin-top-sm text-bold">{{item.sealName}}</span>
                             </p>
                             
                             <p v-if="item.status!=1||item.valid==0">
                                  <el-button size="mini" v-if="(!item.status&&item.status!=0)" type="primary" @click="getAuthSign(item)">获取授权</el-button>
                                 <el-button size="mini" v-if="item.status==0" >审核中</el-button>
                                 <el-button size="mini" v-if="item.status==2||item.valid==0" type="primary" @click="getAuthSign(item)">重新获取授权{{item.valid==0?'（过期）':''}}</el-button>
                                 <el-button size="mini" v-if="item.status==2" type="primary" @click="getRemark(item)">查看驳回原因</el-button>
                             </p>
                         </div>
                    </div> -->

        </div>
      </div>
    </div>
    <el-dialog
        title="签署意愿验证"
        :visible.sync="visibleCode"
         v-dialogDrag
         :before-close="close"
         class="auth-way"
         :modal-append-to-body='false'
        width="500px"
       >
       
        <auth-all ref="authAll"  :phone="realPhone" @closepop="closepop" :witchWay="witchWay" :contractNo="contId" @toNext="toNext" :verifyTag='false'>
        </auth-all>
       </el-dialog>

    <el-dialog title="输入密码" :visible.sync="visiblePass" v-dialogDrag width="500px">
      <six-pass ref="six"></six-pass>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="visiblePass = false">取 消</el-button>

        <el-button type="primary" @click="getSix()">签署</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请选择拒签原因" :visible.sync="visibleRefuse" v-dialogDrag width="400px">
            <div>
              <div class="margin-bottom-lg">
                 <el-radio v-model="refuseRadio" label="1">文件内容有异议</el-radio>
              </div>
              <div class="margin-bottom-lg">
                <el-radio v-model="refuseRadio" label="2">不知道如何操作</el-radio>
              </div>
              <div class="margin-bottom-lg">
                <el-radio v-model="refuseRadio" label="3">其他</el-radio>
              </div>
                <el-input
                    v-if="refuseRadio == 3"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入拒签原因(必须填写)"
                    maxlength="200"
                    show-word-limit
                    v-model="applyModel.refuseReason">
                    </el-input>
            </div>
            
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="visibleRefuse = false">取 消</el-button>
              
                <el-button type="primary" :disabled="refuseRadio == 3 ? applyModel.refuseReason.length > 0 ? false : true : refuseRadio == ''" @click="doRefuse()">拒签</el-button>
            </div>
        </el-dialog>
    <el-dialog title="驳回" :visible.sync="visibleRefuse2" v-dialogDrag width="500px">
      <div>
        <el-input type="textarea" :rows="4" placeholder="请输入驳回原因" v-model="applyModel2.refuseReason">
        </el-input>
      </div>

      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="visibleRefuse = false">取 消</el-button>

        <el-button type="primary" @click="doRefuse2()">驳回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加签字" :visible.sync="visibleWhite" v-dialogDrag width="500px" :before-close="handleClose">
      <div class="text-center ">
        <span class="shadow -black" style="display:inline-block;padding:10px;">

          <el-image style="width:200px;height:200px" class="" :src="qrimg" fit="contain"></el-image>
        </span>
        <p class="margin-top text-gray"><i class="el-icon-warning-outline text-red"></i>请使用手机微信或浏览器扫描二维码签名</p>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="handleClose">取 消</el-button>
        <el-button :disabled="!this.signimg" type="primary" @click="doWhiteId()">确定</el-button>
        <el-button type="primary" plain @click="getQr(1)">重新获取二维码</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择签名" :visible.sync="visibleSign" v-dialogDrag width="800px" >
      <div class="grid">
        <div v-if="writeObj.fileImg" style="position:relative;" class="margin-left margin-bottom shadow -black text-center"
          @click="sureSign(writeObj, index)">
          <a style="position:absolute;right:0;top:2px;padding:4px;border-radius:5px;"
            class="bg-blue text-white">仅本次使用</a>
          <el-image :src="writeObj.fileImg" class="asign-contract" fit="contain"></el-image>
        </div>
        <div style="position:relative;" class="margin-left margin-bottom shadow -black text-center"
          v-for="(item, index) in signListAll" :key="index" @click="sureSign(item, index)">
          <a v-if="item.defaultFlag == 1" style="position:absolute;right:0;top:2px;padding:4px;border-radius:5px;"
            class="bg-blue text-white">默认签名</a>
          <el-image :src="item.fileImg" class="asign-contract" fit="contain"></el-image>
        </div>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="visibleSign = false">取 消</el-button>
        <!-- <el-button type="primary" @click="sureSign()">确定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="选择印章" :visible.sync="visibleSeal" v-dialogDrag width="800px" >
      <div class="grid">
        
        <div style="position:relative;" class="margin-left margin-bottom shadow -black text-center"
          v-for="(item, index) in signatureList" :key="index">
          <a v-if="item.defaultFlag == 1" style="position:absolute;right:0;top:2px;padding:4px;border-radius:5px;"
            class="bg-blue text-white">默认印章</a>
          <el-image  @click="sureSeal(item, index)" :src="item.fileImg" class="asign-contract" fit="contain"></el-image>
          <div v-if="!item.status||item.valid==0" style="position:absolute;width:100%;left:0%;height:100%;background:#000;opacity:.6;top:0;z-index:100"><div slot="placeholder" class="image-slot">
                                  
                                </div>
          </div>
          <p v-if="!item.status||item.valid==0" style="position:absolute;left:0;top:0;width:100%;z-index: 101;">
              <el-button style="width:100%" size="mini" v-if="(!item.status&&item.status!=0)" type="primary" @click="getAuthSign(item)">获取授权</el-button>
            <el-button style="width:100%" size="mini" v-if="item.status==0" >审核中</el-button>
            <el-button style="width:100%" size="mini" v-if="item.status==2||item.valid==0" type="primary" @click="getAuthSign(item)">重新获取授权{{item.valid==0?'（过期）':''}}</el-button>
            <el-button size="mini" v-if="item.status==2" type="primary" @click="getRemark(item)">查看驳回原因</el-button>
        </p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="visibleSeal = false">取 消</el-button>
        <!-- <el-button type="primary" @click="sureSign()">确定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="日期格式选择"  :visible.sync="visibleDate"  width="500px">
       <div>
        <ag-date ref="agdate"></ag-date>
       </div>

      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="visibleDate = false">取 消</el-button>

        <el-button type="primary" @click="selectDate()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="温馨提示" class="none-padding" :visible.sync="visibleError"  width="500px">
      <div><el-alert
        title="以下文件缺少相关签署设置"
        type="warning"
         :closable="false"
        show-icon>
      </el-alert></div>
       <div class="error-box">
          <div v-for="(item,key) in errorObj" :key="key">
           
            <p class="error-title"><span class="tiph"></span>{{item.fileName}}</p>
            <p >
              <span class="error-content" v-for="(errArr, keyword) in item.errorArr" :key="keyword">{{errArr.name}}</span>
            </p>
          </div>
       </div>

      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="visibleError = false">取 消</el-button>
        <el-button type="primary" @click="visibleError = false">继续设置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import pdf from 'pdfjs-dist';
// import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
// pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import PdfView from '../../common/pdfView';
var tagddd = false;
import pdfContainer from '../../common/pdfContainer';
import AuthAll from '../../common/authAll';
import AgDate from '../../common/contract/agDate';
import SixPass from '../../common/sixPass';
import { uploadBase64, preview } from '../../../api/index.js';
import { saveDraftContract, findContract, saveContract, myPlayer, sign, findTime, refuseSign,faceResult,setting,approvalSign } from '../../../api/contract.js';
import { downloadFile, downloadFile2 } from '../../../api';
import { findDefault, signList, createQrCode, getQrCodeRes } from '../../../api/signManage.js';
import { signSealList, applySeal, findAuditReason } from '../../../api/signatureManage.js';
import { getDentify } from '@/utils/auth';
import { ChapterTypes, uuid, getStatusName, needToSign,AreaToSign,timeArr ,verifySign,StatusList} from './signUtile.js'
import bus from '@/components/common/bus';
import '../../../assets/css/contract.less'
import { getTime } from '../../../utils';
import { debuglog } from 'util';
import Template from "../template/template.vue";
 let moment = require("moment");
//  , SignInitialize, SealInitialize, TimeInitialize
// import { createQrCode,signList } from '../../../api/signManage.js';
let loading = null;
export default {
  components: {
    AuthAll, SixPass, pdfContainer, AgDate
  },

  data() {
    return {
      settingDo:true,
     
      timeArr:timeArr,
      timer:'',
      signImagType: '',//选择签名的type
      qrimg: '',
      writeObj: {
//         fileImg: "https://esign.dev.agilestar.cn/anysign/gateway/api-file/file/preview/e2d6821a649f45b7ba30fb827fea218e?t=0.5417956447253629&access_token=2b7fb293-f27a-4881-aa1f-13e9b9bc347e",
// writeId: "e2d6821a649f45b7ba30fb827fea218e"
      },//手写签名
      skey: '',
      skey2: '',
      leftShowTag: true,
      rightShowTag: true,
      signBase64: '',
      visibleWhite: false,
      visibleSign: false,
      visibleSeal:false,
      ChapterTypes: ChapterTypes,
      nowData: {},
      editInfo: {},
      signPage: 1,
      signList: [],
      signListAll: [],
      leftTabName: 'first',
      pdfTagNum: 'bdc',
      signName: '',
      containerHeight: 0,
      containerHeightpre: 0,
      containerWidth: 0,
      visibleDate:false,
      visibleError:false,
      contId: "",
      type: "",
      tempInfo: {},
      dentify: {},

      rectsObj: {},
       rectsPrint: [],
      signArea: [],
      fileList: [

      ],
      fileList2: [],
      activeIndex: 1,
      activeFileIndex: 0,
      activeFileIndexCopy: 0,
      activeFileObj: {},
      canStyle: {},
      applyModel: {
        refuseReason: "",
        contractNo:'',
      },
      applyModel2: {
        refuseReason: "",
        verifyCode:'',
        contractNo:'',
        status:''
      },
      visibleRefuse2:false,
      visibleCode: false,
      visibleRefuse: false,
      visiblePass: false,
      realPhone: '',
      userInfo: {},

      comArr: [

      ],
      bgArr: ['bg-orange', 'bg-blue', 'bg-purple', 'bg-green', 'bg-yellow', 'bg-brown', 'bg-pink'],
      loading: false,
      selections: [],

      list: [

      ],
      pdfNumTotal: 0,
      scale: 1,
      pdfUrl: '',
      pdfHeight: 0,
      scrolls: 0,
      nowindex: 0,
      activeCom: {

      },
      cid: 1,
      signSetting: [],
      signObj: "",
      signatureList: [],
      sealPage:0,
      comIndex: 0, //当前选中公司
      imgUrlInfo: [],
      imgUrlInfo2: [],
      pdfDoc_: null,
      pdfViewrefReady: false,//加载完成
      pdfShowTag: false,
      brotherIndex: 1,
      dragDate:'',
      nowDate:'',
      operationObj:{},
      firstShowRects:false,
      signListHttpStatus:0,
      sealListHttpStatus:0,
      defaultSignObj:{},
      defaultSealObj:{},
      errorObj:{},
      myHeartWay:'',
      witchWay:'',
      refuseRadio:'1',
      fuTag:false,
      preHeight:40
    };
  },
  created() {
    this.dentify = getDentify();
    this.getId();
    //  if(!this.contId){
    //     this.$router.push({path:'/contract'});
    //     return false;
    // }
    this.getDate(0)
    this.getType();

    this.myPlayer();
    this.getinfo();

  },
  mounted() {
    this.containerHeight = this.$refs.pdfboxtop.offsetHeight;
    this.containerWidth = this.$refs.pdfboxtop.offsetWidth;
    // this.$refs['ag-date'].timeOption();
    bus.$off("operation");
    bus.$on("operation",(option)=>{
      this.operation(option)
    })
    
    // this.prePdfboxHeight();
  },

  methods: {
    fuChange(){
      this.fuTag = !this.fuTag;
      if(this.fuTag){
        this.preHeight = 240;
        this.containerHeightpre = this.containerHeightpre-200
      }else{
        this.preHeight = 40;

        this.containerHeightpre = this.containerHeightpre+200
      }
    },
    prePdfboxHeight() {
      this.containerHeightpre = this.$refs.prePdf.offsetHeight-this.fileList.length*33;
      // this.containerWidthpre = this.$refs.prePdf.offsetWidth;
      console.log(this.containerHeightpre, "containerHeightpre")
    },
    async getDate(index,tag){
      // timeArr
      
      if(!this.nowData){
        let {data} = await findTime();
        this.nowData = data;
      }
      let a = moment(this.nowData).utc(8);
    
      a = await a.format(this.timeArr[index])
 
      if(tag){
        return a 

      }else{
        this.dragDate =a 
        return a 
      }
    },
    async selectDate(){
      if(this.operationObj.operType=='changeTime'){
        let a =await  this.getDate(this.$refs.agdate.activeDateIndex,true)
        console.log(a)
        bus.$emit('RealOperation',this.operationObj,{time:a})
        this.visibleDate = false;
      }else{
        let a =  await this.getDate(this.$refs.agdate.activeDateIndex)
         bus.$emit('RealOperation',{operType:'changeTime','batch':'more'},{time:a})
        
        this.visibleDate = false;
      }
      
    },
    back() {
      this.$router.go(-1)//返回上一层
    },
    backToHome(){
      this.$router.push("/admin")
    },
    getId(tag) {

      this.contId = this.$route.query.contId;// this.$store.getters.contId;

    },
    getType() {

      this.type = this.$route.query.tempType;// this.$store.getters.tempType;
    },
    async getSign() {
      let { data } = await signList({})
      data.forEach(item => {
        item.waterImg = 'data:image/png;base64,' + item.waterImg//preview(item.fileId);
        item.fileImg = preview(item.fileId);
        item.hoverTag = false;
        if(item.defaultFlag==1){
          this.defaultSignObj = item;
        }
      })
      // signListHttpStatus
      if(data.length==0){
        this.signListHttpStatus = 2;
      }else{
        this.signListHttpStatus = 1;
      }
      this.signList = data;
      this.signListAll = data;
      // if(data){

      //     data.fileImg2 = 'data:image/png;base64,'+data.waterImg//preview(data.fileId);
      //     data.fileImg = preview(data.fileId);
      //     this.signObj = data;

      // }else{
      //     this.signObj = null;
      // }

    },
    async getSignature() {
      let { data } = await signSealList({ 
        eid: this.dentify.orgId,
         // contractNo:this.contId,
        contractNo:this.contId })
      let arr = []
      data.forEach(item => {
        
        item.fileImg = preview(item.fileId);
        item.fileImgWater = "data:image/jpg;base64," + item.waterImg//preview(item.fileId);
        if(!(!item.status||item.valid==0)){//虽然有印章  但是有些是过期的  有些是没有权限的  真的有没有  还是过滤一下看长度
          arr.push(item)
        }
        // !signatureList[index*4+index2].status||signatureList[index*4+index2].valid==0
        if(item.defaultFlag==1&&!(!item.status||item.valid==0)){
          this.defaultSealObj = item;
        }
      })
      if(arr.length==0){
        this.sealListHttpStatus = 2;
      }else{
        this.sealListHttpStatus = 1;
      }
      this.sealPage =Number(parseInt(data.length/4))+1
      
      this.signatureList = data;
      //    this.$nextTick(()=>{
      //         function imgdragstart(){return false;}
      //         this.$refs.sign1img.forEach(item=>{
      //             setTimeout(()=>{
      //                 item.$el.ondragstart =imgdragstart
      //                 item.$el.contextmenu = imgdragstart
      //             },1000)

      //         })
      //     })
    },
    toSign() {
      this.$router.push("/mine/signManage")
    },
    async myPlayer() {
      let { data } = await myPlayer({ contractNo: this.contId });

      if (!data) {
        // this.$message.error("暂无权限签署");
        // this.back();
        this.tempInfo.status = 0;
        this.activeCom = {};

      } else {

        if (data.status != 1&&data.status != 11) {
          this.activeCom = {};
        } else {

          this.activeCom = data;
          if (this.type == 1) {
            if (this.signMust()) {//不限，经办人签字 标准签字

              this.getSign();
            }
            if (this.sealMust()) {

              this.getSignature();
            }
          }
        }
      }
      this.getById();
      // activeCom
    },
    signMust(){
      let data = this.activeCom;
      console.log(data.method)
      if (data.method == 0 || data.method == 2 || data.method == 8) {//不限，经办人签字 标准签字

        return true;
      }else{
        return false;
      }
    },
    sealMust(){
      let data = this.activeCom ;
      if (data.method == 1|| data.method == 2 ) {//

        return true;
      }else{
        return false;
      }
    },
    writeMust(){
      let data = this.activeCom ;
      if (data.method == 0 || data.method == 2 || data.method == 7) {//不限，经办人签字 标准签字
        return true;
      }else{
        return false;
      }
    },
    timeMust(){
      // rectsPrint
    },
    async getById() {
      let { data } = await findContract({ contractNo: this.contId })
      let arr = [];
      let arr2 = [];

      this.tempInfo = JSON.parse(JSON.stringify(data));
      if (data.signProcess == 1) {
        this.signName = '独立签'
      } else {
        if (data.signType == 1) {
          this.signName = '无序签'
        } else {
          this.signName = '顺序签'
        }
      }
      data.files.forEach(item => {
        item.url = downloadFile2(item.fileId)
        if (item.fileType == 1) {
          arr.push(item)
        } else {
          arr2.push(item)
        }
        item.signSetting2 = [];


      })

      this.fileList = arr;
      this.fileList2 = arr2;
       
      if(this.activeCom.status==1){
        this.leftTabName = 'first'
        needToSign(this.fileList, this.activeCom)
      }else if(this.activeCom.status==11){
        this.leftTabName = 'first'
         
      }else{
        this.leftTabName = 'second'
      }
      
      if (!this.pdfUrl) {
        this.pdfUrl = arr[0].url;
        // this.activeCom =  data.players[0];
        this.activeIndex = arr[0].id
        this.activeFileIndex = 0;
        this.activeFileIndexCopy = 0;
        // this.rects =data.files[0].signSetting2//reacts
        this.activeFileObj = arr[0]
      }
      let players = []
      data.players.forEach((item, index) => {
        if (item.type == 1 || item.type == 2) {
          item.signNum = 0,
            item.textNum = 0
          item.statusName = getStatusName(item.status).name
          item.statusColor = getStatusName(item.status).color

        }else{
     
          item.signNum = 0,
            item.textNum = 0
          item.statusName = getStatusName(item.status+'-1').name
          item.statusColor = getStatusName(item.status+'-1').color

        
        }
        
      })
      players = JSON.parse(JSON.stringify(data.players))
      this.comArr = players;

      //   if(this.type!=0){
      //       this.myPlayer();
      //   }
      this.$nextTick(() => {
        this.prePdfboxHeight();
        this.initPDF();
      })

    },
    getinfo(tag) {
      let res = this.$store.getters.user;
      // this.$store.dispatch('GetInfo', tag).then(res => {
      this.userInfo = res;
      this.realPhone = res.realPhone;
      // });
    },
    closepop(visible) {
      this[visible] = false;
    },
    async toNext(code) {
      if( this.myHeartWay ==1){
        this.tempAdd(1, code);
      }else if(this.myHeartWay ==11){
        this.doApply(code);
      }

 

      
    },
    statusListStr(status){
      let activeArr = StatusList.filter(item=>{
        return item.status==status
      })
      if( activeArr[0]){
         return activeArr[0].name
      }else{

        return ''
      }
    },
    getMsg(type) {
     
      this.myHeartWay = type
      if(type==1){

        let {errorObj,arrData} =  verifySign({activeFileIndex:this.activeFileIndex,fileList:this.fileList,activeCom:this.activeCom,rects:this.getRects()});
      
        if(JSON.stringify(errorObj) != "{}"){
           console.log(errorObj,"errorObj")
           this.errorObj = errorObj;
           this.visibleError = true;
            return false;
        }
      }else{
        this.applyModel2.status = 10;
      }
        this.witchWay = 'SMS'
        this.visibleCode = true;
        this.$nextTick(()=>{
          if(this.witchWay!='SMS'){

            this.$refs.authAll.setting()
            }
        })
       

      // }
    },
    async setmySetting(){
      // let {data} = 
    },
    refuseSign() {
      this.visibleRefuse = true;
    },
    refuseSign2(){
      this.applyModel2.status = 12;
       this.visibleRefuse2 = true;
    },
    async doRefuse() {
      if(this.refuseRadio==1){
        this.applyModel.refuseReason = '文件内容有异议'
      }else if(this.refuseRadio==2){
        this.applyModel.refuseReason = '不知道如何操作'
         
      }
      // if (!this.applyModel.refuseReason) {
      //   this.$message.error("请填写拒签原因")
      //   return false;
      // }
      this.$confirm("确认拒绝签署？", '温馨提示', {
        confirmButtonText: '拒签',
        cancelButtonText: '取消'
      })
        .then(async () => {
          this.applyModel.contractNo = this.contId;
       
          let { data } = await refuseSign(this.applyModel)
       
          this.$message.success('拒签成功');
          this.$router.push({ path: '/contract' })
        })
        .catch(() => { });


    },
    async doRefuse2() {
     
      if (!this.applyModel2.refuseReason&&this.applyModel2.status==12) {
        this.$message.error("请填写拒签原因")
        return false;
      }
      

      this.$confirm("确认驳回？", '温馨提示', {
        confirmButtonText: '继续驳回',
        cancelButtonText: '取消'
      })
        .then(async () => {
          this.doApply();
        })
        .catch(() => { });


    },
    async doApply(code){
      if(code){
        this.applyModel2.verifyCode = code;
      }
      this.applyModel2.contractNo = this.contId;
          let { data } = await approvalSign(this.applyModel2)

          this.$message.success('操作成功');
          this.$router.push({ path: '/contract' })
    },
    async tempAdd(type, code) {


      let model = {};//this.tempInfo;
      model.contractNo = this.contId;
      let {errorObj,arrData} =  verifySign({activeFileIndex:this.activeFileIndex,fileList:this.fileList,activeCom:this.activeCom,rects:this.getRects()});
      model.signInfo = arrData;
      // if (this.userInfo.signPwdEnabled == 0) {

        model.verifyCode = code;
      // } else {
      //   model.signPassword = code;
      // }
      model.version = this.tempInfo.version;
      //    console.log(model)
      // return false;
      let { data } = await sign(model);



      if (type == 0) {
        this.$message.success("保存成功")
      } else {
        this.$message.success("签署成功")
        this.$router.push({ path: '/contract' })
      }


    },
    getSix() {
      let six = this.$refs.six.sendCode();
      if (!six) {
        this.$message.info("输入密码")
        return false;
      }
      this.toNext(six, true)

    },

    initPDF(url) {


      this.$refs.pdfContainer.pdfInit(this.pdfUrl)
      this.$refs.pdf[this.activeFileIndex].pdfInit(this.pdfUrl);
      //查询pdf页码
      // pdf.getDocument(_this.pdfUrl).then(function(pdfDoc_) {
      //     _this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
      //     _this.pdfDoc_ = pdfDoc_;
      //     _this.$nextTick(()=>{


      //         _this.$refs.pdfViewref[0].setPdfDoc(pdfDoc_,'pdfViewref')
      //          _this.$refs.pdf.forEach(item => {
      //              item.setPdfDoc(pdfDoc_)
      //          });
      //      })
      // });
    },
    //  rederingFinish(num,PdfRef){

    //     if(num<this.pdfNumTotal-1){
    //         this.$refs[PdfRef][num+1].setPdfDoc(this.pdfDoc_,PdfRef)
    //     } 

    //     if(num==this.pdfNumTotal-2&&PdfRef=='pdfViewref'){

    //         this.pdfViewrefReady = true;
    //     }

    // },
    selectCom(item, index) {
      this.comIndex = index;
      this.activeCom = item;
    },
    selectFile(index) {
       
      if (index == this.activeFileIndex || typeof index == 'string') {
        return false;
      }
      this.imgUrlInfo = [];
      this.pdfTagNum = uuid();
  
      this.$set(this.fileList[this.activeFileIndex], 'signSetting2', JSON.parse(JSON.stringify(this.getRects())))
      this.activeFileIndex = index;
      this.activeIndex = this.fileList[index].id;
      this.activeFileObj = this.fileList[index];
      this.pdfUrl = this.fileList[index].url;
      this.nowindex = 0;
      this.$nextTick(() => {
        this.initPDF();
      });
      loading = this.$loading({
        lock: true,
        text: '切换中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    },

    // async beforSetReacts(nul, item) {
    //   let { y, page, x } = this.$refs.pdfContainer.witchPage();
    //   let objInit = {
    //     left: x,
    //     top: y,
    //     code: this.activeCom.code,
    //     method: this.activeCom.method,
    //     width: 0,
    //     height: 0,
    //     hideTag: false,
    //     chapterType: nul,
    //     bgClass: "",
    //     page: page,
    //     sealId: item.id,
    //     imgUrl: item.fileImg,
    //     isDraggable: true,
    //     fileId: this.activeFileObj.fileId,
    //     hideDel: true,
    //     content: ""
    //   };
    //   let area = this.activeFileObj.signSetting;
    //   if (area) {
    //     area = JSON.parse(area);
    //     let jumpObj = { top: 0 }
    //     let code = this.activeCom.code
    //     this.$message.success("已在签署区域添加" + (nul == 1 ? '签字' : '印章'))
    //     area.forEach((item2, index) => {
    //       if (item2.code == code) {//&&()
    //         if ((nul == ChapterTypes.SIGN && item2.chapterType == ChapterTypes.SIGNAREA)) {
    //           objInit.y1 = item2.y1;
    //           objInit.x1 = item2.x1;
    //           let obj2 = SignInitialize(JSON.parse(JSON.stringify(objInit)))// JSON.parse(JSON.stringify(objInit))
    //           obj2.chapterType = ChapterTypes.SIGN;
    //           obj2.page = item2.page;
    //           obj2.isDraggable = false;
    //           let top = this.$refs.pdfContainer.getSomePageHeight(item2.page)
    //           jumpObj.left = this.$refs.pdfContainer.realNum(item2.x1, item2.page);
    //           jumpObj.top = top + this.$refs.pdfContainer.realNum(item2.y1, item2.page);//用于跳转页面
    //           this.signInit(obj2)
    //         } else if ((ChapterTypes.SEAL && item2.chapterType == ChapterTypes.SEALAREA)) {
    //           objInit.y1 = item2.y1;
    //           objInit.x1 = item2.x1;
    //           let obj2 = SignInitialize(JSON.parse(JSON.stringify(objInit)))// JSON.parse(JSON.stringify(objInit))
    //           obj2.chapterType = ChapterTypes.SEAL;
    //           let top = this.$refs.pdfContainer.getSomePageHeight(item2.page)
    //           jumpObj.left = obj2.x1;
    //           jumpObj.top = top + Number(item2.y1);//用于跳转页面
    //           obj2.page = item2.page;
    //           obj2.isDraggable = false;

    //           this.sealInit(obj2)
    //         } else if (item2.chapterType == 5) {

    //           if (!item2.cid) {

    //             item2.cid = this.cid;
    //             this.$set(this.fileList[this.activeFileIndex], "signSetting", JSON.stringify(area))
    //             this.cid++
    //           }

    //           this.setTime(item2, index);
    //         }
    //       }
    //     })
    //     this.$refs.pdfContainer.jumpto(jumpObj.top)
    //     this.$set(this.fileList[this.activeFileIndex], "signSetting", JSON.stringify(area));//设置好setting 这是判断当前文件是否签署的关键 
    //   } else if (nul == ChapterTypes.SIGN) {
    //     let signObj = SignInitialize(JSON.parse(JSON.stringify(objInit)))
    //     this.signInit(signObj)

    //   } else if (nul == ChapterTypes.SEAL) {
    //     let signObj = SealInitialize(JSON.parse(JSON.stringify(objInit)))
    //     this.sealInit(signObj)
    //   } if (nul == ChapterTypes.FORMALTIME) {
    //     let signObj = TimeInitialize(JSON.parse(JSON.stringify(objInit)))
    //     this.timeInit(signObj)
    //   }
    // },
    // signInit(signObj) {
    //   this.rects.push(signObj);
    //   this.$refs.pdfContainer.markSize({
    //     imageUrl: signObj.fileImg,
    //     obj: signObj,
    //     index: this.rects.length - 1
    //   })
    // },
    // sealInit(signObj) {

    //   this.rects.push(signObj);
    //   this.$refs.pdfContainer.markSize({
    //     imageUrl: signObj.fileImg,
    //     obj: signObj,
    //     index: this.rects.length - 1
    //   })
    // },
    handleClose(){
      console.log(this.timer,"this.timer")
      if(this.timer){
        window.clearTimeout(this.timer)
      }
      this.visibleWhite = false;
    },
    // async timeInit(signObj) {
    //   let { data } = await findTime();
    //   obj.content = data
    //   this.rects.push(signObj);
    //   this.$refs.pdfContainer.markSize({
    //     imageUrl: "",
    //     obj: signObj,
    //     index: this.rects.length - 1
    //   })
    // },



    // setTime(item) {
    //   let tag = false;

    //   this.rects.forEach(async (i, index) => {

    //     if (i.cid == item.cid && !i.hideTag) {

    //       tag = true;
    //       let { data } = await findTime();
    //       this.$set(i, 'content', data)


    //     }

    //   })

    //   if (tag) {

    //     return false;
    //   } else {
    //     this.timeInit(item)
    //     // this.setReacts(6,item)
    //   }
    // },
    getAuthSign(item) {//applySeal
      this.$confirm("企业印章管理员负责审核印章使用权限，是否发起授权！", '温馨提示', {
        confirmButtonText: '发起授权',
        cancelButtonText: '取消'
      })
        .then(async () => {
       
          let { data } = await applySeal({ 
            sealId: item.id,
            // contractNo:this.contId,
             contractId:this.tempInfo.id,
            contractName:this.tempInfo.contractName
          })

          this.$message.success('审核中');
          this.getSignature();
        })
        .catch(() => { });
    },
    async getRemark(item) {
      let { data } = await findAuditReason({ id: item.id })
      this.$alert(data, '驳回原因', {
        confirmButtonText: '确定',
        type: 'error'
      });
    },
    initPdfText() {
      this.pdfShowTag = true;
    },
    broindex(item) {

      this.$refs.pdfContainer.tosomgWhere(item - 1)
    },


    finishPdf() {
      
      this.showReact();
     
    },
    showReact() {
      if(this.activeFileObj.signSetting2.length>0){
        if(this.activeFileObj.firstShowRects==1){//第一次进入的话是模板  第二次的话是已经处理好的数据
          let signMust = this.signMust();
          let sealMust = this.sealMust();
          let timeMust = this.activeFileObj.timeTag;//this.dragDate;
          if (signMust) {//判断是否需要标准签名
            if((this.signListHttpStatus==0&&signMust)||(this.sealListHttpStatus==0&&sealMust)||(timeMust&&!this.dragDate)){//需要等待标准签名接口请求成后继续
            //三种情况  都需要等待  重来。
              window.setTimeout(()=>{
                this.showReact();
              },1000)
              return false;
            }
             
          }
          console.log(signMust,sealMust,timeMust,"signMust,sealMust,timeMust")
          AreaToSign(this.activeFileObj,{
            signMust,sealMust,timeMust
          },{
            defaultSignObj:this.defaultSignObj,dragDate:this.dragDate,defaultSealObj:this.defaultSealObj
          })
          
          this.$set(this.activeFileObj,'firstShowRects',2)//第一次进入的话是模板  第二次的话是已经处理好的数据
          
          bus.$emit('showArea', 'signAndArea')
           this.rectsPrint = this.getRects()
        }else{

          bus.$emit('showArea', 'signAndArea')
           this.rectsPrint = this.getRects()
        }
      }
      this.settingDo =  false;
    },
    getRects() {
      return this.$refs.pdfContainer.rects
    },
    changeSignPage(index) {
      this.signPage = index + 1


    },
    setNowData(item, nul) {
      item.type = nul;
      this.nowData = item;
    },
    inPdf() {
      //  this.beforReal(nul,item);
      bus.$emit("beforReal", this.nowData.type, this.nowData, this.editInfo)
    },
    async getQr(tag) {

      if (!tag) {
        this.visibleWhite = true;
      }
      let { data } = await createQrCode({});
      this.qrimg = "data:image/png;base64," + data.qrCode;
      this.signimg = ''
      if(this.timer){
        window.clearTimeout(this.timer)
      }
      this.skey = data.skey;
      this.getQrCodeRes();
      // if(timers){
      //   window.clearInterval(timers);
      //   timers = null;
      // }else{
      //   timers = window.setInterval(this.getQrCodeRes,2000)
      // }
    },
    async getQrCodeRes() {

      let { data } = await getQrCodeRes({ skey: this.skey });
      if (data.base64 != 0) {
        this.qrimg = "data:image/png;base64," + data.base64;

        this.signimg = data.base64;
        this.skey2 = data.skey

      } else {
        this.timer = window.setTimeout(() => {
          this.getQrCodeRes();
        }, 1000)
      }
    },

    async doWhiteId() {
      let { data } = await uploadBase64({
        base64: this.signimg,
        fileName: "手绘签名.png",
        channelNo: "anysign",
        storeType: "1"
      })
      let obj = {
        fileImg: preview(data.id),
        writeId: data.id
      }
      this.writeObj = obj;
      console.log(obj,"obj")
      this.visibleWhite = false;
      // this.signBase64 = 
    },
    viewAllSign(type) {
      this.visibleSign = true;
      this.signImagType = type;
      this.operationObj = {}
    },
    viewAllSeal(){
      this.visibleSeal = true;
     
      this.operationObj = {}
    },
    sureSeal(item, index) {
      if(this.operationObj.operType=='changeSeal'||this.operationObj.operType=='changeCrossPageSeal'){
        
        bus.$emit('RealOperation',this.operationObj,item)
        this.visibleSeal = false;
      }
      else{
        console.log(index)
        let ind = Number(parseInt((index)/4))
        console.log(ind,"ind")
        this.$refs.sealboximg.setActiveItem(ind)
        this.visibleSeal = false;
      }
      // if (this.signImagType == 'view') {
      //   this.$refs.signboximg.setActiveItem(index)
      //   this.visibleSign = false;
      // } else {

      // }
    },
    sureSign(item, index) {
      if(this.operationObj.operType=='changeSign'){
        
        bus.$emit('RealOperation',this.operationObj,item)
        this.visibleSign = false;
      }else{
        this.$refs.signboximg.setActiveItem(index)
        this.visibleSign = false;
      }
      
    },
    subNum(){
      // if(!tagddd){
      //   this.rectsPrint = this.getRects()
      //   tagddd = true;
      // }
      // console.log(this.rectsPrint,"this.rectsPrint")
    },
    operation({batch,operType,index,uid}){  

      this.operationObj ={batch,operType,index,uuid:uid}
      console.log(operType,"operType")
      if(operType=='changeSign'){
        this.visibleSign = true;
      }else if(operType=='changeSeal'){//印章
        this.visibleSeal = true;
      }else if(operType=='changeCrossPageSeal'){//骑缝章
        this.visibleSeal = true;
      }else if(operType=='changeTime'){
        this.visibleDate = true;
      }else if(operType=='getTextArea'){
          // this.$refs['text-input']
          // console.log(this.$refs['text-input'+index],"this.$refs['text-input']")
          this.$refs['text-input'+index][0].focus()
      }
    },
    operationText(value,{batch,operType,index}){
    
        bus.$emit('RealOperation',{batch,operType,index},{text:value})
    }


  }
};
</script>
<style lang="less">
.auth-way{
  .el-dialog__body{
    padding:0 20px;
  }
}
.tempList {
  border-bottom: 4px solid #fafbfc;

 

  .active {
    background-color: #f7f8fa;
    color: #555555;
  }
}

// .center-box {
//     position: relative;
//     background-color: #f8f9f9;
//     z-index: 100;
//     border: 1px solid #ccc;
//     padding-bottom: 50px;
// }
.pdfboxtop {
  overflow: hidden;
  height: 100%;
}

.h100 {
  height: 100%;
  box-sizing: border-box;
}

.companyList {
  li {
    height: 30px;
    line-height: 30px;
    width: 180px;
    text-align: center;
    // background-color: #6e6eff;
    color: #fff;
    border-radius: 5px;
    margin: 10px auto;
    cursor: pointer;
    position: relative;

    p {
      width: 100%;
      height: 100%;
    }

    .comi {
      position: absolute;
      right: -30px;
      top: 5px;
      font-size: 20px;
    }
  }
}

.obj-li {
  border: 1px dashed #555555;
  height: 65px;
  line-height: 65px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
}

.cans {
  position: relative;
}

.pdfNumTotal {
  cursor: pointer;
  margin: 5px auto;
  display: inline-block;
  border-bottom: 1px solid #ccc;
}

.activepage {
  border: 1px solid #3285ff;
}

// .comopci {
//     opacity: 0.4;
// }
.tempbox {
  box-sizing: border-box;

  .avatar2 {
    display: inline-block;
    height: auto;
  }
}
</style>
