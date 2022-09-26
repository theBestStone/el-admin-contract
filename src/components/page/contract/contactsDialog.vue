<template>
    <el-dialog title="添加联系人" :visible.sync="dialogVisible" width="50%" @close="close" :before-close="handleClose">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">最近联系人</el-menu-item>
            <!-- <el-menu-item index="2">内部联系人</el-menu-item> -->
            <el-menu-item index="3">外部联系人</el-menu-item>
        </el-menu>
        <div class="search-box">
            <el-input :maxlength="100" style="width: 250px" placeholder="请输入企业/手机号/姓名"  v-model="name">
            <el-button slot="append" icon="el-icon-search"></el-button></el-input>
            <div class="button_box">
                <div class="add" v-if="activeIndex==3" @click="addContacts">新增联系人</div>
                <div class="use" @click="bantchUse">批量使用</div>
            </div>
        </div>
        <div>
            <div v-if="activeIndex==1">
                <el-table
                    ref="multipleTable"
                    :data="tableDatacRecent"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"></el-table-column>
                    <el-table-column label="企业">
                        <template slot-scope="scope">{{ scope.row.orgName?scope.row.orgName:'-' }}</template>
                    </el-table-column>
                    <el-table-column prop="userName" label="姓名"> </el-table-column>
                    <el-table-column prop="userAccount" label="手机号"> </el-table-column>
                    <el-table-column prop="" label="操作" width="100">
                        <template>
                        <el-button  type="primary" size="mini" @click="used(scope.row)" >使用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="activeIndex==3">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"></el-table-column>
                    <el-table-column label="企业">
                        <template slot-scope="scope">{{ scope.row.orgName }}</template>
                    </el-table-column>
                    <el-table-column prop="userName" label="姓名"> </el-table-column>
                    <el-table-column prop="userAccount" label="手机号"> </el-table-column>
                    <el-table-column prop="" label="操作" width="100">
                        <template>
                        <el-button  type="primary" size="mini" @click="used(scope.row)" >使用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
            </div>
        </div>
        <el-dialog :title="CRMtitle" center v-dialogDrag :visible.sync="visible" width="500px" :modal-append-to-body='false'>
           <div class="padding">
               <el-form :model="model"  ref="agForm" label-width="100px" class="ms-content">
                <el-form-item  prop="userAccount"  verify phone label="账号">
                    <el-input v-model="model.userAccount" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item  prop="userName"  verify label="姓名">
                    <el-input v-model="model.userName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item  prop="orgName"   label="所属企业">
                    <el-input v-model="model.orgName" @blur="getEnt(model.orgName)" placeholder="请输入所属企业"></el-input>
                </el-form-item>
                <el-form-item  prop="job"   label="职务">
                    <el-input v-model="model.job" placeholder="请输入职务"></el-input>
                </el-form-item>
                <el-form-item  prop="email"   label="邮箱">
                    <el-input v-model="model.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item  prop="fileId"   label="授权委托书">
                   
                    <uploads  @successAuth="successAuth" @beforeUpload="beforeUpload" :btnTitle="btnTitle" :fileType="['png','jpg','jpeg']"></uploads>
                     <div class="text-gray" style="font-size:10px;">委托书格式支持上传jpeg、jpg、png格式</div>
                

                     <el-input v-model="model.fileId" style="display:none" type="hidden" placeholder=""></el-input>
                </el-form-item>
                <el-form-item  prop="remark"   label="备注">
                     <el-input type="textarea" v-model="model.remark"></el-input>
                </el-form-item>
            </el-form>
           </div>
           <div class=" text-center" slot="footer">
              <el-button @click="visible = false">取 消</el-button>
               <el-button @click="onSure" type="primary">提交</el-button>
           </div>
        </el-dialog>
    </el-dialog>
</template>

<script>
// import { list } from '../../../api/video';
import { findContactList,saveContact,addContact,recentContactLis } from '../../../api/contracts.js';
 import {findOrgUserList,queryCreditCodeByOrgName} from '../../../api/companyManage.js';
export default {
    props: ['dialogVisible'],
    data() {
        return {
            activeIndex: '1',
            tableData: [],
            selectArr:[],
            name:'',
            model2: {
                pageNum: 1,
                pageSize: 10,
                userName: ''
            },
            visible:false,
            CRMtitle:'新增CRM客户',
            model: {
                userAccount: '',
                userName: '',
                orgName: '',
                job: '',
                email: '',
                fileId: '',
                remark: '',
                creditCode:""
            
            },
        };
    },
    created() {
        this.getList();
        this.getRecentList();
    },
    methods: {
        addContacts() {
          this.visible = true
        },
        getList() {
            findContactList(this.model2).then((res) => {
                this.tableData = res.data.list;
            });
        },
        async getRecentList(){
            let {data}= await recentContactLis({name:this.name});
            this.tableDatacRecent = data;
        },
        handleClose(done) {
            // this.$confirm('确认关闭？')
            //   .then(_ => {
            done();
            // })
            // .catch(_ => {});
        },
        close() {
            this.$emit('closeContactsDialog');
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.activeIndex = key;
        },
        bantchUse(){
            
            if(this.selectArr.length==0){
                this.$message.error("请选择联系人")
                return false;
            }
            this.$emit("setConts",this.selectArr)
        },
        async onSure(){
        if(this.model.orgName){
            await this.getEnt(this.model.orgName);
           if(!this.model.creditCode){
             this.$message.error("请输入正确的企业")
             return false;
           }
        }
        this.$refs.agForm.validate(valid => {
            if (valid) {
              if(this.type=="edit"){
                saveContact(this.model).then(res=>{
                    this.getList();
                    this.$message.success("提交成功");
                    this.visible = false;
                })
              }else{
                addContact(this.model).then(res=>{
                    this.getList();
                    this.$message.success("提交成功");
                    this.visible = false;
                })
              }
                
            } else {
                
                console.log('error submit!!');
                return false;
            }
        });
      },
      async getEnt(name){
        if(!name){
          this.model.creditCode = ""
          return false;
        }
        let {data} = await queryCreditCodeByOrgName({orgName:name})
        if(data){
          this.model.creditCode = data.creditCode;
        }else{
          this.model.creditCode = ""
          this.$message.error("输入的企业不正确")
        }
      },
      used(row){
        this.$emit("change",row)
      },
      handleSelectionChange(val){
        this.selectArr = val;
      }
    }
};
</script>



<style lang="less">
.search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button_box {
        width: 208px;
        padding: 19px 0 10px;
        div {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }
        .add {
            border: 1px solid rgba(232, 232, 232, 1);
            border-radius: 2px;
            width: 102px;
             cursor: pointer;
        }
        .use {
            background: #1257ff;
            border-radius: 2px;
            color: #fff;
            width: 92px;
            margin-left: 12px;
            cursor: pointer;
        }
    }
}
::v-deep .el-menu-item {
  margin-left: 30px;
}
::v-deep .el-menu--horizontal>.el-menu-item.is-active {
  color: #1257FF;
}
::v-deep .el-table tr {
  height: unset;
}
::v-deep .el-table__header {
  
    margin-bottom: 0px;
}
</style>

