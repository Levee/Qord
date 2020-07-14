import React, { Component } from 'react';

class Landing extends Component {
  state = {
    
  }

  render() {
    return (
      <>
        <div className='content'>
          <p>This is the front page of Qord! Sign up and join the gamer army.</p>
        </div>
        <div className='button pink' onClick={() => {
          this.props.history.push('/home');
        }}>
          <div className='shine'>
          </div>Sign Up Now
        </div>
      </>
    )
  }
}

export default Landing;
