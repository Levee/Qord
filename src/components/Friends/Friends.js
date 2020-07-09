import React, { Component } from 'react';
import { connect } from 'react-redux';

class Friends extends Component {
  state = {
    
  }

  componentDidMount() {
    const { user } = this.props
    this.props.dispatch({ type: 'FETCH_FRIENDS', payload: user.id });
  }

  render() {
    const { friends } = this.props;
    return (
      <>
        <div className='content'>
          <p>This is the friends page!</p>
          <ul>
            {friends.map((friend, i) =>
              <div key={i}>
                <h4>{friend}</h4>
              </div>
            )}
          </ul>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  friends: state.friends,
});

export default connect(mapStateToProps)(Friends);