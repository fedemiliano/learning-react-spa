import { initialState } from '../store/initialState';

export default function dialogErrorReducer(state = initialState.dialogError, action) {

  let val = null;
  switch(action.type) {    
    case 'OPEN_DIALOG_ERROR':
      val = { open: true, 
              message: action.message}
      break;
    case 'CLOSE_DIALOG_ERROR':
      val = { open: false }
      break;
    default:
      val = state;
  };
  return val;
};