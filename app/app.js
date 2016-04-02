var countryApp = angular.module('countryApp', [
    'ngRoute', // Single-page Angular Routing
    'ngMaterial', // Angular Material CSS Theme
    'angular-loading-bar', // Loading bar for http requests
    'firebase', // For AngularFire binding
    'underscore', // For filtering, utility functions
    'ng-uploadcare', // For cloud image upload
    'pn-labs',
    'vs-repeat',
    'ng-currency',
    // 'pn-landing',
    // 'mobile-angular-ui',

]);

countryApp.config(function($routeProvider) {
    $routeProvider
    .when('/iap_complete', { //
        templateUrl: 'Home/Home.html',
        controller: 'HomeController',
    })
    .when('/sign-in', { //
        templateUrl: 'Sign-In/Sign-In.html',
        controller: 'SignInController',
    })
    .when('/', { // Sign uP
        templateUrl: 'Sign-Up/Sign-Up.html',
        controller: 'SignUpController',
    })
    // .when('/documentation', { // Place to put design documentation
    //     templateUrl: 'Documentation/Documentation.html',
    //     controller: 'DocumentationController',
    // })
    // .when('/wts/create/', { // Page to create a new Want To Sell listing
    //     templateUrl: 'Create-Wts-Wizard/Create-Wts-Wizard.html',
    //     controller: 'CreateWtsWizardController',
    //
    // })
    .when('/publish', { // Page to create a new Want To Sell listing
        templateUrl: 'Publish-Wts-Wizard/Publish-Wts-Wizard.html',
        controller: 'PublishWtsWizardController',
    })
    .when('/product/:id', { // Product Detail page
        templateUrl: 'Product/Product.html',
        controller: 'ProductController',

    })
    .when('/home', { //Create new post page
        templateUrl: 'Home/Home.html',
        controller: 'HomeController',
    })
    .when('/labs', { //Create new post page
        templateUrl: 'Labs/Labs.html',
        controller: 'LabsController',
    })
    .when('/labs/:id', { //Create new post page
        templateUrl: 'Labs/Labs-Detail.html',
        controller: 'LabsDetailController',
    })
    .when('/market', { // View community posts page
        templateUrl: 'Market/Market.html',
        controller: 'MarketController',

    })
    .when('/landing', { // Sign up/ sign in/ demo login page
        templateUrl: 'landing/landing.html',
        controller: 'LandingController',
    })
    .otherwise({
        redirectTo: '/'
    });
});
