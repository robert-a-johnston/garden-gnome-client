import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// API request
import { updateSeed, showSeed } from '../../api/seed'
import { showUpdateSeedSuccess, showUpdateSeedFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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

    // changes state of checkboxes favorite, planted
    handleClick = (event) => {
      const userInput = { [event.target.name]: event.target.checked }
      this.setState(currState => {
        return { seed: { ...currState.seed, ...userInput } }
      })
    }

    // changes number of seeds int
    handleNumberChange = (event) =>
      this.setState({
        [event.target.name]: event.target.value
      })

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
                <h3 className='register'>Update Seed Information</h3>
              </center>
              <Form onSubmit={this.onUpdateSeed}>
                <Form.Group className='mb-3' id='formGridCheckbox'>
                  <Form.Check
                    inline
                    name='favorite'
                    type='checkbox'
                    label='Favorite'
                    checked={favorite}
                    onClick={this.handleClick}/>
                  <Form.Check
                    inline
                    name='planted'
                    type='checkbox'
                    label='Planted'
                    checked={planted}
                    onClick={this.handleClick}/>
                </Form.Group>
                <Form.Group controlId='title'>
                  <Form.Label>Seed Name :</Form.Label>
                  <Form.Control
                    required
                    name='name'
                    value={name}
                    placeholder='Seed Name'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br/>
                <Form.Control
                  name='type'
                  value={type}
                  as='select'
                  onChange={this.handleChange}>
                  <option>Select Seed Type</option>
                  <option value='Flower'>Flower</option>
                  <option value='Vegetable'>Vegetable</option>
                  <option value='Fruit'>Fruit</option>
                </Form.Control>
                <br/>
                <Form.Control
                  name='light'
                  value={light}
                  as='select'
                  onChange={this.handleChange}>
                  <option>Select Amount of Light Needed</option>
                  <option value='Full Sun'>Full Sun</option>
                  <option value='Partial Shade'>Partial Shade</option>
                  <option value='Full Shade'>Full Shade</option>
                </Form.Control>
                <br/>
                <Form.Control
                  name='season'
                  value={season}
                  as='select'
                  onChange={this.handleChange}>
                  <option>Select Season to Plant</option>
                  <option value='Winter'>Winter</option>
                  <option value='Spring'>Spring</option>
                  <option value='Summer'>Summer</option>
                  <option value='Fall'>Fall</option>
                </Form.Control>
                <br/>
                <Form.Group controlId='number'>
                  <Form.Label>Number of Seeds</Form.Label>
                  <Form.Control
                    name='number'
                    type='number'
                    min='0'
                    value={number}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId='content'>
                  <Form.Label>Notes :</Form.Label>
                  <Form.Control
                    name='notes'
                    value={notes}
                    placeholder='Notes'
                    as='textarea'
                    rows={4}
                    onChange={this.handleChange}
                  />
                  <br/>
                </Form.Group>
                <div className='d-grid gap-2 col-6 mx-auto'>
                  <Button variant='btn btn-secondary' type='submit'>
                    Submit
                  </Button>
                </div>
                <Link to={'/show-seeds'} className="btn">Cancel</Link>
              </Form>
            </div>
          </div>
        </>
      )
    }
}

export default withRouter(SeedUpdate)
