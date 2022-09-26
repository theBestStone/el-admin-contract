
 
 import bus from '../../components/common/bus'
const template = {
  state: {
     tempId:"",
     contId:"",
     tempType:"",
     producer:{},
     consumer:{},
     id:1
  },
  mutations: {
    tempId: (state, id) => {
     
      state.tempId = id
    },
    tempType:(state, type)=>{
      state.tempType = type
    } 
  },
  actions: {
    setTempId({commit, state}, id) {
      state.tempId = id
      
    },
    setContId({commit, state}, id) {
      state.contId = id
      
    },
    setTempType({commit, state}, type) {
      state.tempType = type
    },
    setConsumer({commit, state}, com,peerId) {
       
        console.log(com,"setConsumer")
        let obj = {}
        obj[com.id]  = com
        let arr = Object.assign({}, state.consumer, obj);
        state.consumer = arr;
   
      
    },
    setProducer({commit, state}, com,peerId) {
      let obj = {}
      obj[com.id]  = com;
      let arr = Object.assign({}, state.producer, obj);
      state.producer = arr;
      // state.producer[com.id]  = com;
    },
    recoverConsumer({commit, state}, com){
      let obj = {}
      for(let item in state.consumer){
        if(state.consumer[item].peerId==com.peerId&&state.consumer[item].type==com.type){
          
          obj[item] = state.consumer[item];
          obj[item].trackCloseTag = false;
        }
      }
      let arr = Object.assign({}, state.consumer, obj);
      state.consumer = arr;
       
 
       
    },
    removeConsumer({commit, state}, com) {
      let obj = {}
      // obj[com.id]  = com
      for(let item in state.consumer){
        if(state.consumer[item].peerId==com.peerId&&state.consumer[item].type==com.type){
          // obj[item].track = null;
          console.log(com.trackCloseTag)
          obj[item] = state.consumer[item];
          if(com.trackCloseTag){
            obj[item].trackCloseTag = true;
          }else{
            obj[item].track = null;
            obj[item].trackCloseTag = false;
          }
          
          
          obj[item].checkTag = !obj[item].checkTag
        }
      }
      console.log(obj,"修改前")
      // if(!obj.peerId){
      //   return false;
      // }
      let arr = Object.assign({}, state.consumer, obj);
 
      state.consumer = arr;
    },
    removeProducer({commit, state}, com) {
      let obj = {}
      // obj[com.id]  = com
      for(let item in state.producer){
        console.log(state.producer[item].type==com.type,state.producer[item].type,com.type)
        if(state.producer[item].peerId==com.peerId&&state.producer[item].type==com.type){
          
          obj[item] = state.producer[item];
          obj[item].track = null
          obj[item].checkTag = !obj[item].checkTag
          // obj[item].change = !obj[item].change
        }
      }
      console.log(obj,obj.peerId,'修改视频')
      // if(!obj.peerId){
      //   return false;
      // }
      let arr = Object.assign({}, state.producer, obj);
 
      state.producer = arr;
    }
  }
}
 
export default template