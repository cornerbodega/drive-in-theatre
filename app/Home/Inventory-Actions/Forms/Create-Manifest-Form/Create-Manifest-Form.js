(function(){
    angular
    .module('countryApp')
    .directive('pnSelectVehicle', pnSelectVehicle)
    .directive('pnSelectEmployee', pnSelectEmployee)
    .directive('pnCreateManifestForm', pnCreateManifestForm)

    function pnSelectVehicle() {
        return {
            restrict: 'E',
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest-Form/templates/pn-select-vehicle.html',
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
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest-Form/templates/pn-select-employee.html',
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
            templateUrl: 'Home/Inventory-Actions/Forms/Create-Manifest-Form/templates/pn-create-manifest-form.html',
            link: function($scope, element, attrs) {
            }
        }
    }

})();
