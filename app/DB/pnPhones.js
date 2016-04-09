
(function(){
    angular
    .module('countryApp')
    .factory('pnPhones', [ '$firebaseObject', '$firebaseArray',
    pnPhones
])

function pnPhones($firebaseObject, $firebaseArray) {
    // var hidenav = false
    var ubi = sessionStorage.ubi
    var _pnPhones = {
        ref: ref,
        fbo: fbo,
        fba: fba,
        me: me,
        me_ref: me_ref,
    }

    function ref() {
        return new Firebase("https://connect502.firebaseio.com/phones")
    }
    function fbo() {
        return $firebaseObject(ref())
    }
    function fba() {
        return $firebaseArray(ref())
    }
    function me() {
        return $firebaseObject(ref().child(ubi))
    }
    function me_ref() {
        return ref().child(ubi)
    }
    // function my_wts_ids() {
    //     return $firebaseObject(ref().child(ubi).child('wts'))
    // }
    return _pnPhones
};

})();
