import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Post Request create seed
export const createSeed = (data, user) => {
  return axios({
    url: apiUrl + '/seeds/',
    method: 'POST',
    data: { seed: data },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// Index request
// no data, we will need a token
export const indexSeeds = (user) => {
  return axios({
    // method key sets the HTTP verb/method for this request
    // GET is the default method, so we can include or not up to us
    method: 'GET',
    url: apiUrl + '/seeds',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// GET /Seed/:id, requires token
// get one seed data
export const showSeed = (id, user) => {
  return axios({
    url: apiUrl + '/seed/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// DELETE /Seed/:id, requires token
// delete one seed
export const deleteSeed = (id, user) => {
  console.log('in delete', id)
  return axios({
    url: apiUrl + '/seed/' + id + '/',
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// PATCH /seed/:id, requires token
export const updateSeed = (data, id, user) => {
  console.log('update seed api', data, id, user)
  return axios({
    url: apiUrl + '/seed/' + id + '/',
    method: 'patch',
    data: { seed: data },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
