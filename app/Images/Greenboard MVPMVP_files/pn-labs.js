(function(){
    angular.module('pn-labs', [])
    .controller('LabsController', ['$location', '$scope', 'Labs', LabsController ])
    .controller('LabsDetailController', ['$location', '$scope', 'Labs', LabsDetailController ])
    .factory('Labs', ['$firebaseObject', Labs ])
    .directive('pnLabsList', pnLabsList)
    // .directive('pnLabItemLabsList', pnLabItemLabsList)
    .directive('pnLabSummary', pnLabSummary)
    .directive('pnLabDetails', pnLabDetails)
    function pnLabDetails(Labs, $location) {
        return {
            restrict: 'E',
            scope: { lab: '='  },
            templateUrl: 'pn-lab-details.html',
            link: function($scope, element, attrs) {

            }
        };
    };
    function pnLabDetailTextCard(Labs, $location) {
        return {
            restrict: 'E',
            scope: { lab: '='  },
            templateUrl: 'pn-lab-detail-text-card.html',
            link: function($scope, element, attrs) {
                console.log($scope.lab);
                $scope.back = function () {
                    $location.path('/labs')
                }
            }
        };
    };
    function pnLabsList(Labs, $location) {
        return {
            restrict: 'E',
            scope: {  },
            templateUrl: 'pn-labs-list.html',
            link: function($scope, element, attrs) {
                var fbo = Labs.fbo()
                fbo.$loaded().then(init)
                function init() {
                    console.log(fbo);
                    var llabs = []
                    angular.forEach(fbo, function(lab) {
                        llabs.push(lab)
                    })
                    $scope.labs = llabs
                    console.log($scope.labs);
                }
                $scope.toLabDetail = function (lab) {
                    console.log('To Lab Detail');

                    Labs.view.lab = lab
                    console.log(Labs.view.lab);
                    $location.path('/labs/'+lab.location)
                }
            }
        };
    };
    // function pnLabItemLabsList(Labs) {
    //     return {
    //         restrict: 'E',
    //         scope: { lab: '=' },
    //         templateUrl: 'pn-lab-item-labs-list.html',
    //         link: function($scope, element, attrs) {
    //             // console.log($scope.lab);
    //         }
    //     };
    // };
    function pnLabSummary(Labs) {
        return {
            restrict: 'E',
            scope: { lab: '=' },
            templateUrl: 'pn-lab-summary.html',
            link: function($scope, element, attrs) {
                console.log($scope.lab);
            }
        };
    };
    function LabsDetailController($location, $scope, Labs) {
        if (!Labs.view.lab) $location.path('/labs')
        $scope.lab = Labs.view.lab

        // console.log($scope.lab);
    };
    function LabsController($location, $scope, Labs) {
        // if (!Lab.view_detail_product) $location.path('/labs')

    };

    function Labs ($firebaseObject){
        return {
            view: {
                lab: null,
            },
            ref: ref,
            fbo: fbo,
        }
        function ref() {
            return new Firebase("https://connect502.firebaseio.com/labs")
        }
        function fbo() {
            return $firebaseObject(ref())
        }
    };

})();
