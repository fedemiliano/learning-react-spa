import { initialState } from '../store/initialState';

export default function usersReducer(state = initialState.users, action) {
  let val = null
  let newUsers = []
  switch(action.type) {
    case 'RECEIVE_ALL_USERS':
      for(let user in action.users)
        if(action.users[user].uid !== action.uid)
          newUsers.push(action.users[user])
      val = {data: newUsers}
      console.log(val)
      break
    case 'ADD_USER':
      newUsers = state.data
      if(newUsers.length === 0) {
        newUsers.push(action.user)
      } else {
        let isNew = true
        newUsers.forEach(data => {
          if(data.uid === action.user.uid)
            isNew = false 
        })
        if(isNew)
          newUsers.push(action.user)
      }
      val = {data: newUsers}      
      break;   
   
    case 'USER_CHANGED':
      state.data.forEach(data => {
        if(data.uid === action.user.data.uid && !action.user.data.connections) {
          delete data.connections
          data = Object.assign({}, data, action.user.data)
          newUsers.push(data)
        } else if(data.uid === action.user.data.uid) {
          data = Object.assign({}, data, action.user.data)
          newUsers.push(data)
        } else {
          newUsers.push(data)
        }            
      })
      val = {data: newUsers}
      break;    
  
    case 'USER_MESSAGES':
      state.data.forEach(val => {
        if(val.uid === action.fromUid) {
          val['messageKey'] = action.messageKey
          val['toRead'] = action.toRead
          val['fromUid'] = action.fromUid
        }
      })
      val = {data: state.data}
      break; 
    case 'NEW_MESSAGES':
      state.data.forEach(data => {
        if(data.messageKey === action.messageKey) {
          data['toRead'] = action.toRead
          newUsers.push(data)
        } else {
          newUsers.push(data)
        }            
      })
      val = {data: newUsers}      
      break;
    case 'LOGOUT':
      console.log('USERS-LOGOUT')
      val = {data: []}
      console.log(val)
      break;           
    default:
      val = state;
  };
  return val;
};