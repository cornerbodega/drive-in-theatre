(function(){
    angular
    .module('countryApp')
    .controller('LandingController', ['$location', '$scope', '$http', 'pnUsers',
    LandingController
])

function LandingController($location, $scope, $http, pnUsers) {
    var PATHS = window.PATHS

    $scope.signIn = signIn;
    // $scope.loginData = {
    //     "password": "44Million!",
    //     "license_number": 603347225,
    //     "username": "luchinisupercritical@gmail.com"
    // }
    $scope.loginData = {
        "password": "2ndCaptainBly",
        "license_number": "602093924",
        "username": "thepottingbench@outlook.com"
    }


    function signIn() {
        // var form = $scope.form
        var form = $scope.loginData
        $http({method: 'POST', data: form, url: '/api/auth/v0/signIn'})
        .success(function(res){
            console.log(res);
            if(res.success != 1) {
                console.log('Log In to LCB Failed ' + res.error )
                return $scope.error = res.error
            }
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
        // TEMPORARY
        var form = $scope.loginData

        var users = pnUsers.fbo()
        users.$loaded().then(init)
        function init() {
            if (users[form.license_number]) {
                return console.log('user exists!');
            }
            else {
                users[form.license_number] = $scope.form
            }
        }
        // $scope.form.user_id = keyFromUserInfo($scope.form.username)
        // $http({method: 'POST', data: $scope.form, url: '/api/users/create'})


        // .success(function(res){
        //     console.log(res);
        //     return res
        // })
        // .then(function(context) {
        //     console.log(context);
        // })
        // .catch(function(err) {
        //     console.log(err);
        // })
    }

console.log('hello?');
    function logInWithLiquorControlBoardAccount() {
        // $http.
    }
};

})();
