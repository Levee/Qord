import { combineReducers } from "redux";

const gamesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GAMES':
      return action.payload;
    default:
      return state;
  }
}

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GAME_SEARCH_RESULTS':
      return [...action.payload];
    default:
      return state;
  }
}

const newsReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return action.payload;
    default:
      return state;
  }
}

const loadingReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOADING_BEGIN':
      return true;
    case 'LOADING_END':
      return false;
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

export default combineReducers({
  games: gamesReducer,
  search: searchReducer,
  news: newsReducer,
  loading: loadingReducer,
  library: libraryReducer,
});