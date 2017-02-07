import { initialState } from '../store/initialState';

export default function contactsReducer(state = initialState.contacts, action) {
  let val = null;
  switch(action.type) {    
    case 'CONTACT_ADDED':
      val = {...state, ...action.item}
      break;
    case 'CONTACT_CHANGED':
      val = {...state, ...action.item}
      break;
    case 'CONTACT_REMOVED':
      let copy = {...state}
      delete copy[action.itemKey]
      val = copy  
      break;      
    default:
      val = state;
  };
  return val;
};