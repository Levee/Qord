import { combineReducers } from "redux";

const friendReqOutReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIENDS_REQ_OUT':
      return [...action.payload[0].outgoing];
    case 'CLEAR_FRIEND_LISTS':
      return [];
    default:
      return state;
  }
}

const friendReqInReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIENDS_REQ_IN':
      return [...action.payload[0].incoming];
    case 'CLEAR_FRIEND_LISTS':
      return [];
    default:
      return state;
  }
}

const friendAccReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIENDS_ACC':
      return [...action.payload[0].friends];
    case 'CLEAR_FRIEND_LISTS':
      return [];
    default:
      return state;
  }
}

const friendReducer = combineReducers({
  req_out: friendReqOutReducer,
  req_in: friendReqInReducer,
  acc: friendAccReducer,
})

export default friendReducer;