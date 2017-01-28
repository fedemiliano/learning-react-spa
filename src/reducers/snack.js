import { initialState } from '../store/initialState';

export default function snackReducer(state = initialState.snack, action) {

  let val = null;
  switch(action.type) {    
    case 'OPEN_SNACK':
      val = { open: true, message : action.message };
      break;
    case 'CLOSE_SNACK':
      val = { open: false, message : "" };
      break;
    default:
      val = state;
  };
  return val;
};