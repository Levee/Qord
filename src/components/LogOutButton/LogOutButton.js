import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const LogOutButton = props => (
  <button
    className={props.className}
    onClick={() => {
      props.dispatch({ type: 'LOGOUT' });
      props.history.push('/home');
    }}
  >
    logout
  </button>
);

export default connect()(withRouter(LogOutButton));
