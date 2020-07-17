import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFriendReqOut(action) {
  try {
    const response = yield axios.get(`/api/friends/outgoing/${action.payload}`);
    yield put({ type: 'SET_FRIENDS_REQ_OUT', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve outgoing friend requests from server.');
  }
}

function* fetchFriendReqIn(action) {
  try {
    const response = yield axios.get(`/api/friends/incoming/${action.payload}`);
    yield put({ type: 'SET_FRIENDS_REQ_IN', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve incoming friend requests from server.');
  }
}

function* fetchFriendsAcc(action) {
  try {
    const response = yield axios.get(`/api/friends/accepted/${action.payload}`);
    yield put({ type: 'SET_FRIENDS_ACC', payload: response.data });
  } catch (error) {
    alert('Unable to retrieve accepted friend requests from server.');
  }
}

function* friendReqSend(action) {
  try {
    yield axios.post(`/api/friends/send`, action.payload);
  } catch (error) {
    alert('Unable to send friend request.');
  }
}

function* friendReqAccept(action) {
  try {
    yield axios.post(`/api/friends/accept`, action.payload);
  } catch (error) {
    alert('Unable to accept friend request.');
  }
}

function* friendReqDeny(action) {
  try {
    yield axios.delete(`/api/friends/deny`, action.payload);
  } catch (error) {
    alert('Unable to deny friend request.');
  }
}

function* deleteFriend(action) {
  try {
    yield axios.delete(`/api/friends/delete`, action.payload);
  } catch (error) {
    alert('Unable to delete friend.');
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIENDS_REQ_OUT', fetchFriendReqOut);
  yield takeLatest('FETCH_FRIENDS_REQ_IN', fetchFriendReqIn);
  yield takeLatest('FETCH_FRIENDS_ACC', fetchFriendsAcc);
  yield takeLatest('SEND_FRIEND_REQ', friendReqSend);
  yield takeLatest('ACCEPT_FRIEND_REQ', friendReqAccept);
  yield takeLatest('DENY_FRIEND_REQ', friendReqDeny);
  yield takeLatest('DELETE_FRIEND', deleteFriend);
}

export default friendSaga;