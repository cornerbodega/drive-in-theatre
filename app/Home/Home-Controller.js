(function(){
    angular
    .module('countryApp')
    .controller('HomeController', [ '$location',
    HomeController
])

function HomeController($location) {
    if(!sessionStorage.sessionid) $location.path('/')

}
})();
