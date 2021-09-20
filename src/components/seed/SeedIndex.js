import React from 'react'
import { withRouter } from 'react-router-dom'
import { indexSeeds, deleteSeed } from '../../api/seed'
import { showIndexFailure, showDeleteSeedSuccess, showDeleteSeedFailure } from '../AutoDismissAlert/messages'
// import Card from 'react-bootstrap/Card'
// import { ListGroup, ListGroupItem, Container } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
import SeedShowCard from './SeedShowCard'

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
  // button on SeedShowCard
  handleDeleteSeed = (event) => {
    const { user, msgAlert } = this.props
    const id = event.target.id
    // api call delete seed from database
    deleteSeed(id, user)
    // show seeds after delete
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
        <SeedShowCard
          key={seed.id}
          id={seed.id}
          name={seed.name}
          type={seed.type}
          season={seed.season}
          light={seed.light}
          favorite={seed.favorite}
          planted={seed.planted}
          number={seed.number}
          notes={seed.notes}
          handleDeleteSeed={this.handleDeleteSeed}
        />
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
