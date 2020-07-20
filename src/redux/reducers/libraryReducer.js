import { combineReducers } from "redux";

const currentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_GAME':
      return action.payload.data.data;
    default:
      return state;
  }
}

const libraryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIBRARY':
      return [...action.payload];
    default:
      return state;
  }
}

const loadingReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOADING_BEGIN_LIBRARY':
      return true;
    case 'LOADING_END_LIBRARY':
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  current: currentReducer,
  library: libraryReducer,
  loading: loadingReducer,
});