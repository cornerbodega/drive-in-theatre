
angular
.module('countryApp')
.factory('pnData', ['$resource', '$rootScope',
    pnData
])



function pnData($resource, $rootScope) {
    // return function(){}
    _pnData = {
        // refresh: refresh,
        // getInventory: getInventory,

        data: {},
        resource: $resource('/api/sync_check/'+sessionStorage.sessionid)
    }

    refresh()
    function refresh() {
        _pnData.resource.get().$promise.then(function(data){
            console.log(_pnData.data);
            // $rootScope.data = data
            _pnData.data = data
            // this.data = data
            // console.log($rootScope.data);
            $rootScope.$broadcast('pnData')
            // pnDataSocket.forward('pnData')
        })
    }


    return _pnData
}
