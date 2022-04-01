const express = require('express')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const Provider = require('../models/Provider')
const Institute = require('../models/Institute')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/fetchproviderbyiid', requireJWT, (req, res) => {
  let id = req.query.id
  Provider.getProviderByIID(id, function (err, response) {
    console.log(response)
    if (err) return next(err);
    res.json(response)
  });

})

router.get('/fetchproviders', requireJWT, (req, res) => {
  Provider.getProviders( function (err, response) {
    console.log(response)
    if (err) return next(err);
    res.json(response)
  });

})


router.get('/institutes', requireJWT, (req, res) => {  
  Institute.getAllInstitute(function (err, response) {
    console.log(response)
    if (err) return next(err);
    res.json(response)
  });
})

module.exports = router