import { initialState } from '../store/initialState';

export default function taskReducer(state = initialState.task, action) {
  let val = null;
  switch(action.type) {    
    case 'NEW_TASK':
      val = {};
      break;
    case 'READ_TASK':
      val = action.task
      break;      
    default:
      val = state;
  };
  return val;
};