var request = require('request');

module.exports = {
    refresh: refresh,
}


function refresh(req, res, cb) {
    var lreq = { action: 'sync_qa_lab' }
    lreq.sessionid = "ddb8570d7807f496793de20c65596fafe0b2e9ae593901665803de51bbfd6524987332aae203f879d4cc532ea7a62d081ddcf5e783967137a4c38121612c4805"
    request({
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,   // <--Very important!!!
        body: lreq
    }, function (error, response, body){
        // res.send(body);
        // make this by ubi
        var labs = {}
        var ref = new Firebase ("https://connect502.firebaseio.com/labs")
        body.vendor.map(function(lab) {
            b[l.location] = lab
        })
        ref.set(labs)
    });
}
