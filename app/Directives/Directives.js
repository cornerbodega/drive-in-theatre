(function(){
    angular
    .module('countryApp')
    .directive('authorHeader', function () {
        return {
            restrict: 'E',
            scope: {
                author: '='
            },
            templateUrl: 'Directives/wts-card/author-header.html',
            link: function ($scope, element, attrs) {
                // console.log($scope.wts);
                var r = new Firebase("https://connect502.firebaseio.com/vendors/"+$scope.author)
                r.on('value', function(dataSnapshot) {
                    $scope.me = dataSnapshot.val();
                    console.log($scope.me);
                });
                var m = new Firebase("https://connect502.firebaseio.com/users/"+$scope.author+"/image/sizes/scaled300")
                m.on('value', function(dataSnapshot) {
                    $scope.authorpic = dataSnapshot.val();
                    console.log($scope.author);
                });

            }
        }
    })
    .directive('itemDesc', function () {
        return {
            restrict: 'E',
            scope: {
                desc: '=',
                price: '='
            },
            templateUrl: 'Directives/wts-card/item-desc.html',
            link: function ($scope, element, attrs) {
                // console.log($scope.wts);
            }
        }
    })
    .directive('wtsCard', function () {
        return {
            restrict: 'E',
            scope: {
                wts: '='
            },
            templateUrl: 'Directives/wts-card/wts-card.html',
            link: function ($scope, element, attrs) {
                console.log($scope.wts);
                // $scope.imagePath = 'img/card-image.png';

            }
        }
    })
    .directive('newWtsImageUpload', function () {
        return {
            restrict: 'E',
            templateUrl: 'Directives/wts-card/wts-image-upload.html',
            link: function ($scope, element, attrs) {
                // console.log('Here i am');
                $scope.onUCUploadComplete = function (info) {
                    console.log(info);
                    // var r = new Firebase("https://connect502.firebaseio.com/wts/"+$scope.wtsid+"/image")
                    var sizes = {}
                    sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
                    sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
                    sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
                    sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
                    sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'

                    $scope.wts.image = {info: info, sizes: sizes}
                }
                // console.log($scope.wts);
                // $scope.imagePath = 'img/card-image.png';

            }
        }
    })
    .directive('existingWtsImageUpload', function () {
        return {
            restrict: 'E',
            scope: {
                wtsid: '='
            },
            templateUrl: 'Directives/wts-card/wts-image-upload.html',
            link: function ($scope, element, attrs) {
                // console.log('Here i am');
                $scope.onUCUploadComplete = function (info) {
                    console.log(info);
                    var r = new Firebase("https://connect502.firebaseio.com/wts/"+$scope.wtsid+"/image")
                    var sizes = {}
                    sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
                    sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
                    sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
                    sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
                    sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'

                    r.set({info: info, sizes: sizes})
                }
                // console.log($scope.wts);
                // $scope.imagePath = 'img/card-image.png';

            }
        }
    })
    .directive('profilePictureUpload', function () {
        return {
            restrict: 'E',
            scope: {
                userid: '='
            },
            templateUrl: 'Directives/wts-card/profile-picture-upload.html',
            link: function ($scope, element, attrs) {
                // console.log('Here i am');
                $scope.onUCUploadComplete = function (info) {
                    console.log(info);
                    var r = new Firebase("https://connect502.firebaseio.com/users/"+$scope.userid+"/image")
                    var sizes = {}
                    sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
                    sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
                    sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
                    sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
                    sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'

                    r.set({info: info, sizes: sizes})
                }
                // console.log($scope.wts);
                // $scope.imagePath = 'img/card-image.png';

            }
        }
    })
})();
