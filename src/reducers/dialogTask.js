import { initialState } from '../store/initialState';

export default function dialogTaskReducer(state = initialState.dialogTask, action) {

  let val = null;
  switch(action.type) {    
    case 'OPEN_DIALOG_TASK':
      val = { open: true, 
              title: action.title, 
              operation: action.operation, 
              associatedTo: action.associatedTo };
      break;
    case 'CLOSE_DIALOG_TASK':
      val = { open: false };
      break;
    default:
      val = state;
  };
  return val;
};