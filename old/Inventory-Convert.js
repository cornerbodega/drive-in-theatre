(function(){
    angular
    .module('countryApp')
    .directive('pnInventoryConvert', ['pnData', pnInventoryConvert ])
    // .directive('pnPathsGrid', pnPathsGrid)
    // .factory('TraceabilityMenuService', [ TraceabilityMenuService ]);

    function pnInventoryConvert(pnData) {


        // pnData.resource.get().$promise.then(function(data){
        //     console.log(data);
        //     $scope.inventory = data.inventory
        //     console.log(data.inventory_qa_sample);
        //     console.log(data);
        // })
        return {
            restrict: 'AE',
            templateUrl:'Traceability/Inventory-Convert.html',
            link: function($scope, elem, attrs) {
                // $scope.inventory = pnData.data.inventory
                // console.log(pnData.data.inventory);
                // $scope.$on('pnData', function(e){
                //     $scope.inventory = pnData.data.inventory
                // })
            }
        }

        console.log($scope.inventory);

    };




})();
