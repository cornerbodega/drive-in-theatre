(function(){
    angular
    .module('countryApp')
    .controller('SignUpController', ['$http','$location', '$scope', 'pnUsers', 'pnUtils',
    SignUpController
])

function SignUpController($http, $location, $scope, pnUsers, pnUtils) {
    $scope.go = function() {
        var form = {
            API:'4.0', action: 'login', username: $scope.email, password: $scope.password, license_number: $scope.ubi
        }
        // console.log(form);
        // $scope.loginData = {
        //     "password": "2ndCaptainBly",
        //     "license_number": "602093924",
        //     "username": "thepottingbench@outlook.com"
        // }
        $scope.loginData = {
            "password": "44Million!",
            "license_number": 603347225,
            "username": "luchinisupercritical@gmail.com"
        }
        form = $scope.loginData
        $http({method: 'POST', data: form, url: '/api/auth/v0/signIn'}).success(function(res) {
            if(res.success != 1) {
                console.log('Log In to LCB Failed ' + res.error )
                return $scope.in.error = res.error
            }
            sessionStorage.ubi = form.license_number
            sessionStorage.sessionid = res.sessionid

            $http.get('/api/vendors/'+sessionStorage.ubi).success(function(res){
                sessionStorage.myName = res.name
                sessionStorage.myLocation = res.location
                // console.log(res);
            })
            createUser()
            function createUser() {
                var users = pnUsers.fbo()
                users.$loaded().then(init)
                function init() {
                    users[form.license_number] = form;
                    users.$save().then(function(){
                        $location.path('/traceability');
                    })
                }
            }

        })
    }
    // $scope.up = {};
    // $scope.in = {};
    //
    // $scope.in.go = function() {
    //     var form = {
    //         API:'4.0', action: 'login', username: $scope.in.email, password: $scope.in.password, license_number: $scope.in.ubi
    //     }
    //     // console.log(form);
    //     // $scope.loginData = {
    //     //     "password": "2ndCaptainBly",
    //     //     "license_number": "602093924",
    //     //     "username": "thepottingbench@outlook.com"
    //     // }
    //     $scope.loginData = {
    //         "password": "44Million!",
    //         "license_number": 603347225,
    //         "username": "luchinisupercritical@gmail.com"
    //     }
    //     form = $scope.loginData
    //     $http({method: 'POST', data: form, url: '/api/auth/v0/signIn'}).success(function(res) {
    //         if(res.success != 1) {
    //             console.log('Log In to LCB Failed ' + res.error )
    //             return $scope.in.error = res.error
    //         }
    //         sessionStorage.ubi = form.license_number
    //         sessionStorage.sessionid = res.sessionid
    //         // sessionStorage.city = res.city
    //         // sessionStorage.name = res.name
    //
    //         $location.path('/market');
    //
    //     })
    //
    // }
    //
    // $scope.up.go = function() {
    //     // var user = {}
    //     // user.name = $scope.up.name;
    //     // user.password = $scope.up.password;
    //     // user.ubi = $scope.up.ubi;
    //     // user.username = $scope.up.username;
    //     // user.phone = $scope.up.phone;
    //
    //
    //     // create new firebase object with this information
    //     validateSignUp()
    //     function validateSignUp() {
    //         // do form validation and error handling here
    //         // have a state s.t. the form can't execute until valid
    //
    //         // try logging in with lcb info. If it succeeds, create the account, log the user in, and go to the market Page
    //         // if the log in fails, stay on this page and give the user an error message telling them their lcb info is invalid
    //         var form = {
    //             API:'4.0', action: 'login', username: $scope.up.email, password: $scope.up.password, license_number: $scope.up.ubi
    //         }
    //         $http({method: 'POST', data: form, url: '/api/auth/v0/signIn'})
    //         .success(function(res){
    //             console.log(res);
    //             if(res.success != 1) {
    //                 console.log('Log In to LCB Failed ' + res.error )
    //                 return $scope.up.error = res.error
    //             }
    //             createUser()
    //             function createUser() {
    //                 var users = pnUsers.fbo()
    //                 users.$loaded().then(init)
    //                 function init() {
    //                     users[form.license_number] = form;
    //                     users.$save();
    //                     // $location.path('/market');
    //                     // $scope.in.email = $scope.up.email
    //                     // $scope.in.password = $scope.up.password
    //                     // $scope.in.ubi = $scope.up.ubi
    //                     $scope.in.go()
    //                 }
    //             }
    //             // sessionStorage.sessionid = res.sessionid
    //             // // sessionStorage.user_id = form.user_id
    //             // sessionStorage.ubi = form.license_number
    //             // sessionStorage.me = {}
    //             // $http.get('/api/vendors/'+sessionStorage.ubi)
    //             // .success(function(res){
    //             //     // sessionStorage.address2 = res.address1
    //             //     sessionStorage.city = res.city
    //             //     sessionStorage.name = res.name
    //             //     // sessionStorage.state = res.state
    //             //     // sessionStorage.zip = res.zip
    //             //     sessionStorage.ubi = res.ubi
    //             //     _license_type = pnUtils.getVendorTypeLabelFor(res.licensetype)
    //             //     // console.log(res.licensetype);
    //             //     sessionStorage.licensetype = _license_type
    //                 // console.log(sessionStorage.licensetype);
    //                 // createUser()
    //
    //             // })
    //
    //
    //         })
    //     }
    // }

};

})();
