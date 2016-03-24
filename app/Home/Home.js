(function(){
    angular
    .module('countryApp')
    .controller('HomeController', [ '$location', HomeController ])
    .directive('pnHome', pnHome)
    .directive('pnGroupInventoryByTypeList', pnGroupInventoryByTypeList)

function pnGroupInventoryByTypeList(pnUtils) {
    return {
        restrict: 'E',
        templateUrl: 'Home/templates/pn-group-inventory-by-type-list.html',
        link: function($scope, element, attrs) {

            $scope.$watch(function () { return $scope.inventory }, function (newVal, oldVal) {
                if (typeof newVal !== 'undefined') {
                     pnSetCategories()
                }
            })
            function pnSetCategories() {
            //     // $scope.groups = _.groupBy($scope.inventory, 'clientGroupTag')
                var titles = []

                $scope.groups = _.groupBy($scope.inventory, 'clientGroupTag')
                angular.forEach($scope.groups, function (value, key){
                    // console.log(value);
                    // console.log(key + ' ' + value);
                    titles.push(key)
                })
                $scope.titles = _.uniq(titles)
                
                console.log($scope.groups);

            //
            }
            // var g = _.groupBy($scope.inventory, 'clientGroupTag')
            // console.log(g);
        }
    }

}
function pnHome($http) {
    return {
        restrict: 'E',
        scope: {  },
        templateUrl: 'Home/templates/pn-home.html',
        link: function($scope, element, attrs) {
            if (!!sessionStorage.inventory) $scope.inventory = JSON.parse(sessionStorage.inventory)
            $http.get('/api/inventory/' + sessionStorage.sessionid).success(inventoryInit)
            function inventoryInit(inventory) {
                $scope.inventory = _.sortBy(inventory, '-sessiontime')
                sessionStorage.inventory = JSON.stringify(inventory)
            }
        }
    }
}
function HomeController($location) {
    if(!sessionStorage.sessionid) $location.path('/')

}
})();
