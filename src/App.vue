<template>
    <div id="app" :style="{
      height: height + 'px'
    }">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  data() {
    return {
      height: 0
    }
  },
  created() {
    this.height = document.documentElement.clientHeight;
  }
}
</script>
<style>
    /* @import "./assets/css/main.less"; */
    @import "./assets/css/color-dark.css"; 
        /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
    /* #app {
      position: relative;
      height: 100%;
    }
    * {
      margin: 0;
      padding: 0;
    } */
</style>