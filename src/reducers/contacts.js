import { initialState } from '../store/initialState';

export default function contactsReducer(state = initialState.contacts, action) {
  let val = null;
  switch(action.type) {    
    case 'RECEIVE_ALL_CONTACTS':
      val = action.contacts;
      break;
    default:
      val = state;
  };
  return val;
};