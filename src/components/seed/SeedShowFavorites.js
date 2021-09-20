import React from 'react'
import { withRouter } from 'react-router-dom'
import { indexSeeds, deleteSeed } from '../../api/seed'
import { showIndexFailure, showDeleteSeedSuccess, showDeleteSeedFailure } from '../AutoDismissAlert/messages'
import SeedShowCard from './SeedShowCard'

// create index of all seed class and constructor with state
// also deletes seeds and sends to update seed page
class SeedShowFavorites extends React.Component {
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

    // creates array of seeds filtered by favorite attribute
    const filteredSeedsJsx = this.state.seeds.filter((seed) => seed.favorite === true)
    // displays array of filtered seeds
    const favoriteSeedsJsx = filteredSeedsJsx.map((seed) => (
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
      <div className='favorite-list'>
        <h2>Your Favorite Seeds</h2>
        {/* display seeds with last entry first */}
        <div>
          <ul className='d-flex flex-wrap align-content-center list-unstyled'>{favoriteSeedsJsx.reverse()}</ul>
        </div>
      </div>
    )
  }
}

export default withRouter(SeedShowFavorites)
