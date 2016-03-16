(function(){
    angular
    .module('countryApp')
    .controller('MarketController', [
    MarketController
])

function MarketController() {
    if(!sessionStorage.sessionid) $location.path('/')
};

})();
