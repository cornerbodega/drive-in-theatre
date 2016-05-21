(function(){
    angular
    .module('countryApp')

    .controller('TransferOutboundController', [ '$location', '$scope','pnTraceability', '$http', TransferOutboundController ])
    .controller('ReceiveInboundController', [ '$location', '$scope','pnTraceability', '$http', ReceiveInboundController ])
    .factory('pnTraceability', pnTraceability)

    function pnTraceability() {
        var _pnTraceability = {
            request: {},
            response: {},
            
        }

        return _pnTraceability
    }



    function TransferOutboundController($location, $scope, pnTraceability, $http) {
        if(!sessionStorage.sessionid) $location.path('/')
        $http.get('/api/manifests/'+sessionStorage.sessionid).success(function(manifests) {
            console.log(manifests);
            $scope.manifests = manifests
        })
    }

    function ReceiveInboundController($location, $scope, pnTraceability, $http) {
        if(!sessionStorage.sessionid) $location.path('/')

    }

})();
