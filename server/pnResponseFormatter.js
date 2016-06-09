var _ = require('lodash');
module.exports = {
    format: format
}
var formatted = {}

function format(raw) {
    // console.log(raw.inventory_qa_sample);
    formatted.inventory = formatInventory(raw.inventory, raw.qa, raw.inventory_room)
    // formatted.manifests = formatManifests(raw.manifest, raw.manifest_stop_data, raw.manifest_stop_items,  raw.inventory_transfer)
    formatted.vendors = formatVendors(raw.vendor)
    formatted.employees = formatEmployees(raw.employee)
    formatted.vehicles = formatVehicles(raw.vehicle)
    // if(!!raw.plant) formatted.plants = formatPlants(raw.plant, raw.plant_room)
    // formatted.inbound_transfers = formatInventoryTransferInbound(raw.inventory_transfer_inbound)
    // formatted.plant_rooms = raw.plant_room
    // formatted.inventory_rooms = raw.inventory_room
    // formatted.qa_lab = formatQALabs(raw.qa_lab)
    // if(!!raw.plant) formatted.plant_derivatives = formatPlantDerivatives(raw.plant_derivative, raw.plant_room)
    return formatted

    // I NEED TO TAKE A BREAK AND HANDLE THIS DEREK SITUATION
};
function formatVehicles(vehicle){
    var vehicles = []
    _.map(vehicle, function(v) {
        var label = ''
        if (v.nickname) label = v.nickname + ' ' + v.plate
        if (!v.nickname) label = v.color + ' ' + v.make + ' ' + v.model + ' ' + v.plate
        vehicles.push({label: label, id: v.vehicle_id})

    })
    return vehicles
}
function formatEmployees(employee){
    var employees = []
    _.map(employee, function(e) {
        employees.push({label: e.employee_name, id: e.employee_id})
    })
    return employees
}
function formatInventory(inventory, qa, rooms) {
    // console.log(inventory);
    // console.log(qa);
    // console.log(rooms);
    _.map(inventory, function(i) {
        _.map(rooms, function(r) {
            if (r.roomid === i.currentroom) {
                i.roomLabel = r.name;
                // i.qa = qa
                // console.log(i.roomLabel);
            }
        })
        _.map(qa, function(q) {
            // console.log(q.barcode_id);
            // console.log(i.id);
            if (q.barcode_id === i.id) {
                i.qa = q;
                // console.log('QA FROMAT!');
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

function formatVendors (v) {
    var vendors = {vendorsbyid:{}, vendorsarray:[], vendorsbyubi: {}}
    if (!v) return console.log("Error! No Vendors!")
    v.map( function (vendor) {
        // console.log(vendor.location);
        if (vendor.locationtype === 1) {
            vendor.type = 'Tier 1 Producer'
        }
        if (vendor.locationtype === 2) {
            vendor.type = 'Tier 2 Producer'
        }
        if (vendor.locationtype === 3) {
            vendor.type = 'Tier 3 Producer'
        }
        if (vendor.locationtype === 4) {
            vendor.type = 'Tier 1 Producer/Processor'
        }
        if (vendor.locationtype === 5) {
            vendor.type = 'Tier 2 Producer/Processor'
        }
        if (vendor.locationtype === 6) {
            vendor.type = 'Tier 3 Producer/Processor'
        }
        if (vendor.locationtype === 7) {
            vendor.type = 'Processor'
        }
        if (vendor.locationtype === 8) {
            vendor.type = 'Retailer'
        }

        // vendor.display = {}
        vendor.addresslabel = vendor.address1
        if (!!vendor.address2) vendor.addresslabel += ' ' + vendor.address2
        vendor.addresslabel += ' ' + vendor.city + ', WA ' + vendor.zip
        // + " " + vendor.city
        // vendor.display.name = vendor.name
        // vendor.display.type = vendor.type
        // vendor.display.address = vendor.address1 + " " + vendor.city  + " WA " + vendor.zip.substring(0,5)
        // vendor.coords = VendorsCoords.getcoords(vendor.display.address)
        // if (LicenseeInfoService.getphonebyubi(vendor.ubi)) vendor.rawphone = formatPhone(LicenseeInfoService.getphonebyubi(vendor.ubi))
        // vendor.rawphone = LicenseeInfoService.getphonebyubi(vendor.ubi)
        // if (!!vendor.phone) {
        //     vendor.phone = vendor.phone.toString()
        //     vendor.display.phone = "("+vendor.phone.substring(0,3)+") "+ vendor.phone.substring(3,6) + "-" +vendor.phone.substring(6,10)
        // }
        // // console.log(vendor.phone);
        // // console.log('vendor.phone');
        vendor.label = vendor.name + " " + vendor.type + " " + vendor.city
        vendors.vendorsbyid[vendor.location] = vendor
        if (!!vendor.rawphone) vendor.phone = '('+vendor.rawphone.toString().substr(0,3) + ') ' + vendor.rawphone.toString().substr(3,3) + '-'+vendor.rawphone.toString().substr(6,4)

        vendors.vendorsarray.push(vendor)
        vendors.vendorsbyubi[vendor.ubi] = vendor

    });

    return vendors
    // localStorage.setItem('vendors', JSON.stringify(vendors))
    // $rootScope.vendors = JSON.parse(localStorage.getItem('vendors'))
    // console.log($rootScope.vendors);
    // console.log('$rootScope.vendors');
}
function formatPlants(plants, plant_rooms) {
    if (!plants) return
    var plantstatus = {
        0: 'Growing',
        1: 'Drying',
        2: 'Cured'
    }
    var plant_rooms_by_id = {}
    plant_rooms.map(function(room) {
        plant_rooms_by_id[room.roomid] = room.name
    })
    // console.log(plant_rooms_by_id);
    plants.map(function(plant){
        plant.plantstatus = plantstatus[plant.state]
        // plant.plantbirthday = new Date(plant.sessiontime*1000)
        plant.plantbirthday = new Date(plant.sessiontime*1000).toISOString().slice(0,10)
        plant.plantlabel =  '['+plant.id+']' + ' ' + plant.strain + ' ' + plant.plantbirthday + ' ('+plant.plantstatus+')'
        plant.plant_room_name = plant_rooms_by_id[plant.room]
        plant.category = plant.plant_room_name

    })
    return plants
};
function formatInventoryTransferInbound(inbound_transfers) {
    // console.log(inbound_transfers);
    var typemap = gettypemap()
    inbound_transfers.map(function(inbound_item){
        inbound_item.inventorytypelabel = typemap[inbound_item.inventorytype].label
        inbound_item.datestring = getdatestringfor(inbound_item.sessiontime)
        inbound_item.datetimestring = gettimestring(inbound_item.sessiontime)
        inbound_item.label =  '['+inbound_item.inventoryid+'] ' + parseFloat(inbound_item.quantity).toFixed(2) + ' x ' + inbound_item.strain + ' ' + inbound_item.inventorytypelabel + ' ($'+ inbound_item.price +')'
    })
    sortbykey(inbound_transfers, 'sessiontime');

    // localStorage.setItem('inbound_transfers', JSON.stringify(inbound_transfers));
    return inbound_transfers
}
function formatPlantRooms (pr) {
    var plantroomsbyid = {}
    pr.map ( function (room) {
        plantroomsbyid[room.roomid] = room.name
    })
    var plant_rooms = {}
    plant_rooms.plantroomsbyid = plantroomsbyid
    plant_rooms.plantroomsarray = pr
    return plant_rooms
}
function sortbykey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}
function formatPlantDerivatives(plant_derivatives, plant_rooms){
    var plant_rooms_by_id = {}

    plant_rooms.map(function(room) {
        plant_rooms_by_id[room.roomid] = room.name
    })
    // plant_derivatives
    var toCure = []
    plant_derivatives.map(function(der){
        if (der.inventorytype === 29) {
            return toCure.push(der)
        }
        else {
            // console.log('NO! ');
        }
    })
    toCure.map(function(plant){
        // console.log(plant);
        plant.roomlabel = plant_rooms_by_id[plant.room]
        plant.typelabel = gettypemap()[plant.inventorytype].label

        var plants_by_id = {}
        formatted.plants.map(function(p){
            // console.log(p);
            plants_by_id[p.id] = p
        })

        // plant.strain =  ''
        // plant.strain =  plants_by_id[plant.plantid]
        plant.label = '['+plant.plantid+']' + ' ' +getdatestringfor(plant.sessiontime) +' '+ plant.weight + 'g ' //chroe + plant.strain
        // if (plant.inve)
        plant.category = plant.roomlabel
        // if (plant.inventorytype)
        //   "plant": {
        //     "wholeweight": "118.90",
        //     "room": "3",
        //     "location": "416545",
        //     "deleted": 0,
        //     "collectadditional": 0,
        //     "inventoryid": "3371766638471872",
        //     "sessiontime": "1419640549",
        //     "weight": "118.9",
        //     "harvestcollect": 1,
        //     "inventorytype": 27,
        //     "transactionid": "1346503",
        //     "plantid": "9246182783137305",
        //     "transactionid_original": "1346503",
        //     "curecollect": 0,
        //     "roomlabel": "Flowering B"

    })
    // console.log(toCure.length);
    // console.log(plant_derivatives.length);
    // var byPlantID = {}
    // plant_derivatives.map(function(plant){
    //     byPlantID[plant.inventoryid] = plant
    // })
    var pd = { plant_derivatives_array: plant_derivatives, toCure:toCure}
    // // console.log();
    // console.log(byPlantID);
    // console.log(byPlantID['9386360055820751'])

    return pd
}
function formatQALabs(qa_lab) {
    // {"transactionid":"122258","state":"WA","address1":"31 North 1st Avenue","transactionid_original":"122258","city":"Yakima","address2":null,"zip":"98902","name":"Analytical 360, LLC.","location":"0004"},{"city":"Spokane","transactionid_original":"206227","address1":"504 E. Sprague","transactionid":"206227","state":"WA","location":"0010","name":"Anatek Labs","zip":"99202","address2":"Suite D"},{"state":"WA","transactionid":"776907","address1":"2305 NE Hopkins Court","city":"Pullman","transactionid_original":"776907","zip":"99163","address2":null,"name":"CannaSafe Analytics","location":"0005"},{"zip":"98052","address2":null,"name":"Confidence Analytics","location":"0003","state":"WA","transactionid":"122259","address1":"14797 NE 95th St","city":"Redmond","transactionid_original":"122259"}
    return qa_lab.map(function(lab){
        var a = lab.address1
        if (!!lab.address2) a += ' ' + lab.address2
        var b =  " " + lab.city + " WA, " + lab.zip
        var address = a + b

        return {
            name: lab.name,
            address: address
        }
    });
}
function gettypemap () {
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
        22: {label: 'Solid Marijuana Infused Edible', weighable: false},
        23: {label: 'Liquid Marijuana Infused Edible', weighable: false},
        24: {label: 'Marijuana Extract for Inhalation', weighable: false},
        25: {label: 'Marijuana Infused Topicals', weighable: false},
        26: {label: 'Sample Jar', weighable: false},
        27: {label: 'Waste', weighable: true},
        28: {label: 'Usable Marijuana', weighable: false},
        29: {label: 'Wet Flower', weighable: true},
        30: {label: 'Marijuana Mix', weighable: true},
        31: {label: 'Marijuana Mix Packaged', weighable: false},
        32: {label: 'Marijuana Mix Infused', weighable: false}
    }
    return typemap;
}
