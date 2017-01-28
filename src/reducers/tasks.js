import { initialState } from '../store/initialState';

export default function tasksReducer(state = initialState.tasks, action) {
  let val = null;
  switch(action.type) {    
    case 'RECEIVE_ALL_TASKS':
      val = action.tasks
      break;
    case 'CLEAN_TASKS':
      val = {}
      break;   
    case 'ADDED_TASK':
      val = Object.assign({}, state, action.task)
      break;
    case 'CHANGED_TASK':
      val = Object.assign({}, state, action.task)
      break;
    case 'REMOVED_TASK':
      let copy = Object.assign({}, state)
      delete copy[Object.keys(action.task)[0]] 
      val = copy
      break;      
    default:
      val = state;
  };
  return val;
};