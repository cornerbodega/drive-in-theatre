(function(){
    angular
    .module('countryApp')
    .controller('CreateWtsWizardController', ['$scope','WTS','$location',
    CreateWtsWizardController
])

function CreateWtsWizardController($scope, WTS, $location) {
    if (!WTS.selectedItems) $location.path('/home')
    $scope.selectedItems = WTS.selectedItems
}
})();
