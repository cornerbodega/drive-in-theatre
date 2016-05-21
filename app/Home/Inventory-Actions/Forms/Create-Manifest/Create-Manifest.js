(function(){
    angular
    .module('countryApp')
    .directive('pnSelectVehicle', pnSelectVehicle)
    .directive('pnSelectEmployee', pnSelectEmployee)
    .directive('pnCreateManifestForm', pnCreateManifestForm)
    .directive('pnSelectVendor', pnSelectVendor)
    .directive('pnEnterRoute', pnEnterRoute)
    .directive('pnSelectArrival', pnSelectArrival)
    .directive('pnSelectDeparture', pnSelectDeparture)
    .directive('pnSelectedItem', pnSelectedItem)
    .directive('pnSelectInventoryItem', pnSelectInventoryItem)
    .directive('pnInventoryItemListRow', pnInventoryItemListRow)
    .controller('CreateManifestController', [ '$location', '$scope', '$http','pnTraceability', '$mdDialog', CreateManifestController ])

    function CreateManifestController($location, $scope, $http, pnTraceability, $mdDialog) {
        if(!sessionStorage.sessionid) $location.path('/')
        // if(!pnTraceability.selected) $location.path('/home')
        // $scope.selected = pnTraceability.selected
        $scope.request = pnTraceability.request.inventory_manifest
        $scope.stops = []
        $scope.addStop = addStop;
        $scope.addItemToStop = addItemToStop;
        $scope.removeItemFromStop = removeItemFromStop;
        $scope.createManifestForm = { arrival: {}, departure:{} }
        $scope.submitCreateManifestForm = submitCreateManifestForm;
        activate()
        function activate() {
            $http.get('/api/vendors')
            .success(function(vendors){
                $scope.vendors = _.sortBy(vendors, 'name')
                if (!$scope.vendors) console.log('Error 3241: Unable to get Vendors for create manifest form!');
                $scope.createManifestForm.location = vendors[sessionStorage.ubi].location
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
            $http.get('/api/inventory/' + sessionStorage.sessionid).success(function(inventory) {
                $scope.inventory = _.sortBy(inventory, '-sessiontime')
                console.log($scope.inventory);
            })
        }
        var s = 1
        addStop()
        function addStop() {
            // mreq.stop_overview = {
            //     stop_number: 1,
            //     vendor_license: $scope.createManifestForm.vendor.location,
            //     approximate_arrival: arr,
            //     approximate_departure: dep,
            //     barcodeid: _.pluck($scope.selected, 'id')
            // }
            // $scope.stops.push()
            // var date = new Date()
            // date.setDate(date.getDate() + 1)
            // d = date.toLocaleString().split(',')[0].split('/')
            // // .toLocaleString().split(',')[0].split('/')
            // // var d = date.setDate(date.getDate()+1).toLocaleString().split(',')[0].split('/')
            // // console.log(d);
            // console.log(d);
            // $scope.placeholders = {
            //     month: d[0],
            //     day: d[1],
            //     year: d[2],
            // }

            $scope.days = []
            for (var i = 1; i < 32; i++) {
                $scope.days.push(i)
            }
            $scope.months = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December",
            }
            $scope.mins = [{label: '00', id: 0}, {label: '15', id: 15}, {label: '30', id: 30}, {label: '45', id: 45}]
            var m, d, y
            // console.log();
            var date = new Date()
            date.setDate(date.getDate() + 1)
            d = date.toLocaleString().split(',')[0].split('/')
            // .toLocaleString().split(',')[0].split('/')
            // var d = date.setDate(date.getDate()+1).toLocaleString().split(',')[0].split('/')
            // console.log(d);
            console.log(d);
            $scope.placeholders = {
                month: $scope.months[d[0]],
                day: d[1],
                year: d[2],
            }
            $scope.stops.push({
                stop_number: s,
                selected: {},
                departure: {
                    month: $scope.placeholders.month,
                    day: $scope.placeholders.day,
                    year: $scope.placeholders.year,
                },
                arrival: {
                    month: $scope.placeholders.month,
                    day: $scope.placeholders.day,
                    year: $scope.placeholders.year,
                },
            })
            s++
        }

        function addItemToStop(stop, item) {
            if(!stop.items) stop.items = []
            // item.$selected = !item.$selected
            _.map($scope.stops, function(s){
                if (s.stop_number === stop.stop_number){
                    // s.barcodes[item.id] = true
                    stop.items.push(item)
                }
            })
            console.log($scope.stops);
            // stop.items.push(item)
            $scope.inventory = _.without($scope.inventory, item)
            console.log(stop.items);
        }

        function removeItemFromStop(stop, item) {
            $scope.inventory.push(item);
            $scope.inventory = _.sortBy($scope.inventory, '-sessiontime')
            stop.items = _.without(stop.items, item);
            console.log(stop.items);
        }

        // $scope.arrr = []
        function checkForErrors() {

        }
        function submitCreateManifestForm(ev) {
            $scope.erorr = " "
            checkForErrors()
            // console.log($scope.createManifestForm);
            var mreq = { action: 'inventory_manifest', sessionid: sessionStorage.sessionid}


            mreq.employee_id = $scope.createManifestForm.employee
            mreq.vehicle_id = $scope.createManifestForm.vehicle
            mreq.stop_overview = []

            // _.map($scope.stops, function(stop){
            //     if (!stop.barcodeid) stop.barcodeid = []
            //     _.map(stop.items, function(i){
            //         stop.barcodeid.push(i.id)
            //     })
            //     stop.barcodeid = _.uniq(stop.barcodeid)
            //     console.log(stop.barcodeid);
            //     var stopreq = {
            //         stop_number: stop.stop_number,
            //         approximate_arrival: arr,
            //         approximate_departure: dep,
            //         approximate_route: stop.route,
            //         vendor_license: stop.vendor.ubi,
            //         barcodeid: stop.barcodeid
            //     }
            //     mreq.stop_overview.push(stopreq)
            //
            // })

            _.map($scope.stops, function(stop){
                // _.map(stop.items, function(i){
                //     stop.barcodeid.push(i.id)
                // })
                var arr = new Date(stop.arrival.month + ' ' + stop.arrival.day +' ' +stop.arrival.year).getTime()/1000
                var dep = new Date(stop.departure.month + ' ' + stop.departure.day +' ' +stop.departure.year).getTime()/1000
                stop.barcodeid = _.pluck(stop.items, 'id')
                console.log(stop.barcodeid);
                if(!stop.vendor) return console.log('You did not select a vendor! Error!')
                var stopreq = {
                    stop_number: stop.stop_number,
                    approximate_arrival: arr,
                    approximate_departure: dep,
                    approximate_route: stop.route,
                    vendor_license: stop.vendor.ubi,
                    barcodeid: stop.barcodeid
                }
                mreq.stop_overview.push(stopreq)

            })

            console.log(mreq.stop_overview);

            pnTraceability.request.inventory_manifest = mreq
            $scope.request = pnTraceability.request.inventory_manifest
            console.log(mreq);
            // $scope.showConfirm = function(ev) {
            //     // Appending dialog to document.body to cover sidenav in docs app
            //     // var confirm = $mdDialog.confirm()
            //     // .title('Confim Create Manifest')
            //     // .textContent('Submit this information to the Washington State Liquor and Cannabis Control Board?' + JSON.stringify(mreq))
            //     // .ariaLabel('Lucky day')
            //     // .targetEvent(ev)
            //     // .ok('Submit')
            //     // .cancel('Cancel');
            //     var confirm = {
            //         controller: DialogController,
            //         templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-confirm-create-manifest-dialog.html',
            //         parent: angular.element(document.body),
            //         targetEvent: ev,
            //         clickOutsideToClose:true
            //     }
            //     function DialogController($scope, $mdDialog, pnTraceability) {
            //         $scope.request = pnTraceability.request.inventory_manifest;
            //         $scope.hide = function() {
            //             $mdDialog.hide();
            //         };
            //         $scope.cancel = function() {
            //             $mdDialog.cancel();
            //         };
            //         $scope.answer = function(answer) {
            //             $mdDialog.hide(answer);
            //         };
            //     }
            //     $mdDialog.show(confirm).then(function() {
            //         $scope.status = 'You decided to get rid of your debt.';
            //     }, function() {
            //         $scope.status = 'You decided to keep your debt.';
            //     });
            // };
            // $scope.showConfirm(ev)

            $http.post('/api/manifests/create', mreq).success(function(res) {
                if (res.error) return $scope.error = res.error
                console.log(res);
            })

            // console.log(mreq);
            // mreq.location = $scope.createManifestForm.location
        }
    }
    function pnCreateManifestForm() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-create-manifest-form.html',
            link: function($scope, element, attrs) {


                // if (!pnTraceability.request.createManifestForm) pnTraceability.request.createManifestForm = {}
                // pnTraceability.request.createaManifestForm.arrival.month =  angular.copy($scope.months[d[0]])
                // pnTraceability.request.createaManifestForm.arrival.day =  angular.copy(d[1])
                // pnTraceability.request.createaManifestForm.arrival.year =  angular.copy(d[2])
                // pnTraceability.request.createaManifestForm.departure.month =  angular.copy($scope.months[d[0]])
                // pnTraceability.request.createaManifestForm.departure.day =  angular.copy(d[1])
                // pnTraceability.request.createaManifestForm.departure.year =  angular.copy(d[2])
                // pnTraceability.request.createaManifestForm.arrival.hour = '12'
                // pnTraceability.request.createaManifestForm.arrival.mins = 0
                // pnTraceability.request.createaManifestForm.arrival.m = 'AM'
                // pnTraceability.request.createaManifestForm.departure.hour = '12'
                // pnTraceability.request.createaManifestForm.departure.mins = 0
                // pnTraceability.request.createaManifestForm.departure.m = 'AM'

            }
        }
    }
    function pnSelectInventoryItem(pnTraceability) {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-select-inventory-item.html',
            link: function($scope, element, attrs) {

            }
        }
    }
    function pnInventoryItemListRow() {
        return {
            restrict: 'E',
            scope: {item:'='},
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-inventory-item-list-row.html',
            link: function($scope, element, attrs) {

            }
        }
    }
    function pnSelectedItem() {
        return {
            restrict: 'E',
            scope: {item:'='},
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-selected-item.html',
            link: function($scope, element, attrs) {

            }
        }
    }
    function pnEnterRoute() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-enter-route.html',
            link: function($scope, element, attrs) {

            }
        }
    }
    function pnSelectArrival() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-select-arrival.html',
            link: function($scope, element, attrs) {
                console.log($scope.stop);
            }
        }
    }
    function pnSelectDeparture() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-select-departure.html',
            link: function($scope, element, attrs) {

            }
        }
    }
    function pnSelectVendor() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-select-vendor.html',
            link: function($scope, element, attrs) {

            }
        }
    }
    function pnSelectVehicle() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-select-vehicle.html',
            link: function($scope, element, attrs) {
                $scope.selectVehicle = function(vehicle) {
                    $scope.createManifestForm.vehicle = vehicle
                }
            }
        }
    }
    function pnSelectEmployee() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-select-employee.html',
            link: function($scope, element, attrs) {
                $scope.selectEmployee = function(employee) {
                    $scope.createManifestForm.employee = employee
                }
            }
        }
    }


})();
