(function(){
    angular
    .module('countryApp')
    .controller('HomeController', [ '$location', HomeController ])
    .directive('pnHome', pnHome)
    // .directive('pnGroupInventoryByTypeList', pnGroupInventoryByTypeList)
    .directive('pnVrGroupInventoryByTypeList', pnVrGroupInventoryByTypeList)
    .directive('pnVrGroupInventoryByTypeTable', pnVrGroupInventoryByTypeTable)
    .directive('pnInventoryActions', pnInventoryActions)
    .directive('pnInventorySelected', pnInventorySelected)
    // .directive('pnTraceabiltyActions', pnTraceabiltyActions)
    .directive('pnTraceActions', pnTraceActions)

    function pnTraceActions($location, pnTraceability) {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-trace-actions.html',
            link: function($scope, element, attrs) {
                $scope.toAction = function(type) {
                    if (type === 'adjust-weight') $location.path('/adjust-weight')
                    if (type === 'create-manifest') $location.path('/create-manifest')
                    if (type === 'transfer-outbound') $location.path('/transfer-outbound')
                    if (type === 'receive-inbound') $location.path('/receive-inbound')
                    pnTraceability.selected = $scope.selected
                    pnTraceability.numSelected = $scope.numSelected
                }
            }
        }
    };
    // function pnTraceabiltyActions() {
    //     console.log('I am dir');
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'Home/templates/traceability/pn-traceability-actions.html',
    //         link: function($scope, element, attrs) {
    //             console.log('???');
    //         }
    //     }
    // }
    function pnVrGroupInventoryByTypeTable(WTS) {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-vr-group-inventory-by-type-table.html',
            link: function($scope, element, attrs) {
                //
                $scope.disabled = {}
                // $scope.disabled.trace = true
                // $scope.disabled.qa = true
                $scope.disabled.publish = true
                attachImages()
                function attachImages(){
                    var wts = WTS.wts_fbo()
                    wts.$loaded().then(init)
                    function init() {
                        angular.forEach($scope.inventory, function(item) {
                            if (!wts[item.id]) return
                            if (!wts[item.id].image) return
                            item.image = wts[item.id].image
                            console.log(item);
                        })
                        // $scope.$apply()
                        // angular.forEach(wts, function(w) {
                        //
                        // })
                    }
                }
                $scope.products = $scope.inventory
                $scope.$watch(function () { return $scope.inventory }, function (newVal, oldVal) {
                    if (typeof newVal !== 'undefined') {
                        // pnSetCategories()
                        $scope.total = $scope.inventory.length
                        attachImages()
                        // console.log($scope.total);
                    }
                });
                $scope.pnSelectItem = function(item){
                    item.$selected = !item.$selected;
                    pnValidateInventoryActions()
                };
                $scope.pnValidateInventoryActions = pnValidateInventoryActions;
                function pnValidateInventoryActions() {

                    var selected = []
                    angular.forEach($scope.inventory, function(value, key) {
                        console.log(value.$selected);
                        if(!!value.$selected) selected.push(value);
                    });
                    $scope.selected = selected
                    console.log(selected);
                    // if (selected.length > 0) {
                    //     $scope.disabled.qa = false;
                    //     $scope.disabled.trace = false;
                    //     $scope.disabled.publish = false;
                    // } else {
                    //     $scope.disabled.qa = true;
                    //     $scope.disabled.trace = true;
                    //     $scope.disabled.publish = true;
                    // }
                    $scope.numSelected = selected.length
                    console.log($scope.numSelected);

                    $scope.numSelected > 0 ? $scope.disabled.publish = false : $scope.disabled.publish = true
                }
            }
        }
    };

    function pnVrGroupInventoryByTypeList(WTS) {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-vr-group-inventory-by-type-list.html',
            link: function($scope, element, attrs) {
                //
                $scope.disabled = {}
                // $scope.disabled.trace = true
                // $scope.disabled.qa = true
                $scope.disabled.publish = true
                attachImages()
                function attachImages(){
                    var wts = WTS.wts_fbo()
                    wts.$loaded().then(init)
                    function init() {
                        angular.forEach($scope.inventory, function(item) {
                            if (!wts[item.id]) return
                            if (!wts[item.id].image) return
                            item.image = wts[item.id].image
                            console.log(item);
                        })
                        // $scope.$apply()
                        // angular.forEach(wts, function(w) {
                        //
                        // })
                    }
                }
                $scope.products = $scope.inventory
                $scope.$watch(function () { return $scope.inventory }, function (newVal, oldVal) {
                    if (typeof newVal !== 'undefined') {
                        // pnSetCategories()
                        $scope.total = $scope.inventory.length
                        attachImages()
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
                    // if (selected.length > 0) {
                    //     $scope.disabled.qa = false;
                    //     $scope.disabled.trace = false;
                    //     $scope.disabled.publish = false;
                    // } else {
                    //     $scope.disabled.qa = true;
                    //     $scope.disabled.trace = true;
                    //     $scope.disabled.publish = true;
                    // }
                    $scope.numSelected = selected.length
                    $scope.numSelected > 0 ? $scope.disabled.publish = false : $scope.disabled.publish = true
                }
            }
        }
    };

    function pnInventorySelected() {
        return {
            restrict: 'E',
            templateUrl: 'Home/templates/pn-inventory-selected.html',
            link: function($scope, element, attrs) {
                $scope.deselectAll = function() {
                    _.map($scope.inventory, function(item) {
                        if (item.$selected) item.$selected = false;
                        $scope.selected = []
                        $scope.numSelected = 0
                    })
                }
                // $scope.selectAll = function() {
                //     console.log('selectAll!');
                // }
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
