import React, { Component } from 'react';
import News from '../News/News';

class Games extends Component {
  state = {
    
  }

  render() {
    return (
      <>
        <div className='content'>
          <p>This is the games page!</p>
          <News />
        </div>
      </>
    )
  }
}

export default Games;