
(function(){
    angular
    .module('countryApp')
    .factory('pnFirebase', [ '$firebaseObject', '$firebaseArray',
    pnFirebase
])
function pnFirebase($firebaseObject, $firebaseArray) {
    // var hidenav = false
    return {
        fbo: fbo,
        fba: fba
    }
    var ubi = sessionStorage.ubi
    // var _dbPath = ''
    // var _pnFirebase = function(dbPath) {
    //     _dbPath = dbPath
    //     console.log(dbPath);
    //
    //     // this.ref = ref
    //     // this.fbo= fbo
    //     // this.fba= fba
    //     // this. me = me
    //     // this.me_ref = me_ref
    // }

    function ref(dbpath) {
        return new Firebase("https://connect502.firebaseio.com/" + dbpath)
    }
    function fbo(dbpath) {
        return $firebaseObject(ref(dbpath))
    }
    function fba(dbpath) {
        return $firebaseArray(ref(dbpath))
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
    return _pnFirebase
    // return function(dbpath){
    //     return _pnFirebase
    // }
};

})();
