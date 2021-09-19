import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// form for creating and updating seeds
// used in SeedCreate and SeedUpdate
const SeedCreateUpdateForm = ({
  name, type, season, light, favorite, planted, number,
  notes, onCreateSeed, handleClick, handleChange, handleNumberChange
}) => (
  <Form onSubmit={onCreateSeed}>
    {console.log('pl, fa form', planted, favorite)}
    <Form.Group className='mb-3' id='formGridCheckbox'>
      <Form.Check
        inline
        name='favorite'
        type='checkbox'
        label='Favorite'
        value={favorite}
        onClick={handleClick}/>
      <Form.Check
        inline
        name='planted'
        type='checkbox'
        label='Planted'
        value={planted}
        onClick={handleClick}/>
    </Form.Group>
    <Form.Group controlId='title'>
      <Form.Label>Seed Name :</Form.Label>
      <Form.Control
        required
        name='name'
        value={name}
        placeholder='Seed Name'
        onChange={handleChange}
      />
    </Form.Group>
    <br/>
    <Form.Control
      name='type'
      value={type}
      as='select'
      onChange={handleChange}>
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
      onChange={handleChange}>
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
      onChange={handleChange}>
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
        onChange={handleNumberChange}
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
        onChange={handleChange}
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
)
export default SeedCreateUpdateForm
