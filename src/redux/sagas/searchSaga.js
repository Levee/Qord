import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSearchResults(action) {
  try {
    const response = yield axios.get(`/api/search/${action.payload}`);
    yield put({ type: 'SET_SEARCH_RESULTS', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve search results from server.');
  }
}

function* searchSaga() {
  yield takeEvery('FETCH_SEARCH_RESULTS', fetchSearchResults);
}

export default searchSaga;