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
    .controller('CreateManifestController', [ '$location', '$scope', '$http','pnTraceability', CreateManifestController ])

    function CreateManifestController($location, $scope, $http, pnTraceability) {
        if(!sessionStorage.sessionid) $location.path('/')
        if(!pnTraceability.selected) $location.path('/home')
        $scope.selected = pnTraceability.selected
        $scope.createManifestForm = { arrival: {}, departure:{} }
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

        $scope.submitCreateManifestForm = function() {
            $scope.erorr = " "
            // console.log($scope.createManifestForm);
            var mreq = { action: 'inventory_manifest', sessionid: sessionStorage.sessionid}

            var arr = new Date($scope.createManifestForm.arrival.month + ' ' + $scope.createManifestForm.arrival.day +' ' +$scope.createManifestForm.arrival.year).getTime()/1000
            var dep = new Date($scope.createManifestForm.departure.month + ' ' + $scope.createManifestForm.departure.day +' ' +$scope.createManifestForm.departure.year).getTime()/1000
            mreq.employee_id = $scope.createManifestForm.employee
            mreq.vehicle_id = $scope.createManifestForm.vehicle
            mreq.stop_overview = {
                stop_number: 1,
                vendor_license: $scope.createManifestForm.vendor.location,
                approximate_arrival: arr,
                approximate_departure: dep,
                barcodeid: _.pluck($scope.selected, 'id')
            }

            pnTraceability.request.inventory_manifest = mreq
            console.log(mreq);
            $http.post('/api/manifests/create', mreq).success(function(res) {
                if (res.error) return $scope.error = res.error
                console.log(res);
            })

            // console.log(mreq);
            // mreq.location = $scope.createManifestForm.location
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
    function pnCreateManifestForm() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest/templates/pn-create-manifest-form.html',
            link: function($scope, element, attrs) {

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
                $scope.mins = [{label: '00', id: 0}, {label: '30', id: 30}]
                var m, d, y
                // console.log();
                var d = new Date().toLocaleString().split(',')[0].split('/')
                // console.log(d);
                console.log(d);
                $scope.placeholders = {
                    month: $scope.months[d[0]],
                    day: d[1],
                    year: d[2],
                }
                $scope.createManifestForm.arrival.month =  angular.copy($scope.months[d[0]])
                $scope.createManifestForm.arrival.day =  angular.copy(d[1])
                $scope.createManifestForm.arrival.year =  angular.copy(d[2])
                $scope.createManifestForm.departure.month =  angular.copy($scope.months[d[0]])
                $scope.createManifestForm.departure.day =  angular.copy(d[1])
                $scope.createManifestForm.departure.year =  angular.copy(d[2])
                $scope.createManifestForm.arrival.hour = '12'
                $scope.createManifestForm.arrival.mins = 0
                $scope.createManifestForm.arrival.m = 'AM'
                $scope.createManifestForm.departure.hour = '12'
                $scope.createManifestForm.departure.mins = 0
                $scope.createManifestForm.departure.m = 'AM'

            }
        }
    }

})();
