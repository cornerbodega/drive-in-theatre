(function(){
    angular
    .module('countryApp')
    .controller('IndexController', ['$location', '$scope', 'NavState',
    IndexController
])

function IndexController($location, $scope, NavState) {
    // $scope.hideNav = NavState.hide
    // $scope.toRetailer = function(){
    //     NavState.landingRoute = 'retailer'
    // }
    // $scope.toConn = function(){
    //     NavState.landingRoute = 'conn'
    // }
    // $scope.toProPro = function(){
    //     NavState.landingRoute = 'propro'
    // }
    $scope.$watch(function () { return NavState.hide }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            $scope.hideNav = NavState.hide;
        }
    });
    // NavState.whereAmI('Index')
    // $scope.$on('NavStateChange', function(){
    //     console.log('Change state!');
    // })
    console.log($scope.hideNav);
    // if ($rootScope.hideNav) $scope.hideNav = $rootScope.hideNav;
    // console.log($rootScope.hideNav);

    // if ($location.path()==="/") $scope.hideNav = true
};

})();
