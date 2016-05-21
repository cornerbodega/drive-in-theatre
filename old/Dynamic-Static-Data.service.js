
angular
.module('countryApp')
.factory('DynamicStaticDataService', ['ConnectService', 'ResponseFormatter','$q', 'Data',
DynamicStaticDataService
]);

function DynamicStaticDataService(ConnectService, ResponseFormatter, $q, Data) {
    var mydata = {}
    var tables_to_sync = []
    var lcb_api_url = 'https://wslcb.mjtraceability.com/serverjson.asp';
    var defer = $q.defer()

    localStorage.clear()
    var tables_to_sync = [
       'vehicle', // x
       'employee', // x
       'plant_room',
       'inventory_room',
       'inventory', // x
       'plant',
       'plant_derivative',
       'manifest',
       'inventory_transfer',
       'inventory_transfer_inbound',
       'sale',
       'tax_report',
       'vendor',
       'qa_lab',
       'inventory_adjust',
       'inventory_qa_sample',
       'inventory_sample',
    ];
    var sync_check_request = {
        "API": "4.0",
        "action": "sync_check",
        "data": [],
        "download": 1,
        // "active": 1,
    }
    refreshall()
    function refreshall() {
        
        refresh(tables_to_sync)
        return defer.promise
    }


    function refreshPromise() {
        defer = $q.defer()
        // console.log('PROMISE REFRESHED');
    }
    function syncCheckCallback(res) {
        res = JSON.parse(res);
        console.log(res);
        Data.raw= {}
        tables_to_sync.map(function(table){
            Data.raw[table] = res[table]
            if (!Data.raw[table]) {
                console.log(Data.raw[table]);
                console.log(table);
                return
            }
            if (table = 'manifest') {
                Data.raw.manifest_stop_data = res.manifest_stop_data
                Data.raw.manifest_stop_items = res.manifest_stop_items
            }

        })
        console.log(Data.raw);



        res.summary.map(function(s) {
            Data.tablesum[s.table] = s.sum
        })

        console.log(Data.raw);

        console.log('Sync Check Callback!! Data:');
        console.log(Data);


        return defer.resolve(ResponseFormatter.format())


        // console.log(Data);
    }

    // function format(rawData){
    //     for (rd in rawData){
    //         console.log(DataFormatter[rd])
    //     }
    // }
    function refresh(tablestosync) {
        // tables_to_sync = tablestosync
        // console.log(Data.tablesum);
        sync_check_request.data = []
        tables_to_sync.map( function( table ) {
            if (!Data.tablesum[table]){ var mysum = 0 }
            else { mysum = Data.tablesum[table] }
            sync_check_request.data.push({table: table, active: 1 })
        })
        console.log("Data");
        console.log(Data);
        console.log('Data.demo:');
        console.log(Data.demo);
        console.log('Data.reload:');
        console.log(Data.reload);
        if (Data.demo && Data.reload) {ConnectService.getDemoData(syncCheckCallback)}
        else if (Data.reload){
            ConnectService.post(sync_check_request, fail, syncCheckCallback)
        }

        // if (Data.reload) ConnectService.getFromBrsPos(sync_check_request).then(function(pos_data) {
        //     console.log(pos_data.data);
        //     if (!!pos_data.data.data) {
        //         var r = pos_data.data.data.substring(1, pos_data.data.data.length-1);
        //         syncCheckCallback(JSON.parse(r))
        //         ConnectService.post(sync_check_request, fail, syncCheckCallback)
        //     }
        //
        //     // if brs_pos is updated, sync_check_callback, resolve
        //     // else, Call ConnectService with a sync_check_request
        //     // defer.resolve()
        //
        // })
    }
    function fail( res ) {
        console.log(res);
    }
    // function handleSyncCheckResponse( res ) {
    //
    //     // localStorage.removeItem('inventory');
    //     console.log(res.inventory_transfer_inbound);
    //     console.log('localStorage cleared');
    //     console.log(localStorage);
    //     tables_to_sync.map( function( table ) {
    //         if (!!res[table]) {
    //             mydata[table] = res[table]
    //             if (table = 'manifest') {
    //                 mydata.manifest_stop_data = res.manifest_stop_data
    //                 mydata.manifest_stop_items = res.manifest_stop_items
    //             }
    //         }
    //     })
    //     console.log(mydata);
    //     // console.log('DATA IS READYISHs')    ;
    //     // ResponseFormatter.formatMyData(tables_to_sync, mydata)
    //     return defer.resolve(ResponseFormatter.formatMyData(tables_to_sync, mydata))
    // }
    return {
        mydata: mydata,
        refresh: refresh,
        refreshAll: refreshall,
        refreshPromise: refreshPromise
    }
}
