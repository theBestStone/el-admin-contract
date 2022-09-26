<template>
    <div class="" style="height:100%">
        <div class="content90" style="height:100%">
            <el-row :gutter="20" class="margin-top" style="height:100%">
                <el-col :span="4" style="height:100%">
                    <el-card style="height:100%">
                        <div>
                            <ul class="title-ul margin-top-sm">
                                <li class="active">产品动态 <i class="el-icon-caret-right margin-right fr margin-top-sm"></i></li>
                            </ul>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="20">
                    <div class="container">
                        <br>
                        <div v-for="item in list" :key="item.id">
                            <div class="downItem">
                                <el-link :href="item.downloadPath" type="primary">{{ item.msgTitle }}</el-link>
                                <span>{{ item.effectiveTime }}</span>
                            </div>

                            <el-divider></el-divider>
                        </div>
                        <br />
                        <el-pagination
                            :current-page.sync="model.pageNum"
                            background
                            layout="total,prev, pager, next,jumper"
                            :total="pageTotal"
                            :page-size="model.pageSize"
                            @current-change="getList"
                        >
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { manageList } from '../../../api/manage.js';
import {downloadFile} from '../../../api'
export default {
    name: 'tabs',
    data() {
        return {
            message: 'first',
            showHeader: false,
            model: {
                pageNum: 1,
                pageSize: 10
            },
            pageTotal: 0,
            titleList: [
                {
                    name: '系统消息'
                },
                {
                    name: '文件消息'
                }
            ],
            titleActive: 0,
            list: [],
            activeNames: [],
            msgContext: '',
            baseUrl: process.env.VUE_APP_BASE_API
        };
    },
    methods: {
        getList(value) {
            value ? (this.model.pageNum = value) : (this.model.pageNum = 1);
            manageList(this.model).then(res => {
                console.log(res);
                 res.data.list.forEach(item=>{
                    item.downloadPath = downloadFile(item.fileId)
                 })
                this.list = res.data.list;
                this.pageTotal = res.data.total;
            });
        }
    },
    created() {
        this.getList(1);
    }
};
</script>

<style >
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
.noticeTitleWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.noticeTitleWrapper > div:last-child {
    padding-right: 20px;
    box-sizing: border-box;
}
.downItem {
    display: flex;
    justify-content: space-between;
}
</style>
