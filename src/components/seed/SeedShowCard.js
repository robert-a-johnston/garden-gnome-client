import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// card for displaying seed information
// used in SeedIndex and GardenIndex
const SeedShowCard = ({ id, name, type, season, light, favorite, planted, number, notes, handleDeleteSeed }) => (
  <Card
    style={{ width: '18rem' }}
    bg='success'>
    <Card.Body>
      <Container className='d-flex flex-direction-row justify-content-evenly'>
        <div style={ { color: 'yellow' } }>{ favorite === true ? <Card.Text>Favorite</Card.Text> : <p></p>}</div>
        <div style={ { color: 'brown' } }>{ planted === true ? <Card.Text>Planted</Card.Text> : <p></p>}</div>
      </Container>
      <Card.Title style={ { fontWeight: 'bold' } }>{name}</Card.Title>
      <Card.Text>Notes: {notes}</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Type: {type}</ListGroupItem>
      <ListGroupItem>Season: {season}</ListGroupItem>
      <ListGroupItem>Light: {light}</ListGroupItem>
      <ListGroupItem>Number: {number}</ListGroupItem>
    </ListGroup>
    <Card.Body>
      <Link
        to={`/update-seed/${id}`}
        className='btn btn-sm'>
              Update Seed Info
      </Link>
      <Button
        variant='custom'
        size='sm'
        id={id}
        onClick={handleDeleteSeed}>
              Delete Seed
      </Button>
    </Card.Body>
  </Card>
)
export default SeedShowCard
