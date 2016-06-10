(function(){
    angular
    .module('countryApp')
    .controller('TraceabilityFormController', ['$location', '$scope', 'TraceabilityFormService', TraceabilityFormController ])
    // .factory('pnForms', ['FormDataService', pnForms ])

    function TraceabilityFormController($location, $scope, TraceabilityFormService) {
        if(!sessionStorage.sessionid) $location.path('/')
        // console.log($location.path);

        var path = $location.path()
        $scope.pnFormlyModel = {}
        $scope.pnFormlyFields = TraceabilityFormService.fields(path)
        $scope.onSubmit = function($event) {
            TraceabilityFormService.onSubmit($event, path, $scope.pnFormlyModel)
        }

        $scope.select = function(item){
            $scope.selected = item
            console.log($scope.selected.id === item.id )
            if($scope.selected.id === item.id) item.$selected = true
            else item.$selected = false
            $scope.model.inventoryitem = $scope.selected
        }
        $scope.pnMultipleSelect = function(item){
            console.log(item);
            item.$selected = !item.$selected
            $scope.model.inventoryitems = [];
            $scope.to.options.map(function(i){
                if (i.$selected) $scope.model.inventoryitems.push(i)
            })
        }
        // console.log(TraceabilityFormService.fields(path));
        // if (path === "/traceability/inventory/view_inventory") {
        //     $scope.view_inventory = true;
        // }

        // "/traceability/inventory/view_inventory":

        //show the view inventory directive
        //don't show any of the other directives that may exist


    };

    // function pnForms(FormDataService) {
    //     return {}
    // }
})();
