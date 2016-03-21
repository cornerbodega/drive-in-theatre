var countryApp = angular.module('countryApp', [
    'ngRoute', // Single-page Angular Routing
    'ngMaterial', // Angular Material CSS Theme
    'angular-loading-bar', // Loading bar for http requests
    'firebase', // For AngularFire binding
    'underscore', // For filtering, utility functions
    'ng-uploadcare', // For cloud image upload
    // 'mobile-angular-ui',

]);

countryApp.config(function($routeProvider) {
    $routeProvider
    .when('/sign-in', { // Place to put design documentation
        templateUrl: 'Sign-In/Sign-In.html',
        controller: 'SignInController',
    })
    // .when('/documentation', { // Place to put design documentation
    //     templateUrl: 'Documentation/Documentation.html',
    //     controller: 'DocumentationController',
    // })
    .when('/wts/create/', { // Page to create a new Want To Sell listing
        templateUrl: 'Create-Wts-Wizard/Create-Wts-Wizard.html',
        controller: 'CreateWtsWizardController',

    })
    .when('/product/:id', { // Product Detail page
        templateUrl: 'Product/Product.html',
        controller: 'ProductController',

    })
    .when('/home', { // Create new post page
        templateUrl: 'Create-Wts-Wizard/Create-Wts-Wizard.html',
        controller: 'CreateWtsWizardController',

        // templateUrl: 'Home/Home.html',
        // controller: 'HomeController',

    })
    .when('/market', { // View community posts page
        templateUrl: 'Market/Market.html',
        controller: 'MarketController',

    })
    .when('/', { // Sign up/ sign in/ demo login page
        templateUrl: 'landing/landing.html',
        controller: 'LandingController',
    })
    .otherwise({
        redirectTo: '/'
    });
});
