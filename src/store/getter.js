const getters = {
 
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user, 
  tempId:state => state.template.tempId, 
  tempType:state => state.template.tempType, 
  contId:state => state.template.contId, 
  consumer:state => state.template.consumer, 
  producer:state => state.template.producer, 
  
}
export default getters
