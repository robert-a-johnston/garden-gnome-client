import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createSeed } from '../../api/seed'
import { showCreateSeedSuccess, showCreateSeedFailure } from '../AutoDismissAlert/messages'
import SeedCreateUpdateForm from './SeedCreateUpdateForm'

// create create seed class, constructor and state
class CreateSeed extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      type: '',
      season: '',
      light: '',
      favorite: false,
      planted: false,
      number: 0,
      notes: ''
    }
  }

    // changes state of input values
    handleChange = (event) =>
      this.setState({
        [event.target.name]: event.target.value
      })

    // handles change of state on check-boxes
    handleClick = (event) =>
      this.setState({
        [event.target.name]: event.target.checked
      })

    // handles change of state on number of seeds
    handleNumberChange = (event) =>
      this.setState({
        [event.target.name]: parseInt(event.target.value)
      })

    // creates seed on form button click
    onCreateSeed = (event) => {
      // prevent page refresh
      event.preventDefault()
      // destructuring props for use later
      const { msgAlert, history, user } = this.props
      // create seed API call
      createSeed(this.state, user)
        .then(() =>
          msgAlert({
            heading: 'Seed Created',
            message: showCreateSeedSuccess,
            variant: 'success'
          })
        )
      // redirect to after seed created
        .then((res) => history.push('/show-seeds'))
        // error catch
        .catch((error) => {
          this.setState({ name: '', type: '', season: '', light: '', favorite: false, planted: false, number: 0, notes: '' })
          msgAlert({
            heading: 'Failed with error: ' + error.message,
            message: showCreateSeedFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      // destructuring state for later use
      const { name, notes, favorite, planted, type, light, season, number } = this.state
      // create create seed form
      return (
        <>
          <div className='row' id='showSeed'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              <center>
                <h2 className='register'>Create Seed</h2>
                <SeedCreateUpdateForm
                  name={name}
                  notes={notes}
                  favorite={favorite}
                  planted={planted}
                  type={type}
                  light={light}
                  season={season}
                  number={number}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  handleNumberChange={this.handleNumberChange}
                  onCreateSeed={this.onCreateSeed}
                />
              </center>
            </div>
          </div>
        </>
      )
    }
}

export default withRouter(CreateSeed)
