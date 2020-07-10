import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchAllGames() {
  try {
    const response = yield axios.get('/api/steam');
    yield put({ type: 'SET_GAMES', payload: response.data.applist.apps });
  } catch (error) {
    alert('Unable to retrieve games from server.');
  }
}

function* fetchSearchResults(action) {
  try {
    yield put({ type: 'SET_SEARCH_RESULTS', payload: action.payload });
  } catch (error) {
    alert('Unable to retrieve search results.');
  }
}

function* fetchNews(action) {
  try {
    const response = yield axios.get(`/api/steam/${action.payload.id}/${action.payload.count}`);
    yield put({ type: 'SET_NEWS', payload: response.data.appnews });
  } catch (error) {
    alert('Unable to retrieve news from server.');
  }
}

function* gameSaga() {
  yield takeLatest('FETCH_ALL_GAMES', fetchAllGames);
  yield takeLatest('FETCH_SEARCH_RESULTS', fetchSearchResults);
  yield takeLatest('FETCH_NEWS', fetchNews);
}

export default gameSaga;