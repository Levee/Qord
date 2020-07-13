import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFriendsReq(action) {
  try {
    const response = yield axios.get(`/api/friends/requested/${action.payload}`);
    yield put({ type: 'SET_FRIENDS_REQ', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve requested friends from server.');
  }
}

function* fetchFriendsAcc(action) {
  try {
    const response = yield axios.get(`/api/friends/accepted/${action.payload}`);
    yield put({ type: 'SET_FRIENDS_ACC', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve accepted friends from server.');
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIENDS_REQ', fetchFriendsReq);
  yield takeLatest('FETCH_FRIENDS_ACC', fetchFriendsAcc);
}

export default friendSaga;