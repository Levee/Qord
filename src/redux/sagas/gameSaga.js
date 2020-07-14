import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchAllGames() {
  try {
    yield put({ type: 'LOADING_BEGIN' });
    const response = yield axios.get('/api/steam');
    yield put({ type: 'SET_GAMES', payload: response.data.applist.apps });
    yield put({ type: 'LOADING_END' });
  } catch (error) {
    alert('Unable to retrieve games from server.');
  }
}

function* fetchGameSearchResults(action) {
  try {
    yield put({ type: 'SET_GAME_SEARCH_RESULTS', payload: action.payload });
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
  yield takeEvery('FETCH_ALL_GAMES', fetchAllGames);
  yield takeEvery('FETCH_GAME_SEARCH_RESULTS', fetchGameSearchResults);
  yield takeEvery('FETCH_NEWS', fetchNews);
}

export default gameSaga;