(function(){
    angular
    .module('countryApp')
    .controller('TraceabilityMenuController', ['$location', '$scope', 'pnData', TraceabilityMenuController ])
    .directive('pnPathsGrid', pnPathsGrid)

    function TraceabilityMenuController($location, $scope, pnData) {
        if(!sessionStorage.sessionid) $location.path('/')

    };

    function pnPathsGrid($location, TraceabilityMenuService) {
        return {
            restrict: 'E',
            templateUrl: 'Traceability-Menu/directives/pn-paths-grid.html',
            link: function($scope, element, attrs) {
                $scope.paths = TraceabilityMenuService.paths()[$location.path()]
                $scope.selectPath = function(path) {
                    $location.path($location.path()+'/'+path)
                }
            }
        }
    };

})();
