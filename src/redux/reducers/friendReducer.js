import { combineReducers } from "redux";

const friendReqReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIENDS_REQ':
      return [...action.payload[0].requests];
    default:
      return state;
  }
}

const friendAccReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIENDS_ACC':
      return [...action.payload[0].friends];
    default:
      return state;
  }
}

const friendReducer = combineReducers({
  req: friendReqReducer,
  acc: friendAccReducer,
})

export default friendReducer;