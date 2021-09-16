import React from 'react'
import { withRouter } from 'react-router-dom'
// import { indexSeeds } from '../../api/seed'
// import { showIndexFailure, showIndexSuccess } from '../AutoDismissAlert/messages'
// import Card from 'react-bootstrap/Card'
// import { ListGroup, ListGroupItem } from 'react-bootstrap'

// create index of all posts class and constructor with state
class SeedIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seeds: null,
      loading: true
    }
  }

  // occurs on page render first time
  // componentDidMount () {
  //   const { user } = this.props
  //   // API call for index of all posts

  //   indexSeeds(user)
  //     .then((response) =>
  //       this.setState({
  //         seed: response.data.seeds,
  //         loading: false
  //       })
  //     )
  // .then(() =>
  //   msgAlert({
  //     heading: 'Index Success',
  //     message: showIndexSuccess,
  //     variant: 'success'
  //   })
  // )
  // .catch(() =>
  //   msgAlert({
  //     heading: 'Index Fail',
  //     message: showIndexFailure,
  //     variant: 'danger'
  //   })
  // )
  // }

  render () {
    // if statement handles the issue when state is null
    // cannot handle initial render with null.
    // if (this.state.seeds === null) {
    //   return 'loading...'
    // }
    // // variable to save array.map()
    // if (this.seeds === null) {
    //   <h3>No seeds</h3>
    // }

    // // create list of seeds
    // const seedsJsx = this.state.seeds.map((seed) => (
    //   <li key={seed._id}>
    //     <Card style={{ width: '18rem' }}>
    //       <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    //       <Card.Body>
    //         <Card.Title>{seed.name}</Card.Title>
    //         <Card.Text>
    //         </Card.Text>
    //       </Card.Body>
    //       <ListGroup className="list-group-flush">
    //         <ListGroupItem>Cras justo odio</ListGroupItem>
    //         <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
    //         <ListGroupItem>Vestibulum at eros</ListGroupItem>
    //       </ListGroup>
    //       <Card.Body>
    //         <Card.Link href="#">Card Link</Card.Link>
    //         <Card.Link href="#">Another Link</Card.Link>
    //       </Card.Body>
    //     </Card>
    //     <br />
    //   </li>
    // ))

    return (
      <div>
        something
        {/* display posts */}
        {/* <ul>{seedsJsx.reverse()}</ul> */}
      </div>
    )
  }
}

export default withRouter(SeedIndex)
