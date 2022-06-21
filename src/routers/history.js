const express = require('express');
const history = require('../data/history.json');

const histRouter = express.Router();

histRouter.route('/').get((req, res) => {
  res.render('history', {
    history: history,
  });
});

// histRouter.route('/ping/:id').get((req, res) => {
//   const id = req.params.id;
//   res.render('location', {
//     location: locations[id],
//   });
// });

// histRouter.route('/icloud').get((req, res) => {
//     location = icloud.ping()

//     res.render('icoud', {
//         testing: true,
//         // location: locations[id]
//     });
//   });

module.exports = histRouter;
