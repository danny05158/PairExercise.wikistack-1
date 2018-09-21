const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { userList } = require('../views');
const { userPages } = require('../views');




router.get('/', async (req, res, next) => {
  try {
   const users = await User.findAll();
   res.send(userList(users));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const pages = await Page.findAll({
      where:{ authorId: req.params.id }
    })
    res.send(userPages(user, pages));
  } catch (err) {
    next(err);
  }
});

module.exports = router;

