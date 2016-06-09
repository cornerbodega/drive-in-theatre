(function () {
    angular
    .module('countryApp')
    .factory('ResponseFormatter', [ '$rootScope', 'ConnectService', 'LicenseeInfoService', 'Data',
    ResponseFormatter
]);

function ResponseFormatter($rootScope, ConnectService, LicenseeInfoService, Data ) {
    function format() {
        console.log(Data)

        Data.formatted = {}

        Data.formatted.inventory = formatInventory(Data.raw.inventory)
        Data.formatted.manifests = formatManifests(Data.raw.manifest, Data.raw.manifest_stop_data, Data.raw.manifest_stop_items,  Data.raw.inventory_transfer)
        Data.formatted.vendors = formatVendors(Data.raw.vendor)
        Data.formatted.employees = formatEmployees(Data.raw.employee)
        Data.formatted.vehicles = formatVehicles(Data.raw.vehicle)
        if(!!Data.raw.plant) Data.formatted.plants = formatPlants(Data.raw.plant, Data.raw.plant_room)
        Data.formatted.inbound_transfers = formatInventoryTransferInbound(Data.raw.inventory_transfer_inbound)
        Data.formatted.plant_rooms = formatPlantRooms(Data.raw.plant_room)
        Data.formatted.inventory_rooms = formatInventoryRooms(Data.raw.inventory_room)
        Data.formatted.qa_lab = formatQALabs(Data.raw.qa_lab)
        if(!!Data.raw.plant) Data.formatted.plant_derivatives = formatPlantDerivatives(Data.raw.plant_derivative, Data.raw.plant_room)
        // Data.reload = false;
  //       if(!$rootScope.$$phase) {
  //           $rootScope.$digest()
  // // $digest or $apply
  //       }
        // Save for Demo
        // ConnectService.saveForDemo(Data.formatted);
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
                console.log('NO! ');
            }
        })
        toCure.map(function(plant){
            // console.log(plant);
            plant.roomlabel = plant_rooms_by_id[plant.room]
            plant.typelabel = getinventorytypeinfo(plant.inventorytype).label

            var plants_by_id = {}
            Data.formatted.plants.map(function(p){
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
        console.log(toCure.length);
        console.log(plant_derivatives.length);
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
    function formatInventoryRooms(inventory_rooms) {
        return inventory_rooms
    }
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
        console.log(plant_rooms_by_id);
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
    function formatEmployees(employees) {
        // console.log('employees');
        // console.log(employees);
        // localStorage.setItem('employees', JSON.stringify(employees));
        return employees

    };
    function formatVehicles(vehicles) {
        console.log('vehicles');
        // localStorage.setItem('vehicles', JSON.stringify(vehicles));
        return vehicles

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
            // console.log(a);
            var b = a.split('/')
            manifest.category =  b[0]  +'/' +  b[2]
            // console.log(a + ' ' + b + ' ' + manifest.category);
            // console.log(new Date(manifest.sessiontime).getMonth())
            // manifest.category =
        })
        sortbykey(manifests, 'sessiontime');

        // localStorage.setItem('manifests', JSON.stringify(manifests));
        return manifests
    }
    //////////////////////////////////////////////
    function aggregatemanifests (mans, stops, items) {
        var aggmanifests = []
        var manifest = mans
        var manifest_stop_data = stops
        var manifest_stop_items = items
        aggmanifests = angular.copy(manifest);
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

    function getplantviewfields () {
        var vf = []
        vf.push({label: 'ID',     value: 'id'})
        vf.push({label: 'Strain', value: 'strain'})
        vf.push({label: 'State',  value: 'state'})
        vf.push({label: 'Age',    value: 'sessiontime'})
        vf.push({label: 'Mother', value: 'mother'})
        vf.push({label: 'Room',   value: 'room'})
        vf.push({label: 'Harvested', value: 'harvestcollect'})
        vf.push({label: 'Harvest Sheduled', value: 'harvestscheduletime'})
        // vf.push({label: 'Cured',  value: 'curecollect'})
        return vf
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

    function formatVendors (v) {
        var vendors = {vendorsbyid:{}, vendorsarray:[], vendorsbyubi: {}}

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
            vendor.rawphone = LicenseeInfoService.getphonebyubi(vendor.ubi)
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
        if (!Data.demo) Data.mylocation = vendors.vendorsbyubi[JSON.parse(sessionStorage.user).ubi].location;
        if (Data.demo) Data.mylocation = '41625'

        return vendors
        // localStorage.setItem('vendors', JSON.stringify(vendors))
        // $rootScope.vendors = JSON.parse(localStorage.getItem('vendors'))
        // console.log($rootScope.vendors);
        // console.log('$rootScope.vendors');
    }

    function getinventorystatuslabel (inventorystatus) {
        var statusmap = {
            1: "Scheduled for Destruction",
            2: "Scheduled for Transport",
            3: "In Transport",
        }
        return statusmap[inventorystatus];
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

    function  peinfo (typeid) {
        var typemap = gettypemap();
        return typemap[typeid];
    }

    function removedeleted (r) {
        for(var i = r.length - 1; i >= 0; i--) {
            if(r[i].deleted != 0) {
                r.splice(i, 1);
            }
        }
        return r;
    }

    function sortbykey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }

    function formatInventory(inventory) {
        var i = {}

        console.log('format inventory!!')
        console.log(inventory);
        $rootScope.mylocation = inventory[0].location
        var r = removedeleted(inventory)

        var allbarcodes = []
        var deletedids = []
        var maxsize = 0
        var totalsize = 0
        r.map(function (option, index, object) {
            allbarcodes.push(option.id);
            option.datelabel = gettimestring(option.sessiontime);
            if (option.inventorystatus != "null") {
                option.inventorystatuslabel = getinventorystatuslabel(option.inventorystatus)
                if (getinventorystatuslabel(option.inventorystatus) === 1) option.scheduled_for_destruction = true
            } else {
                option.inventorystatuslabel = "Not scheduled for transport or destruction";
            }
            option.inventorylabel = '[' + option.id + '] ';
            // Inventory Type Info
            var inventorytypeinfo = getinventorytypeinfo(option.inventorytype);
            option.weighable = inventorytypeinfo.weighable
            option.inventorytypelabel = inventorytypeinfo.label;
            option.background = inventorytypeinfo.background
            option.category = option.inventorytypelabel;
            // Format weighable
            if (!!option.usable_weight) option.usable_weight = parseFloat(option.usable_weight).toFixed(2)
            if (!!option.remaining_quantity) option.remaining_quantity = parseFloat(option.remaining_quantity).toFixed(2)
            if (!inventorytypeinfo.weighable) {
                if (!!inventorytypeinfo.seed) {
                    option.inventorylabel += option.remaining_quantity + ' x ';
                } else {
                    if (!option.usable_weight) option.usable_weight = 0
                    option.inventorylabel += option.remaining_quantity + ' x ' + option.usable_weight + ' g';
                }

            } else {
                option.inventorylabel += parseFloat(option.remaining_quantity).toFixed(2)+ ' g';
            }
            // productname
            if (!!option.productname) { option.inventorylabel += ' ' + option.productname; };
            // Strain
            if (!!option.strain) { option.inventorylabel += ' ' + option.strain; };
            // Inventory Type Label
            // option.inventorylabel += ' ' + inventorytypeinfo.label;
            // Sample
            if (option.is_sample === 1) {
                option.inventorylabel += ' (Sample)';
                // get sample results
            }
            option.expand = 1
            // }

        }); // end map
        console.log(deletedids);

        //{action:'inventory_qa_check', barcodeid: option.id}
        var qapassedrequest = {
            action: 'inventory_qa_check_all',
            barcodeid: allbarcodes
        }
        ConnectService.post(qapassedrequest, ConnectService.fail, function (qares) {
            var qa = qares.data;
            r.map(function (option) {
                qa.map(function (qao) {
                    if (qao.barcode_id === option.id) {
                        option.qa = qao;
                        if (qao.result === 1) {
                            console.log('passed');
                            option.inventorylabel += ' (QA Passed)'
                        } else if (qao.result === -1) {
                            option.inventorylabel += ' (QA Rejected)'
                        }
                        if (typeof option.inventorystatuslabel != "undefined") {
                            option.inventorylabel += ' (' + option.inventorystatuslabel + ')';
                        }
                        // console.log('THATS MISTA QAOOO');
                        // console.log(qao.test);
                        if (!!qao.test) {
                            qao.test.map(function (test) {
                                if (test.type === 1) {
                                    option.moisture = test.moisture;
                                }
                                if (test.type === 2) {
                                    option.thca = test.THCA;
                                    option.totalcann = test.Total;
                                    option.thc = test.THC;
                                    option.cbd = test.CBD;
                                }
                                if (test.type === 3) {
                                    option.stems = test.Stems;
                                    option.other = test.Other;
                                }
                                if (test.type === 4) {
                                    option.e_coli_and_salmonella = test.e_coli_and_salmonella;
                                    // option.other = test.Other;
                                    option.bile_tolerant = test.bile_tolerant;
                                    option.coliforms = test.coliforms;
                                    option.aerobic_bacteria = test.aerobic_bacteria;
                                    option.yeast_and_mold = test.yeast_and_mold;
                                }
                            })
                        }
                    }
                })
            })
            sortbykey(r, 'sessiontime');
            // $rootScope.inventory = r
            // localStorage.setItem('inventory', JSON.stringify(r));
            // console.log(localStorage);
            // Data.inventory = r
            // Data.setInventory({inventoryarray: r})

        })

        r.map( function (option) {
            if (typeof option.displayfields === 'undefined') {
                option.displayfields = []
            }
            // option.viewfields = getviewfields('inventory')
            var vf = getviewfields('inventory')
            vf.map ( function (f) {
                if (!!option[f.value]) {
                    // console.log(option[f.value]);
                    option.displayfields.push(f)
                }
            })
        });

        // r.map( function (option) {
        //     // console.log(option.deleted);
        //
        // });

        sortbykey(r, 'id');
        // $rootScope.inventory = r
        // localStorage.setItem('inventory', JSON.stringify(r))
        i.inventoryarray = r
        // return r

// Inventory by Type
        var ibt = {}
        var mytypes = []
        r.map ( function (item) {
            if (typeof ibt[item.inventorytypelabel] === "undefined") {
                ibt[item.inventorytypelabel] = []
            }
            ibt[item.inventorytypelabel].push(item)
            mytypes.push(item.inventorytypelabel)
        })
        mytypes = mytypes.filter( onlyUnique )
        var mt = []
        mytypes.map( function (t) {
            mt.push({label: t})
        })
        // $rootScope.mytypes = mt
        localStorage.setItem('mytypes', JSON.stringify(mt))
        i.mytypes = mt
        // return mt
        // console.log(ibt);
        // $rootScope.inventorybytype = ibt
        localStorage.setItem('inventorybytype', JSON.stringify(ibt))
        i.inventorybytype = ibt

        // Data.setInventory(i)
        return i
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    function getinventorytypeinfo (typeid) {
        var typemap = gettypemap();
        return typemap[typeid];
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
    function getviewfields (viewtype) {
        v = [];

        if (viewtype === "inventory") {
            v.push({label: "ID", value: "id", isbarcode: true})
            // v.push({label: "Type", value: "inventorytypelabel"})
            v.push({label: "Remaining Quantity", value: "remaining_quantity"})
            v.push({label: "Usable Weight", value: "usable_weight"})
            v.push({label: "Last Modified", value: "datelabel"})
            v.push({label: "Strain Name", value: "strain"})
            v.push({label: "Product Name", value: "productname"})
            v.push({label: "Inventory Status", value: "inventorystatuslabel"})
            v.push({label: "Moisture", value: "moisture"})
            v.push({label: "THCA", value: "thca"})
            v.push({label: "THC", value: "thc"})
            v.push({label: "CBD", value: "cbd"})
            v.push({label: "Total Cannabinoids", value: "totalcann"})
            v.push({label: "Stems", value: "stems"})
            v.push({label: "Other", value: "other"})
            v.push({label: "E. Coli and Salmonela", value: "e_coli_and_salmonella"})
            v.push({label: "Bile Tolerant", value: "bile_tolerant"})
            v.push({label: "Coliforms", value: "coliforms"})
            v.push({label: "Aerobic Bacteria", value: "aerobic_bacteria"})
            v.push({label: "Yeast and Mold", value: "yeast_and_mold"})
        }
        return v;
    }
    return {
        format: format
    };
};
})();
