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
