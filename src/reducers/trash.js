import { initialState } from '../store/initialState';

export default function trashReducer(state = initialState.trash, action) {
  let val = null;
  switch(action.type) {    
    case 'RECEIVE_ALL_TRASH':
      val = action.trash
      break;
    case 'ADDED_TRASH':
      val = {...state, ...action.trashItem}
      break;
    case 'REMOVED_TRASH':
      state[action.itemKey] = null 
      val = {...state}
      break;
    case 'REMOVE_TRASH_KEYS':
      let copy = {...state}
      action.keys.forEach(key => {
        delete copy[key]
      })      
      val = copy  
      break;    
    case 'CHECK_ITEM_TRASH':
      let trashItem = Object.assign({}, state[action.itemKey], {checked: true})
      state[action.itemKey] = trashItem
      val = state
      break;
    case 'UNCHECK_ITEM_TRASH':
      delete state[action.itemKey].checked
      val = state
      break;            
    default:
      val = state;
  };
  return val;
};