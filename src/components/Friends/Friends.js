import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Friends.css';

class Friends extends Component {
  state = {
    val: '',
  }

  componentDidMount() {
    const { user, dispatch } = this.props
    dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
    dispatch({ type: 'FETCH_FRIENDS_REQ_OUT', payload: user.id });
    dispatch({ type: 'FETCH_FRIENDS_REQ_IN', payload: user.id });
    dispatch({ type: 'FETCH_FRIENDS_ACC', payload: user.id });
  }

  render() {
    const { friends, search, dispatch } = this.props;
    return (
      <>
        <div className='content'>
          <input
            value={this.state.val}
            onChange={e =>{
              this.setState({ val: e.target.value });
              if(e.target.value) {
                dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: e.target.value });
              } else {
                return;
              }
            }}
            autoComplete='off'
            placeholder='Find new gamers...'
            name='search'
            list='search-results'
          />
          <ul id='search-results'>
            {
              search.map((user, i) =>
                <div
                  key={i}
                >
                  <div className='search-result'>
                    {user.fullname}<br />
                    @{user.username}
                  </div>
                  <div className='button green' onClick={() => {
                    dispatch({ type: 'FRIEND_REQ_SEND', payload: { id: user.id } });
                    this.setState({ val: '' });
                  }}>
                    <div className='shine'>
                    </div>Add Friend
                  </div>
                </div>
              )
            }
          </ul>
          {friends && <div className='content friends'>
            <div className='friend-lists'>
              <ul>
                <h2>Outgoing Requests</h2>
                {friends.req_out.map((friend, i) =>
                  <div key={i}>
                    <div className='divider'></div>
                    <h4>{friend[0]}</h4>
                    <div className='button red' onClick={() => {
                      dispatch({ type: 'FRIEND_REQ_CANCEL', payload: { id: friend[1] } });
                    }}>
                      <div className='shine'>
                      </div>Cancel
                    </div>
                  </div>
                )}
              </ul>
            </div>
            <div className='friend-lists'>
              <ul>
                <h2>Incoming Requests</h2>
                {friends.req_in.map((friend, i) =>
                  <div key={i}>
                    <div className='divider'></div>
                    <h4>{friend[0]}</h4>
                    <div className='button green' onClick={() => {
                      dispatch({ type: 'FRIEND_REQ_ACCEPT', payload: { id: friend[1] } });
                    }}>
                      <div className='shine'>
                      </div>Accept
                    </div>
                    <div className='button red' onClick={() => {
                      dispatch({ type: 'FRIEND_REQ_REJECT', payload: { id: friend[1] } });
                    }}>
                      <div className='shine'>
                      </div>Reject
                    </div>
                  </div>
                )}
              </ul>
            </div>
            <div className='friend-lists'>
              <ul>
                <h2>All Friends</h2>
                {friends.acc.map((friend, i) =>
                  <div key={i}>
                    <div className='divider'></div>
                    <h4>{friend[1]}</h4>
                    {/* <h5><em>@{friend[2]}</em></h5> */}
                    <div className='button red' onClick={() => {
                      dispatch({ type: 'DELETE_FRIEND', payload: { id: friend[0] } });
                    }}>
                      <div className='shine'>
                      </div>Remove
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  friends: state.friends,
  search: state.search,
});

export default connect(mapStateToProps)(withRouter(Friends));