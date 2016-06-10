var request = require('request');
var _ = require('lodash');
var pnResponseFormatter =  require('./pnResponseFormatter.js');
module.exports = {
    get: get
}

function get(req, res) {

    request(lcbPost(getSyncCheckRequest(req.params.sessionid)), getQA);

    function getQA(error, syncCheckRes, syncCheckResBody) {
        var barcodes = []
        console.log(_.keys(syncCheckResBody));
        // console.log(syncCheckResBody.inventory);
        _.map(syncCheckResBody.inventory, function(item){
            barcodes.push(item.id)

        })
        // console.log(barcodes);
        request(lcbPost({
            action: 'inventory_qa_check_all',
            sessionid: req.params.sessionid,
            barcodeid: barcodes
        }), formatAndReturn);
        function formatAndReturn(error, qaRes, qaBody){
            // if (error) return console.log("Error 7d687 Getting Employees! "+ error)
            // if (!vehicleBody) return console.log('Error 23ee2: Error getting Employees!')
            syncCheckResBody.qa = qaBody.data
            res.send(pnResponseFormatter.format(syncCheckResBody));
        }
    }



};

function getSyncCheckRequest(sessionid) {
    // sessionid = 'df285510b8b9bd4f97b1c1678f30a228c347543d8084339a621c219f218a4e68bd7a6245c07c60be55abb345211a288bb632cb4675acd3629c3c0d9ce8f9f6db'
    var tables_to_sync = [
        'vehicle',
        'employee',
        'plant_room',
        'inventory_room',
        'inventory',
        'plant',
        'plant_derivative',
        'manifest',
        'inventory_transfer',
        'inventory_transfer_inbound',
        'sale',
        'tax_report',
        'vendor',
        'qa_lab',
        'inventory_adjust',
        'inventory_qa_sample',
        'inventory_sample',
    ];
    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "data": [],
        "download": 1,
        "active": 1,
        "sessionid": sessionid
    }
    tables_to_sync.map( function( table ) {
        sync_check_request.data.push({table: table, active: 1})
    })
    // var t = {"action": "sync_check", "data": [{"table":"plant", "active": 1}], "download":1, "active":1, "API": "4.0","sessionid": "df285510b8b9bd4f97b1c1678f30a228c347543d8084339a621c219f218a4e68bd7a6245c07c60be55abb345211a288bb632cb4675acd3629c3c0d9ce8f9f6db"}
    // return t
    // console.log(JSON.stringify(sync_check_request));
    return sync_check_request
}
function lcbPost(body) {
    return {
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,
        body: body
    }
}
