import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
  render() {
    const { page } = this.props;
    return (
      <>
        <div className='content profile'>
          <h2 className='profile fullname'>{page.fullname}</h2>
          <em><p className='profile username'>@{page.username}</p></em>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  page: state.user.page,
});

export default connect(mapStateToProps)(User);