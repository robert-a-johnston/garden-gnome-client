import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { indexSeeds, deleteSeed } from '../../api/seed'
import { showIndexFailure, showDeleteSeedSuccess, showDeleteSeedFailure } from '../AutoDismissAlert/messages'
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './SeedIndex.css'

// create index of all seed class and constructor with state
// also deletes seeds and sends to update seed page
class SeedIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seeds: [],
      loading: true
    }
  }

  // occurs on page render first time
  componentDidMount () {
    const { user, msgAlert } = this.props
    // API call for index of all seeds
    indexSeeds(user)
      .then((response) =>
        this.setState({
          seeds: response.data.seeds,
          loading: false
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Index Fail',
          message: showIndexFailure,
          variant: 'danger'
        })
      )
  }

  // deletes seed on button click
  handleDeleteSeed = (event) => {
    const { user, msgAlert } = this.props
    const id = event.target.id
    deleteSeed(id, user)
    // Redirect to the list of seeds
    // .then(() => history.push('/show-seeds/'))
    indexSeeds(user)
      .then((response) =>
        this.setState({
          seeds: response.data.seeds,
          loading: false
        })
      )
      .then(() =>
        msgAlert({
          heading: 'Deleted seed successfully',
          message: showDeleteSeedSuccess,
          variant: 'success'
        })
      )
      .catch(() =>
        msgAlert({
          heading: 'Delete seed failed :(',
          message: showDeleteSeedFailure,
          variant: 'danger'
        })
      )
  }

  render () {
    // if statement handles the issue when state is null
    // cannot handle initial render with null.
    if (this.state.seeds === null) {
      return 'loading...'
    }
    if (this.state.seeds.length === 0) {
      <h3>No seeds</h3>
    }

    // create list of seeds
    const seedsJsx = this.state.seeds.map((seed) => (
      <li key={seed.id}>
        <Form.Group className='mb-3' id='formGridCheckbox'>
          <Form.Check
            inline
            name='favorite'
            type='checkbox'
            label='Favorite'
            checked={seed.favorite}
            readOnly={true}/>
          <Form.Check
            inline
            name='planted'
            type='checkbox'
            label='Planted'
            checked={seed.planted}
            readOnly={true}/>
        </Form.Group>
        <Card
          style={{ width: '18rem' }}
          bg='success'>
          <Card.Body>
            <Card.Title>{seed.name}</Card.Title>
            <Card.Text>Notes: {seed.notes}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Type: {seed.type}</ListGroupItem>
            <ListGroupItem>Season: {seed.season}</ListGroupItem>
            <ListGroupItem>Light: {seed.light}</ListGroupItem>
            <ListGroupItem>Number: {seed.number}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Link
              to={`/update-seed/${seed.id}`}
              className='btn btn-sm'>
              Update Seed Info
            </Link>
            <Button
              variant='custom'
              size='sm'
              id={seed.id}
              onClick={this.handleDeleteSeed}>
              Delete Seed
            </Button>
          </Card.Body>
        </Card>
      </li>
    ))

    return (
      <div className='list'>
        {/* display seeds with last entry first */}
        <ul className='d-flex flex-wrap align-content-center list-unstyled'>{seedsJsx.reverse()}</ul>
      </div>
    )
  }
}

export default withRouter(SeedIndex)
