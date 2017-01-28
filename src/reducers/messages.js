import { initialState } from '../store/initialState';

export default function messagesReducer(state = initialState.messages, action) {

  let val = null;
  switch(action.type) {
    
    case 'RECEIVE_ALL_MESSAGES':
      val = Object.assign({}, state, { data: action.messages.data, key : action.messages.key });
      break;
    case 'USERNAME_TO':
      val = Object.assign({}, state, action.messages);
      break;
    case 'TO_VISITING':
      val = Object.assign({}, state, action.messages);
      break;  
    case 'LOGOUT':
      val = initialState.messages
      break;    
    default:
      val = state;
  };
  return val;
};