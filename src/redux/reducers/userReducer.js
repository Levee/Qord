import { combineReducers } from "redux";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const pageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_PAGE':
      console.log([...action.payload]);
      return [...action.payload];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user.user
// external users will be on the redux state at:
// state.user.page
export default combineReducers({
  user: userReducer,
  page: pageReducer,
});
