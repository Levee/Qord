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

function* friendReqSend(action) {
  try {
    yield axios.post(`/api/friends/send`, { uid1: action.payload.uid1, uid2: action.payload.uid2 });
  } catch (error) {
    alert('Unable to send friend request.');
  }
}

function* friendReqAccept(action) {
  try {
    yield axios.post(`/api/friends/accept`, { uid1: action.payload.uid1, uid2: action.payload.uid2 });
  } catch (error) {
    alert('Unable to accept friend request.');
  }
}

function* friendReqDeny(action) {
  try {
    yield axios.delete(`/api/friends/deny`, { uid1: action.payload.uid1, uid2: action.payload.uid2 });
  } catch (error) {
    alert('Unable to deny friend request/');
  }
}

function* deleteFriend(action) {
  try {
    yield axios.delete(`/api/friends/delete`, { uid1: action.payload.uid1, uid2: action.payload.uid2 });
  } catch (error) {
    alert('Unable to delete friend.');
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIENDS_REQ', fetchFriendsReq);
  yield takeLatest('FETCH_FRIENDS_ACC', fetchFriendsAcc);
  yield takeLatest('SEND_FRIEND_REQ', friendReqSend);
  yield takeLatest('ACCEPT_FRIEND_REQ', friendReqAccept);
  yield takeLatest('DENY_FRIEND_REQ', friendReqDeny);
  yield takeLatest('DELETE_FRIEND', deleteFriend);
}

export default friendSaga;