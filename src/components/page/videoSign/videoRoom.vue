<!--  -->
<template>
    <div class="signroom" style="position:relative">
        <div class="flex ">
            <div class="leftbox2" v-if="signing">
                <ul class="signing">
                    <li v-for="item in signingArr" :title="item.name">
                        <span
                            class="signingp"
                            :class="{
                                'text-red': item.signStatus == 0,
                                'text-blue': item.signStatus == 1,
                                'text-green': item.signStatus == 2
                            }"
                            >{{ item.name }}</span
                        >
                        <span class="signingp">
                            <el-tag type="danger" v-if="item.signStatus == 0">签署中</el-tag>
                            <el-tag type="success" v-if="item.signStatus == 2">已签署</el-tag>
                            <el-tag v-if="item.signStatus == 1">待签署</el-tag>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="center-box2 flex-sub ">
                <div class="room-borde" style="background:#1c1c1e" ref="videoroom">
                    <div v-if="!stream" class="videotip">
                        {{ signing ? (signingObj.name ? '等待 ' + signingObj.name + ' 开启共享' : '签署完成') : '还没有人开启屏幕共享' }}
                    </div>

                    <video :class="{ activevideo: !stream }" width="100%" height="100%" autoplay playsinline ref="sharevideo"></video>
                    <audio autoplay="" ref="shareaudio"></audio>
                </div>
                <div class="toolbox">
                    <el-button class="fl tool">
                        <div @click="toolFun(1)" style="font-weight:bold" :style="{ color: micTag ? '#3e52c0' : '#333' }">
                            <p><i :class="micTag ? 'el-icon-microphone' : 'el-icon-turn-off-microphone'"></i></p>
                            <p>麦克风</p>
                        </div>
                        <el-popover placement="top" class="ups" width="200px" trigger="click">
                            <div class="margin-sm text-center">麦克风</div>
                            <el-select @change="switchMic" v-model="audioId" placeholder="请选择">
                                <el-option v-for="item in audioList" :key="item.deviceId" :label="item.label" :value="item.deviceId">
                                </el-option>
                            </el-select>
                            <span
                                slot="reference"
                                class="icon-tool"
                                :class="{ 'el-icon-arrow-up': voinceTag, 'el-icon-arrow-right': !voinceTag }"
                                @click="voinceTag = !voinceTag"
                            ></span>
                        </el-popover>
                    </el-button>
                    <el-button class="fl tool">
                        <div style="font-weight:bold" :style="{ color: vidTag ? '#3e52c0' : '#333' }" @click="toolFun(2)">
                            <p><i :class="vidTag ? 'el-icon-anysign-shipin' : 'el-icon-anysign-shipin'"></i></p>
                            <p>{{ vidTag ? '关闭视频' : '开启视频' }}</p>
                        </div>
                        <el-popover placement="top" class="ups" width="200px" trigger="click">
                            <div class="margin-sm text-center">摄像头设置</div>
                            <el-select v-model="videoId" @change="switchWebcam" placeholder="请选择">
                                <el-option v-for="item in setAudioList" :key="item.deviceId" :label="item.label" :value="item.deviceId">
                                </el-option>
                            </el-select>
                            <span
                                slot="reference"
                                class="icon-tool"
                                :class="{ 'el-icon-arrow-up': videoTag, 'el-icon-arrow-right': !videoTag }"
                                @click="videoTag = !videoTag"
                            ></span>
                        </el-popover>
                    </el-button>
                    <el-button class="fl tool">
                        <div style="font-weight:bold" :style="{ color: voiceTag ? '#3e52c0' : '#333' }" @click="toolFun(3)">
                            <p>
                                <i :class="voiceTag ? 'el-icon-anysign-yinlianglabashengyin' : 'el-icon-anysign-yinlianglabashengyin'"></i>
                            </p>

                            <p>{{ voiceTag ? '关闭' : '开启' }}扬声器</p>
                        </div>

                        <el-popover placement="top" class="ups" width="200px" trigger="click">
                            <div class="margin-sm text-center">扬声器设置</div>
                            <el-select @change="switchAudio" v-model="outputAudioId" placeholder="请选择">
                                <el-option v-for="item in outputAudioList" :key="item.deviceId" :label="item.label" :value="item.deviceId">
                                </el-option>
                            </el-select>
                            <span
                                slot="reference"
                                class="icon-tool"
                                :class="{ 'el-icon-arrow-up': outputAudioTag, 'el-icon-arrow-right': !outputAudioTag }"
                                @click="outputAudioTag = !outputAudioTag"
                            ></span>
                        </el-popover>
                    </el-button>

                    <!-- <el-button  class="fl tool" @click="toolFun(4)" :disabled="stream" :style="{color:shareTag?'#3e52c0':'#333'}">
                      <p><i class="el-icon-anysign-pingmugongxiang"></i></p>
                      <p>屏幕共享</p>
                  </el-button> -->
                    <el-button
                        class="fl tool"
                        @click="toolFun(4)"
                        :disabled="stream && !shareTag"
                        :style="{ color: shareTag ? '#3e52c0' : '#333' }"
                    >
                        <p><i class="el-icon-anysign-pingmugongxiang"></i></p>
                        <p>{{ !shareTag ? '屏幕共享' : '切换屏幕' }}</p>
                    </el-button>
                    <el-button class="fl tool" @click="toolFun(5)">
                        <p><i class="el-icon-anysign-a-ziyuan103"></i></p>
                        <p>复制邀请</p>
                    </el-button>
                    <el-button class="fl tool" @click="toolFun(7)" v-if="admin && status == 0">
                        <p><i class="el-icon-edit-outline"></i></p>
                        <p>视频签约</p>
                    </el-button>
                    <el-button class="fl tool" @click="toolFun(9)" v-if="status == 1">
                        <p><i class="el-icon-edit-outline"></i></p>
                        <p>签署</p>
                    </el-button>

                    <el-button class="fr tool" @click="toolFun(6)">
                        <p><i class="el-icon-error"></i></p>
                        <p>离开房间</p>
                    </el-button>
                    <div class="fr" style="margin-top:30px;" @click="toolFun(8)" v-if="shareTag">
                        <el-button type="danger">结束共享</el-button>
                    </div>
                </div>
            </div>
            <div class="rightbox2" ref="rightbox2">
                <div class="headerbox" ref="headerbox">
                    <ul>
                        <div v-if="userList.length == 0" class="text-gray" style="font-size:14px;">正在获取房间成员....</div>
                        <li v-for="item in userList" style="position:relative">
                            <div class="usersname" v-if="!item.track1">{{ item.name }}</div>
                            <video
                                width="100%"
                                :class="{ activevideo: !item.track1 }"
                                height="100%"
                                autoplay
                                playsinline
                                :ref="'headvideo' + item.uid"
                            ></video>
                            <audio :class="{ activevideo: !item.track2 }" autoplay="" :ref="'headaudio' + item.uid"></audio>
                            <i v-if="!item.track2" style="color:#fff" class="el-icon-turn-off-microphone voiceicon"></i>
                            <i
                                :ref="'audioicon' + item.uid"
                                :style="{ color: item.speak ? '#39b54a' : '#fff' }"
                                v-if="item.track2"
                                class="el-icon-microphone voiceicon"
                            ></i>
                        </li>
                    </ul>
                </div>
            </div>
            <el-dialog custom-class="roomdialog" fullscreen :modal-append-to-body="false" :append-to-body="true" :visible.sync="visible">
                <!-- <div slot="header"></div> -->
                <new-contract ref="news" @close="visible = false" @change="change"></new-contract>
            </el-dialog>
            <el-dialog :modal-append-to-body="false"   :append-to-body="true" fullscreen custom-class="roomdialog" :visible.sync="visible2" v-dialogDrag>
                <sign-contract ref="signs" @change="change"></sign-contract>
            </el-dialog>

            <!-- <div class="text-center sucbox" v-if="visibleSuccess">
                <el-image style="width:100%" :src="require('../../../assets/img/success.gif')"></el-image>
            </div> -->
            <!-- <el-dialog title="阅览" :visible.sync="visibleSuccess" top="10px" width="80%" >
                <div class="text-center margin" v-if="pdfNumTotal==0">
                    加载中，请稍后...
                </div>
                <div v-if="pdfNumTotal>0" v-for="item in pdfNumTotal" class="cans">
                <pdf-view :pdfConfig="{ pdfUrl: pdfUrl, scale: 1,type:2, pageNum: item }" ref="pdfViewref"></pdf-view> 
                </div>
            </el-dialog> -->
            <el-dialog title="阅览" :visible.sync="visibleSuccess" top="2%" @close="initPDFTag"  width="80%" >
                <div style="width:100%;height:80vh;overflow:hidden" ref="bbox">
                
                    <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
                    <pdf-container
                        ref="pdfContainer" 
                        :pdfConfig="{ type: 1}"
                        :conWidth="conWidth" :conHeight="conHeight"
                        :rects="rects"
                        :imgUrlInfo="imgUrlInfo"
                        @initPdf="initPdf"
                    
                    >    
                    </pdf-container>
                </div>
                </el-dialog>
        </div>
        <websoket v-if="wstag" ref="ws" @onmessage="wsonmessage" @onclose="wsonclose"></websoket>
        <div v-if="loading" class="coverbox"></div>
        <div v-if="loading" class="cover">正在进入签约室 <i class="el-icon-loading"></i></div>
    </div>
</template>

<script>
import NewContract from './newContract';
import SignContract from './signContract';
// import MRTC from '../../../lib/mrtc.esm1.js';
import MRTC from '../../../lib/mrtc.umd.js'
 
 
import websoket from '../../common/websoket';
import { findVideoContractFileList, findContractPersonNow, roomInfo } from '../../../api/video.js';

import { mapGetters } from 'vuex';
import pdf from 'pdfjs-dist';
import pdfjsWorker from '@/assets/js/pdf-dist/pdf.worker.entry.js';
pdf.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import PdfView from '../../common/pdfView';
import {downloadFile} from '../../../api';
// import { setTimeout, clearTimeout } from 'timers';
export default {
    components: { NewContract, SignContract, websoket,PdfView },
    data() {
        return {
            conWidth:0,
            conHeight:0,
            status: 0,
            visible: false,
            visible2: false,
            admin: false,
            visibleSuccess: false,
            voinceTag: false,
            loading: false,
            videoTag: false,
            outputAudioTag: false,
            contractId: '',
            wstag: false,
            audioList: [],
            setAudioList: [],
            outputAudioList: [],
            audioId: '',
            videoId: '',
            outputAudioId: '',
            options: {
                applicationId: '888828664584601600',
                roomId: '',
                userId: '',
                displayName: '',
                token: '',
                host: 'rtc.migu.cn'// 'rtc.migu-net.cn:34443'
            },
            signing: false,
            signingObj: {},
            signingArr: [],
            sdk: null,
            myend: false,
            params: {},
            micTag: false,
            vidTag: false,
            voiceTag: true,
            shareTag: false,
            userList: [],
            userList2: [],
            constraints: {
                // 表示同时采集视频金和音频
                video: {
                    width: 640, // 宽带
                    height: 480, // 高度
                    frameRate: 15, // 帧率
                    // facingMode: 'enviroment', //  设置为后置摄像头
                    deviceId: undefined // 如果deviceId不为空直接设置值，如果为空就是undefined
                },
                audio: true // 将声音获取设为true
            },
            stream: false,
            stream2: '',
            roomInfoObj: {},
            loading2: false,
            pdfNumTotal: 0,
            scale: 1,
            pdfUrl: '',
            fileList:[]
        };
    },
    created() {},
    computed: {
        getProducer() {
            return this.$store.state.template.producer;
        },
        getConsumer() {
            return this.$store.state.template.consumer;
        }
    },
    watch: {
        getProducer: {
            handler: function(value, old) {
                console.log(value, old, 'getProducer');

                for (let item in value) {
                    if (value[item].type == 'share') {
                        let stream = '';

                        if (value[item].track instanceof MediaStream) {
                            stream = value[item].track;
                            this.stream = true;
                            let tag = false;

                            if (this.$refs.sharevideo.srcObject.getTracks()[0].id != value[item].track.getTracks()[0].id) {
                                tag = true;
                            }

                            if (tag) {
                                this.$nextTick(() => {
                                    this.$refs.sharevideo.srcObject = stream;
                                });
                            }
                        } else if (value[item].track == null) {
                            this.$refs.sharevideo.srcObject = null;
                            this.stream = false;
                            delete value[item];
                            // window.setTimeout(()=>{delete value[item]},1200)
                        } else {
                            console.log(value[item],"value[item]")
                            stream = new MediaStream();
                            stream.addTrack(value[item].track);
                            this.stream = true;
                            // if(value[item].track)
                            let tag = false;
                            if (this.$refs.sharevideo.srcObject) {
                                if (this.$refs.sharevideo.srcObject.getTracks()[0].id != value[item].track.id) {
                                    tag = true;
                                }
                            } else {
                                tag = true;
                            }
                            if (tag) {
                                this.$nextTick(() => {
                                    this.$refs.sharevideo.srcObject = stream;
                                    this.setConsumerPreferredLayers(item);
                                });
                            }
                        }
                    } else if (value[item].type == 'front') {
                        let stream = '';

                        if (value[item].track == null || value[item].trackCloseTag) {
                            stream = false;
                        } else if (value[item].track instanceof MediaStream) {
                            stream = value[item].track;
                        } else {
                            stream = new MediaStream();
                            console.log(value[item],"value[item].track2")
                            let trackn = value[item].track;
                            stream.addTrack(trackn);
                        }

                        this.userList.forEach((item2, index) => {
                            if (item2.uid == value[item].peerId) {
                                if (stream) {
                                    this.$set(item2, 'track1', true);
                                    let tag = false;
                                    if (this.$refs['headvideo' + value[item].peerId][0].srcObject) {
                                        if (
                                            this.$refs['headvideo' + value[item].peerId][0].srcObject.getTracks()[0].id !=
                                            stream.getTracks()[0].id
                                        ) {
                                            tag = true;
                                        }
                                    } else {
                                        tag = true;
                                    }

                                    if (tag) {
                                        this.setConsumerPreferredLayers(item);
                                        this.$refs['headvideo' + value[item].peerId][0].srcObject = stream;
                                    }
                                } else {
                                    this.$set(item2, 'track1', false);
                                    //    window.setTimeout(()=>{delete value[item]},1200)
                                }
                            }
                        });
                        // if(stream){
                        //      window.setTimeout(()=>{delete value[item]},1200)
                        // }
                    } else {
                        let stream = '';
                        
                        console.log(value[item].trackCloseTag, 'value[item].trackCloseTag');
                        if (value[item].track == null || value[item].trackCloseTag) {
                            stream = false;
                        } else if (value[item].track instanceof MediaStream) {
                            stream = value[item].track;
                        } else {
                            stream = new MediaStream();

                            stream.addTrack(value[item].track);
                        }

                        this.userList.forEach((item2, index) => {
                            if (item2.uid == value[item].peerId) {
                                if (stream) {
                                    this.$set(item2, 'track2', true);
                                } else {
                                    this.$set(item2, 'track2', false);
                                    //  window.setTimeout(()=>{delete value[item]},1200)
                                }
                            }
                        });
                        // if(stream){
                        //      window.setTimeout(()=>{delete value[item]},1200)
                        // }
                    }
                }
            },
            deep: true
        },

        getConsumer: {
            handler: function(value) {
                console.log(value, 222);

                for (let item in value) {
                    if (value[item].type == 'share') {
                        let stream = '';

                        if (value[item].track instanceof MediaStream) {
                            stream = value[item].track;
                            this.stream = true;
                            let tag = false;

                            if (this.$refs.sharevideo.srcObject.getTracks()[0].id != value[item].track.getTracks()[0].id) {
                                tag = true;
                            }

                            if (tag) {
                                this.$nextTick(() => {
                                    this.$refs.sharevideo.srcObject = stream;
                                    this.setConsumerPreferredLayers(item);
                                });
                            }
                        } else if (value[item].track == null) {
                            this.$refs.sharevideo.srcObject = null;
                            this.stream = false;
                            delete value[item];
                            // window.setTimeout(()=>{delete value[item]},1200)
                        } else {
                            stream = new MediaStream();
                            stream.addTrack(value[item].track);
                            this.stream = true;
                            let tag = false;

                            if (this.shareTag) {
                                this.disableShare('crush');
                                // this.shareTag = false;
                            }

                            if (this.$refs.sharevideo.srcObject) {
                                if (this.$refs.sharevideo.srcObject.getTracks()[0].id != value[item].track.id) {
                                    tag = true;
                                }
                            } else {
                                tag = true;
                            }
                            if (tag) {
                                this.$nextTick(() => {
                                    this.$refs.sharevideo.srcObject = stream;
                                });
                            }
                        }
                    } else if (value[item].type == 'simulcast') {
                        let stream = '';

                        if (value[item].track == null || value[item].trackCloseTag) {
                            stream = false;
                        } else if (value[item].track instanceof MediaStream) {
                            stream = value[item].track;
                        } else {
                            stream = new MediaStream();

                            stream.addTrack(value[item].track);
                        }

                        this.userList.forEach((item2, index) => {
                            if (item2.uid == value[item].peerId) {
                                if (stream) {
                                    this.$set(item2, 'track1', true);
                                    let tag = false;
                                    if (this.$refs['headvideo' + value[item].peerId][0].srcObject) {
                                        if (
                                            this.$refs['headvideo' + value[item].peerId][0].srcObject.getTracks()[0].id !=
                                            stream.getTracks()[0].id
                                        ) {
                                            tag = true;
                                        }
                                    } else {
                                        tag = true;
                                    }

                                    if (tag) {
                                        this.$refs['headvideo' + value[item].peerId][0].srcObject = stream;
                                        this.setConsumerPreferredLayers(item);
                                    }

                                    // this.$refs['headvideo'+value[item].peerId][0].srcObject = stream;
                                } else {
                                    this.$set(item2, 'track1', false);
                                    //    window.setTimeout(()=>{delete value[item]},1200)
                                }
                            }
                        });
                        // if(stream){
                        //      window.setTimeout(()=>{delete value[item]},1200)
                        // }
                    } else {
                        let stream = '';

                        if (value[item].track instanceof MediaStream) {
                            stream = value[item].track;
                        } else if (value[item].track == null) {
                            stream = false;
                        } else {
                            stream = new MediaStream();

                            stream.addTrack(value[item].track);
                        }

                        this.userList.forEach((item2, index) => {
                            if (item2.uid == value[item].peerId) {
                                if (stream) {
                                    this.$set(item2, 'track2', true);
                                    let tag = false;
                                    if (this.$refs['headaudio' + value[item].peerId][0].srcObject) {
                                        if (
                                            this.$refs['headaudio' + value[item].peerId][0].srcObject.getTracks()[0].id !=
                                            stream.getTracks()[0].id
                                        ) {
                                            tag = true;
                                        }
                                    } else {
                                        tag = true;
                                    }

                                    if (tag) {
                                        this.$refs['headaudio' + value[item].peerId][0].srcObject = stream;
                                    }
                                } else {
                                    this.$set(item2, 'track2', false);
                                    //  window.setTimeout(()=>{delete value[item]},1200)
                                }
                            }
                        });
                        // if(stream){
                        //      window.setTimeout(()=>{delete value[item]},1200)
                        // }
                    }
                }
            },
            deep: true
        }
    },
    async beforeDestroy() {
        try {
            //页面销毁时关闭长连接
            await this.$refs.ws.closed();
            this.closeMic('leave');
            this.closeLoading();
            this.disableWebcam('leave');
            this.leaveRoom();
        } catch (error) {}
    },
    mounted() {
        if (this.$common.IEVersion() != -1) {
            setTimeout(() => {
                this.$alert('音视频签约暂不支持IE核心浏览器，建议您使用谷歌浏览器', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.go(-1);
                    }
                });
            }, 500);
        } else {
            this.loading = true;
            this.getSpeakerList();
            this.resize();

            window.onresize = () => {
                // 定义窗口大小变更通知事件
                this.resize();
                // console.log(23)
            };
            let obj = this.$route.params;
            if (!obj.roomId) {
                this.$router.push({ path: '/videoList' });
                return false;
            }
            this.params = obj;
            this.getContinfo();
            this.getroominfo();
            this.wstag = true;

            // this.$alert('恭喜您！文件签署已完成', '温馨提示', {
            //     confirmButtonText: '确定',
            //     type: 'success'
            // });

            this.$nextTick(() => {
                this.$refs.ws.isWho('room', obj);
            });
        }
    },

    methods: {
         initPDF() {//读取pdf文件
            this.$refs.pdfContainer.pdfInit(this.pdfUrl)
            // let _this = this;
            // this.pdfNumTotal = 0;
           
            // pdf.getDocument(_this.pdfUrl).then((pdfDoc_)=>{
            //     _this.pdfNumTotal = pdfDoc_._pdfInfo.numPages;
            //      _this.$nextTick(()=>{
            //          _this.$refs.pdfViewref.forEach(item => {
            //              item.setPdfDoc(pdfDoc_)
            //          });
                     
            //      })
            // });
        },
        loadings() {
            this.loading2 = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        closeLoading() {
            if (this.loading2) {
                this.loading2.close();
                this.loading2 = false;
            }
        },
        resize() {
            let screenHeight = document.body.clientHeight;
            this.$refs.videoroom.style.height = screenHeight - 56 - 80 + 'px';
            this.$refs.headerbox.style.height = screenHeight - 56 - 80 + 'px';
            this.$refs.rightbox2.style.height = screenHeight - 56 - 80 + 'px';
        },
        async getroominfo() {
            let { data } = await roomInfo({ roomId: this.params.roomId });
            console.log(data, 'data2');
            this.roomInfoObj = data;
        },
        async getContinfo() {
            let { data } = await findVideoContractFileList({ roomId: this.params.roomId });
            let arr = [];
            if(data.length==0){
                return false;
            }
            data.forEach(item=>{
                item.url = downloadFile(item.fileId)

                arr.push(item)

            })
            
            this.fileList = arr;
            this.pdfUrl = arr[0].url;
            // this.contractInfo = data;
            
            if (data.length == 0) {
                this.status = 0;
            } else {
                this.signName();
            }
        },
        async signName() {
            let { data } = await findContractPersonNow({ roomId: this.params.roomId });
            let user = this.$store.getters.user;
            console.log(user);
            if (!data) {
                this.status = 3;
            } else if (data.uid == user.loginId) {
                this.status = 1;
            } else {
                this.status = 3;
            }
        },
        async initMiGu() {
            let user = this.$store.getters.user;
            this.options.roomId = this.params.roomId;
            this.options.token = this.params.token;
            this.options.userId = user.loginId;
            this.options.displayName = user.userName;

            console.log(this.options);
            // const result = MRTC.detectServerNode({
            //     host:this.options.host
            // })
            // console.log(result,"result")
            console.log(this.options,"options")
             this.sdk = await MRTC.init(this.options);

            this.loading = false;

            let sdk = this.sdk;
         
            // sdk.setDoubleVideoStreamEnabled(true);
            console.log(this.sdk,"sdk");
            sdk.on('room-joined', peers => {
                // peers为数组，表示当前在线用户，数据结构为：[{peerId: '', displayName: ''}]
                console.log('在线用户：', peers);
                // this.setUserList(peers);
            });
            // 检测到新用户加入
            sdk.on('peer-add', peer => {
                // peer表示新用户加入房间的：{peerId: '', displayName: ''}
                console.log('检测到新用户加入:', peer);
                // this.addUserList(peer)
            });

            // 检测到用户离开
            sdk.on('peer-leave', peerId => {
                console.log('检测到用户离开：', peerId);
                // this.removeUserList(peerId)
            });

            // 监测到房间因为网络等原因或者调用了room.close()方法
            sdk.on('room-closed', () => {
                console.log('您已离开房间');
            });
            sdk.on('onRemoteVideoStats', params => {
                //远端视频数据状态回调
                console.log(params, 'yuanduan ');
            });
            sdk.on('onRemoteAudioStats', params => {
                //远端音频数据状态回调
                console.log(params, '远端音频数据状态回调');
            });
            sdk.on('onLocalAudioStats', params => {
                //本地音频数据状态回调
                console.log(params, '本地音频数据状态回调');
            });
            sdk.on('onLocalVideoStats', params => {
                //本地视频数据状态回调
                console.log(params, '本地视频数据状态回调');
            });
            sdk.on('peer-speak', peerId => {
                //用户说话中
                console.log(peerId, '用户说话中');
                // audioicon
                this.userList.forEach(item => {
                    if (item.uid == peerId) {
                        this.$set(item, 'speak', true);
                        if (item.times) {
                            clearTimeout(item.times);
                            this.$set(item, 'times', null);
                        }
                        this.$set(
                            item,
                            'times',
                            setTimeout(() => {
                                this.$set(item, 'speak', false);
                            }, 2000)
                        );
                        // this.$refs['audioicon'+peerId][0].style.color = '#39b54a';
                        // setTimeout(()=>{
                        //     this.$refs['audioicon'+peerId][0].style.color = '#333';
                        // },3000)
                    }
                });
            });
            sdk.on('stream-removed', params => {
                //本地关闭摄像头停止推视频流
                console.log(params, '本地关闭摄像头停止推视频流stream-removed');
                let user = this.$store.getters.user;
                if (params.kind == 'audio') {
                    if (user.loginId == params.peerId) {
                        params.isLocal = true;
                    }
                }
                if (params.isLocal) {
                    if (params.type != 'share') {
                        params.kind == 'video' ? (params.type = 'front') : (params.type = '');
                    }
                    this.$store.dispatch('removeProducer', params);
                } else {
                    if (params.type != 'share') {
                        params.kind == 'video' ? (params.type = 'simulcast') : (params.type = 'simple');
                    }

                    this.$store.dispatch('removeConsumer', params);
                }
            });
            sdk.on('stream-paused', params => {
                //音视频流暂停
                console.log(params, '当前关闭摄像头停止推视频流');

                if (params.type != 'share') {
                    params.kind == 'video' ? (params.type = 'simulcast') : (params.type = 'simple');
                }
                console.log('要调用当前');
                params.trackCloseTag = true;
                this.$store.dispatch('removeConsumer', params);
            });
            sdk.on('stream-resumed', params => {
                //音视频流恢复
                console.log('恢复音视频');
                if (params.type != 'share') {
                    params.kind == 'video' ? (params.type = 'simulcast') : (params.type = 'simple');
                }
                this.$store.dispatch('recoverConsumer', params);
            });

            sdk.on('stream-add', (params, innerParams) => {
                console.log(params, '监听视频流', innerParams);
                let user = this.$store.getters.user;
                const { peerId, kind, type, codec, isLocal, audioSource, isPaused, track } = params;
                let lisLocalCopy = isLocal;
                const { producer, consumer } = innerParams;
                if (audioSource != 'mic') {
                    if (user.loginId == params.peerId) {
                        lisLocalCopy = true;
                    }
                }
                if (lisLocalCopy) {
                    //&&audioSource!='mic'

                    this.handleLocalStream(params, producer);
                    return;
                }
                // const mode = consumer.rtpParameters.codecs[0].scalabilityMode
                // const {spatialLayers,temporalLaysers} = sdk.parseScalabilityMode(mode)

                let ll = type ? type : kind === 'video' ? 'simulcast' : 'simple';
                let id = '';

                // if(audioSource=='mic'){
                //     id = producer.id
                // }else{
                id = consumer.id;
                // }
                this.$store.dispatch(
                    'setConsumer',
                    {
                        id: id,
                        type: ll,
                        locallyPaused: false,
                        priority: 1,
                        vol: 0,
                        codec: codec,
                        track: params.track,
                        peerId: params.peerId,
                        trackCloseTag: false
                    },
                    peerId
                );

                // if(params.type=="share"){

                //     this.toShare(params.track)
                // }else if(params.kind=='audio'){

                // }else if(params.kind=='video'){
                //     this.getUserHead(params);
                // }
            });

            sdk.joinRoom();
            // this.joinMiGu();
        },
        setUserList(peers) {
            //   let user = this.$store.getters.user;
            //   console.log(user,"user")
            //   let arr = [];
            //   arr.push({
            //       uid:user.loginId,
            //       name:user.userName
            //   })
            //   peers.forEach(item=>{
            //       let obj = {}
            //       obj.name = item.displayName;
            //       obj.uid = item.peerId
            //       arr.push(obj)
            //   })
            this.userList = peers;
        },
        addUserList(peer) {
            this.userList.push(peer);
        },
        removeUserList(peerId) {
            this.userList.forEach((item, index) => {
                if (item.uid == peerId) {
                    this.userList.splice(index, 1);
                }
            });
        },
        handleLocalStream(e, t) {
            var n = e.kind,
                r = e.isPaused,
                o = e.track,
                i = e.type,
                a = {
                    id: t.id,
                    paused: r,
                    track: o,
                    // rtpParameters: t.rtpParameters,
                    // codec: t.rtpParameters.codecs[0].mimeType.split("/")[1],
                    peerId: e.peerId
                };

            if ('audio' === n) {
                a.type = '';
                this.$store.dispatch('setProducer', a);
            } else {
                'share' === i ? (a.type = i) : ((a.deviceLabel = ''), (a.type = 'front')), this.$store.dispatch('setProducer', a);
            }
        },
        joinMiGu(obj) {
            this.sdk.joinRoom();
        },
        async openCameara() {
            // 开启摄像头
            const isOk = await this.sdk.enableWebcam(this.videoId);
            this.vidTag = !this.vidTag;
            console.log(isOk, '开启摄像头openCameara');
            this.closeLoading();
            this.$message.success('已开启摄像头');
        },
        async disableWebcam(type) {
            // // 关闭摄像头
            const isOk = await this.sdk.disableWebcam();
            this.vidTag = !this.vidTag;
            this.closeLoading();
            // this.$store.dispatch("removeProducer",{peerId:this.options.userId,type: "front"})
            if (type != 'leave') {
                this.$message.success('已关闭摄像头');
            }
        },
        // 开启麦克风
        async openMic() {
            const isOk = await this.sdk.unmuteMic(this.audioId);
            console.log(`openMic is OK: ${isOk}`);
            this.closeLoading();
            this.$message.success('已开启麦克风');
        },
        // 关闭麦克风
        async closeMic(type) {
            const isOk = await this.sdk.muteMic();
            console.log(`closeMic is OK: ${isOk}`);
            this.closeLoading();
            if (type != 'leave') {
                this.$message.success('已关闭麦克风');
            }
        },
        async leaveRoom() {
            try {
                const isOk = await this.sdk.leaveRoom();
            } catch (error) {
                this.$router.push({ path: '/videoList' });
            }
        },
        async enableShare(type) {
            //开启屏幕分享
            const isOk = await this.sdk.enableShare({ electron: false });
            console.log(isOk,"dslkafjsdf")
            if (isOk.status === "success") {
                this.shareTag = true;

                if (type) {
                    this.visible2 = true;
                    this.$nextTick(() => {
                        this.$refs.signs.init({
                            roomId: this.options.roomId,
                            type: 1
                        });
                    });
                } else {
                    this.$message.success('分享成功');
                }
            } else {
            }
            this.closeLoading();
            console.log(isOk, '共享屏幕enableShare');
        },
        async disableShare(crushTag) {
            //关闭屏幕分享
            const isOk = await this.sdk.disableShare();
            this.shareTag = false;
            this.closeLoading();
            if (crushTag != 'crush') {
                this.stream = false;
                this.$message.success('已结束分享');
            } else {
                this.$message.success('视频签约共享中，您已解除共享状态');
            }
            // this.$store.dispatch("removeProducer",{peerId:this.options.userId,type: "share"})

            console.log(isOk, '关闭屏幕');
        },
        async unmuteMic() {
            //开启麦克风开始音频推流
            const isOk = await this.sdk.unmuteMic();
        },
        async muteMic() {
            //关闭麦克风停止音频推流
            const isOk = await this.sdk.muteMic();
        },
        async switchWebcam(deviceId) {
            //切换摄像头
            this.loadings();
            const result = await this.sdk.switchWebcam(deviceId);
            if(result.status === 'error') {
                
            } else if (result.status === 'success') {
               this.$message.success('切换成功');
                let producer = this.$store.getters.producer;

                for (let i in producer) {
                    if (producer[i].type == 'front') {
                        let obj = producer[i];
                        obj.track = result.stream;
                        // this.handleLocalStream(obj,)
                        this.$store.dispatch('setProducer', obj);
                    }
                }
            }
            // if (isOk === true) {
            // } else {
            //     this.$message.success('切换成功');
            //     let producer = this.$store.getters.producer;
            //     for (let i in producer) {
            //         if (producer[i].type == 'front') {
            //             let obj = producer[i];
            //             obj.track = isOk;
            //             // this.handleLocalStream(obj,)
            //             this.$store.dispatch('setProducer', obj);
            //         }
            //     }
            // }
            this.closeLoading();
            // if()
        },
        async switchMic(deviceId) {
            //切换麦克风
            this.loadings();
            const result = await this.sdk.switchMic(deviceId);
            if(result.status === 'error') {
          
            } else if (result.status === 'success') {
                this.$message.success('切换成功');
                let producer = this.$store.getters.producer;
                for (let i in producer) {
                    if (producer[i].type === undefined) {
                        let obj = producer[i];
                        obj.track = result.stream;
                        // this.handleLocalStream(obj,)
                        this.$store.dispatch('setProducer', obj);
                    }
                }
            }
            // if (isOk === true) {
            // } else {
            //     this.$message.success('切换成功');
            //     let producer = this.$store.getters.producer;
            //     for (let i in producer) {
            //         if (producer[i].type === undefined) {
            //             let obj = producer[i];
            //             obj.track = isOk;
            //             // this.handleLocalStream(obj,)
            //             this.$store.dispatch('setProducer', obj);
            //         }
            //     }
            // }
            this.closeLoading();
        },
        // async setConsumerPreferredLayers(){//切换摄像头
        //     const isOk = await this.sdk.setConsumerPreferredLayers('consumerId', 'small')
        // },
        async setConsumerPreferredLayers(consumerId) {
            //
            const isOk = await this.sdk.setConsumerPreferredLayers(consumerId, 'small');
            console.log(isOk, 444);
        },
        async switchShare() {
            //切换共享内容
            const isOk = await this.sdk.switchShare();
            console.log(isOk, '切换屏幕');
            if (isOk.status === "success") {
            } else if (isOk != false) {
                let producer = this.$store.getters.producer;
                for (let i in producer) {
                    if (producer[i].type == 'share') {
                        let obj = producer[i];
                        obj.track = isOk;
                        // this.handleLocalStream(obj,)
                        this.$store.dispatch('setProducer', obj);
                    }
                }
            }
            this.closeLoading();
        },
        switchAudio(deviceId) {
            this.loadings();
            let audioList = document.querySelectorAll('audio');
            audioList.forEach(item => {
                item.setSinkId(deviceId);
                // console.log(item.setSinkId)
            });
            this.closeLoading();
            this.$message.success('切换成功');
            console.log(audioList);
        },
        voiceFun() {
            let audioList = document.querySelectorAll('audio');
            audioList.forEach(item => {
                item.muted ? (item.muted = false) : (item.muted = true);
            });
            this.voiceTag = !this.voiceTag;
            let title = '已开启扬声器';
            if (!this.voiceTag) {
                title = '已关闭扬声器';
            }
            this.closeLoading();
            this.$message.success(title);
        },

        wsonclose() {
            this.loading = false;
            this.$message.info('您已退出房间');
            this.$refs.ws.closed();
            // this.$alert('您已退出房间', '温馨提示', {
            //     confirmButtonText: '确定',
            //     callback: action => {
            this.$router.go(-1);
            // return false
            //     }
            // });
        },
        wsonmessage(data) {
            if (data == 'heart') {
                return false;
            }

            data = JSON.parse(data);
            if (data.type == 20) {
                this.$message.success('您已进入房间');
                let user = this.$store.getters.user;
                console.log(data.data, 'data');
                let obj = {};
                let copyArr = JSON.parse(JSON.stringify(data.data));
                data.data.forEach((item, index) => {
                    if (item.uid == user.loginId) {
                        this.params.token = item.miToken;
                        copyArr.unshift(item);
                        copyArr.splice(index + 1, 1);
                        if (item.userType == 99) {
                            this.admin = true;
                        }
                    }
                    obj['id' + item.uid] = item;
                });

                this.setUserList(copyArr);

                this.userList2 = data.data;
                if (!this.sdk) {
                    this.initMiGu();
                }
            } else if (data.type == 21) {
                this.addUserList(data.data);
            } else if (data.type == 22) {
                this.removeUserList(data.data.uid);
            } else if (data.type == 11) {
                this.contractId = data.data.contractId;
                this.signContract();
            } else if (data.type == 12) {
                this.$message.success('恭喜您！文件签署已完成');
                this.visibleSuccess = true;
                // this.visibleSuccess  = true;
         
                this.$nextTick(()=>{
                    this.conWidth = this.$refs.bbox.offsetWidth
                    this.conHeight = this.$refs.bbox.offsetHeight
                    this.initPDF();
                })
                this.getContinfo();
                // setTimeout(() => {
                //     this.visibleSuccess = false;
                // }, 10000);
            } else if (data.type == 13) {
                console.log(data.data, '这是签署进度');
                this.signing = true;
                let tag = false;
                data.data.forEach(item => {
                    if (item.signStatus == 0) {
                        tag = true;
                        this.signingObj = item;
                    }
                });
                if (!tag) {
                    this.signingObj = {};
                }
                this.signingArr = data.data;
            } else if (data.typ == 19) {
                this.$alert('房间已关闭', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.go(-1);
                        return false;
                    }
                });
            }
        },
        signContract() {
            this.$confirm('该您签署文件，共享屏幕后进入签署', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            })
                .then(async () => {
                    this.$nextTick(() => {
                        this.enableShare(true);
                    });
                })
                .catch(() => {

                });
        },
        toolFun(type) {
            if (type == 7) {
                if (this.stream) {
                    this.$message.info('请结束屏幕共享后继续');
                    return false;
                }
                this.visible = true;
                this.$nextTick(() => {
                    this.$refs.news.init({
                        userList: this.userList,
                        tempId: '',
                        tempType: 0,
                        roomId: this.options.roomId
                    });
                });
            } else if (type == 1) {
                this.micTag = !this.micTag;
                this.loadings();
                if (this.micTag) {
                    this.openMic();
                } else {
                    this.closeMic();
                }
            } else if (type == 2) {
                this.loadings();
                if (!this.vidTag) {
                    this.openCameara();
                } else {
                    this.disableWebcam();
                }
            } else if (type == 3) {
                this.loadings();
                this.voiceFun();
            } else if (type == 4) {
                this.loadings();
                if (!this.shareTag) {
                    this.enableShare();
                } else {
                    //   this.disableShare();
                    this.switchShare();
                }
            } else if (type == 5) {
                this.$copyText(
                    `房间名称：${this.roomInfoObj.roomName}\n房间编号：${this.roomInfoObj.roomCode}\n房间密码：${this.roomInfoObj.roomPassword}\n房间地址：${this.roomInfoObj.roomUrl}`
                ).then(
                    res => {
                        console.log(res);
                        this.$message.success('已成功复制，可直接去粘贴');
                    },
                    err => {
                        this.$message.error('复制失败');
                    }
                );
            } else if (type == 6) {
                this.$confirm('确认退出房间?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        // let { data } = await deleteTemplate({ id: row.id });
                        this.leaveRoom();
                        this.$router.push({ path: '/videoList' });
                    })
                    .catch(() => {});
            } else if (type == 8) {
                this.disableShare();
            } else if (type == 9) {
                this.signContract();
            }
        },
        change(type) {
            console.log(type,"ddddddddddddddddddddddd")
            if (type == 'send') {
                this.visible = false;
                this.$message.success('发起成功');

                this.getContinfo();

                //   this.visible2 = true;

                //   this.$nextTick(()=>{
                //       this.$refs.signs.init();
                //   })
            } else if (type == 'close2') {
                this.visible2 = false;
                this.getContinfo();
                this.disableShare();
            }
        },
        async getSpeakerList() {
            var first = window.localStorage.getItem('first');
            if (first == null) {
                if (
                    navigator.mediaDevices.getUserMedia ||
                    navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia
                ) {
                    //调用用户媒体设备, 访问摄像头
                    this.getUserMedia({ audio: true, video: true }, this.success, this.error);
                } else {
                    alert('不支持访问用户媒体');
                }
            }

            navigator.mediaDevices
                .enumerateDevices()
                .then(devices => {
                    let list = [];
                    let list2 = [];
                    let list3 = [];

                    devices.forEach(device => {
                        if (device.kind === 'videoinput') {
                            device.value = device.deviceId;
                            list.push(device);
                        } else if (device.kind === 'audioinput') {
                            list2.push(device);
                        } else if (device.kind === 'audiooutput') {
                            list3.push(device);
                        }
                    });

                    this.setAudioList = list;
                    this.videoId = list[0].deviceId;
                    this.audioList = list2;
                    this.audioId = list2[0].deviceId;
                    this.outputAudioList = list3;
                    this.outputAudioId = list3[0].deviceId;
                })
                .catch(function(err) {
                    console.log(err.name + ': ' + err.message);
                });
        },
        getUserMedia(constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
                //最新的标准API
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(success)
                    .catch(error);
            } else if (navigator.webkitGetUserMedia) {
                //webkit核心浏览器
                navigator.webkitGetUserMedia(constraints, success, error);
            } else if (navigator.mozGetUserMedia) {
                //firfox浏览器
                navigator.mozGetUserMedia(constraints, success, error);
            } else if (navigator.getUserMedia) {
                //旧版API
                navigator.getUserMedia(constraints, success, error);
            }
        },
        success(stream) {
            window.localStorage.setItem('first', 'false');
            // window.location.reload();
        },

        error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
        }
    }
};
</script>
<style lang="less">
.rightbox2 {
    width: 280px;
    position: relative;
    text-align: center;
    left: 10px;
    z-index: 400;
    background-color: #f8f9f9;

    // padding-bottom: 50px;
    .headerbox {
        // height:500px;
        overflow-y: scroll;
        li {
            width: 257px;
            height: 134px;
            border: 1px solid #ccc;
            font-size: 40px;
            background-color: #000;
            color: #fff;
            margin: 10px auto;
            .usersname {
                line-height: 134px;
            }
        }
    }
}
.leftbox2 {
    width: 250px;
}
.tool {
    width: 100px;
    height: 60px;
    background: none;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;
    margin: 10px;
    cursor: pointer;
    position: relative;
    p {
        margin: 2px 0;
    }
    i {
        font-size: 22px;
    }
    .ups {
        position: absolute;
        right: 0;
        padding: 0 5px;
        height: 100%;
        top: 0;
        // line-height: 50px;
        cursor: pointer;
        .icon-tool {
            color: #3e52c0;
            height: 100%;
            padding-top: 20px;
            &:hover {
                color: #3e52c0;
            }
        }
        &:hover {
            color: #3e52c0;
            background-color: #ddd;
        }
    }
}
.center-box2 {
    position: relative;
    background-color: #e9ecef;
    z-index: 401;
    // border: 1px solid #ccc;
    padding-bottom: 50px;
    .room-borde {
        width: 100%;
        position: relative;
        overflow: hidden;
        height: 500px;
        border: 1px solid #ccc;
    }
}
.roomdialog {
    > .el-dialog__header {
        height: 0;
        padding: 0;
        display: none;
    }
    > .el-dialog__body {
        padding-top: 0;
    }
    > .el-dialog__headerbtn {
        display: none;
    }
}
.activevideo {
    position: absolute;
    top: -99999px;
    left: -99999px;
}
.videotip {
    color: #e1e1e1;
    line-height: 500px;
    font-size: 28px;
    text-align: center;
}
.sucbox {
    margin: auto;
    position: absolute;
    width: 800px;
    // height:800px;
    z-index: 999999;
    top: 50%;
    left: 50%;
    margin-left: -25%;
    margin-top: -20%;
}
.toolbox {
    position: fixed;
    background-color: #fff;
    bottom: 0;
    padding: 0 10%;
    left: 0%;
    width: 80%;
    z-index: 500;
}
.voiceicon {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 20px;
}
.signroom {
    background-color: #e9ecef;
}
.signing {
    // width: 230px;
    margin: 0 auto;
    li {
        // height:30px;

        margin: 5px 10px;
        font-size: 12px;
        padding: 10px 10px;

        border-radius: 4px;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        .signingp {
            width: 200px;
            line-height: 20px;
            display: inline-block;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
.coverbox {
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 599;
    position: fixed;
    width: 100%;
    height: 100%;
}
.cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    width: 200px;
    height: 30px;
    z-index: 600;
    color: #fff;
}
</style>
