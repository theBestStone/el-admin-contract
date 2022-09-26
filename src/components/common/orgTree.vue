<!-- class="margin-top" -->
<template>
  <el-tree class="defaultTree" :class="{'overflowtree' : isoverflow}" :highlight-current="true" :data="data" :check-strictly="true" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true" node-key="id" :expand-on-click-node="false" :show-checkbox="showCheckbox" :filter-node-method="filterNode" ref="tree" indent="12">
    <div style="flex-grow: 1;" slot-scope="{ node, data }">
        <span class="custom-tree-node" :class="{'nodespan':node.label != '新建弹窗','nodespanIpt':node.label == '新建弹窗'}">
            <el-input v-if="node.label == '新建弹窗'" size="mini" placeholder="部门名称" v-model="depName"></el-input>
            <span v-else>{{ node.label }}</span>
            
        </span>
        <span v-if="isUser" class="fr">
            <span v-if="node.label != '新建弹窗'">
              <el-dropdown v-if="node.level == 1" @command="handleTreeNode" >
                  <span class="el-dropdown-link treeicons">
                      <i class="el-icon-plus"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  :command="beforeHandleCommand(node, data,'add')">添加部门</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown> 
              <el-dropdown v-else @command="handleTreeNode">
                  <span class="el-dropdown-link treeicons">
                      <i class="el-icon-more"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="beforeHandleCommand(node, data,'edit')" >编辑部门</el-dropdown-item>
                      <el-dropdown-item :command="beforeHandleCommand(node, data,'add')" >添加部门</el-dropdown-item>
                      <el-dropdown-item :command="beforeHandleCommand(node, data,'del')" >删除部门</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </span>
            <span v-else>
              <i class="el-icon-circle-check nodeicons" style="color:blue" @click="savenode"></i>
              <i class="el-icon-circle-close nodeicons" style="color:red" @click="cancelnode(node,data)"></i>
            </span>
            
            
        </span>
    </div>
  </el-tree>
</template>

<script>
import {uploadFile,downloadFile} from '../../api/index.js'
import {getDentify} from '@/utils/auth';
import {findOrgAuthInfoList,addOrgChannel,editOrgChannel} from '../../api/companyManage.js';
import {
    deleteOrgChannel
} from '../../api/company.js';
export default {
    props:{
       treedata:{
        type:Array,
        default:[]
      },
      searchValue:{
        type:String,
        default:''
      },
      isUser:{
        type:Boolean,
        default:false
      },
      isoverflow:{
        type:Boolean,
        default:false
      }
    },
  components: {},
  data() {
    return {
      showCheckbox:false,
        // defaultProps:{
        //     channelNo:"anysign",
        //     storeType:1
        // },
        defaultProps: {
            children: 'orgInfoDtoList',
            label: 'channelName'
        },
        getDentify:{},
        data:[],
        depName:'',
        istype:'',
        editModel:{
          channelName:'',
          parentChannelName: "",
          parentId: "",
          id:''
        },
        singleTree:[]
    }
  },
  created() {
      this.action = uploadFile();
      this.getDentify = getDentify();
      if(this.treedata.length != 0) 
      {
        this.data = this.treedata;
        this.singleTree = []
        this.getSingleTree(this.data)
      }
       
  },
  watch: {
      searchValue(val) {
        this.$refs.tree.filter(val);
      }
    },
  methods: {
    handleNodeClick(item) {
      
      if(item.channelName != '新建弹窗') this.$emit("handleNodeClick",item,this.singleTree)
    //   this.org = item;
    //   this.model.orgId = item.id;
    //   this.getUserList();
      
      
    },
    getSingleTree(list){
      console.log(list)
      list.map((obj)=>{
        this.singleTree.push(obj)
        if(obj.orgInfoDtoList.length > 0){
          this.getSingleTree(obj.orgInfoDtoList)
        }
      })
    },
    async getOrgList(selectTag){
      this.showCheckbox = selectTag;
      let {data} = await findOrgAuthInfoList({id:this.getDentify.orgId});
      this.data = [data];
      this.singleTree = []
      this.getSingleTree(this.data)
    },
    getTreeCheck(){
      let arr = [];
      this.$refs.tree.getCheckedNodes().forEach(element => {
          arr.push(element.id)
          
      })
      return arr;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.channelName.indexOf(value) !== -1;
    },
    beforeHandleCommand(node, data,command){
        return {
            'node': node,
            'data': data,
            'command':command
        }
    },
    handleTreeNode(command) {
      if(this.istype == 'add' || this.istype == 'edit') {
        this.$message.warning('请先完成当前部门的编辑');
        return
      }
      this.istype = command.command
        // this.$message('click on item ' + command);
        switch(command.command){
          case 'add':
            if(command.node.level == 5){
               this.$message.error('部门创建已达最高节点');
               this.istype = ''
               return
            }
            this.appendnode(command.node,command.data)
            break;
          case 'edit':
            this.depName = command.data.channelName
            this.editModel.parentChannelName = command.data.parentName
            this.editModel.parentId = command.data.parentId
            this.editModel.id = command.data.id
            command.data.channelName = '新建弹窗'
            break;
          case 'del':
            this.delNode(command.data.id)
            break;
        }
    },
    appendnode(node,data){
        let newchild2 = {
          channelName:'新建弹窗',
          orgInfoDtoList:[]
        }
        if(!data.orgInfoDtoList){
          data.orgInfoDtoList = []
        }
        data.orgInfoDtoList.push(newchild2);
        
        this.editModel.parentChannelName = data.channelName
        this.editModel.parentId = data.id
        this.editModel.id = ''
    },
    async delNode(id){
      this.$confirm("确认删除部门？", '温馨提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消'
      })
          .then(async () => {
              await deleteOrgChannel({id:id });
              this.$message.success('删除成功');
              this.istype = ''
              this.getOrgList()
              
          })
          .catch(() => {});
    },
    savenode(){
      this.editModel.channelName = this.depName
      if (this.istype == 'add') {
          addOrgChannel(this.editModel).then(res => {
              this.$message.success('新增成功');
              this.istype = ''
              this.getOrgList()
          });
      } else if(this.istype == 'edit') {
          editOrgChannel(this.editModel).then(res => {
              this.$message.success('编辑成功');
              this.istype = ''
              this.getOrgList()
          });
      }
      
    },
    cancelnode(node,data){
      this.istype = ''
      this.getOrgList()
    }
  }
}

</script>
<style lang="less">
.defaultTree /deep/ .el-tree-node__content{
    height: 35px;
  }
.defaultTree /deep/ .el-tree-node.is-current>.el-tree-node__content{
    color: #1257FF ;
    background: #ECF2FD;
  }
  .overflowtree{
    height: 200px;
    overflow-y: auto;
  }
  
.nodespan{
    width: 77%;
    display: block;
    float: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.nodespanIpt{
    width: 60%;
    float: left;
    margin-top: 4px;
}
.treeicons{
  margin-right: 8px;
}
.nodeicons{
  font-size: 19px;
  line-height: 35px;
  margin-right:10px;
}
</style>