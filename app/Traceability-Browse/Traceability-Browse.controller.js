(function(){
    angular
    .module('countryApp')
    .controller('TraceabilityBrowseController', ['$scope','$location','pnData', TraceabilityBrowseController ])
    // .directive('pnPathsGrid', pnPathsGrid)
    // .factory('TraceabilityMenuService', [ TraceabilityMenuService ]);

    function TraceabilityBrowseController($scope, $location, pnData) {
        if ($location.path()==="/traceability/inventory/view_inventory") {
            $scope.view_inventory = true
        }
        if ($location.path()==="/traceability/inventory/browse_employees") {
            $scope.browse_inventory = true
        }

    //     // pnData.resource.get().$promise.then(function(data){
    //     //     console.log(data);
    //     //     $scope.inventory = data.inventory
    //     //     console.log(data.inventory_qa_sample);
    //     //     console.log(data);
    //     // })
    //     return {
    //         restrict: 'AE',
    //         templateUrl:'Traceability/View-Inventory.html',
    //         link: function($scope, elem, attrs) {
    //             $scope.inventory = pnData.data.inventory
    //
    //             $scope.$on('pnData', function(e){
    //                 $scope.inventory = pnData.data.inventory
    //             })
    //         }
    //     }
    //
    //     console.log($scope.inventory);
    //
    // };
}



})();
