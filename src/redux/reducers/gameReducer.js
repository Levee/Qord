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
    case 'LOADING_BEGIN_GAMES':
      return true;
    case 'LOADING_END_GAMES':
      return false;
    default:
      return state;
  }
} 

export default combineReducers({
  games: gamesReducer,
  search: searchReducer,
  news: newsReducer,
  loading: loadingReducer,
});