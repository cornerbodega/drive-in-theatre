(function(){
    angular
    .module('countryApp')

    .controller('TransferOutboundController', [ '$location', '$scope','pnTraceability', TransferOutboundController ])
    .controller('ReceiveInboundController', [ '$location', '$scope','pnTraceability', ReceiveInboundController ])
    .factory('pnTraceability', pnTraceability)

    function pnTraceability() {
        var _pnTraceability = {
            request: {},
            response: {}
        }

        return _pnTraceability
    }



    function TransferOutboundController($location, $scope, pnTraceability) {
        if(!sessionStorage.sessionid) $location.path('/')

    }

    function ReceiveInboundController($location, $scope, pnTraceability) {
        if(!sessionStorage.sessionid) $location.path('/')

    }

})();
