(function(){
    angular
    .module('countryApp')
    // .directive('pnNextAndBackButtonsCreateWtsWizard', function() {
    //     return {
    //         restrict: 'E',
    //         scope: { pnStep: "=" },
    //         templateUrl: 'Directives/home/pn-create-wts-wizard/pn-next-and-back-buttons-create-wts-wizard.html',
    //         link: function($scope, element, attrs) {
    //             console.log($scope.pnStep);
    //         }
    //     }
    // })
    .directive('pnUploadImage', function() {
        return {
            restrict: 'E',
            // scope: { item: '=' },
            templateUrl: 'Directives/home/pn-upload-image/pn-upload-image.html',
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
    })
    .directive('pnWrapperProductGridItem', function() {
        return {
            restrict: 'E',
            scope: { product: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-wrapper-product-grid-item.html',
            link: function($scope, element, attrs) {
                // console.log($scope.pnStep);
            }
        }
    })
    .directive('pnDetailProductDetail', function() {
        return {
            restrict: 'E',
            scope: { product: "=" },
            templateUrl: 'Directives/market-product-detail/pn-detail-product-detail.html',
            link: function($scope, element, attrs) {
                // console.log($scope.pnStep);
            }
        }
    })
    .directive('pnProductGridSellerInfo', function() {
        return {
            restrict: 'E',
            scope: { sellerInfo: "=" },
            templateUrl: 'Directives/market/pn-product-grid-seller-info.html',
            link: function($scope, element, attrs) {
                // console.log($scope.sellerInfo);
            }
        }
    })
    .directive('pnAddToCartButtonProductDetail', function() {
        return {
            restrict: 'E',
            scope: { },
            templateUrl: 'Directives/market-product-detail/pn-add-to-cart-button-product-detail.html',
            link: function($scope, element, attrs) {

            }
        }
    })

    .directive('pnPriceDescProductDetailTextCard', function() {
        return {
            restrict: 'E',
            scope: { product: "=" },
            templateUrl: 'Directives/market-product-detail/pn-price-desc-product-detail-text-card.html',
            link: function($scope, element, attrs) {

            }
        }
    })
    .directive('pnToQaWizardButton', function() {
        return {
            restrict: 'E',
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-qa-confirm-create-wts-wizard/pn-to-qa-button-qa-confirm-create-wts-wizard.html',
            link: function($scope, element, attrs) {
                $scope.toLabSelect = function() {
                    $location.path('/labs/select');
                }
            }
        }
    })
    .directive('pnProductDetailPage', function() {
        return {
            restrict: 'E',
            scope: { product: "=" },
            templateUrl: 'Directives/market-product-detail/pn-product-detail-page.html',
            link: function($scope, element, attrs) {
                console.log($scope.product);
            }
        }
    })

    .directive('pnProductDetailTextCard', function(pnFirebase) {
        return {
            restrict: 'E',
            scope: { product: "=" },
            templateUrl: 'Directives/market-product-detail/pn-product-detail-text-card.html',
            link: function($scope, element, attrs) {
                console.log($scope.product);
                $scope.requestManifest = function() {
                    var manifest_requests = pnFirebase.fba('manifest_requests/'+$scope.product.id)
                    // console.log(manifest_requests);

                    // manifest_requests.loaded().then(function(){
                        // if (!manifest_requests[$scope.product.id])
                        // if(manifest_requests[$scope.product.id]) console.log();
                        // manifest_requests[$scope.product.id].push(sessionStorage.ubi)
                        // if (!manifest_requests[$scope.product.id]) manifest_requests[$scope.product.id] = {}
                        manifest_requests[sessionStorage.ubi] = true
                        manifest_requests.$save().then(function requestManifestSuccess(){
                            $scope.requested = true
                        // })

                    })
                }
            }
        }
    })

    .directive('pnBackgroundImage', function(){
        return function(scope, element, attrs){
            var url = attrs.pnBackgroundImage;

            // console.log('url'+url);
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover',
                'height': '100%'
            });
        };
    })
    .directive('pnWtsItemMyPostsList', function() {
        return {
            restrict: 'E',
            scope: { product:'=' },
            templateUrl: 'Directives/home/pn-my-posts-list/pn-wts-item-my-posts-list.html',
            link: function($scope, element, attrs) {
                // console.log($scope.pnStep);
                console.log($scope.product);
            }
        }
    })

    .directive('pnDescPriceCreateWtsWizard', function() {
        return {
            restrict: 'E',
            // scope: { pnStep: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/desc-price/pn-desc-price-create-wts-wizard.html',
            link: function($scope, element, attrs) {
                $scope.pnDescPriceValidator = function() {
                    if (!$scope.selectedItemCreateWts.price){
                        $scope.pnDescPriceValid = false;
                        $scope.pnPiceError = "Please enter a valid price"
                    }
                    if (!$scope.selectedItemCreateWts.desc) {
                        $scope.pnDescError = "Please enter a valid product description"
                        $scope.pnDescPriceValid = false;
                    }
                    else {
                        $scope.pnDescPriceValid = true;
                    }

                }
            }
        }
    })
    .directive('pnQuantityFieldCreateWtsWizard', function() {
        return {
            restrict: 'E',
            // scope: { pnStep: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/desc-price/pn-quantity-field-create-wts-wizard.html',
            link: function($scope, element, attrs) {

            }
        }
    })
    .directive('pnPhoneFieldCreateWtsWizard', function() {
        return {
            restrict: 'E',
            // scope: { pnStep: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/desc-price/pn-phone-field-create-wts-wizard.html',
            link: function($scope, element, attrs) {

            }
        }
    })
    .directive('pnPriceFieldCreateWtsWizard', function() {
        return {
            restrict: 'E',
            // scope: { pnStep: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/desc-price/pn-price-field-create-wts-wizard.html',
            link: function($scope, element, attrs) {

            }
        }
    })
    .directive('pnDescFieldCreateWtsWizard', function() {
        return {
            restrict: 'E',
            // scope: { pnStep: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/desc-price/pn-desc-field-create-wts-wizard.html',
            link: function($scope, element, attrs) {

            }
        }
    })

    .directive('pnUploadImagePaneCreateWtsWizard', function() {
        return {
            restrict: 'E',
            // scope: { item: '=' },
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-upload-image-pane-create-wts-wizard.html',
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
    })
    .directive('pnItemProductSelectCreateWtsWizard', function() {
        return {
            restrict: 'E',
            scope: { item: "=" },
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-item-product-select-create-wts-wizard.html',
            link: function($scope, element, attrs) {

            }
        }
    })
    .directive('pnProductSelectCreateWtsWizard', function($http, WTS) {
        return {
            restrict: 'E',
            // scope: { },
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-product-select-create-wts-wizard.html',
            link: function($scope, element, attrs) {
                $http.get('/api/inventory/'+sessionStorage.sessionid).success(inventoryInit)
                $scope.chooseWtsInventoryItem = chooseWtsInventoryItem;
                $scope.wts = WTS.wts_fbo()
                function inventoryInit(inventory) {
                    $scope.inventory = _.sortBy(inventory, '-sessiontime')
                    // $scope.inventory = _.sortBy(inventory, '-sessiontime').slice(0,10)

                    $scope.wts.$loaded().then(function(){
                        angular.forEach($scope.wts, function(w){
                            _.map(inventory, function(i){
                                if (w.id === i.id) i.image = w.image
                            })
                            // console.log(w);
                            // console.log(w.id);
                        })

                        // var my_wts_ids = _.filter(Object.keys(me_wts_id_fbo), function(k){
                        //     if (k.charAt(0) != '$') return k
                        // });
                    })

                    // console.log($scope.inventory);

                }
                $scope.ia = { qaTesting: false, uploadImage: false }
                function chooseWtsInventoryItem(item) {
                    // console.log(item.image);
                    $scope.selectedItemCreateWts = item
                    $scope.ia.uploadImage = true
                    $scope.ia.qaTesting = true
                    $scope.data.selectedIndex = 1
                    // console.log(item);
                }

            }
        }
    })
    .directive('pnQaConfirmCreateWtsWizard', function(Labs, $location) {
        return {
            restrict: 'E',
            // scope: { },
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-qa-confirm-create-wts-wizard/pn-qa-confirm-create-wts-wizard.html',
            link: function($scope, element, attrs) {
                $scope.$watch(function () { return $scope.selectedItemCreateWts }, function (newVal, oldVal) {
                    if (typeof newVal !== 'undefined') {
                        var labs = Labs.fbo()
                        console.log($scope.selectedItemCreateWts);
                        labs.$loaded().then(init)
                        function init() {
                            console.log($scope.selectedItemCreateWts);
                            if (!$scope.selectedItemCreateWts) return
                            var labb = labs[$scope.selectedItemCreateWts.qa.lab_license]
                            if (!!labb) {
                                $scope.selectedItemCreateWts.qa.lab_license_label = labb.name
                                $scope.selectedItemCreateWts.qa.pnLab = labb
                                console.log($scope.selectedItemCreateWts.qa);
                            }

                        }
                    }
                })
                $scope.toLab = function (){
                    Labs.view.lab = $scope.selectedItemCreateWts.qa.pnLab
                    $location.path('/labs/' + $scope.selectedItemCreateWts.qa.lab_license)
                }
            }
        }
    })
    .directive('pnCreateWtsWizard', function(CreateWts, $mdToast, $location) {
        return {
            restrict: 'E',
            // scope: { }, // only to set showWtsWizard = false when done
            templateUrl: 'Directives/home/pn-create-wts-wizard/pn-create-wts-wizard.html',
            link: function($scope, element, attrs) {

                // var me = pnUsers.me()
                // me.$loaded().then(init)
                // $scope.label = "Create Post"

                $scope.data = {
                    selectedIndex: 0,
                };

                // var wts_ref = WTS.wts_ref()
                // console.log(wts_ref);
                // var wts_fbo = $firebaseObject(wts_ref)
                // wts_fbo.$loaded().then(getWTS())
                $scope.pnGoToNextStepCreateWizard = function(step) {
                    console.log(step);
                    if (step === 'upload') {
                        $scope.ia_DescriptionPrice = true;
                        $scope.data.selectedIndex = 2
                    }
                    if (step === 'QA') {
                        $scope.ia_Confirm = true;
                        $scope.data.selectedIndex = 1
                    }
                }
                $scope.pnCreateWts = function() {
                    CreateWts.create($scope.selectedItemCreateWts, function(){
                        console.log('Complete!');
                        // $scope.showWtsWizard = false
                        // $scope.menu('reset')
                        $mdToast.show($mdToast.simple().textContent('Success!'));
                        $location.path('/home')

                    })
                    //.then(pnCreateWtsComplete)

                }

                function init() {
                    // console.log(me);

                }
            }
        }
    })
    .directive('pnCreatePostButton', function(pnUsers) {
        return {
            restrict: 'AE',
            scope: { label: '=' },
            templateUrl: 'Directives/home/pn-create-post-button.html',
            link: function($scope, element, attrs) {
                // var me = pnUsers.me()
                // me.$loaded().then(init)
                // $scope.label = "Create Post"
                console.log($scope.label);
                $scope.createPost = function() {
                    console.log('create post');
                }
                function init() {
                    // console.log(me);

                }
            }
        }
    })
    .directive('pnProfilePic', function(pnUsers, $rootScope) {
        return {
            restrict: 'E',
            scope: { },
            templateUrl: 'Directives/home/pn-profile-pic.html',
            link: function ($scope, element, attrs) {
                var me = pnUsers.me()
                me.$loaded().then(init)
                // https://ucarecdn.com/6c71bc5d-1d17-4710-a12b-b42471f52db1/-/resize/500x/"
                function init() {
                    console.log(me);
                    // $scope.profilePicUrl = me.image.info.cdnUrl
                    console.log();
                    if (!me.image) return
                    $scope.$watch(function () { return me.image.info.cdnUrl }, function (newVal, oldVal) {
                        console.log('Hey Profile PIc!' + newVal);
                        if (typeof newVal !== 'undefined') {
                             $scope.profilePicUrl = me.image.info.cdnUrl
                        }
                    })
                    // pnUsers.ref().child(sessionStorage.ubi).on('child_added', function(){
                    //     console.log('added!!!!!!!!');
                    //     $scope.profilePicUrl = me.image.info.cdnUrl
                    // })
                    // pnUsers.ref().child(sessionStorage.ubi).child('image').child('info').child('cdnUrl').on('child_changed', function(snap){
                    //     console.log('changed!!!!!!!!');
                    //     // $rootScope.$apply()
                    //     $scope.profilePicUrl = snap.val()
                    // })
                }
            }
        }
    })

    .directive('pnMyProfile', function (pnUsers, $location, $mdToast) {
        return {
            restrict: 'E',
            scope: { },
            templateUrl: 'Directives/home/pn-my-profile.html',
            link: function ($scope, element, attrs) {
                // console.log('MY Profile!!');
                // $scope.type = "Upload Profile Photo"

                $scope.menu = menu

                // var me = pnUsers.me()
                // me.$loaded().then(init)
                // function init() {
                //     console.log(me);
                //     // console.log(me.images);
                //     $scope.profilePicExists = false
                //     pnUsers.ref().child(sessionStorage.ubi).on('child_added', function(){
                //         if (!me.image) return
                //         if (!!me.image.info) $scope.profilePicExists = true
                //         console.log($scope.profilePicExists);
                //     })
                // }

                function menu(createPostType) {
                    console.log(createPostType);
                    if (createPostType === "newWts") {
                        $scope.showWtsWizard = !$scope.showWtsWizard
                        $scope.showWtbWizard = false
                    }
                    if (createPostType === "newWtb") {
                        $scope.showWtsWizard = false
                        $scope.showWtbWizard = !$scope.showWtbWizard
                    }
                    if (createPostType === "reset") {
                        $scope.selectedItemCreateWts = {}
                        $scope.ia_UploadImage = false
                        $scope.ia_DescriptionPrice = false
                        $scope.ia_UploadImage = false
                        $scope.showWtsWizard = false
                        $scope.showWtbWizard = false
                    }
                }

                $scope.toCreateWtsWizard = function toCreateWtsWizard() {
                    $location.path('/wts/create/')
                }
            }
        }
    })
    .directive('pnMyPostsList', function (WTS, pnUsers, $firebaseObject, $q, Product, $location) {
        return {
            restrict: 'E',
            scope: { },
            templateUrl: 'Directives/home/pn-my-posts-list/pn-my-posts-list.html',
            link: function ($scope, element, attrs) {
                $scope.toProduct=function(product){
                    if (!product) return
                    Product.view_detail_product = product
                    $location.path('product/' + product.id)
                }
                var wts = WTS.wts_fbo()
                wts.$watch(function(){
                    // console.log('watch');
                    var t = []
                    angular.forEach(wts, function(s){
                        console.log(s);
                        if(s.seller === sessionStorage.ubi) t.push(s)
                    })
                    $scope.my_posts = t
                })
                // wts.$watch.then(init)
                // function init() {
                //     console.log(wts);
                //         wts.$watch(function(){
                //         console.log('Watch');
                //         var my_posts = []
                //         angular.forEach($scope.wts, function(val, key){
                //             console.log(key);
                //             // console.log(s);
                //             console.log(val);
                //             $scope.my_posts.push(val)
                //         })
                //
                //     })
                // }
            }
        }
    })

    // .directive('pnChangeProfilePicButton', function ($rootScope) {
    //     return {
    //         restrict: 'E',
    //         scope: { },
    //         templateUrl: 'Directives/home/pn-upload-profile-pic-button.html',
    //         link: function ($scope, element, attrs) {
    //             console.log('PROFILE PIC!!');
    //             $scope.label = "Change Profile Photo"
    //             // <script>uploadcare.openPanel('#uploader-placeholder');</script>
    //             $scope.uploadPP = function() {
    //                 // var p = element.find('uploader-placeholder')
    //                 var widget = uploadcare.Widget('[role=uploadcare-uploader]');
    //                 console.log(widget);
    //                 // widget.openDialog()
    //                 widget.openDialog(null, {
    //                     // ng-model="object.image.info.uuid"
    //                     publicKey: "55a55d432aed473a7467",
    //                     imagesOnly: true,
    //                     // onUploadComplete: 'onUploadComplete(info)',
    //                 })
    //                 widget.onUploadComplete(function(info){
    //                     console.log(info);
    //                     var r = new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/image")
    //                     r.set({info: info})
    //                     // $rootScope.$apply()
    //                 })
    //             }
    //         }
    //     }
    // })

    // .directive('pnUploadProfilePicButton', function () {
    //     return {
    //         restrict: 'E',
    //         scope: { },
    //         templateUrl: 'Directives/home/pn-upload-profile-pic-button.html',
    //         link: function ($scope, element, attrs) {
    //             console.log('PROFILE PIC!!');
    //             $scope.label = "Upload Profile Photo"
    //             // <script>uploadcare.openPanel('#uploader-placeholder');</script>
    //             $scope.uploadPP = function() {
    //                 // var p = element.find('uploader-placeholder')
    //                 var widget = uploadcare.Widget('[role=uploadcare-uploader]');
    //                 console.log(widget);
    //                 // widget.openDialog()
    //                 widget.openDialog(null, {
    //                     // ng-model="object.image.info.uuid"
    //                     publicKey: "55a55d432aed473a7467",
    //                     imagesOnly: true,
    //                     // onUploadComplete: 'onUploadComplete(info)',
    //                 })
    //                 widget.onUploadComplete(function(info){
    //                     console.log(info);
    //                     var r = new Firebase("https://connect502.firebaseio.com/users/"+sessionStorage.ubi+"/image")
    //                     r.set({info: info})
    //                     // var sizes = {}
    //                     // sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
    //                     // sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
    //                     // sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
    //                     // sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
    //                     // sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'
    //                     //
    //                     // r.set({info: info, sizes: sizes})
    //                 })
    //                 // console.log(uc);
    //                 // // uc.then(onUploadComplete(uc.info));
    //                 // function onUploadComplete(info) {
    //                 //     // console.log(a);
    //                 //     console.log(info);
    //                 //     console.log('Upload Complete!');
    //                 // }
    //                 // uploadcare.onUploadComplete(function(){
    //                 //     console.log('Upload Complete!!');
    //                 // })
    //                 // console.log(p);
    //             }
    //         }
    //     }
    // })

    .directive('pnProductTypeFilterButton', function () {
        return {
            restrict: 'E',
            scope: { type: '=' },
            templateUrl: 'Directives/market/pn-product-type-filter-button.html',
            link: function ($scope, element, attrs) {
                console.log($scope.type);



            }
        }
    })

    .directive('pnProductGridItem', function (pnUtils) {
        return {
            restrict: 'E',
            scope: { product: '=', hideImage: '=', showid: '=' },
            templateUrl: 'Directives/market/pn-product-grid-item.html',
            link: function ($scope, element, attrs) {
                // console.log($scope.product);
                var colors = ["pn-product-detail-transparent-card"]
                if(!$scope.pnTransparent) $scope.pnTransparent = 'pn-product-detail-transparent-card'
                // var colors = ["mcGreen1","mcGreen2","mcGreen3", "mcGreen4"]
                if (!$scope.product) return console.log('NO PRODUCT IN PN-PRODUCT-GRID-ITEM! ' + $scope.product );
                if (!!$scope.product.at) $scope.product.timeLabel = pnUtils.timeLabler($scope.product.at)
                $scope.product.cardColor = _.sample(colors, 1)

                // console.log($scope.product.timeLabel);
            }
        }
    })

    .directive('pnMarketGrid', function (_, WTS, $firebaseObject, $location, Product) {
        return {
            restrict: 'E',
            scope: { },
            templateUrl: 'Directives/market/pn-market-grid.html',
            link: function ($scope, element, attrs) {
                // $scope.products = [1, 2, 3]
                var wts_ref = WTS.wts_ref()
                console.log(wts_ref);
                var wts_fbo = $firebaseObject(wts_ref)
                wts_fbo.$loaded().then(getWTS())
                function getWTS() {
                    wts_ref.once('value', function(dataSnapshot) {
                        formatWTS(dataSnapshot.val());
                    });
                }

                // console.log();
                $scope.pnProductTypeFilterAction = function(type) {
                    console.log('Filter!' + type);
                    if (!type) return
                    $scope.search = type
                }

                $scope.clearSearch = function () {
                    $scope.search = {}
                }

                $scope.toProduct=function(product){
                    Product.view_detail_product = product
                    $location.path('product/' + product.id)
                }


                // $scope.$watch(function () { return $rootScope.pnProductTypeFilter }, function (newVal, oldVal) {
                //     console.log('called!!');
                //     if (typeof newVal !== 'undefined') {
                //         // $rootScope.pnProductTypeFilter
                //         // $scope.pnProductTypeFilter
                //         console.log($scope.products.length);
                //         $filter('filter')($scope.products, function(value, index, array) {
                //             if (_.contains($rootScope.pnProductTypeFilter, value.inventorytypelabel)) return true
                //         }, true)
                //         console.log($scope.products.length);
                //
                //     }
                // });

                function formatWTS(s){
                    var t = []
                    _.map(s, function(shot){
                        t.push(shot)
                    })
                    // var r = t.reverse()
                    var r = []
                    console.log(t);
                    r = _.sortBy(t, 'at')
                    console.log(r);
                    $scope.products = r.reverse()
                    // $scope.types = _.uniq(_.pluck(_.pluck(r,'inventorytypeInfo'),'label'));
                    $scope.types = _.uniq(_.pluck(r,'inventorytypelabel'));


                    console.log($scope.types);
                    // if(!$scope.$$phase) {
                    //     //$digest or $apply
                    //     $scope.$apply()
                    // }
                }

            }
        }
    })

    .directive('pnNav', function ($location, $window, $http) {
        return {
            restrict: 'E',
            // transclude: true,
            scope: {
                loc: '='
            },
            templateUrl: 'Directives/nav/pn-nav1.html',
            link: function ($scope, element, attrs) {
                // if ($scope.loc === 'market') {
                //     allFalse();
                //     $scope.market = true;
                // }
                // if ($scope.loc === 'me') {
                //     allFalse();
                //     $scope.me = true;
                // }
                // if ($scope.loc === 'product') {
                //     allFalse();
                //     $scope.product = true;
                // }
                if ($scope.loc === 'labDetail') {
                    allFalse();
                    $scope.labDetail = true;
                }
                function allFalse() {
                    $scope.labDetail = false;
                //     $scope.me = false;
                //     $scope.market = false;
                //     $scope.product = false
                //     $scope.sell = false;
                }
                // // console.log($scope.sell);
                $scope.back = function() {
                    $location.path($window.history.back())
                }

                // $http.get('/api/vendors/'+sessionStorage.ubi).success(function(res){
                    $scope.myName = sessionStorage.myName
                //     console.log(res);
                // })
                // $scope._myName = sessionStorage.name

                $scope.goTo = function (p){
                    $location.path(p);
                }



            }
        }
    })

    .directive('pnBottomNav', function ($location) {
        return {
            restrict: 'E',
            scope: {
                loc: '='
            },
            templateUrl: 'Directives/nav/pn-bottom-nav.html',
            link: function ($scope, element, attrs) {

                $scope.goTo = function (p){
                    $location.path(p);
                }
            }
        }
    })

    // .directive('authorHeader', function () {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             author: '='
    //         },
    //         templateUrl: 'Directives/wts-card/author-header.html',
    //         link: function ($scope, element, attrs) {
    //             // console.log($scope.wts);
    //             var r = new Firebase("https://connect502.firebaseio.com/vendors/"+$scope.author)
    //             r.on('value', function(dataSnapshot) {
    //                 $scope.me = dataSnapshot.val();
    //                 // console.log($scope.me);
    //             });
    //             var m = new Firebase("https://connect502.firebaseio.com/users/"+$scope.author+"/image/sizes/scaled300")
    //             m.on('value', function(dataSnapshot) {
    //                 $scope.authorpic = dataSnapshot.val();
    //                 console.log($scope.author);
    //             });
    //         }
    //     }
    // })
    // .directive('itemDesc', function () {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             desc: '=',
    //             price: '='
    //         },
    //         templateUrl: 'Directives/wts-card/item-desc.html',
    //         link: function ($scope, element, attrs) {
    //             // console.log($scope.wts);
    //         }
    //     }
    // })
    // .directive('wtsCard', function () {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             wts: '='
    //         },
    //         templateUrl: 'Directives/wts-card/wts-card.html',
    //         link: function ($scope, element, attrs) {
    //             // console.log($scope.wts);
    //             // $scope.imagePath = 'img/card-image.png';
    //
    //         }
    //     }
    // })
    // .directive('newWtsImageUpload', function () {
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'Directives/wts-card/wts-image-upload.html',
    //         link: function ($scope, element, attrs) {
    //             // console.log('Here i am');
    //             $scope.onUCUploadComplete = function (info) {
    //                 console.log(info);
    //                 // var r = new Firebase("https://connect502.firebaseio.com/wts/"+$scope.wtsid+"/image")
    //                 var sizes = {}
    //                 sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
    //                 sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
    //                 sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
    //                 sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
    //                 sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'
    //
    //                 $scope.wts.image = {info: info, sizes: sizes}
    //             }
    //             // console.log($scope.wts);
    //             // $scope.imagePath = 'img/card-image.png';
    //
    //         }
    //     }
    // })
    // .directive('existingWtsImageUpload', function () {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             wtsid: '='
    //         },
    //         templateUrl: 'Directives/wts-card/wts-image-upload.html',
    //         link: function ($scope, element, attrs) {
    //             // console.log('Here i am');
    //             $scope.onUCUploadComplete = function (info) {
    //                 console.log(info);
    //                 var r = new Firebase("https://connect502.firebaseio.com/wts/"+$scope.wtsid+"/image")
    //                 var sizes = {}
    //                 sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
    //                 sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
    //                 sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
    //                 sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
    //                 sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'
    //
    //                 r.set({info: info, sizes: sizes})
    //             }
    //             // console.log($scope.wts);
    //             // $scope.imagePath = 'img/card-image.png';
    //
    //         }
    //     }
    // })
    // .directive('profilePictureUpload', function () {
    //     return {
    //         restrict: 'E',
    //         scope: {
    //             userid: '='
    //         },
    //         templateUrl: 'Directives/wts-card/profile-picture-upload.html',
    //         link: function ($scope, element, attrs) {
    //             // console.log('Here i am');
    //             $scope.onUCUploadComplete = function (info) {
    //                 console.log(info);
    //                 var r = new Firebase("https://connect502.firebaseio.com/users/"+$scope.userid+"/image")
    //                 var sizes = {}
    //                 sizes.scaled500 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/500x/'
    //                 sizes.scaled400 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/400x/'
    //                 sizes.scaled300 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/300x/'
    //                 sizes.scaled200 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/200x/'
    //                 sizes.scaled100 = 'https://ucarecdn.com/'+info.uuid+'/-/resize/100x/'
    //
    //                 r.set({info: info, sizes: sizes})
    //             }
    //             // console.log($scope.wts);
    //             // $scope.imagePath = 'img/card-image.png';
    //
    //         }
    //     }
    // })
})();
