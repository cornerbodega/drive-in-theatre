(function(){
    angular
    .module('countryApp')
    .controller('HomeController', [ '$location', HomeController ])
    .directive('pnHome', pnHome)
    // .directive('pnGroupInventoryByTypeList', pnGroupInventoryByTypeList)
    .directive('pnVrGroupInventoryByTypeList', pnVrGroupInventoryByTypeList)
    .directive('pnInventoryActions', pnInventoryActions)
    .directive('pnInventorySelected', pnInventorySelected)

    function pnVrGroupInventoryByTypeList($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-vr-group-inventory-by-type-list.html',
            link: function($scope, element, attrs) {
                $scope.disabled = {}
                $scope.disabled.trace = true
                $scope.disabled.qa = true
                $scope.disabled.publish = true
                $scope.$watch(function () { return $scope.inventory }, function (newVal, oldVal) {
                    if (typeof newVal !== 'undefined') {
                        // pnSetCategories()
                        $scope.total = $scope.inventory.length
                        // console.log($scope.total);
                    }
                });
                $scope.pnSelectItem = function(item){
                    item.$selected = !item.$selected;
                    pnValidateInventoryActions()
                };
                function pnValidateInventoryActions() {
                    var selected = []
                    angular.forEach($scope.inventory, function(value, key) {
                        if(!!value.$selected) selected.push(value);
                    });
                    $scope.selected = selected
                    if (selected.length > 0) {
                        $scope.disabled.qa = false;
                        $scope.disabled.trace = false;
                        $scope.disabled.publish = false;
                    } else {
                        $scope.disabled.qa = true;
                        $scope.disabled.trace = true;
                        $scope.disabled.publish = true;
                    }
                    $scope.numSelected = selected.length
                }
            }
        }
    };

    function pnInventorySelected() {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-inventory-selected.html',
            link: function($scope, element, attrs) {

            }
        }
    };
    function pnInventoryActions(WTS, $location) {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-inventory-actions.html',
            link: function($scope, element, attrs) {
                $scope.publish = function() {
                    console.log($scope.selected);
                    WTS.selectedItems = $scope.selected
                    $location.path('/publish')
                }
            }
        }
    };
    // function pnGroupInventoryByTypeList(pnUtils) {
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'Home/templates/pn-group-inventory-by-type-list.html',
    //         link: function($scope, element, attrs) {
    //             $scope.disabled = {}
    //             $scope.disabled.trace = true
    //             $scope.disabled.qa = true
    //             $scope.disabled.publish = true
    //             $scope.$watch(function () { return $scope.inventory }, function (newVal, oldVal) {
    //                 if (typeof newVal !== 'undefined') {
    //                     pnSetCategories()
    //                 }
    //             });
    //             $scope.pnSelectItem = function(item){
    //                 item.$selected = !item.$selected;
    //                 pnValidateInventoryActions()
    //             };
    //             function pnValidateInventoryActions() {
    //                 var selected = []
    //                 angular.forEach($scope.inventory, function(value, key) {
    //                     if(!!value.$selected) selected.push(value);
    //                 });
    //                 $scope.selected = selected
    //                 if (selected.length > 0) {
    //                     $scope.disabled.qa = false;
    //                     $scope.disabled.trace = false;
    //                     $scope.disabled.publish = false;
    //                 } else {
    //                     $scope.disabled.qa = true;
    //                     $scope.disabled.trace = true;
    //                     $scope.disabled.publish = true;
    //                 }
    //                 $scope.numSelected = selected.length
    //             }
    //             function pnSetCategories() {
    //                 $scope.total = $scope.inventory.length
    //                 groupInventory()
    //                 function groupInventory() {
    //                     var titles = []
    //                     $scope.groups = _.groupBy($scope.inventory, 'clientGroupTag')
    //                     angular.forEach($scope.groups, function (value, key){
    //                         titles.push(key)
    //                     })
    //                     $scope.titles = _.uniq(titles)
    //                     console.log($scope.groups);
    //                 }
    //             }
    //             // var g = _.groupBy($scope.inventory, 'clientGroupTag')
    //             // console.log(g);
    //         }
    //     }
    // };
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
