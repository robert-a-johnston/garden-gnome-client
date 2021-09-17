import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Post Request create garden
export const createGarden = (data, user) => {
  return axios({
    url: apiUrl + '/gardens',
    method: 'POST',
    data: { garden: data },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// Index request
// no data, we will need a token
export const indexGardens = (user) => {
  return axios({
    // method key sets the HTTP verb/method for this request
    // GET is the default method, so we can include or not up to us
    method: 'GET',
    url: apiUrl + '/gardens',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// GET /garden/:id, requires token
// get one garden data
export const showGarden = (id, user) => {
  return axios({
    url: apiUrl + '/garden/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// DELETE /garden/:id, requires token
// delete one garden
export const deleteGarden = (id, user) => {
  return axios({
    url: apiUrl + '/garden/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

// PATCH /garden/:id, requires token
export const updateGarden = (data, id, user) => {
  return axios({
    url: apiUrl + '/garden/' + id,
    method: 'patch',
    data: { garden: data },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
