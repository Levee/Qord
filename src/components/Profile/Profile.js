import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css';

class Profile extends Component {
  state = {
    fullname: '',
    username: '',
    bio: '',
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <div className='content profile'>
          <h2 className='profile fullname'>{user.fullname}</h2>
          <em><p className='profile username'>@{user.username}</p></em>
          <div className='profile bio'>
            <p>{user.bio}</p>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
