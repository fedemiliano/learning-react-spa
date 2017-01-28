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
        username: action.username,
        token: action.token
      };
    break;        
    case 'LOGOUT':
      console.log('AUTH-LOGOUT')
      val = {
        status: 'ANONYMOUS',
        email: 'guest',
        uid: null,
        token: action.token
      };
      break;
    case 'LOGIN':
      val = {
        status: 'LOGGED_IN',
        email: action.email,
        uid: action.uid,
        username: action.username,
        token: action.token
      };
      break;
    case 'START':
      val = {
        status: 'STARTED',
        email: action.email,
        uid: action.uid,
        username: action.username,
        token: action.token
      };
      break;      
    default: 
      val = state;
  };
  return val;
};