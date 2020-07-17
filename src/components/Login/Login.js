import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home');
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className='content'>
        <form onSubmit={this.login}>
          {this.props.errors.loginMessage && (
            <h4
              className='alert'
              role='alert'
            >
              {this.props.errors.loginMessage}
            </h4>
          )}
          <h1>Login</h1>
          <div>
            <label htmlFor='username'>
              Username:
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor='password'>
              Password:
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <center>
            <div className='button green'>
              <div className='shine'>
              </div>
              <input
                style={{ all: 'unset', width: '100%', height: '100%' }}
                className='log-in'
                type='submit'
                name='submit'
                value='Login'
              />
            </div>
          </center>
        </form>
        <center>
          <button
            type='button'
            className='link-button'
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user.user,
});

export default connect(mapStateToProps)(withRouter(Login));
