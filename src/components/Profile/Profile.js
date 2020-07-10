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
    const { user, dispatch } = this.props;
    return (
      <>
        <div className='content profile'>
          <h2 className='profile fullname'>{user.fullname}</h2>
          <em><p className='profile username'>@{user.username}</p></em>
          {!this.state.editBio ? (
            <>
              <div className='profile bio' /* onMouseEnter={() => this.setState({ editBio: true })} */>
                {user.bio}
              </div>
              <div className='button pink' onClick={() => {
                this.setState({ editBio: true });
                this.setState({
                  fullname: user.fullname,
                  username: user.username,
                  bio: user.bio,
                })
              }}>
                <div className='shine'>
                </div>Edit
              </div>
            </>
          ) : (
            <>
              <textarea
                className='profile bio edit'
                value={this.state.bio}
                maxLength='200'
                onChange={(e) => this.setState({ bio: e.target.value })}
                autoFocus={true}
                // style={{whiteSpace: 'pre-wrap'}}
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
                dispatch({ type: 'UPDATE_USER', payload: {bio: this.state.bio }});
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
