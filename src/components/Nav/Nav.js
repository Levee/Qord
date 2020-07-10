import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <NavLink to="/landing">
      <h2 className="nav-title">Qord</h2>
    </NavLink>
    <div className="nav-right">
      {props.user.id && <NavLink activeClassName='active-nav-link' className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        home
      </NavLink>}
      {!props.user.id && <NavLink activeClassName='active-nav-link' className='nav-link' to='/home'>
        login
      </NavLink>}
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <NavLink activeClassName='active-nav-link' className='nav-link' to='/friends'>
            friends
          </NavLink>
          <NavLink activeClassName='active-nav-link' className='nav-link' to='/games'>
            games
          </NavLink>
          <NavLink activeClassName='active-nav-link' className='nav-link' to='/profile'>
            profile
          </NavLink>
          <NavLink activeClassName='active-nav-link' className='nav-link' to='/settings'>
            settings
          </NavLink>
          <LogOutButton className="nav-link"/>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
