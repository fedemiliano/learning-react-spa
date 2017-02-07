import { initialState } from '../store/initialState.js';

export default function authReducer(state = initialState.auth, action) {
  let val = null;
  switch(action.type) {
    case 'ATTEMPTING_LOGIN':
      val = {
        status: 'AWAITING_AUTH_RESPONSE',
        username: 'guest',
        uid: null
      };
    break;
    case 'ATTEMPTING_REGISTER':
      val = {
        status: 'AWAITING_AUTH_REGISTER',
        username: 'guest',
        uid: null
      };
    break; 
    case 'REGISTER':
      val = {
        status: 'REGISTERED',
        email: action.email,
        uid: action.uid,
        username: action.username
      };
    break;        
    case 'LOGOUT':
      val = {
        status: 'ANONYMOUS',
        email: 'guest',
        uid: null
      };
      break;
    case 'LOGIN':
      val = {
        status: 'LOGGED_IN',
        email: action.email,
        uid: action.uid,
        username: action.username
      };
      break;
    case 'LOGIN_DETAILS':
      val = Object.assign({}, state, {username: action.username})
      break;      
    case 'START':
      val = {
        status: 'STARTED',
        email: action.email,
        uid: action.uid,
        username: action.username
      };
      break;      
    default: 
      val = state;
  };
  return val;
};