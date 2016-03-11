(function(){
    angular
    .module('countryApp')
    .controller('CreateWtsWizardController', ['$location', '$scope',
    CreateWtsWizardController
])

function CreateWtsWizardController($location, $scope, $http, $fbo, _) {
    console.log('CreateWtsWizard!!');
        $scope.my_ubi = sessionStorage.ubi
}
})();
