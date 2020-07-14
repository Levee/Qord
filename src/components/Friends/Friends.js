import React, { Component } from 'react';
import { connect } from 'react-redux';

class Friends extends Component {
  componentDidMount() {
    const { user } = this.props
    this.props.dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
    this.props.dispatch({ type: 'FETCH_FRIENDS_REQ', payload: user.id });
    this.props.dispatch({ type: 'FETCH_FRIENDS_ACC', payload: user.id });
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
          <datalist id='search-results'>
            {
              search.map((user, i) =>
                <option
                  key={i}
                  user_id={user.id}
                  value={user.fullname}
                >
                  @{user.username}
                </option>
              )
            }
          </datalist>
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
  user: state.user,
  friends: state.friends,
  search: state.search,
});

export default connect(mapStateToProps)(Friends);