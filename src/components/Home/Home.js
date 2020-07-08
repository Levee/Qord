import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

const Home = (props) => (
  <div className='content'>
    <h1 id='welcome'>
      Welcome, { props.user.fullname }!
    </h1>
    <LogOutButton className='log-in' />
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
