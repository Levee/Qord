import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css';

class Profile extends Component {
  state = {
    fullname: '',
    username: '',
    bio: '',
    editBio: false
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <div className='content profile'>
          <h2 className='profile fullname'>{user.fullname}</h2>
          <em><p className='profile username'>@{user.username}</p></em>
          {!this.state.editBio ? (
            <>
              <div className='profile bio' /* onMouseEnter={() => this.setState({ editBio: true })} */>
                <p>{user.bio}</p>
              </div>
              <div className='button pink' onClick={() => {
                this.setState({ editBio: true });

              }}>
                <div className='shine'>
                </div>Edit
              </div>
            </>
          ) : (
            <>
              <textarea
                className='profile bio edit'
                value={user.bio}
                onChange={(e) => this.setState({ bio: e.target.value })}
                autoFocus='true'
              />
              <br />
              <div className='button red' onClick={() => {
                this.setState({ editBio: false });
              }}>
                <div className='shine'>
                </div>Cancel
              </div>
              <div className='button green' onClick={() => {
                this.setState({ editBio: false });

              }}>
                <div className='shine'>
                </div>Save
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
