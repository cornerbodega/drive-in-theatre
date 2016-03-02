(function(){
    angular
    .module('countryApp')
    .controller('LandingController', ['$location', '$scope', '$http','$anchorScroll', 'NavState',
    LandingController
])

function LandingController($location, $scope, $http, $anchorScroll, NavState) {
    var PATHS = window.PATHS
    $scope.showSignIn = function() {
        $scope.sSignIn = true
        $scope.sSignUp = false
    }
    $scope.showSignUp = function() {
        $scope.sSignIn = false
        $scope.sSignUp = true
    }
    $scope.test = function() {
        $location.hash('signin');
        $anchorScroll();
    }
    $scope.$watch(function () { return NavState.landingRoute }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
             $location.hash(NavState.landingRoute);
             console.log(NavState.landingRoute);
             $anchorScroll();
        }
    });
    // NavState.hideNav = true;
    NavState.hide = true
    // NavState.whereAmI('Landing')
    // console.log(NavState.hideNav);
    // console.log($rootScope.hideNav);
    $scope.signIn = signIn;
    var loginData = {
        "password": "44Million!",
        "license_number": 603347225,
        "username": "luchinisupercritical@gmail.com"
    }
    $scope.form = loginData;

    function keyFromUserInfo(uu) {
        return uu.replace(/\W/g, '');
    }
    function signIn() {
        // $scope.form.user_id = keyFromUserInfo($scope.form.username)
        $http({method: 'POST', data: $scope.form, url: '/api/auth/v0/signIn'})
        .success(function(res){
            console.log(res);
            sessionStorage.sessionid = res.sessionid
            sessionStorage.user_id = $scope.form.user_id
            sessionStorage.ubi = $scope.form.license_number
            $location.path('/welcome')
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
        // $http({method: 'POST', data: {name: 'wolverine', text:'Wolverine'}, url: '/api/looneytunes/create'})
        // $http({method: 'POST', data: $scope.form, url: '/api/auth/v0/signIn'})

        .success(function(res){
            console.log(res);
            return res
        })
        .then(function(context) {
            // $http
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
