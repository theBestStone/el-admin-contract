<template>
    <div class="" style="height:100%">
        <div class="content90" style="height:100%">
      <el-row :gutter="20" class="margin-top" style="height:100%">
        <el-col :span="4" style="height:100%">
          <el-card style="height:100%">
            <div>
                <ul class="title-ul margin-top-sm">
                  <li  class="active">系统公告 <i class="el-icon-caret-right margin-right fr margin-top-sm"></i></li>
                </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="20">

        <div class="container">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item v-for="item in list" :key="item.id" :name="item.id">
                     <template slot="title">
                         <div class="noticeTitleWrapper">
                             <div>{{item.msgTitle}}</div>
                             <div>{{item.effectiveTime}}</div>
                         </div>
                    </template>
                    <el-card>
                        <div v-html="msgContext"></div>
                    </el-card>
                   
                </el-collapse-item>
                <!-- <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item> -->
            </el-collapse>
            <br>
            <el-pagination
                  :current-page.sync="model.pageNum"
                  background
                  layout="total,prev, pager, next,jumper"
                  :total="pageTotal"
                  :page-size="model.pageSize"
                  @current-change="getList">
                </el-pagination>
        </div>
        </el-col>
      </el-row>
    </div>
    </div>
</template>

<script>

import {getList,getNoticeById} from '../../../api/sysNotice.js'
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                 model:{
                    pageNum:1,
                    pageSize:10
                },
                pageTotal:0,
                titleList:[{
                    name:"系统消息"
                    },{
                    name:"文件消息"
                    }
                ],
                titleActive:0,
                list: [],
                activeNames: [],
                msgContext: ''
            }
        },
        methods: { 
            getList(value){
                value ? this.model.pageNum = value :this.model.pageNum=1
                getList(this.model).then(res=>{
                    console.log(res,"11111")
                    this.list = res.data.list
                    this.pageTotal = res.data.total
                })
            },
            handleChange(val) {
                if(!val) return
                getNoticeById(val).then(({data})=>{
                    this.msgContext = data.msgContext
                })
            }
        },
        created(){
            this.getList(1);
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
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
</style>

