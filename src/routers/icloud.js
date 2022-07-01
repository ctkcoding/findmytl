const express = require('express');
const cloudUtils = require("../utils/icloud.js");
require('dotenv').config();

const icloudRouter = express.Router();

icloudRouter.route('/').get((req, res) => {
    cloudUtils.fetchLocation();
    res.render('icloud', {
        login: login
    });
});

module.exports = icloudRouter;
