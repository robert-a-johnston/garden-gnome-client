/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
// auth path imports
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
// seed path imports
import SeedIndex from './components/seed/SeedIndex'
import SeedCreate from './components/seed/SeedCreate'
import SeedUpdate from './components/seed/SeedUpdate'
import GardenIndex from './components/garden/GardenIndex'
import SeedShowFavorites from './components/seed/SeedShowFavorites'
import SeedShowVegetables from './components/seed/SeedShowVegetables'
// weather and footer paths
import Weather from './components/Weather/Weather'
import Footer from './components/Footer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // sets state of user on sign in
  setUser = (user) => this.setState({ user })

  // removes user state on sign out
  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  // creates message for app
  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <>
        <h1>Garden Gnome</h1>
        <Fragment>
          <Header user={user} />
          <Footer/>
          {msgAlerts.map((msgAlert) => (
            <AutoDismissAlert
              key={msgAlert.id}
              heading={msgAlert.heading}
              variant={msgAlert.variant}
              message={msgAlert.message}
              id={msgAlert.id}
              deleteAlert={this.deleteAlert} />
          ))}
          <main className='container'>
            <Route
              path='/sign-up'
              render={() => (
                <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
              )} />
            <Route
              path='/sign-in'
              render={() => (
                <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
              )} />
            <AuthenticatedRoute
              user={user}
              path='/sign-out'
              render={() => (
                <SignOut
                  msgAlert={this.msgAlert}
                  clearUser={this.clearUser}
                  user={user} />
              )} />
            <AuthenticatedRoute
              user={user}
              path='/change-password'
              render={() => (
                <ChangePassword msgAlert={this.msgAlert} user={user} />
              )} />
            {/* CRUD seed routes */}
            <AuthenticatedRoute
              user={user}
              exact path='/show-seeds'
              render={() => <SeedIndex msgAlert={this.msgAlert} user={user} />} />
            <AuthenticatedRoute
              user={user}
              exact path='/create-seed'
              render={() => <SeedCreate msgAlert={this.msgAlert} user={user} />} />
            <AuthenticatedRoute
              user={user}
              path='/update-seed/:id'
              render={() => <SeedUpdate msgAlert={this.msgAlert} user={user} />} />
            {/* sorting routes */}
            <AuthenticatedRoute
              user={user}
              exact path='/garden'
              render={() => <GardenIndex msgAlert={this.msgAlert} user={user} />} />
            <AuthenticatedRoute
              user={user}
              exact path='/favorites'
              render={() => <SeedShowFavorites msgAlert={this.msgAlert} user={user} />} />
            <AuthenticatedRoute
              user={user}
              exact path='/vegetables'
              render={() => <SeedShowVegetables msgAlert={this.msgAlert} user={user} />} />
            {/* Weather component route */}
            <AuthenticatedRoute
              user={user}
              exact path='/weather'
              render={() => <Weather msgAlert={this.msgAlert} user={user} />} />
          </main>
        </Fragment></>
    )
  }
}

export default App
