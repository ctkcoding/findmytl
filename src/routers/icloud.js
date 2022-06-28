const express = require('express');
const icloud = require("find-my-iphone").findmyphone;
// const utils = require ("../utils/icloud");
require('dotenv').config();

icloud.apple_id = process.env.APPLE_ID;
icloud.password = process.env.PASSWORD;
icloud.cookieFileStore = "icloud.cookie";
const login = {
    apple_id: process.env.APPLE_ID,
    password: process.env.PASSWORD
};

const icloudRouter = express.Router();

icloudRouter.route('/').get((req, res) => {

    icloud.getDevices(function(error, devices) {
        var device;
        var snapshot = {};
        if (error) {
            console.log(error);
        }else{
            devices.forEach(function(d) {
                if (device == undefined && d.location && d.lostModeCapable) {
                    device = d;
                }
            });
            if (device) {
                // console.log(device)
                snapshot.id = ""; //new random uuid
                snapshot.device = {
                    name: device.name,
                    id: device.id
                }
                snapshot.battery = device.batteryLevel;
                snapshot.timestamp = 1655867398835; //current time
                snapshot.location = {
                    lat: device.location.latitude,
                    long: device.location.longitude
                };
            }
        }
        console.log(snapshot);
    });
    res.render('icloud', {
        login: login
    });
});

module.exports = icloudRouter;
