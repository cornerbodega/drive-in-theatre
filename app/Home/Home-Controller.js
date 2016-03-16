(function(){
    angular
    .module('countryApp')
    .controller('HomeController', [
    HomeController
])

function HomeController() {
    if(!sessionStorage.sessionid) $location.path('/')

}
})();
