import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  state = {
    
  }

  render() {
    return (
      <>
        <div className='content'>
          <p>This is the settings page!</p>
          <div className='content-settings'>
            <div className='button red' onClick={() => {
              this.props.dispatch({ type: 'DELETE_USER', payload: this.props.user.id });
            }}>
              <div className='shine'>
              </div>Close Account
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Settings);