var countryApp = angular.module('countryApp', [
    'ngRoute',
    'ngMaterial',
    'angular-loading-bar',
    'firebase',
    'underscore',
    // 'underscore',
    'ng-uploadcare',
    // 'ui.bootstrap',
    // 'ngResource',

]);

countryApp.config(function($routeProvider) {
    $routeProvider
    .when('/welcome', {
        templateUrl: 'Profile/Profile.html',
        controller: 'ProfileController',

    })
    .when('/', {
        templateUrl: 'landing/landing.html',
        controller: 'LandingController',
        //   controllerAs: 'vm'
    })
    // .when('/manifests/', {
    //   templateUrl: 'Manifests/views/All-Manifests.html',
    //   controller: 'ManifestsController',
    //   controllerAs: 'vm'
    // })
    // .when('/market/item/:id', {
    //   templateUrl: 'Market/Item-Detail/item-detail.html',
    //   controller: 'ItemDetailController',
    //   controllerAs: 'vm'
    // })

    // when('/:countryId', {
    //   templateUrl: 'country-detail.html',
    //   controller: 'CountryDetailCtrl'
    // }).
    .otherwise({
        redirectTo: '/'
    });
});
