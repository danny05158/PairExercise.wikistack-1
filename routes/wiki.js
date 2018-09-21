const express = require('express');
const router = express.Router();
//const addPage = require('../views/addPage');

const { Page } = require('../models');
const { addPage } = require('../views');
const  wikipage  = require('../views/wikipage')

router.get('/', (req, res) => {
  res.send('got to GET /wiki/');
});


router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {slug: req.params.slug}
    })
    res.send(wikipage(foundPage, foundPage.author))

  } catch (err){ next(err)}
})

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    //status: req.body.status === undefined ? "open" : "closed"
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }

  //res.json(req.body);
});

module.exports = router;
