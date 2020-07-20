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
            className='friend-search'
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
          {search.length !== 0 ? <ul id='search-results'>
            {
              search.map((user, i) =>
                <div
                  key={i}
                >
                  <div className='divider'></div>
                  <div className='search-result'>
                    {user.fullname}<br />
                    <em>@{user.username}</em>
                  </div>
                  {/* <div className='button green' onClick={() => {
                    dispatch({ type: 'FRIEND_REQ_SEND', payload: { id: user.id } });
                    this.setState({ val: '' });
                  }}>
                    <div className='shine'>
                    </div>Add Friend
                  </div> */}
                  <svg
                    width="1.25rem"
                    height="1.25rem"
                    viewBox="0 0 16 16"
                    className="icon button pink"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      dispatch({ type: 'FRIEND_REQ_SEND', payload: { id: user.id } });
                      this.setState({ val: '' });
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
                    />
                  </svg>
                  <svg
                    width="1.25rem"
                    height="1.25rem"
                    viewBox="0 0 16 16"
                    className="icon button blue"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {

                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </div>
              )
            }
          </ul> : <></>}
          {friends && <div className='content friends'>
            <div className='friend-lists'>
              <ul>
                <h2>Outgoing Requests</h2>
                {friends.req_out.map((friend, i) =>
                  <div key={i}>
                    <div className='divider'></div>
                    <h4>{friend[0]}</h4>
                    {/* <div className='button red' onClick={() => {
                      dispatch({ type: 'FRIEND_REQ_CANCEL', payload: { id: friend[1] } });
                    }}>
                      <div className='shine'>
                      </div>Cancel
                    </div> */}
                    <svg
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 16 16"
                      className="icon button red"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        dispatch({ type: 'FRIEND_REQ_CANCEL', payload: { id: friend[1] } });
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                      />
                    </svg>
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
                    {/* <div className='button green' onClick={() => {
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
                    </div> */}
                    <svg
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 16 16"
                      className="icon button red"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        dispatch({ type: 'FRIEND_REQ_REJECT', payload: { id: friend[1] } });
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                      />
                    </svg>
                    <svg
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 16 16"
                      className="icon button green"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        dispatch({ type: 'FRIEND_REQ_ACCEPT', payload: { id: friend[1] } });
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                      />
                    </svg>
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
                    {/* <div className='button red' onClick={() => {
                      dispatch({ type: 'DELETE_FRIEND', payload: { id: friend[0] } });
                    }}>
                      <div className='shine'>
                      </div>Remove
                    </div> */}
                    <svg
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 16 16"
                      className="icon button red"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        dispatch({ type: 'DELETE_FRIEND', payload: { id: friend[0] } });
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5-.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
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