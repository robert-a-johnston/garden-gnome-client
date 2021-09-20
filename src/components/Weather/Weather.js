import React, { Component } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { showWeatherFailure } from '../AutoDismissAlert/messages'
import './StyleWeather.css'
// import axios from 'axios'
import { showWeather } from '../../api/weather'
// gets local weather with city and state
class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: '',
      state: '',
      location: null,
      country: null,
      temperature: null,
      humidity: null,
      conditions: ''
    }
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
    })

  // gets weather for city and state input
  onGetWeather = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    const { city, state } = this.state
    // weather api call
    showWeather(city, state)
      .then(res => this.setState({
        location: res.data.name,
        country: res.data.sys.country,
        temperature: res.data.main.temp,
        humidity: res.data.main.humidity,
        conditions: res.data.weather[0].description,
        viewport: {
          latitude: res.data.coord.lat,
          longitude: res.data.coord.lon
        }
      })
      )
      .catch(() =>
        msgAlert({
          heading: 'Index Fail',
          message: showWeatherFailure,
          variant: 'danger'
        })
      )
  }

  render () {
    const { city, state, location, country, temperature, humidity, conditions } = this.state
    return (
      <>

        <div className='weatherRow'>
          <div className='weatherForm'>
            <Form onSubmit={this.onGetWeather}>
              <Form.Group controlId='weather'>
                <Form.Control
                  required
                  type='text'
                  name='city'
                  value={city}
                  placeholder='City'
                  onChange={this.handleChange}
                /><br></br>
              </Form.Group>
              <Form.Group controlId='state'>
                <Form.Control
                  name='state'
                  value={state}
                  type='text'
                  placeholder='Full State Name, No Abbreviations'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>Get Weather</Button>
            </Form>
          </div>
          <div className='tableContainer'>
            {/* Table with values display */}
            <Table className='weatherTable' hover>
              <tbody>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>Location: </td>
                  <td>{location}, {country}</td>
                </tr>
                <tr>
                  <td>Temperature: </td>
                  <td>{temperature} </td>
                </tr>
                <tr>
                  <td>Humidity: </td>
                  <td>{humidity}</td>
                </tr>
                <tr>
                  <td>Conditions: </td>
                  <td>{conditions}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </>
    )
  }
}

export default Weather
