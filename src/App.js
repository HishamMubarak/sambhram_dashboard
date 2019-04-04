import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Header from './Components/Header'
import Main from './Components/Main'
import Auth from './Pages/Auth'

import axios from 'axios'
import { URL } from './Config/env'
axios.defaults.baseURL = URL 

class App extends Component {
  render() {
    if(this.props.auth._id) {
      return (
        <React.Fragment>
          <Header />
          <Main />
        </React.Fragment>
      )
    } else {
      return <Route path='/' component={Auth} />
    }
  }
}

const mapStateToProps = state => {
  return {
    auth:state.auth
  }
}

export default withRouter(connect(mapStateToProps)(App));
