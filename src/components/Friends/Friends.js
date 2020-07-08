import React, { Component } from 'react';
import { connect } from 'react-redux';

class Friends extends Component {
  state = {
    
  }

  render() {
    return (
      <>
        <div className='content'>
          <p>This is the friends page!</p>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Friends);