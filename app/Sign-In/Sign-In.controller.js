(function(){
    angular
    .module('countryApp')
    .controller('SignInController', ['$location',
    SignInController
])

function SignInController($location) {
    if(!sessionStorage.sessionid) $location.path('/')
};

})();
