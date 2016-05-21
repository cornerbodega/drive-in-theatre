var request = require('request');
var _ = require('lodash');
module.exports = {
    get: get
}

function get(req, res) {
    var ireq = {
        action: 'sync_inventory',
        sessionid: req.params.sessionid
    }

    request(lcbPost(ireq), getQAInfo);

    function getQAInfo(error, iresponse, ibody){
        console.log(ibody);
        if (!ibody) return console.log('There aint no inventory body response from the lcb!')
        var inventory = _.filter(ibody.inventory, function(i){ return i.remaining_quantity > 0})
        var inventory = _.filter(inventory, function(i){ return i.deleted < 1})
        // _.map(ibody.inventory, function(item){ item.id })
        var barcodeids = _.map(inventory, function(item){ return item.id })
        var qareq = {
            action: 'inventory_qa_check_all',
            sessionid: req.params.sessionid,
            barcodeid: barcodeids
        };

        request(lcbPost(qareq), getRoomsInfo);
        function getRoomsInfo(error, qaresponse, qabody) {
            if (!qabody.data) return console.log('Error 232: No Qa')
            var roomsreq = {
                action: 'sync_inventory_room',
                sessionid: req.params.sessionid,
            }
            request(lcbPost(roomsreq), formatAndReturn);
            function formatAndReturn(error, roomsresponse, roomsbody){
                console.log(roomsbody);
                var rooms = roomsbody.inventory_room
                if (!rooms) return console.log('Error 244: No Rooms!')
                res.send(formatInventoryAndQA(inventory, qabody.data, roomsbody.inventory_room));
                // var inventory = formatInventoryAndQA(inventory, qabody.data)
                // res.send(formatRooms(inventory, rooms))
            }
        }

        // function formatRooms(inventory, rooms) {
        //     // _.map(inventory, function(i){
        //     //     i.roomLabel = getRoomName(i.currentroom)
        //     //     console.log(i.roomLabel);
        //     // })
        //     // function getRoomName(roomid) {
        //     //     return _.find(inventory, {roomid: roomid}).name
        //     // }
        //     return inventory
        // }


        function formatInventoryAndQA(inventory, qa, rooms) {
            _.map(inventory, function(i) {
                _.map(rooms, function(r) {
                    if (r.roomid === i.currentroom) {
                        i.roomLabel = r.name;
                        // console.log(i.roomLabel);
                    }
                })
                _.map(qa, function(q) {
                    if (q.barcode_id === i.id) {
                        i.qa = q;
                        // i.bacteria = {}
                        // i.potency = {}
                        _.map(q.test, function(t){
                            if(t.THC) return i.qa.potency = t
                            if(t.moisture) return i.qa.moisture = t
                            if(t.coliforms) return i.qa.bacteria = t
                        })
                        i.inventorytypeInfo = getTypeInfo(i.inventorytype);
                        i.inventorytypelabel = i.inventorytypeInfo.label
                        if (!i.strain) i.strain = "Mixed"
                        i.clientGroupTag = i.strain + ' - ' + i.inventorytypelabel
                        i.sessiontimelabel = pnToTime(i.sessiontime)

                        // <p  ng-if="item.inventorytypeInfo.weighable">
                        //     {{item.remaining_quantity}} grams
                        // </p>
                        // <p  ng-if="!item.inventorytypeInfo.weighable">
                        //     {{item.remaining_quantity}} x {{item.usable_weight}} gram packages
                        // </p>
                        if (i.inventorytypeInfo.weighable) i.pnQuantitiyLabel = i.remaining_quantity + ' grams'
                        if (!i.inventorytypeInfo.weighable) i.pnQuantitiyLabel = i.remaining_quantity + ' x '+ i.usable_weight + ' grams'
                    };
                });
            });

            return inventory
        };
        function pnToTime(sessiontime) {
            return new Date(sessiontime * 1000).toLocaleString()
        }
        function getTypeInfo(type) {
            var typemap = {
                5: {label:'Kief', weighable:true, backrgound:'red'},
                6: {label: 'Flower', weighable:true, background:'blue'},
                7: {label: 'Clone', weighable: true},
                9: {label: 'Other Plant Material', weighable: true},
                10: {label: 'Seed', weighable: false, seed: true},
                11: {label: 'Plant Tissue', weighable: true},
                12: {label: 'Mature Plant', weighable: true},
                13: {label: 'Flower Lot', weighable: true},
                14: {label: 'Other Plant Material Lot', weighable: true},
                15: {label: 'Bubble Hash', weighable: true},
                16: {label: 'Hash', weighable: true},
                17: {label: 'Hydrocarbon Wax', weighable: true},
                18: {label: 'CO2 Hash Oil', weighable: true},
                19: {label: 'Food Grade Solvent Extract', weighable: true},
                20: {label: 'Infused Dairy Butter or Fat in Solid Form', weighable: true},
                21: {label: 'Infused Cooking Oil', weighable: true},
                22: {label: 'Solid Infused Edible', weighable: false},
                23: {label: 'Liquid Infused Edible', weighable: false},
                24: {label: 'Extract for Inhalation', weighable: false},
                25: {label: 'Infused Topicals', weighable: false},
                26: {label: 'Sample Jar', weighable: false},
                27: {label: 'Waste', weighable: true},
                28: {label: 'Usable Marijuana', weighable: false},
                29: {label: 'Wet Flower', weighable: true},
                30: {label: 'Mix', weighable: true},
                31: {label: 'Mix Packaged', weighable: false},
                32: {label: 'Mix Infused', weighable: false}
            }
            return typemap[type];
        }
    };
};

function lcbPost(body) {
    return {
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,
        body: body
    }
}
