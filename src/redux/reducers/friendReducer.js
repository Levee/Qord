const friendReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FRIENDS':
      return [...action.payload[0].friends];
    default:
      return state;
  }
}

export default friendReducer;