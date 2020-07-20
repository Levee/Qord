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
                <div key={i}>
                  <div className='library game'>
                    <h2>{game.title}</h2>

                    {/* <div className='button red' onClick={() => {

                    }}>
                      <div className='shine'>
                      </div>Remove
                    </div>
                    <div className='button green' onClick={() => {

                    }}>
                      <div className='shine'>
                      </div>News
                    </div><br /> */}
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 16 16"
                      className="icon button red"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                    <svg
                      width="1.5rem"
                      height="1.5rem"
                      viewBox="0 0 16 16"
                      className="icon button pink"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M0 2A1.5 1.5 0 0 1 1.5.5h11A1.5 1.5 0 0 1 14 2v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 14V2zm1.5-.5A.5.5 0 0 0 1 2v12a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V2a.5.5 0 0 0-.5-.5h-11z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.5 3a.5.5 0 0 1 .5.5V14a1.5 1.5 0 0 1-1.5 1.5h-3v-1h3a.5.5 0 0 0 .5-.5V3.5a.5.5 0 0 1 .5-.5z"
                      />
                      <path
                        d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"
                      />
                    </svg><br />

                    <em className='line'>Developed by {game.developers}</em><br />
                    <em>Published by {game.publishers}</em><br />
                    <p>
                      {game.description}
                    </p>
                  </div>
                  <div className='divider'></div>
                </div>
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
