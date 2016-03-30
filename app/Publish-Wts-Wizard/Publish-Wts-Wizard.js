(function(){
    angular
    .module('countryApp')
    .controller('PublishWtsWizardController', ['$scope','WTS','$location', PublishWtsWizardController ])
    .directive('pnPublishWtsWizard', pnPublishWtsWizard)
    .directive('pnUploadItemImage', pnUploadItemImage)
    .directive('pnPriceDescPublish', pnPriceDescPublish)
    .directive('pnPublishSubmitButton', pnPublishSubmitButton)
    function pnPublishSubmitButton(CreateWts, $mdToast, $location) {
        return {
            restrict: 'E',
            templateUrl: 'Publish-Wts-Wizard/templates/pn-publish-submit-button.html',
            link: function($scope, element, attrs) {
                $scope.publish = function(item) {
                    // console.log(item);
                    CreateWts.create(item, function(){
                        console.log('Complete!');
                        // $scope.showWtsWizard = false
                        // $scope.menu('reset')
                        $mdToast.show($mdToast.simple().textContent('Success!'));
                        angular.forEach($scope.selectedItems, function(val, index) {
                            if(val.id === item.id) {
                                $scope.selectedItems.splice(index,1)
                                if($scope.selectedItems.length < 1) $location.path('/market')
                                // $scope.$apply()
                            }

                        })
                        // $location.path('/home')

                    })

                }
            }
        }
    }
    function pnPriceDescPublish() {
        return {
            restrict: 'E',
            templateUrl: 'Publish-Wts-Wizard/templates/pn-price-desc-publish.html',
            link: function($scope, element, attrs) {

            }
        }
    }
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
                        $scope.pnValidatePublishForm($scope.item)
                        // var r = new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/image")
                        // r.set({info: info})
                        $scope.$apply()
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
                $scope.pnValidatePublishForm = function(item) {
                    console.log('validate!!');
                    console.log(item);
                    console.log(item.price);
                    console.log(item.desc);
                    console.log(item.image);
                    console.log(!!item.price && !!item.desc && !!item.image);
                    if(!!item.price && !!item.desc && !!item.image) {
                        item.$submitEnabled = true
                    }
                }
            }
        }
    }
})();
