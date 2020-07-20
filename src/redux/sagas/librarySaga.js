import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCurrentGame(action) {
  try {
    const response = yield axios.get(`/api/library/game/${action.payload}`);
    yield put({ type: 'SET_CURRENT_GAME', payload: response });
  } catch (error) {
    console.log('Unable to retrieve current game info from server.', error);
  }
}

function* saveCurrentGame(action) {
  try {
    yield axios.post('/api/library/save', action.payload);
  } catch (error) {
    console.log('Unable to save current game to library.', error);
  }
}

function* fetchLibrary(action) {
  try {
    yield put({ type: 'LOADING_BEGIN_LIBRARY' });
    const response = yield axios.get(`/api/library`, action.payload);
    yield put({ type: 'SET_LIBRARY', payload: response.data });
    yield put({ type: 'LOADING_END_LIBRARY' });
  } catch (error) {
    console.log('Unable to retrieve library from server.', error);
  }
}

function* librarySaga() {
  yield takeLatest('FETCH_CURRENT_GAME', fetchCurrentGame);
  yield takeLatest('SAVE_CURRENT_GAME', saveCurrentGame);
  yield takeLatest('FETCH_LIBRARY', fetchLibrary);
}

export default librarySaga;