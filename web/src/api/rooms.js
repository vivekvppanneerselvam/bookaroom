import React from 'react'
import moment from 'moment'
import api from './init'

export function listRooms() {
  return api.get('/rooms').then(res => res.data)
}


export function addRoom(data) {
  return api.post('/room', data).then(res => res.data)
}

export function editRoom(data) {
  return api.put(`/room/${data.roomId}`, data).then(res => res.data)
    .catch(err => alert(err.response.data.error.message.match(/error:.+/i)[0]))
}

export function deleteRoom(id) {
  return api.delete(`/room/${id}`).then(res => res.data)
}