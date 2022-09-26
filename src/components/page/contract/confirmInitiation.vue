<template>
    <div>
        <div class="cf sign-header">
            <div class="sign-left" @click="back"><i class="el-icon-close"></i>关闭</div>
            <div class="sign-center text-center ag-steps">
                <div class="steps-item">
                    <i class="steps-num steps-num-active el-icon-check"></i><span class="steps-title-active">签署设置</span>
                </div>
                <i class="steps-line"></i>
                <div class="steps-item"><i class="steps-num steps-num-active el-icon-check"></i><span
                        class="steps-title">指定签署位置</span></div>
                <i class="steps-line steps-line-active"></i>
                <div class="steps-item"><i class="steps-num steps-num-active">3</i><span class="steps-title">发起确认</span>
                </div>

            </div>
            <div class="sign-right">
                <el-button @click="back">上一步</el-button>

                <el-button @click="tempAdd()" type="primary">确认发起</el-button>
            </div>
        </div>
        <div class="content90 sign-body">

            <el-card class="confirmInitiation-container">
                <div class="title-h1">{{ contractInfo.contractName }}</div>
                <div class="sign-date"><span>签署截止日期：</span> {{ contractInfo.deadLine ? contractInfo.deadLine : '长期有效' }}</div>
                <div class="sign-file">签署文档：</div>
                <div class="signPdfList">
                    <div class="flex" style="align-items: center;flex-wrap: wrap;">
                        <div class="signPdf " v-for="(item, index) in list" :key="index">
                            <div class="flex flex-sub">

                                <div class="up-left"><img src="../../../assets/img/feature/pdf.png" alt=""></div>
                                <div class="up-center">
                                    <div class="up-title">{{ item.fileName }}</div>
                                    <div><span v-if="item.pages">共{{ item.pages }}页</span><span style="margin-left:20px;"
                                            v-if="item.size">{{ item.size | fileSize }} M</span></div>
                                </div>
                                <div class="up-right"><i class="el-icon-view" @click="getPdfView(item)"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="enclosure">附件：</div>
                <div class="signPdfList">
                    <div class="flex" style="align-items: center;flex-wrap: wrap;">
                        <div class="signPdf " v-for="(item, index) in list2" :key="index">
                            <div class="flex flex-sub">

                                <div class="up-left">
                                    <!-- <img src="../../../assets/img/feature/pdf.png" alt=""> -->
                                    <i style="color:#f24731;font-size:30px" class="el-icon-document"></i>
                                    </div>
                                <div class="up-center">
                                    <div class="up-title">{{ item.fileName }}</div>
                                    <div><span style="margin-left:20px;"
                                            v-if="item.size">{{ item.size | fileSize }} M</span></div>
                                </div>
                                <div class="up-right"></div>
                            </div>
                            <div></div>
                        </div>

                    </div>
                </div>
                <div></div>
                <el-timeline style="margin-top: 18px">
                    <el-timeline-item v-for="(item, index) in activities" :key="index" :icon="item.icon"
                        :type="item.type" color="#1257FF" :size="item.size">
                        <div class="title-h4">{{ item.content }} <span v-if="item.content == '签署'">{{ signName }}</span>
                        </div>
                        <div v-for="(item, index) in item.list" :key="index" class="timeline-item">
                            <i class="el-icon-user-solid text-blue" style="font-size:20px;margin-right:5px;"></i>
                            <span>{{ item.name }}</span> <span class="p-phone">{{ item.account }}</span>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
        </div>
        <el-dialog title="预览" :visible.sync="visiblePdfView" top="2%" @close="initPDFTag" width="80%">
            <div style="width:100%;height:80vh;overflow:hidden" ref="bbox">

                <div class="text-center" v-if="!pdfShowTag">加载中，请稍后...</div>
                <pdf-container ref="pdfContainer" :pdfConfig="{ type: 1 }" :conWidth="conWidth" :conHeight="conHeight"
                    :rects="rects" :imgUrlInfo="imgUrlInfo" @initPdf="initPdf2">
                </pdf-container>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { saveDraftContract, findContract, saveContract } from '../../../api/contract.js';
import { downloadFile } from '../../../api';
import pdfContainer from '@/components/common/pdfContainer';
import '../../../assets/css/contract.less'
export default {
    components:{pdfContainer},
    data() {
        return {
            myname:'',
            contractInfo: {},
            c: '',
            activities: [
                // {
                //     content: '发起签署任务',
                //     type: 'primary',
                //     icon: 'el-icon-folder-add',
                //     list: []
                // },
                // {
                //     content: '参与方',
                //     color: '#1257FF',
                //     icon: 'el-icon-user-solid'
                // },
                // {
                //     content: '签署',
                //     timestamp: '2018-04-03 20:46',
                //     size: 'large',
                //     color: '#1257FF',
                //     list: []
                // },
                // {
                //     content: '抄送',
                //     timestamp: '2018-04-03 20:46',
                //     size: 'large',
                //     color: '#1257FF',
                //     list: []
                // }
            ],
            list: [],
            list2: [],
            contId: '',
            players: [],
            files: [], params: {},
            visiblePdfView: false,
            conHeight:0,
            conWidth:0,
            pdfShowTag:false,
        };
    },
    created() {
        this.getId();
        this.getById();
        this.getinfo();
    },
    methods: {
        back() {
            this.$router.go(-1)//返回上一层
        },
        closeThis(){
            let url = ''
            if(this.myname=='template'){
                url = '/template'
            }else if(this.myname=='contract'){
                url = '/contract'
            }else if(this.myname=='business'){
                 url = '/business'
            }
            this.$router.push({"path":url})
        },
        getId(tag) {
            this.contId = this.$route.query.contId;// this.$store.getters.contId;
            this.myname = this.$route.query.myname
        },
        async getById() {
            let { data } = await findContract({ contractNo: this.contId });
            this.contractInfo = JSON.parse(JSON.stringify(data));
            if (data.signProcess == 1) {
                this.signName = '独立签'
            } else {
                if (data.signType == 1) {
                    this.signName = '无序签'
                } else {
                    this.signName = '顺序签'
                }
            }
            let arr = data.files;
            let arrList = [];
            let arrList2 = [];
            arr.forEach(item => {
                item.status = 1;
                if (item.fileType == 1) {
                    arrList.push(item);
                } else {
                    arrList2.push(item);
                }
            });
            this.list = arrList;
            this.list2 = arrList2;

            let sendArrList = [];

            let obj = this.getTimeLineObj({ content: '发起签署任务', icon: 'el-icon-folder-add', size: 'normal' });
            obj.list = [{
                name: data.initiatorName,
                account: data.initiatorAccount,
                orgName: data.initiatorOrgName
            }]
            sendArrList.push(obj)
            sendArrList.push({
                content: '参与方',
                'size': 'normal',
                icon: 'el-icon-user-solid'
            })
            let type3Arr = []
            let pushArr = []
            if (data.signType == 1) {
                let type1Arr = [];
                let type6Arr = []
                data.players.forEach((item, index) => {

                    if (item.type == 1 || item.type == 2) {
                        type1Arr.push(item)
                    } else if (item.type == 3) {
                        type3Arr.push(item)
                    } else if (item.type == 6) {
                        type6Arr.push(item)
                    }

                });
                if (type1Arr.length > 0) {
                    let type1Obj = this.getTimeLineObj({
                        content: '签署',
                        color: '#1257FF', size: 'large'
                    })
                    type1Obj.list = type1Arr;

                    sendArrList.push(type1Obj)
                }
                if (type6Arr.length > 0) {
                    let type6Obj = this.getTimeLineObj({
                        content: '审批',
                        color: '#1257FF', size: 'large'
                    })
                    type6Obj.list = type6Arr;

                    sendArrList.push(type6Obj)
                }
            }else{
                let type1Arr = [];
                let type6Arr = []
                let type1Obj = {}
                let type126 = [];
                let typeArr = []
                data.players.forEach((item, index) => {
                    if (item.type == 1 || item.type == 2||item.type == 6) {
                        type126.push(item)
                    } else if (item.type == 3) {
                        type3Arr.push(item)
                    }

                });
                console.log(type126,"type126")
                type126.forEach((item,index)=>{
                    var temp = typeArr[typeArr.length - 1];
                    console.log(temp,"temp")
                    if(!index){
                        typeArr.push([item])
                    } else if(((temp[temp.length - 1].type==1||temp[temp.length - 1].type==2)&&(item.type==1||item.type==2))||(item.type==6&&temp[temp.length - 1].type==6)){
                        temp.push(item);
                    }else{
                         typeArr.push([item]);
                    }
                })
                console.log(typeArr,"typeArr")
                typeArr.forEach(item=>{
                    let str = '签署方'
                    if(item[0].type==6){
                        str = '审批'
                    }
                    let type1 = this.getTimeLineObj({
                        content: str,
                        color: '#1257FF', size: 'large'
                    })
                    let itemarr = []
                    item.forEach(element=>{
                        itemarr.push(element)
                    })
                    type1.list = itemarr;
                    console.log(type1,"type1")
                    sendArrList.push(type1)
                })
            }
            if (type3Arr.length > 0) {

                let type3Obj = this.getTimeLineObj({
                    content: '抄送方',
                    color: '#1257FF', size: 'large'
                })
                type3Obj.list = type3Arr;

                sendArrList.push(type3Obj)
            }
            this.activities = sendArrList;
            console.log(sendArrList, "activities")


        },
        getTimeLineObj(item) {
            let obj = {
                content: item.content,
                color: '#1257FF',
                icon: item.icon,
                'size': item.size,
                list: []
            }
            return obj;
        },
        getinfo(tag) {
            // this.$store.dispatch('GetInfo', tag).then((res) => {

            //     let obj = {
            //       name: res.userName,
            //       account: res.realPhone
            //     }
            //     this.activities[0].list.push(obj)

            // });
        },
        getType() {
            this.type = this.$route.query.tempType;// this.$store.getters.tempType;

        },
        async tempAdd() {

            let model = JSON.parse(JSON.stringify(this.contractInfo));
            model.batchNo = model.contractNo;
            let arrFile = this.list.concat(this.list2)
            model.files = arrFile;
            if(model.contractStyle==2){

                model.signInfo = model.initatorSetting?JSON.parse(model.initatorSetting):[]
            }
            let { data } = await saveContract(model);//继续保存

            this.$message.success("发起成功")
            this.$router.push({ path: '/contract' })



        },
        getPdfView(row) {
            this.visiblePdfView = true;
            this.pdfUrl = downloadFile(row.fileId)// row.url;
            this.$nextTick(() => {
                this.conWidth = this.$refs.bbox.offsetWidth
                this.conHeight = this.$refs.bbox.offsetHeight
                this.initPDF()
            })
        },
        initPDF() {
            this.$refs.pdfContainer.pdfInit(this.pdfUrl)

        },initPdf2(){
            this.pdfShowTag = true;
        },
    }
};
</script>


<style lang="less">
.title-h4 {
    font-size: 16px;
    color: #333333;
    font-weight: 500;

    span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #959595;
        letter-spacing: 0;
        font-weight: 400;
    }
}

.title-h1 {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
    margin-bottom: 8px;
}

.p-phone {
    font-size: 12px;
    color: #A6A6A6;
    margin-left: 16px;
}

.sign-date {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    line-height: 20px;
    font-weight: 400;
    margin-bottom: 20px;

    span {
        color: #959595;
    }
}

.sign-file {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
}

.enclosure {
    margin-top: 20px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
}

.confirmInitiation-container {
    // width: 980px;
    background: #fff;
    margin: 0 auto;
}

.el-timeline-item__node--normal {
    left: -10px;
    width: 30px;
    height: 30px;
}

// .el-timeline-item__node--large {
//     left: -10px;
//     width: 30px;
//     height: 30px;
// }
.signPdfList {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    padding-right: 5%;
}

.signPdf {
    width: 400px;
    height: 76px;
    background: #fafbfd;
    border: 1px solid rgba(232, 232, 232, 1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 16px;
}

.timeline-item {
    background: #fafbfd;
    border-radius: 2px;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    padding-left: 16px;
}
</style>
