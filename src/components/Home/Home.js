import React from 'react';
import { connect } from 'react-redux';

const features = [
  'Ability to visit other user\'s pages',
  'Ability to block users from viewing your profile or posts',
  'Forum system similar to Reddit',
  'Ability to change your password',
  'Add more site settings like light or dark mode',
  'Support for user avatars, as well as the ability to change them',
];

const Home = (props) => (
  <div className='content'>
    <h1 id='welcome'>
      Welcome, { props.user.fullname }! Here's what you missed:
    </h1>
    <h2>Future Features:</h2>
    <ul style={{listStyle: 'none'}}>
      {
        features.map((feature, i) =>
          <><li key={i}><big>{feature}</big></li><br /></>
        )
      }
    </ul>
  </div>
);

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Home);
