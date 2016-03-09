var request = require('request');

module.exports = {
    refresh: refresh,
    get: get,
    find, find
}

function find(req, res) {
    var ref = new Firebase ("https://connect502.firebaseio.com/vendors/"+req.body.ubi)
    ref.on("value", function(snapshot){
        res.send(snapshot.val());
    })
}
function get(req, res) {
    if(!req.params.ubi) var ref = new Firebase ("https://connect502.firebaseio.com/vendors")
    else var ref = new Firebase ("https://connect502.firebaseio.com/vendors/"+req.params.ubi)
    ref.on("value", function(snapshot){
        res.send(snapshot.val());
    })
}
function refresh(req, res, cb) {
    var vreq = { action: 'sync_vendor' }
    vreq.sessionid = "18484ec755e90c36006bb1c5da5c677478813717cd097b940507a6d14d7bfc5ebc3bfe39e2e2f534873b5b2de963411575cebf7734f6cc12e7f1f843ff1c1b27"
    request({
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,   // <--Very important!!!
        body: vreq
    }, function (error, response, body){
        // res.send(body);
        // make this by ubi
        var b = {}
        var ref = new Firebase ("https://connect502.firebaseio.com/vendors")
        body.vendor.map(function(v) {
            v.licensetype = locationtypeLabler(v.locationtype)
            b[v.ubi] = v
        })
        ref.set(b)
    });
}
// function locationtypeLabler(locationtype) {
//     if (locationtype === 7) return "Processor"
//     return locationtype
// }

function locationtypeLabler(locationtype){
    var type = ""
    console.log(locationtype);
    if (locationtype === 1) {
        type = 'Tier 1 Producer'
    }
    if (locationtype === 2) {
        type = 'Tier 2 Producer'
    }
    if (locationtype === 3) {
        type = 'Tier 3 Producer'
    }
    if (locationtype === 4) {
        type = 'Tier 1 Producer/Processor'
    }
    if (locationtype === 5) {
        type = 'Tier 2 Producer/Processor'
    }
    if (locationtype === 6) {
        type = 'Tier 3 Producer/Processor'
    }
    if (locationtype === 7) {
        type = 'Processor'
    }
    if (locationtype === 8) {
        type = 'Retailer'
    }
    return type
}
