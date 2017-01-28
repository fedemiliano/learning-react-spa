import { initialState } from '../store/initialState';

export default function contactTasksReducer(state = initialState.contactTasks, action) {
  let val = null;
  switch(action.type) {    
    case 'RECEIVE_ALL_CONTACT_TASKS':
      val = action.tasks
      break; 
    case 'CLEAN_CONTACT_TASKS':
      val = {}
      break; 
    case 'ADDED_CONTACT_TASK':
      val = Object.assign({}, state, action.task)
      break;  
    case 'CHANGED_CONTACT_TASK':
      val = Object.assign({}, state, action.task)
      break;      
    case 'REMOVED_CONTACT_TASK':
      let copy = Object.assign({}, state)
      delete copy[Object.keys(action.task)[0]] 
      val = copy
      break;                
    default:
      val = state;
  };
  return val;
};