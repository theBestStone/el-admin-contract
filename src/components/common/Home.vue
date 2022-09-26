<template>
    <div class="wrapper">
        <v-head ref="vheads" v-if="$route.meta.header"></v-head>
        <div class="content-box2" ref="box2" :class="{'content-collapse':collapse,'adminheader':isAdmin}" :style="conStyle">
            <div class="content" ref="content" >
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" style="height:100%;"></router-view>
                    </keep-alive>
               
                </transition>
                 <router-view v-if="!$route.meta.keepAlive" style="height:100%;"></router-view>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
// import vSidebar from './Sidebar.vue';
// import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            conStyle:{
                height:"auto"
            },
            conStyle2:{

            },
            isAdmin:false
        };
    },
    components: {
        vHead,
        // vSidebar,
        // vTags
    },
    watch:{
        
        $route(){
            if(this.$route.path!='/admin'){
                this.isAdmin = false;
            }else{
                this.isAdmin =true;
            }
           this.resize();
        }
    },
    methods:{
        resize(){
            let screenHeight = document.body.clientHeight;
            let screenWidth = document.body.clientWidth;
            
           
            // if(this.isAdmin){
                // this.conStyle.height = screenHeight-56+"px";
            // }

            
             if(!this.$refs.content){
                 console.log("content没有")
                 return false;
             
             } 
            // if(this.$refs.content.offsetHeight>screenHeight){
                this.$refs.content.style.width = document.body.clientWidth+15+"px";
            // }else{
            //      this.$refs.content.style.width  = document.body.clientWidth+"px";
            // }
           
            // this.conStyle.width = document.body.clientWidth+"px";
        }
    },
    mounted(){
       
        // this.$refs.content.addEventListener('scroll', ()=>{
            
        //     this.$refs.vheads.menu(this.$refs.content.scrollTop);
        // })
        if(this.$route.path!='/admin'){
            this.isAdmin = false;
        }else{
            this.isAdmin =true;
        }
        window.onresize = () =>{ // 定义窗口大小变更通知事件
            this.resize();
        };
        this.resize();
   
       
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        bus.$on('scrollTop', msg => {
            console.log("scrollTopscrollTopscrollTop")
            this.$refs.content.scrollTop = 0 ;
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
<style >
    .adminheader{
       position: relative;
       /* top: -70px; */
       z-index: 5;
       
    }
    .content{
        /* padding: 0 !important; */
        /* box-sizing:border-box; */
        /* overflow-y: scroll; */
        overflow-x:hidden;
    }
    
     
</style>

