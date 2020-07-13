const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return [...action.payload];
    default:
      return state;
  }
}

export default searchReducer;