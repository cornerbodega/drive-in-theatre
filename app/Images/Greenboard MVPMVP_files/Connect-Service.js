(function () {
    angular
    .module('countryApp')
    .factory('ConnectService', [
        '$http', 'Data',
        ConnectService
    ]);

    function ConnectService($http, Data) {
        return {
            pnPost: function(data){
                data.sessionid = sessionStorage.sessionid;
                data.API = "4.0";
                console.log(JSON.stringify(data));

                return $http({
                    method: 'POST',
                    url: '/api/post-wrapper',
                    data: {
                        request: data
                    },
                    datatype: 'json',
                })
            },
            post: function (data, fCallback, sCallback) {

                if (typeof sessionStorage.sessionid != 'undefined') {
                    data.sessionid = sessionStorage.sessionid;
                    console.log(data);
                }

                data.API = "4.0";
                console.log(JSON.stringify(data));
                $http({
                    method: 'POST',
                    url: '/api/post-wrapper',
                    data: { request: data },
                    datatype: 'json',
                }).success(function (res) {
                    if (res.success == 1) {
                        sCallback(res);
                        console.log('response:');
                        console.log(res);
                    } else {
                        fCallback(res);
                    };
                });
            }
        }
    }
})();
