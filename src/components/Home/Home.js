import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';

// const features = [
//   'Ability to visit other user\'s pages',
//   'Ability to block users from viewing your profile or posts',
//   'Forum system similar to Reddit',
//   'Ability to change your password',
//   'Add more site settings like light or dark mode',
//   'Support for user avatars, as well as the ability to change them',
// ];

class Home extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_LIBRARY' });
  }

  render() {
    const { user, library, dispatch } = this.props;
    return (
      <div className='content'>
        <h1 id='welcome'>
          Welcome, {user.fullname}! Here's what is currently in your library:
        </h1>
            {/* <h2>Future Features:</h2>
        <ul style={{listStyle: 'none'}}>
          {
            features.map((feature, i) =>
              <><li key={i}><big>{feature}</big></li><br /></>
            )
          }
        </ul> */}
        <div className='content library'>
          {library !== [] ? (
            <>
              {library.map((game, i) =>
                <>
                  <div key={i} className='library game'>
                    <h2>{game.title}</h2>
                    <em>Developed by {game.developers}<br />
                    Published by {game.publishers}</em><br />
                    <p>
                      {game.description}
                    </p>
                  </div>
                  <div className='divider'></div>
                </>
              )}
            </>
          ) : (
            <h2>No games to show. Add your favorites in the Games tab!</h2>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  library: state.library.library,
});

export default connect(mapStateToProps)(Home);
