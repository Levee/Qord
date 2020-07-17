import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import User from '../User/User';

class Friends extends Component {
  state = {
    display_page: false,
  }

  componentDidMount() {
    const { user, dispatch } = this.props
    dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
    dispatch({ type: 'FETCH_FRIENDS_REQ', payload: user.id });
    dispatch({ type: 'FETCH_FRIENDS_ACC', payload: user.id });
  }

  render() {
    const { friends, search, dispatch } = this.props;
    return (
      <>
        <div className='content'>
          <p>This is the friends page!</p>
          <input
            onChange={e =>{
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
          <div id='search-results'>
            {
              search.map((user, i) =>
                <div
                  key={i}
                  // user_id={user.id}
                  // onClick={e => {
                  //   console.log(user);
                  //   dispatch({ type: 'FETCH_USER_PAGE', payload: user.id });
                  //   this.setState({ display_page: true });
                  // }}
                >
                  {user.id}, {user.fullname}<br />
                  @{user.username}<br />
                  <button
                    onClick={() => {
                      dispatch({ type: 'SEND_FRIEND_REQ', payload: { uid1: this.props.user.id, uid2: user.id}})
                    }}
                  >
                    Add Friend
                  </button>
                </div>
              )
            }
          </div>
          {this.state.display_page && <User />}
          {friends &&
          <ul>
            {friends.req.map((friend, i) =>
              <div key={i}>
                <h4>{friend}</h4>
              </div>
            )}
          </ul>
          }
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