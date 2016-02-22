(function(){
    angular
    .module('countryApp')
    .controller('ProfileController', ['$location', '$scope', '$http', '$firebaseObject',
    ProfileController
])

function ProfileController($location, $scope, $http, $firebaseObject) {
    var PATHS = window.PATHS
    // ### LOAD MY VENDOR INFORMATION ###
    $http.get('/api/vendors/'+sessionStorage.ubi)
    .success(function(res){
        $scope.address2 = res.address1
        $scope.city = res.city
        $scope.name = res.name
        $scope.state = res.state
        $scope.zip = res.zip
        $scope.ubi = res.ubi
        $scope.licensetype = res.licensetype
    })
    // Test Vendor API
    // $http.get('/api/vendors').success(function(res){console.log(res);})
    // $http.get('/api/vendors/'+sessionStorage.ubi).success(function(res){console.log(res);})

    // ### LOAD MY INVENTORY DATA
    // $http.get('/api/inventory/' + sessionStorage.sessionid)
    $http.get('/api/inventory/'+sessionStorage.sessionid).success(inventoryInit)

    function inventoryInit(inventory) {
        $scope.inventory = inventory
        // console.log($scope.inventory);
        // $scope.inventory.map(function(item){
        //     if(item.qa) console.log(item);
        // })
    }
    $scope.inputChanged = function() {
        $scope.showResults = true;
    }
    $scope.chooseLts = function (item) {
        console.log(item);
        $scope.search = item.id
        $scope.ltsItem = item
        $scope.showResults = false;
    }

    $scope.createLts = function() {
        // TODO: validation
        $scope.ltsItem.seller = sessionStorage.ubi
        $http.post('/api/v0/lts/create', $scope.ltsItem).success(ltsCreateSuccess).catch(errorhandler)
    }

    // Using AngularFire for real-time updating! (it works)
    $scope.myLtsIds = $firebaseObject(new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/lts"))
    $scope.ltss = $firebaseObject(new Firebase("https://connect502.firebaseio.com/lts"))

    function ltsCreateSuccess(res) {
        $scope.showCreateLts = false
        console.log(res);
    }
    function errorhandler(err){
        console.log(err);
    }

};

})();
