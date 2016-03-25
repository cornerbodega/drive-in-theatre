(function(){
    angular
    .module('countryApp')
    .controller('PublishWtsWizardController', ['$scope','WTS','$location', PublishWtsWizardController ])
    .directive('pnPublishWtsWizard', pnPublishWtsWizard)
    .directive('pnUploadItemImage', pnUploadItemImage)

    function pnUploadItemImage() {
        return {
            restrict: 'E',
            // scope: { item: '=' },
            templateUrl: 'Publish-Wts-Wizard/templates/pn-upload-item-image.html',
            link: function($scope, element, attrs) {
                $scope.pnUploadProductImage = function() {
                    var widget = uploadcare.Widget('[role=uploadcare-uploader]');
                    console.log(widget);
                    // widget.openDialog()
                    widget.openDialog(null, {
                        // ng-model="object.image.info.uuid"
                        publicKey: "55a55d432aed473a7467",
                        imagesOnly: true,
                        // onUploadComplete: 'onUploadComplete(info)',
                    })
                    widget.onUploadComplete(function(info){
                        console.log(info);
                        $scope.item.image = info.cdnUrl
                        console.log($scope.item.image);

                        // var r = new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/image")
                        // r.set({info: info})
                        // $rootScope.$apply()
                    })
                }
            }
        }
    }
    function PublishWtsWizardController($scope, WTS, $location) {
        if (!WTS.selectedItems) $location.path('/home')
        $scope.selectedItems = WTS.selectedItems
    }

    function pnPublishWtsWizard() {
        return {
            restrict: 'E',
            templateUrl: 'Publish-Wts-Wizard/templates/pn-publish-wts-wizard.html',
            link: function($scope, element, attrs) {

            }
        }
    }
})();
