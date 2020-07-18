import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFriendReqOut() {
  try {
    const response = yield axios.get(`/api/friends/outgoing`);
    yield put({ type: 'SET_FRIENDS_REQ_OUT', payload: response.data });
  } catch (error) {
    console.log('Unable to retrieve outgoing friend requests from server.', error);
  }
}

function* fetchFriendReqIn() {
  try {
    const response = yield axios.get(`/api/friends/incoming`);
    yield put({ type: 'SET_FRIENDS_REQ_IN', payload: response.data });
  } catch (error) {
    console.log('Unable to retrieve incoming friend requests from server.', error);
  }
}

function* fetchFriendsAcc() {
  try {
    const response = yield axios.get(`/api/friends/accepted`);
    yield put({ type: 'SET_FRIENDS_ACC', payload: response.data });
  } catch (error) {
    console.log('Unable to retrieve accepted friend requests from server.', error);
  }
}

function* friendReqSend(action) {
  try {
    yield axios.post(`/api/friends/send`, action.payload);
    yield put({ type: 'FETCH_FRIENDS_REQ_OUT' });
  } catch (error) {
    console.log('Unable to send friend request.', error);
  }
}

function* friendReqCancel(action) {
  try {
    yield axios.put('/api/friends/cancel', action.payload);
    yield put({ type: 'FETCH_FRIENDS_REQ_OUT' });
  } catch (error) {
    console.log('Unable to cancel friend request.', error);
  }
}

function* friendReqAccept(action) {
  try {
    yield axios.post(`/api/friends/accept`, action.payload);
    yield put({ type: 'FETCH_FRIENDS_ACC' });
    yield put({ type: 'FETCH_FRIENDS_REQ_IN' });
  } catch (error) {
    console.log('Unable to accept friend request.', error);
  }
}

function* friendReqReject(action) {
  try {
    yield axios.put(`/api/friends/reject`, action.payload);
    yield put({ type: 'FETCH_FRIENDS_REQ_IN' });
  } catch (error) {
    console.log('Unable to reject friend request.', error);
  }
}

function* deleteFriend(action) {
  try {
    yield axios.put(`/api/friends/delete`, action.payload);
    yield put({ type: 'FETCH_FRIENDS_ACC' });
  } catch (error) {
    console.log('Unable to delete friend.', error);
  }
}

function* friendSaga() {
  yield takeLatest('FETCH_FRIENDS_REQ_OUT', fetchFriendReqOut);
  yield takeLatest('FETCH_FRIENDS_REQ_IN', fetchFriendReqIn);
  yield takeLatest('FETCH_FRIENDS_ACC', fetchFriendsAcc);
  yield takeLatest('FRIEND_REQ_SEND', friendReqSend);
  yield takeLatest('FRIEND_REQ_CANCEL', friendReqCancel);
  yield takeLatest('FRIEND_REQ_ACCEPT', friendReqAccept);
  yield takeLatest('FRIEND_REQ_REJECT', friendReqReject);
  yield takeLatest('DELETE_FRIEND', deleteFriend);
}

export default friendSaga;