<!--  -->
<template>
  <span>
      <el-button  type="text" @click="showImg">流程示意图</el-button>
       <el-dialog title="将按此顺序进行签署" center :visible.sync="visible" top="20px"  width="800px">
           <div>
               <!-- <div style="text-align:center;font-size:18px;margin:10px 0;">将按此顺序进行签署</div> -->
               <div class="cf" style="width:100%;" >

                   <div class="signboxp" v-if="sendType!=1">
                       <div class="signbox">

                        <p class="signlinght signtitle">发起方</p>
                        <p  class="signlinght signp"><span class="signpspan">姓名：</span>{{userInfo.userName}}</p>
                        <p   class="signlinght signp"><span class="signpspan">企手机号码：</span>{{userInfo.phone}}</p>
                       </div>
                       <p style="text-align:center;font-size:20px;color:#e6e6e6;margin-top:10px"><i class="el-icon-bottom"></i> </p>
                   </div>
                     
                    <div v-if="sendType==1" style="text-align:center" class="cf">
                    
                       <el-button plain type="primary">发起方</el-button>
                        <p style="text-align:center;font-size:20px;color:#e6e6e6;margin-top:10px"><i class="el-icon-bottom"></i> </p>
                   </div>
                   <div class="cf" :style="{'overflow-x':type==1?'scroll':'hidden','display':type==1?'flex':'block'}">

                    <div class="signboxp" v-for="(item,index) in sendArrcopy" v-key="index" style="flex:none;"  >
                        <div class="signbox">

                            <p class="signlinght signtitle">签署方{{index+1}}</p>
                            <p class="signlinght signp"><span class="signpspan">姓名：</span>{{item.name?item.name:'签署方'+(index+1)}}</p>
                            <p class="signlinght signp" v-if="item.type==2"><span class="signpspan">企业：</span>{{item.orgName?item.orgName:'企业'+(index+1)}}</p>
                            <p class="signlinght signp"><span class="signpspan">手机号码：</span>{{item.account?item.account:'手机号'+(index+1)}}</p>
                        </div>
                        <p  v-if="type!=1" style="text-align:center;font-size:20px;color:#e6e6e6;margin-top:10px"><i class="el-icon-bottom"></i> </p>
                    </div>
                   </div>
                   <div style="text-align:center" class="cf">
                       <p v-if="type==1" style="text-align:center;font-size:20px;color:#e6e6e6;margin-top:10px"><i class="el-icon-bottom"></i> </p>
                       <el-button plain>结束</el-button>
                   </div>
               </div>
            <!-- <el-image :src="imgUrl" :style="style1"></el-image> -->
                <!-- <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" /> -->
           </div>
       </el-dialog>
  </span>
</template>

<script>
// import RelationGraph from 'relation-graph'
export default {
    props:{
        type:{
            type: Number,
            required: true,
            default: 0
        },
        sendArr:{
            type:Array
        },
        sendType:{
            type:[String,Number]
        }
    },
  components: {
    //   RelationGraph 
  },
  data() {
    return {
        imgUrl:"",
        visible:false,
        style1:{},
        userInfo:{},
        sendArrcopy:[],
     
        graphOptions: {
            allowSwitchLineShape: true,
            allowSwitchJunctionPoint: true,
            disableDragNode:true,
            "backgrounImageNoRepeat": false,
            "layouts": [
                {
                "label": "中心",
                "layoutName": "tree",
                "layoutClassName": "seeks-layout-center",
                "defaultJunctionPoint": "border",
                "centerOffset_y": "-100",
                }
            ],
             
            "defaultNodeColor": "#1890ff",
            defaultNodeBorderColor:"#1890ff",
            "allowShowMiniNameFilter": false,
            "allowShowMiniToolBar": false,
            "defaultNodeShape": 1,
            "defaultLineShape":3,
            "defaultJunctionPoint": "tb",
            "defaultNodeWidth": "100"
         // 这里可以参考"Graph 图谱"中的参数进行设置
       }
    }
  },
  created() {},
   mounted() {
     console.log(this.$store.getters.user)
     this.userInfo = this.$store.getters.user;
   },

  methods: {
      showImg(){
          if(this.type==0){
              this.imgUrl = require('../../assets/img/order.png')
              this.style1 = {
                  width:"280px",
                  height:"266px"
              }
          }else{
              this.imgUrl = require('../../assets/img/disorder.png')
              this.style1 = {
                  width:"280px",
                  height:"126px"
              }
          } 
          this.visible = true;
          this.$nextTick(()=>{
            //   this.showSeeksGraph()
            this.sendArrcopy = JSON.parse(JSON.stringify(this.sendArr));
            console.log(this.sendArrcopy,"this.sendArrcopythis.sendArrcopythis.sendArrcopy")
          })
      },
      showSeeksGraph(query) {
          console.log(this.sendArr,'this.sendArrthis.sendArrthis.sendArr');
          let sendArr = JSON.parse(JSON.stringify(this.sendArr))
          let arr = [
              { id: 'A', text: '发起'},

          ];
          let arr2= [];
          sendArr.forEach((item,index)=>{
              if(!item.name){
                  item.name = "签署方"+(index+1)
              }
              arr.push({id:String(index+1),text:item.name});
                let obj = {}
              if(this.type==0){
                
                  if(index==0){
                      arr2.push({
                         from:'A',
                         to:'1' 
                      })
                      obj.from = String(index+1);
                      obj.to = String(index+2);
                       arr2.push(obj)
                  }else if(index==this.sendArr.length-1){
                       
                  }else{
                      obj.from = String(index+1);
                      obj.to = String(index+2);
                       arr2.push(obj)
                  }
              }else{
                  obj.from = 'A';
                  obj.to = String(index+1);
                   arr2.push(obj)
              }
             
          })
       var __graph_json_data = {
         rootId: 'A',
         nodes: arr,
         links:arr2
       }
       console.log(__graph_json_data)
       // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     },
     onNodeClick(nodeObject, $event) {
       console.log('onNodeClick:', nodeObject)
     },
     onLineClick(lineObject, $event) {
       console.log('onLineClick:', lineObject)
     }
  }
}

</script>
<style  >

.signboxp{
   
    width:300px;
    margin:0 auto;
    padding:0 10px 10px;

}
.signbox{
     background-color: #f3f3f3;
     padding:10px;
     border-radius: 8px;
     height:60px;
}
.signlinght{
    height:16px;
    line-height: 16px;
    font-size:12px;
}
.signtitle{
    font-size:15px;
    color:#3E52C0;
}

.signp{

}
.signpspan{
    display: inline-block;
    
}
</style>