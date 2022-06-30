const icloud = require("find-my-iphone").findmyphone;
const cron = require('node-cron');
require('dotenv').config();

let history = [];


function fetchLocation() {
    console.log("fetching location");
    //future type
    let snapshot = {
        "id": "",
        "device": [],
        "timestamp": "",
        "battery": "",
        "location": []
    };
    return icloud.getDevices(function(error, devices) {
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
            // console.log(snapshot);
            return snapshot;
        }
        // res.send(array);
    });
}

exports.iCloudScheduler = async () => {
    const iCloudJob = cron.schedule('*/10 * * * * *', async () => {
        // fetch location
        let location = await fetchLocation();
    
        // log to console and save to db
        history.push(location);
        console.log(location);
    });

    // iCloudJob.start();
}