
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
    }
    function timeLabler(at){
        return new Date(at).toLocaleString();
    }
    // function getVendorTypeLabelFor(locationtype){
    //     var type = ""
    //     console.log(locationtype);
    //     if (locationtype === 1) {
    //         type = 'Tier 1 Producer'
    //     }
    //     if (locationtype === 2) {
    //         type = 'Tier 2 Producer'
    //     }
    //     if (locationtype === 3) {
    //         type = 'Tier 3 Producer'
    //     }
    //     if (locationtype === 4) {
    //         type = 'Tier 1 Producer/Processor'
    //     }
    //     if (locationtype === 5) {
    //         type = 'Tier 2 Producer/Processor'
    //     }
    //     if (locationtype === 6) {
    //         type = 'Tier 3 Producer/Processor'
    //     }
    //     if (locationtype === 7) {
    //         type = 'Processor'
    //     }
    //     if (locationtype === 8) {
    //         type = 'Retailer'
    //     }
    //     return type
    // }


    return pnu
};

})();
