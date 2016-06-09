(function(){
    angular
    .module('countryApp')
    .controller('MarketController', ['$location',
    MarketController
])

function MarketController($location) {
    if(!sessionStorage.sessionid) $location.path('/')
};

})();
