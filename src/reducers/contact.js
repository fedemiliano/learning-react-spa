import { initialState } from '../store/initialState';

export default function contactReducer(state = initialState.contact, action) {
  let val = null;
  switch(action.type) {    
    case 'READ_CONTACT':
      val = action.contact;
      break;
    default:
      val = state;
  };
  return val;
};