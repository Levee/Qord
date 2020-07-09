import React from 'react';
import { connect } from 'react-redux';

const Home = (props) => (
  <div className='content'>
    <h1 id='welcome'>
      Welcome, { props.user.fullname }! Here's what you missed:
    </h1>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
