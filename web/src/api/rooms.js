import React from 'react'
import moment from 'moment'

import api from './init'

export function fetchLoction() {
  return api.get('/locations').then(res => res.data)
}

export function fetchInstitutes() {
  let dummyArr = [{
    "_id": {
      "$oid": "6246ec06db1ef82efe7c693e"
    },
    "instituteGroupName": "Adult Medicine",
    "specialty": "Endocrinology",
    "specialtyDepC": "7"
  },
  {
    "_id": {
      "$oid": "6246ec44db1ef82efe7c693f"
    },
    "instituteGroupName": "Adult Medicine",
    "specialty": "Early Intervention",
    "specialtyDepC": "172"
  }, {
    "_id": {
      "$oid": "6246ec61db1ef82efe7c6941"
    },
    "instituteGroupName": "Adult Medicine",
    "specialty": "Dermatologic Surgery",
    "specialtyDepC": "161"
  }, {
    "_id": {
      "$oid": "6246ec74db1ef82efe7c6942"
    },
    "instituteGroupName": "Bone and Joint",
    "specialty": "Orthopedic Surgery",
    "specialtyDepC": "27"
  },
  {
    "_id": {
      "$oid": "6246ed7bdb1ef82efe7c6947"
    },
    "instituteGroupName": "Heart",
    "specialty": "Cardiology",
    "specialtyDepC": "4"
  },
  {
    "_id": {
      "$oid": "6246ed7bdb1ef82efe7c6947"
    },
    "instituteGroupName": "Heart",
    "specialty": "Cardiology",
    "specialtyDepC": "4"
  },
  {
    "_id": {
      "$oid": "6246ed7bdb1ef82efe7c6947"
    },
    "instituteGroupName": "Heart",
    "specialty": "Cardiothoracic Surgery",
    "specialtyDepC": "46"
  }]
  return api.get('/institutes').then(res => res.data.concat(dummyArr))
}


export function getProviders() {
  let dummyArr1 = [{
    "_id": {
      "$oid": "6246ece7db1ef82efe7c6943"
    },
    "provId": "1",
    "provName": "Prov1",
    "provType": "Physician",
    "specialty": "Pulmonology",
    "specialtyDepC": "128"
  }, {
    "_id": {
      "$oid": "6246ed07db1ef82efe7c6944"
    },
    "provId": "2",
    "provName": "Prov2",
    "provType": "Physician",
    "specialty": "Internal Medicine",
    "specialtyDepC": "17"
  },
  { "_id": { "$oid": "6246ed11db1ef82efe7c6945" }, "provId": "2", "provName": "Prov2", "provType": "Physician", "specialty": "Internal Medicine", "specialtyDepC": "17" },
  {
    "_id": {
      "$oid": "6246ed2ddb1ef82efe7c6946"
    },
    "provId": "128",
    "provName": "Prov128",
    "provType": "Physician",
    "specialty": "General Surgery",
    "specialtyDepC": "11"
  }, {
    "_id": {
      "$oid": "6246eda0db1ef82efe7c6948"
    },
    "provId": "125",
    "provName": "Prov125",
    "provType": "Physician",
    "specialty": "Cardiothoracic Surgery",
    "specialtyDepC": "46"
  }, {
    "_id": {
      "$oid": "6246eda0db1ef82efe7c6948"
    },
    "provId": "127",
    "provName": "Prov127",
    "provType": "Physician",
    "specialty": "Cardiology",
    "specialtyDepC": "4"
  }]
  return api.get('/fetchproviders').then(res => res.data.concat(dummyArr1))
}


export function fetchProviderByIID(id) {
  return api.get('/fetchproviderbyiid?id=' + id).then(res => res.data)
}

export function listRooms() {
  return api.get('/rooms').then(res => res.data)
}


export function addRoom(data) {
  delete data['_id'];
  return api.post('/room', data).then(res => res.data)
}

export function editRoom(data) {
  return api.put(`/room/${data._id}`, data).then(res => res.data)
    .catch(err => alert(err.response.data.error.message.match(/error:.+/i)[0]))
}

export function deleteRoom(id) {
  return api.delete(`/room/${id}`).then(res => res.data)
}