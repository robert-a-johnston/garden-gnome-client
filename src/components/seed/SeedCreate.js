import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createSeed } from '../../api/seed'
import { showCreateSeedSuccess, showCreateSeedFailure } from '../AutoDismissAlert/messages'

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
                <Form onSubmit={this.onCreateSeed}>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check
                      inline
                      name='favorite'
                      type='checkbox'
                      label='Favorite'
                      value={favorite}
                      onClick={this.handleClick}/>
                    <Form.Check
                      inline
                      type='checkbox'
                      label='Planted'
                      value={planted}
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
                  <Link to={'/show-seeds'} className="btn btn-secondary">Cancel</Link>
                </Form>
              </center>
            </div>
          </div>
        </>
      )
    }
}

export default withRouter(CreateSeed)
