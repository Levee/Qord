import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Register.css';

class RegisterPage extends Component {
  state = {
    fullname: '',
    username: '',
    email: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.fullname && this.state.username && this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          fullname: this.state.fullname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        },
      });
      console.log(this.state);
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className='alert'
            role='alert'
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor='fullname'>
              Full Name:
              <input
                type='text'
                name='fullname'
                value={this.state.fullname}
                onChange={this.handleInputChangeFor('fullname')}
                placeholder='Enter your fullname...'
              />
            </label>
          </div>
          <div>
            <label htmlFor='username'>
              Username:
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                placeholder='Enter a username...'
              />
            </label>
          </div>
          <div>
            <label htmlFor='email'>
              Email:
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
                placeholder='Enter your email...'
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
            <div className='button pink'>
              <div className='shine'>
              </div>
              <input
                style={{ all: 'unset', width: '100%', height: '100%' }}
                className='register'
                type='submit'
                name='submit'
                value='Register'
              />
            </div>
          </center>
        </form>
        <center>
          <button
            type='button'
            className='link-button'
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
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
});

export default connect(mapStateToProps)(RegisterPage);

