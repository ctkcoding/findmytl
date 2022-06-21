const express = require('express');
const current = require('../data/current.json');

const homeRouter = express.Router();

homeRouter.route('/').get((req, res) => {
  res.render('index', {
    snapshot: current
  });
});

module.exports = homeRouter;
