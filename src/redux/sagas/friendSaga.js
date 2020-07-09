import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

function* fetchFriends(action) {
  try {
    const response = yield Axios.get(`/api/friends/list/${action.payload}`);
    yield put({ type: 'SET_FRIENDS', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve friends from server.');
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIENDS', fetchFriends);
}

export default friendSaga;