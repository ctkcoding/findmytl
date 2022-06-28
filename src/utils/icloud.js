const cron = require('node-cron');
const icloud = require("find-my-iphone").findmyphone;
require('dotenv').config();
let history = [];

// require icloud
cron.schedule('*****', async function() {
    //fetch location
    location = await fetchLocation();
    //log to console and save to db
    history.push(location);
});

function fetchLocation() {
    //future type
    let snapshot = {
        "id": "",
        "device": [],
        "timestamp": "",
        "battery": "",
        "location": []
    };
    icloud.getDevices(function(error, devices) {
        var device;
        if (error) {
            console.log(error);
        }else{
            devices.forEach(function(d) {
                if (device == undefined && d.location && d.lostModeCapable) {
                    device = d;
                }
            });
            if (device) {
                console.log(device)
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
            console.log(snapshot);
        }
        // res.send(array);
    });
}

