import { initialState } from '../store/initialState';

export default function snackReducer(state = initialState.events, action) {

  let val = null;
  switch(action.type) {    
    case 'EVENTS_USERS':
      val = Object.assign({}, state, {users:true})
      break;    
    default:
      val = state;
  };
  return val;
};