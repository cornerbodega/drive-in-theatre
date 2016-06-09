
(function(){
    angular
    .module('countryApp')
    .factory('pnUsers', [ '$firebaseObject',
    pnUsers
])

function pnUsers($firebaseObject) {
    // var hidenav = false
    var ubi = sessionStorage.ubi
    var _pnUsers = {
        ref: ref,
        fbo: fbo,
        me: me,
        me_ref: me_ref,
    }

    function ref() {
        return new Firebase("https://connect502.firebaseio.com/users")
    }
    function fbo() {
        return $firebaseObject(ref())
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
    return _pnUsers
};

})();
