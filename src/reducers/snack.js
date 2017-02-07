import { initialState } from '../store/initialState';

export default function snackReducer(state = initialState.snack, action) {

  let val = null;
  switch(action.type) {    
    case 'OPEN_SNACK':
      val = { open: true, message : action.message, data: action.data ? action.data : {}, items: action.items ? action.items : {} };
      break;
    case 'CLOSE_SNACK':
      val = initialState.snack;      
      break;
    default:
      val = state;
  };
  return val;
};