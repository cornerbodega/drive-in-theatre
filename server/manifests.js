var request = require('request');
var _ = require('lodash');
module.exports = {
    create: create,
    get: get,
}

function get(req, res) {
    console.log(req.params);
    console.log(req.params.sessionid);
    return request(lcbPost({
        sessionid: req.params.sessionid,
        action: 'sync_check',
        download: 1,
        data: [{table: 'manifest', active: 1 }, {table: 'inventory_transfer', active: 1 }]
    }), formatAndReturn);
    function formatAndReturn(error, scResponse, scBody){
        console.log(scBody);

        if (error) return console.log("Error 2342 Getting Manifests! "+ error)
        if (!scBody) return console.log('Error 4322: Error getting Manifests!')
        var formatted = formatManifests(scBody.manifest, scBody.manifest_stop_data, scBody.manifest_stop_items,  scBody.inventory_transfer)
        // console.log(formatted);
        res.send(formatted);
        // res.send(scBody);

    }
}
//
// function formatManifests(mans, stops, items, transfers) {
//     console.log(mans);
//     console.log(stops);
//     console.log(items);
//     console.log(transfers);
//
// }

function formatManifests(mans, stops, items, transfers) {
    // console.log("lets format those manifests!");
    var manifests = aggregatemanifests(mans, stops, items)
    // console.log(transfers);
    manifests.map( function (fest) {
        fest.totalprice = 0;
        transfers.map( function (fer) {
            if (fest.manifestid === fer.manifestid) {
                fest.transferred = true
                if (typeof fest.transfers === 'undefined') {
                    fest.transfers = [];
                }
                fest.transfers.push(fer)
                fest.totalprice += parseInt(fer.price)
                fest.stops.map( function (stop) {
                    if (!stop.stop_total_price) stop.stop_total_price = 0
                    // console.log(stop.stop_total_price   + ' 1stop.stop_total_price')
                    stop.items.map(function (item) {
                        // if(!stop.stop_total_price) stop.stop_total_price = 0
                        // stop.stop_total_price += parseFloat(item.price).toFixed(2)
                        if (item.inventoryid === fer.inventoryid) {
                            if (Math.round(fer.price) != fer.price) {
                                fer.price = parseFloat(fer.price).toFixed(2);
                            }
                            item.price = parseFloat(fer.price).toFixed(2);
                            stop.stop_total_price = parseFloat(stop.stop_total_price) + parseFloat(item.price)
                            var ppu = parseFloat(fer.price) / parseInt(item.quantity)
                            if (Math.round(ppu) != ppu) {
                                ppu = ppu.toFixed(2);
                            }
                            item.priceperunit = '$' + ppu
                            item.price = '$' + item.price;
                            // console.log(stop.stop_total_price   + ' 2stop.stop_total_price')

                        }
                    })
                })
            }
        })
        fest.label += ''
        fest.label += ' ($' + fest.totalprice + ')'
        if (!fest.transferred) fest.label = '[Not Transferred] ' + fest.label
    })
    manifests.map(function(manifest){
        var a = getdatestringfor(manifest.sessiontime)
        manifest.dateLabel=a
        var b = a.split('/')
        manifest.category =  b[0]  +'/' +  b[2]
        // console.log(a + ' ' + b + ' ' + manifest.category);
        // console.log(new Date(manifest.sessiontime).getMonth())
        // manifest.category =
    })

    // sortbykey(manifests, 'sessiontime');
    manifests = _.sortBy(manifests, 'sessiontime').reverse()


    // localStorage.setItem('manifests', JSON.stringify(manifests));
    return manifests
}
function gettimestring (unixtime) {
        // console.log(unixtime);
        return new Date(unixtime * 1000).toLocaleString();
        // return unixtime *
}
function getdatestringfor (unixtime) {
            // console.log(unixtime);
            return new Date(unixtime * 1000).toLocaleDateString();
            // return unixtime *
}
//////////////////////////////////////////////
function aggregatemanifests (mans, stops, items) {
    var aggmanifests = []
    var manifest = mans
    var manifest_stop_data = stops
    var manifest_stop_items = items
    aggmanifests = _.clone(manifest);
    aggmanifests.map (function (agg) {
        agg.stops = [];
        manifest_stop_data.map(function (stopdata) {
            if (typeof stopdata.items === 'undefined') {
                //stopdata.items = [];
            }
            if (agg.manifestid === stopdata.manifestid) {
                agg.stops.push(stopdata);
            }
        })

        manifest_stop_items.map(function (stopitem) {
            if (stopitem.manifestid === agg.manifestid) {
                agg.stops.map (function (stop) {
                    if (stop.manifestid === stopitem.manifestid) {
                        if (stop.stopnumber === stopitem.stopnumber) {
                            if (typeof stop.items === 'undefined') {
                                stop.items = [];
                            }
                            stop.items.push(stopitem);
                        }
                    }
                })
            }
        })
    })
    aggmanifests.map(function (m) {
        m.label = '[' + m.manifestid + ']' + ' ';
        // m.label +=
        m.label += gettimestring(m.completion_date)
        if (m.stopcount === 1) {
            m.label += ' ' + ' to '+ m.stops[0].name
        }
    })
    return aggmanifests;
}


function create(req, res) {
    request(lcbPost(req.body), formatAndReturn);
    function formatAndReturn(error, manifestResponse, manifestBody){
        if (error) return console.log("Error 6445 Getting Manifests! "+ error)
        if (!manifestBody) return console.log('Error 8967: Error getting Manifests!')
        res.send(manifestBody);
    }

};

function lcbPost(body) {
    return {
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,
        body: body
    }
}
