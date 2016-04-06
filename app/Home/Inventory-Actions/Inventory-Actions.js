(function(){
    angular
    .module('countryApp')

    .controller('CreateManifestController', [ '$location', '$scope', '$http','pnTraceability', CreateManifestController ])
    .controller('TransferOutboundController', [ '$location', '$scope','pnTraceability', TransferOutboundController ])
    .controller('ReceiveInboundController', [ '$location', '$scope','pnTraceability', ReceiveInboundController ])
    .factory('pnTraceability', pnTraceability)

    function pnTraceability() {
        var _pnTraceability = {}

        return _pnTraceability
    }

    function CreateManifestController($location, $scope, $http, pnTraceability) {
        if(!sessionStorage.sessionid) $location.path('/')
        if(!pnTraceability.selected) $location.path('/home')
        $scope.selected = pnTraceability.selected
        $scope.createManifestForm = {}
        $http.get('/api/vendors')
        .success(function(vendors){
            $scope.vendors = vendors
            if (!$scope.vendors) console.log('Error 3241: Unable to get Vendors for create manifest form!');
            $scope.createManifestForm.location = $scope.vendors[sessionStorage.ubi]
            if (!$scope.createManifestForm.location) console.log('Error 324! Unable to find my location/license number!');
        })

        $http.get('/api/employees/'+sessionStorage.sessionid).success(function(employees) {
            $scope.employees = employees
            console.log($scope.employees);
        })

        $http.get('/api/vehicles/'+sessionStorage.sessionid).success(function(vehicles) {
            $scope.vehicles = vehicles
            console.log($scope.vehicles);
        })

    }

    function TransferOutboundController($location, $scope, pnTraceability) {
        if(!sessionStorage.sessionid) $location.path('/')

    }

    function ReceiveInboundController($location, $scope, pnTraceability) {
        if(!sessionStorage.sessionid) $location.path('/')

    }

})();
