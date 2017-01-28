import { initialState } from '../store/initialState';

export default function trashReducer(state = initialState.trash, action) {
  let val = null;
  switch(action.type) {    
    case 'RECEIVE_ALL_TRASH':
      val = action.trash
      break;
    case 'ADDED_TRASH':
      val = Object.assign({}, state, action.trashItem)
      break;
    case 'REMOVED_TRASH':
      console.log(action.trashItem)
      let copy = Object.assign({}, state)
      delete copy[Object.keys(action.trashItem)[0]] 
      val = copy
      break;
    case 'CHECK_ITEM_TRASH':
      console.log(action.trashItem)
      let trashItem = Object.assign({}, state[action.trashItem.trashKey], {checked: true})
      state[action.trashItem.trashKey] = trashItem
      val = state
      break;
    case 'UNCHECK_ITEM_TRASH':
      delete state[action.trashItem.trashKey].checked
      val = state
      break;            
    default:
      val = state;
  };
  return val;
};