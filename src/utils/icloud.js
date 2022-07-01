const icloud = require("find-my-iphone").findmyphone;
const cron = require('node-cron');
require('dotenv').config();

var history = [];
icloud.apple_id = process.env.APPLE_ID;
icloud.password = process.env.PASSWORD;

async function fetchLocation(myCallback) {
    console.log("fetching location");
    //future type
    let snapshot = {
        "id": "",
        "device": [],
        "timestamp": "",
        "battery": "",
        "location": []
    };
    icloud.getDevices(function(error, devices,) {
        let device;
        // console.log(device);
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
                snapshot.timestamp = Date.now(); //current time
                snapshot.location = {
                    lat: device.location.latitude,
                    long: device.location.longitude
                };
            }
        }
        myCallback(snapshot);
    });
}

function handleSnapshot(snapshot) {
    history.push(snapshot);
    console.log(history);
}

exports.iCloudScheduler = async () => {
    const iCloudJob = cron.schedule('*/10 * * * * *', async () => {
        // log to console and save to db
        fetchLocation(handleSnapshot);
    });
    // iCloudJob.start();
}