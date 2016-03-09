
(function(){
    angular
    .module('countryApp')
    .factory('WTS', [ '$firebaseObject',
    WTS
])

function WTS($fbo) {
    // var hidenav = false
    var wts = {
        wts_ref: wts_ref,
        wts_fbo: wts_fbo,
    }

    function wts_ref() {
        return new Firebase("https://connect502.firebaseio.com/wts")
    }

    function wts_fbo() {
        return $fbo(wts_ref())
    }



    return wts
};

})();
