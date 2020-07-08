import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import './App.css';
import Footer from '../Footer/Footer';
import Landing from '../Landing/Landing';
import Home from '../Home/Home';
import Friends from '../Friends/Friends';
import Games from '../Games/Games';
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from='/' to='/landing' />

            <ProtectedRoute
              exact
              path='/landing'
              component={Landing}
            />
            <ProtectedRoute
              exact
              path='/home'
              component={Home}
            />
            <ProtectedRoute
              exact
              path='/friends'
              component={Friends}
            />
            <ProtectedRoute
              exact
              path='/games'
              component={Games}
            />
            <ProtectedRoute
              exact
              path='/profile'
              component={Profile}
            />
            <ProtectedRoute
              exact
              path='/settings'
              component={Settings}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
