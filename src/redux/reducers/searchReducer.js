const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return [...action.payload];
    case 'CLEAR_SEARCH_RESULTS':
      return [];
    default:
      return state;
  }
}

export default searchReducer;