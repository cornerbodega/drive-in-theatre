(function(){
    angular
    .module('countryApp')
    .controller('HomeController', ['$location', '$scope', '$http', '$firebaseObject', '_',
    HomeController
])

function HomeController($location, $scope, $http, $fbo, _) {
    console.log('Home!!');
        $scope.my_ubi = sessionStorage.ubi
}
})();
