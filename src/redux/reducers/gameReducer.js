import { combineReducers } from "redux";

const games = (state = [], action) => {
  switch (action.type) {
    case 'SET_GAMES':
      return action.payload;
    default:
      return state;
  }
}

const search = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return [...action.payload];
    default:
      return state;
  }
}

const news = (state = null, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return action.payload;
    default:
      return state;
  }
}

const loading = (state = null, action) => {
  switch (action.type) {
    case 'LOADING_BEGIN':
      return true;
    case 'LOADING_END':
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  games,
  search,
  news,
  loading,
})