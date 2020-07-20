import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAllGames() {
  try {
    yield put({ type: 'LOADING_BEGIN_GAMES' });
    const response = yield axios.get('/api/steam/apps');
    yield put({ type: 'SET_GAMES', payload: response.data.applist.apps });
    yield put({ type: 'LOADING_END_GAMES' });
  } catch (error) {
    alert('Unable to retrieve games from server.');
  }
}

function* fetchGameSearchResults(action) {
  try {
    yield put({ type: 'SET_GAME_SEARCH_RESULTS', payload: action.payload });
  } catch (error) {
    console.log('Unable to retrieve search results.', error);
  }
}

function* fetchNews(action) {
  try {
    const response = yield axios.get(`/api/steam/${action.payload.id}/${action.payload.count}`);
    yield put({ type: 'SET_NEWS', payload: response.data.appnews });
  } catch (error) {
    console.log('Unable to retrieve news from server.', error);
  }
}

function* gameSaga() {
  yield takeLatest('FETCH_ALL_GAMES', fetchAllGames);
  yield takeLatest('FETCH_GAME_SEARCH_RESULTS', fetchGameSearchResults);
  yield takeLatest('FETCH_NEWS', fetchNews);
}

export default gameSaga;