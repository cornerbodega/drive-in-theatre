
angular
.module('countryApp')
.factory('Data', [
    Data
]);

function Data() {
    var formatted = {}
    var reload = true
    var raw = {}
    console.log('MAC');
    function loadDemoData() {
        // formatted =
        console.log('loadDemoData');
    }

    return {
        demo: sessionStorage.demo,
        loadDemoData: loadDemoData,
        raw: raw,
        formatted: formatted,
        tablesum: {},
        reload: reload,
        mylocation : '',
        // demoData: demoData
    }
}
