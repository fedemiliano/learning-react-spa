import { initialState } from '../store/initialState';

export default function usersReducer(state = initialState.users, action) {
  let val = null
  switch(action.type) {
    case 'RECEIVE_ALL_USERS':
      delete action.users[action.uid]
      val = action.users
      break

    case 'USER_ADDED':
      val = {...state, ...action.user}
      break;  
    case 'USER_CHANGED':
      val = {...state, ...action.user}
      break;         
    /*   
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
  */
    case 'USER_MESSAGES':
      state[action.fromUid] = Object.assign({}, state[action.fromUid], 
                                            {messageKey: action.messageKey, 
                                             toRead: action.toRead,
                                            fromUid: action.fromUid})
      val = state
      break; 
    case 'NEW_MESSAGES':
      Object.keys(state).map((key, index)  => {
        if(action.messageKey === state[key].messageKey)
          state[key] = Object.assign({}, state[key], {toRead: action.toRead})
        return {}
      })
      val = state
      break;
    /*
    case 'LOGOUT':
      state = initialState.users
      break;
    */           
    default:
      val = state;
  };
  return val;
};