import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateSeed, showSeed } from '../../api/seed'
import { showUpdateSeedSuccess, showUpdateSeedFailure } from '../AutoDismissAlert/messages'
import SeedCreateUpdateForm from './SeedCreateUpdateForm'
// create class for update seed with constructor and state
class SeedUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      seed: {
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
  }

  // on page load
  componentDidMount () {
    // destructuring props for later use
    const { match, user, msgAlert } = this.props
    // show seed API call
    showSeed(match.params.id, user)
      // sets new state of seed
      .then(res => this.setState({ seed: res.data.seed }))
      .catch(err => msgAlert({
        heading: 'Show Seed failed :(',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  // handles state change for input
  handleChange = (event) => {
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      // "Spread" out current seed state key/value pairs
      return { seed: { ...currState.seed, ...userInput } }
    })
  }

    // changes state of checkboxes favorite and planted
    handleClick = (event) => {
      const userInput = { [event.target.name]: event.target.checked }
      this.setState(currState => {
        return { seed: { ...currState.seed, ...userInput } }
      })
    }

    // changes number of seeds int
    handleNumberChange = (event) => {
      const userInput = { [event.target.name]: parseInt(event.target.value) }
      this.setState(currState => {
      // "Spread" out current seed state key/value pairs
        return { seed: { ...currState.seed, ...userInput } }
      })
    }

    // updates seed on click
    onUpdateSeed = (event) => {
      // prevent page reload
      event.preventDefault()
      // destructuring props for later use
      const { user, msgAlert, history, match } = this.props
      // updateSeed API call
      updateSeed(this.state.seed, match.params.id, user)
        .then(() => msgAlert({
          heading: 'Seed Updated!',
          message: showUpdateSeedSuccess,
          variant: 'success'
        }))
        .then(res => history.push('/show-seeds'))
        .catch(() => {
          msgAlert({
            heading: 'Seed update failed :(',
            message: showUpdateSeedFailure,
            variant: 'danger'
          })
        })
    }

    render () {
      // destructuring state for later use
      const { name, notes, favorite, planted, type, light, season, number } = this.state.seed
      // create create seed form
      return (
        <>
          <div className='row' id='showSeed'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
              <center>
                <h2>Update Seed Information</h2>
              </center>
              {console.log('pl, fa ', planted, favorite)}
              <center>
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
                  onCreateSeed={this.onUpdateSeed}
                />
              </center>
            </div>
          </div>
        </>
      )
    }
}

export default withRouter(SeedUpdate)
