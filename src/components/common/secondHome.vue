<template>
    <div class="wrapper2">
        <!-- <v-head ref="vheads"></v-head> -->
        <v-sidebar></v-sidebar>
        <div class="content-box" ref = "box2" :style="conStyle2">
            <!-- <v-tags></v-tags> -->
            <div class="content2" ref="content2">
                <div class="contmain" ref="contmain">

                    <transition name="move" mode="out-in">
                        <!-- <keep-alive :include="tagsList"> -->
                            <router-view></router-view>
                        <!-- </keep-alive> -->
                    </transition>
                </div>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
// import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            conStyle2:{
                height:"auto"
            },
            // conStyle2:{
            
            // },
            isAdmin:false
        };
    },
    components: {
        vHead,
        vSidebar,
        // vTags
    },
    watch:{
        
        $route(){
           
            this.resize();
        }
    },
    methods:{
        resize(){
            let screenHeight = document.body.clientHeight;
           
            
             if(!this.$refs.contmain){
                 console.log("contmain")
                 return false;
             
             } 
             
             this.conStyle2.height = screenHeight-56+"px"
            //  if(this.$refs.contmain.offsetHeight>screenHeight-56){
                this.$refs.content2.style.width = this.$refs.box2.offsetWidth+20+"px";
            // }else{
            //      this.$refs.content2.style.width  = this.$refs.box2.offsetWidth+"px";
            // }
            // this.conStyle2.width = this.$refs.box2.offsetWidth+10+"px";
        }
    },
    mounted(){
        
        window.onresize = () =>{ // 定义窗口大小变更通知事件
            this.resize();
            // console.log(23)
        };
        this.resize();
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>
<style lang="less">
    .adminheader2{
       position: relative;
       top: -70px;
       z-index: 5;
       
    }
    
.content-box {
    position: absolute;
    overflow: hidden;
    left: 185px;
    right: 0;
    top: 56px;
    bottom: 0;
    /* padding-bottom: 30px; */
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    // background: #f0f0f0;
    .contmain{
        height: 100%;
        .fullheight{
            height: 98%;
        }
        .el-card{
            height: 100%;
            overflow-y: auto;
        }
    }
}
     
</style>

