var _ = require('lodash');
module.exports = {
    pnGetSyncCheckRequestFor: pnGetSyncCheckRequestFor
}

function pnGetSyncCheckRequestFor(tables, sessionid) {
    var request = {
                    "API": "4.0",
                    "action": "sync_check",
                    "data": [],
                    "download": 1,
                    "active": 1,
                    "sessionid": sessionid
                }
    tables.map( function( table ) {
        request.data.push({table: table, active: 1})
    })
    console.log(request);
    return request

};
