const express = require('express');
const router = express.Router()
const addPage = require('../views/addPage')

router.get('/', (req, res) => {
  res.send('got to GET /wiki/')

});

router.get('/add', (req, res) => {
  res.send(addPage())

});

router.post('/', (req, res) => {
  // res.send(layout(''));

});

module.exports = router;

