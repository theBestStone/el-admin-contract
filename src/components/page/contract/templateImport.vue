<template>
    <el-dialog title="模板导入参与方" :visible.sync="dialogVisible" width="40%" @close="close" :before-close="handleClose">
        <div>
            <div class="box">1.下载模板，批量填写参与方用户信息<div class="b-right" @click="downloads">下载</div></div>
            <div class="box">2.上传填写好的参与方用户信息表 <el-upload
                class="upload-demo b-right"
                :action="action"
                 :on-error="errorAuth"
                 accept=".xls,.xlsx"
                :on-success="successAuth"
                name="multipartFile"
                :show-file-list="false">
                <div>选择文件</div>
                
                </el-upload></div>
            <el-checkbox v-model="checked">人员重复校验（取消勾选后不进行人员重复校验）</el-checkbox>
        </div>
        <!-- <div class="margin-top">
            <el-button class="submit">确认提交成功数据</el-button>
        </div> -->
    </el-dialog>
</template>

<script>
import { downloadSignUserModelFile,parseModelExcel} from '../../../api/contracts.js';
export default {
    props: ['dialogVisible'],
    data() {
        return {
            activeIndex: '1',
            checked: true,
            action:''
        };
    },
    created() {
        this.action = parseModelExcel();
    },
    methods: {
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
        },
        downloads(){
            downloadSignUserModelFile();
        },
        successAuth(res, file){
          console.log(res)
          if(res.code==200){
            this.dialogVisible = false;
            this.$emit("setConts",res.data);

          }else if(res.code==401){
            Cookies.set('point', 401)
            this.$store.dispatch('LogOut',true) 
          }else{
            
          
            this.$message.error(file.name+ " 上传失败")
            
          }
      },
      errorAuth(err,file,fileList){
       
        this.$message.error(file.name+ " 上传失败")
       
        //   console.log(res,file)
      },
    }
};
</script>

<style lang="less">
    .box {
        background: #fafbfd;
        border: 1px solid rgba(226, 237, 255, 1);
        border-radius: 2px;
        height: 46px;
        line-height: 46px;
        padding: 0 20px;
        margin-bottom: 10px;
        .b-right {
            float: right;
            background: rgba(18,87,255,0.05);
            border-radius: 2px;
            font-size: 12px;
            color: #1257FF;
            height: 22px;
            line-height: 22px;
            margin-top: 12px;
            padding: 1px 10px;
            box-sizing: border-box;
            cursor: pointer;
        }
    }
    .submit {
        background: #1257FF;
border-radius: 2px;
font-size: 14px;
color: #FFFFFF;
    }
</style>
