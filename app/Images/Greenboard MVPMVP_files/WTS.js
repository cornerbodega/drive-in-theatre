
(function(){
    angular
    .module('countryApp')
    .factory('WTS', [ '$firebaseObject', '$firebaseArray',
    WTS
])

function WTS($fbo, $fba) {
    // var hidenav = false
    var wts = {
        wts_ref: wts_ref,
        wts_fbo: wts_fbo,
        wts_fba: wts_fba,
    }

    function wts_ref() {
        return new Firebase("https://connect502.firebaseio.com/wts")
    }

    function wts_fbo() {
        return $fbo(wts_ref())
    }
    function wts_fba() {
        return $fba(wts_ref())
    }

    return wts
};

})();
