angular.module("countryApp")
.directive('pnPathNav', function ($location, $window, TraceabilityMenuService) {
    return {
        restrict: 'EA',
        templateUrl: 'Directives/nav/pn-path-nav.html',
        link: function ($scope, element, attrs) {
            $scope.crumbs = []
            var path_array = $location.path().split('/')
            var pathstring = ''
            path_array.map(function(pathpart, index){
                if (index > 0)  pathstring += '/'
                pathstring += pathpart
                //console.log(pathpart);
                var iconAndLabel = TraceabilityMenuService.getIconAndLabel(pathpart)
                if (!iconAndLabel) return console.log('Error! no Icon And Label for' + pathpart);
                var icon = iconAndLabel.icon
                var label = iconAndLabel.label
                //console.log(iconAndLabel);
                $scope.crumbs.push({
                    label: label,
                    path: pathstring,
                    icon: icon,
                    select: function(path){ $location.path(path) }
                })
            })
        }
    }
})
