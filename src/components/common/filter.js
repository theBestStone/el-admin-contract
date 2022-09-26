import Vue from 'vue';
Vue.filter('fileSize', function (value) {
  if (!value) return ''
  return  (value/1000/1000).toFixed(2)
})
 
