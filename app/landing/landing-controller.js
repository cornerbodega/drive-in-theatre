(function(){
    angular
    .module('countryApp')
    .controller('LandingController', ['$location', '$scope', '$http','$anchorScroll', 'NavState',
    LandingController
])

function LandingController($location, $scope, $http, $anchorScroll, NavState) {
    var PATHS = window.PATHS
    // $scope.showSignIn = function() {
    //     $scope.sSignIn = true
    //     $scope.sSignUp = false
    // }
    // $scope.showSignUp = function() {
    //     $scope.sSignIn = false
    //     $scope.sSignUp = true
    // }
    // $scope.test = function() {
    //     $location.hash('signin');
    //     $anchorScroll();
    // }
    // $scope.$watch(function () { return NavState.landingRoute }, function (newVal, oldVal) {
    //     if (typeof newVal !== 'undefined') {
    //          $location.hash(NavState.landingRoute);
    //          console.log(NavState.landingRoute);
    //          $anchorScroll();
    //     }
    // });
    // NavState.hideNav = true;
    // NavState.hide = true
    // NavState.whereAmI('Landing')
    // console.log(NavState.hideNav);
    // console.log($rootScope.hideNav);
    $scope.signIn = signIn;
    $scope.loginData = {
        "password": "44Million!",
        "license_number": 603347225,
        "username": "luchinisupercritical@gmail.com"
    }
    // $scope.form = loginData;


    function signIn() {
        // var form = $scope.form
        var form = $scope.loginData
        // $scope.form.user_id = keyFromUserInfo($scope.form.username)
        // $http({method: 'POST', data: $scope.form, url: '/api/auth/v0/signIn'})
        $http({method: 'POST', data: form, url: '/api/auth/v0/signIn'})
        .success(function(res){
            console.log(res);

            sessionStorage.sessionid = res.sessionid
            sessionStorage.user_id = form.user_id
            sessionStorage.ubi = form.license_number
            sessionStorage.me = {}
            $http.get('/api/vendors/'+sessionStorage.ubi)
            .success(function(res){
                // sessionStorage.address2 = res.address1
                // sessionStorage.city = res.city
                sessionStorage.name = res.name
                // sessionStorage.state = res.state
                // sessionStorage.zip = res.zip
                sessionStorage.ubi = res.ubi
                sessionStorage.licensetype = res.licensetype
            })
            $location.path('/home')
            // return res
        })
        .then(function(context) {
            createUser()
            console.log(context);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    function createUser() {
        // $scope.form.user_id = keyFromUserInfo($scope.form.username)
        $http({method: 'POST', data: $scope.form, url: '/api/users/create'})


        .success(function(res){
            console.log(res);
            return res
        })
        .then(function(context) {
            console.log(context);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

console.log('hello?');
    function logInWithLiquorControlBoardAccount() {
        // $http.
    }
};

})();
