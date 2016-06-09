
(function(){
    angular
    .module('countryApp')
    .factory('pnUtils', [
    pnUtils
])

function pnUtils() {
    // var hidenav = false
    var pnu = {
        timeLabler: timeLabler,
        getVendorTypeLabelFor: getVendorTypeLabelFor,
        getTypeInfo: getTypeInfo,
    }
    function timeLabler(at){
        return new Date(at).toLocaleString();
    }
    function getVendorTypeLabelFor(locationtype){
        var type = locationtype
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

    return pnu
};

})();
