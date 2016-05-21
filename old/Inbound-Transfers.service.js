
angular
.module('countryApp')
.factory('InboundTransfersService', ['$resource', '$rootScope', 'ConnectService',
    InboundTransfersService
])
// .factory('pnDataSocket', function (socketFactory) {
//   return socketFactory();
// })


function InboundTransfersService($resource, $rootScope, ConnectService) {
    // return function(){}
    _InboundTransfersService = {
        refresh: refresh,
        // getInventory: getInventory,

    }
    // refresh()
    function refresh() {
        var defer = $q.defer()

        ConnectService.pnPost({
            action:'inventory_manifest_lookup',
            location: sessionStorage.myLocation,
        }).success(function(inbound_transfers){
            console.log(inbound_transfers);
            if(!inbound_transfers.data) {
                console.log('No Pending Inbound Transfers');
                //Todo: Popup/ message saying no transfers!
                defer.reject("No Pending Transfers")
                return
            }
            inbound_transfers.data.map(function(manifest){
                // ConnectService.post(, fail, function(res){
                ConnectService.pnPost({
                    action:'inventory_transfer_lookup',
                    manifest_id: manifest.id,
                    location: mylocation
                }).success(function(item){
                    if (!manifest.items) manifest.items = [];
                    manifest.items.push(item)
                    console.log(manifest);
                })
            })

        })
        // return defer
        // return $http({
        //     method: 'POST',
        //     url: '/api/post-wrapper',
        //     data: {
        //         request: {
        //             action:'inventory_manifest_lookup',
        //             location: sessionStorage.myLocation,
        //             API: '4.0',
        //             sessionid: sessionStorage.sessionid
        //         }
        //     },
        //     datatype: 'json',
        // })
    }

    // .post(, fail, function(res){
    //     // console.log(res);
    //     res.data.map(function(manifest){
    //         manifest.label = manifest.transfer_date + ' [' +manifest.manifest_id+'] ' + manifest.trade_name + ' ('+manifest.item_count+')'
    //     })
    //     $scope.to.options = res.data
    // // data: {},
    // // resource: $resource('/api/inbound_transfers/'+sessionStorage.sessionid)
    // }

    // refresh()
    // function refresh() {
    //     _pnData.data = _pnData.resource.get()
    //     // console.log(_pnData.data);
    //     _pnData.data.$promise.then(function(data){
    //         console.log(_pnData.data);
    //         $rootScope.data = data
    //         // console.log($rootScope.data);
    //         $rootScope.$broadcast('pnData')
    //         // pnDataSocket.forward('pnData')
    //     })
    // }


    return _InboundTransfersService
}
