const express = require('express');
const router = express.Router();
//const addPage = require('../views/addPage');

const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res) => {
  res.send('got to GET /wiki/');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    //status: req.body.status === undefined ? "open" : "closed"
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }

  //res.json(req.body);
});

module.exports = router;
