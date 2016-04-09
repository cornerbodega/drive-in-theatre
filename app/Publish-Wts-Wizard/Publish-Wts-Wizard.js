(function(){
    angular
    .module('countryApp')
    .controller('PublishWtsWizardController', ['$scope','WTS','$location', '$http', 'pnUtils', PublishWtsWizardController ])
    .directive('pnPublishWtsWizard', pnPublishWtsWizard)
    .directive('pnUploadItemImage', pnUploadItemImage)
    .directive('pnPriceDescPublish', pnPriceDescPublish)
    .directive('pnPublishSubmitButton', pnPublishSubmitButton)
    .directive('phoneInput', phoneInput)
    .filter('tel', tel)

    function phoneInput ($filter, $browser) {
        return {
            require: 'ngModel',
            link: function($scope, $element, $attrs, ngModelCtrl) {
                var listener = function() {
                    var value = $element.val().replace(/[^0-9]/g, '');
                    $element.val($filter('tel')(value, false));
                };

                // This runs when we update the text field
                ngModelCtrl.$parsers.push(function(viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0,10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModelCtrl.$render = function() {
                    $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
                };

                $element.bind('change', listener);
                $element.bind('keydown', function(event) {
                    var key = event.keyCode;
                    // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                    // This lets us support copy and paste too
                    if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                        return;
                    }
                    $browser.defer(listener); // Have to do this or changes don't get picked up properly
                });

                $element.bind('paste cut', function() {
                    $browser.defer(listener);
                });
            }

        };
    };
    function tel() {
        return function (tel) {
            console.log(tel);
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 1:
                case 2:
                case 3:
                city = value;
                break;

                default:
                city = value.slice(0, 3);
                number = value.slice(3);
            }

            if(number){
                if(number.length>3){
                    number = number.slice(0, 3) + '-' + number.slice(3,7);
                }
                else{
                    number = number;
                }

                return ("(" + city + ") " + number).trim();
            }
            else{
                return "(" + city;
            }

        };
    };
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
    function pnPriceDescPublish(pnPhones) {
        return {
            restrict: 'E',
            templateUrl: 'Publish-Wts-Wizard/templates/pn-price-desc-publish.html',
            link: function($scope, element, attrs) {
                $scope.querySearch =  function(query) {
                    var results = query ? $scope.phoneSuggestions.filter( createFilterFor(query) ) : $scope.phoneSuggestions
                    return results
                }
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(number) {
                        return (number.indexOf(lowercaseQuery) === 0);
                    };
                }
                var phones = pnPhones.fbo()
                phones.$loaded().then(function(){
                    $scope.phoneSuggestions  = phones[sessionStorage.ubi]
                    // console.log($scope.phoneSuggestions);
                    var latest = $scope.phoneSuggestions[$scope.phoneSuggestions.length-1]
                    if($scope.phoneSuggestions) $scope.item.sellerPhone =  latest
                    // $scope.selectedItem = latest

                    // $scope.item.sellerPhone = phones[sessionStorage.ubi][0]
                })

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
    function PublishWtsWizardController($scope, WTS, $location, $http, pnUtils) {
        if (!WTS.selectedItems) $location.path('/home')
        $scope.selectedItems = WTS.selectedItems
        $http.get('/api/vendors/'+sessionStorage.ubi).success(function(res) {
            sessionStorage.city = res.city
            sessionStorage.name = res.name
            // console.log(res.licensetype);
            sessionStorage.licensetype = pnUtils.getVendorTypeLabelFor(res.licensetype)
            // console.log(sessionStorage.licensetype);
        })


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
                    if(!!item.price && !!item.desc && !!item.image && !!item.sellerName && !!item.sellerPhone) {
                        item.$submitEnabled = true
                    }
                }
            }
        }
    }
})();
