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
        var barcodeids = _.map(ibody.inventory, function(item){ return item.id })
        var qareq = {
            action: 'inventory_qa_check_all',
            sessionid: req.params.sessionid,
            barcodeid: barcodeids
        };

        request(lcbPost(qareq), formatAndReturn);
        function formatAndReturn(error, qaresponse, qabody){
            res.send(formatInventoryAndQA(ibody.inventory, qabody.data));
        }

        function formatInventoryAndQA(inventory, qa) {
            _.map(inventory, function(i) {
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
                    };
                });
            });
            return inventory
        };
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
