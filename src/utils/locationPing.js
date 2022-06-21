// const cron =require('node-cron');

// require icloud
function Retrieve

icloud.getDevices(function(error, response) {
    var snapshot;
    var array = [];
    if (error) {
        console.log(error);
    }else{
        response.forEach(function(dataCandidate) {
            if (snapshot == undefined && dataCandidate.location && dataCandidate.lostModeCapable) {
                snapshot = dataCandidate;
            }
        });
        if (snapshot) {
            console.log(snapshot)
            array.push(snapshot);
        }
    }
    // res.send(array);
});