import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import './Settings.css';

class Settings extends Component {
  state = {
    
  }

  closeAccountPopup() {
    Swal.fire({
      title: 'Delete Account?',
      text: "This cannot be undone. Proceed with caution!",
      icon: 'warning',
      input: 'checkbox',
      inputPlaceholder: 'I understand the consequences',
      showCancelButton: true,
      confirmButtonColor: '#498b43',
      cancelButtonColor: '#cf4343',
      confirmButtonText: 'Delete Forever',

      background: '#21252c',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Your account has been closed.',
          text: 'Thank you for using Qord!',
          icon: 'success',
          background: '#21252c',
          timer: 4000,
        }).then(result => {
          this.props.dispatch({ type: 'DELETE_USER' });
          this.props.dispatch({ type: 'LOGOUT' });
        });
      } else if (!result.value) {
        Swal.fire({
          title: 'Your account is safe!',
          text: 'Continue as you were, gamer.',
          background: '#21252c',
          showConfirmButton: false,
          timer: 3500,
        });
      }
    });
  }

  render() {
    return (
      <>
        <div className='content'>
          {/* <p>This is the settings page!</p> */}
          <div className='content-settings'>
            <div className='button red' onClick={() => {
              this.closeAccountPopup();
            }}>
              <div className='shine'>
              </div>Delete Account
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Settings);