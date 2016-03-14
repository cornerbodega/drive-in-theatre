
(function(){
    angular
    .module('countryApp')
    .factory('CreateWts', [ 'WTS', 'pnUsers', '$q',
    CreateWts
])

function CreateWts(WTS, pnUsers, $q) {

    var _CreateWts = {
        create: create
    }
    function create(product, cb) {
        var wts = WTS.wts_fbo()
        // var me = pnUsers.me()
        // $q.all(wts.$loaded(), me.$loaded()).then(init)
        wts.$loaded().then(init)
        function init() {
            // console.log(wts);
            // console.log(me);
            // console.log(product)
            product.at = Date.now()
            product.seller = sessionStorage.ubi
            product.sellerInfo = {name: sessionStorage.name, license: sessionStorage.licensetype, ubi: sessionStorage.ubi };
            // wts.add(product).then(function(){console.log('added successfully!');})
            console.log(product);
            wts[product.id] = product
            wts.$save().then(cb())
            // if (!me.wts) me.wts = {}
            // me.wts[product.id] = true

            // $q.all(wts.$save(), me.$save()).then(cb())
        }

    }
    return _CreateWts
};

})();
