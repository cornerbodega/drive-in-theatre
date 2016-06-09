
(function(){
    angular
    .module('countryApp')
    .factory('CreateWts', [ 'WTS', 'pnUsers', '$q', 'pnPhones',
    CreateWts
])

function CreateWts(WTS, pnUsers, $q, pnPhones) {

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
            var licensetype = ""
            // if (sessionStorage.licensetype) licensetype = sessionStorage.licensetype
            product.at = Date.now()
            product.seller = sessionStorage.ubi
            product.sellerInfo = {name: sessionStorage.name, license: sessionStorage.licensetype, ubi: sessionStorage.ubi };
            product.sellerName = sessionStorage.name
            product.sellerLicense = sessionStorage.licensetype
            console.log(product.sellerPhone);
            if(product.sellerPhone) {
                var phones = pnPhones.fbo()
                phones.$loaded().then(function(){
                    if(!phones[sessionStorage.ubi]) phones[sessionStorage.ubi] = []
                    phones[sessionStorage.ubi].push(product.sellerPhone)
                    phones.$save()
                })
            }
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
