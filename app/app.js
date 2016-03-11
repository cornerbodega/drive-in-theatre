var countryApp = angular.module('countryApp', [
    'ngRoute',
    'ngMaterial',
    'angular-loading-bar',
    'firebase',
    'underscore',
    'angular-centered',
    'ng-uploadcare',
    // 'ui.bootstrap',
    // 'ngResource',

]);

countryApp.config(function($routeProvider) {
    $routeProvider
    // sign-in
    // sign-up
    // sign-up/502 <link-502-traceability />
    // sign-up/connoisseur
    // link-502 <link-502-traceability />
    .when('/wts/create/', {
        templateUrl: 'Create-Wts-Wizard/Create-Wts-Wizard.html',
        controller: 'CreateWtsWizardController',

    })
    .when('/product/:id', {
        templateUrl: 'Product/Product.html',
        controller: 'ProductController',

    })
    .when('/home', {
        templateUrl: 'Home/Home.html',
        controller: 'HomeController',

    })
    .when('/market', {
        templateUrl: 'Market/Market.html',
        controller: 'MarketController',

    })
    .when('/me', {
        templateUrl: 'Profile/Profile.html',
        controller: 'ProfileController',

    })
    .when('/', {
        templateUrl: 'landing/landing.html',
        controller: 'LandingController',
        //   controllerAs: 'vm'
    })
    // .when('/welcome', {
    //     templateUrl: 'Profile/Profile.html',
    //     controller: 'ProfileController',
    //
    // })
    // .when('/', {
    //     templateUrl: 'landing/landing.html',
    //     controller: 'LandingController',
    //     //   controllerAs: 'vm'
    // })
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
