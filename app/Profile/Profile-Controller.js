(function(){
    angular
    .module('countryApp')
    .controller('ProfileController', ['$location', '$scope', '$http', '$firebaseArray', '$firebaseObject', '$filter', '_', 'NavState',
    ProfileController
])

function ProfileController($location, $scope, $http, $firebaseArray, $fbo, $filter, _, NavState) {
    var PATHS = window.PATHS
    // NavState.hideNav = false
    // console.log(NavState.hideNav);
    NavState.hide = false
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
    $scope.chooseWts = function (item) {
        console.log(item);
        $scope.search = item.id
        $scope.wtsItem = item
        $scope.showResults = false;
    }

    $scope.createWts = function() {
        // TODO: validation
        $scope.wtsItem.seller = sessionStorage.ubi
        $http.post('/api/v0/wts/create', $scope.wtsItem).success(wtsCreateSuccess).catch(errorhandler)
    }
    var profilePicRef =  new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/image/sizes/scaled200/")
    profilePicRef.on('value', function(dataSnapshot) {
        console.log('CHANGED!');
        $scope.profilePic = dataSnapshot.val();
        $scope.$apply()
    });
    // get my wts post ids
    // get wts posts
    // reverse order
    var my_wts_ref =  new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/wts")
    my_wts_ref.on('value', function(dataSnapshot) {
        rf_my_wts_ids(dataSnapshot.val());
    });
    function rf_my_wts_ids(s){
        var t = []
        _.map(s, function(shot){
            t.push(shot)
        })
        var r = t.reverse()
        $scope.mywtsids = r
    }
    $scope.wts = $fbo(new Firebase("https://connect502.firebaseio.com/wts"))

    function wtsCreateSuccess(res) {
        $scope.showCreateWts = false
        $scope.wtsItem={}
        $scope.search = ''
        console.log(res);
    }
    function wtsGetSuccess(res) {
        console.log(res);
    }
    function errorhandler(err){
        console.log(err);
    }

};

})();
