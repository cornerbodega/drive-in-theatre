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
    'formly',
    'ngResource',
    // 'btford.socket-io',

    // 'pn-landing',
    // 'mobile-angular-ui',

]);

countryApp.config(function($routeProvider) {
    $routeProvider
    .when('/traceability', { //
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })

    // .when('/settings', { //
    //     templateUrl: 'Settings/Settings.html',
    //     controller: 'SettingsController',
    // })
    .when('/adjust-weight', { //
        templateUrl: 'Home/Inventory-Actions/Adjust-Weight.html',
        controller: 'AdjustInventoryController',
    })
    .when('/create-manifest', { //
        templateUrl: 'Home/Inventory-Actions/Create-Manifest.html',
        controller: 'CreateManifestController',
    })
    .when('/transfer-outbound', { //
        templateUrl: 'Home/Inventory-Actions/Transfer-Outbound.html',
        controller: 'TransferOutboundController',
    })
    .when('/receive-inbound', { //
        templateUrl: 'Home/Inventory-Actions/Receive-Inbound.html',
        controller: 'ReceiveInboundController',
    })
    // .when('/iap_complete', { //
    //     templateUrl: 'Home/Home.html',
    //     controller: 'HomeController',
    // })
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


    //  BEGIN TRACEABILITY MERGE
    .when('/traceability/market', {
        templateUrl: 'views/Market/Market.html',
        controller: 'MarketController',
    })
    .when('/traceability/help', {
        templateUrl: 'views/Help/Help.html',
        controller: 'HelpController',

    })
    .when('/traceability/sales', {
        templateUrl: 'views/history/History.html',
        controller: 'HistoryController',
    })
    .when('/traceability/tax_report', {
        templateUrl: 'views/history/History.html',
        controller: 'HistoryController',
    })
    .when('/traceability/location', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/inventory/manifests/outbound', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/inventory/manifests/inbound', {
        templateUrl: 'Traceability-Menu/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/qa_lab', {
        templateUrl: 'views/qa_lab/qa_lab.view.html',
        controller: 'QALabController',
    })
    .when('/traceability/plants/plant_move', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_modify', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_yield_modify', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_convert_to_inventory', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_cure', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_waste_weigh', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_harvest', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_harvest_schedule', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_destroy', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/plant_destroy_schedule', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/inventory_rooms/inventory_room_add', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/inventory_rooms/inventory_room_modify', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/inventory_rooms/inventory_room_remove', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/plant_rooms/plant_room_add', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/plant_rooms/plant_room_modify', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/plant_rooms/plant_room_remove', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/rooms/inventory_rooms/browse_inventory_rooms', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/location/rooms/plant_rooms/browse_plant_rooms', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/location/rooms/inventory_rooms', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/location/rooms/plant_rooms', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/location/rooms', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/plants/plant_new', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/plants/browse_plants', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/plants', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/inventory/manifests/inbound/inventory_transfer_inbound', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/employees/employee_add', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/employees/employee_remove', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/employees/employee_modify', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/employees/browse_employees', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/location/vehicles/vehicle_remove', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',

    })
    .when('/traceability/location/vehicles/vehicle_modify', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/vehicles/vehicle_add', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/location/vehicles/browse_vehicles', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/location/vehicles', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/location/employees', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/inventory/manifests', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/inventory/manifests/outbound/inventory_transfer_outbound', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/manifests/outbound/inventory_manifest', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/manifests/outbound/browse_manifests', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/inventory', {
        templateUrl: 'Traceability-Menu/traceability-menu.view.html',
        controller: 'TraceabilityMenuController',
    })
    .when('/traceability/inventory/inventory_destroy', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/inventory_convert', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/inventory_destroy_schedule', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/inventory_adjust', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/view_inventory', {
        templateUrl: 'Traceability-Browse/Traceability-Browse.view.html',
        controller: 'TraceabilityBrowseController',
    })
    .when('/traceability/vendors', {
        templateUrl: 'views/vendors/vendors.view.html',
        controller: 'VendorsController',

    })
    .when('/samples', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',
    })
    .when('/traceability/inventory/manifests/inbound/transfers_view_inbound', {
        templateUrl: 'Traceability-Form/traceability-form.view.html',
        controller: 'TraceabilityFormController',

    })
    // .when('/traceability', {
    //     templateUrl: 'Traceability-Menu/traceability-menu.view.html',
    //     controller: 'TraceabilityMenuController',
    // })
    .when('/login', {
        templateUrl: 'views/Landing/Landing.html',
        controller: 'LoginController',
    })
    .when('/print_id/:id/:desc/:date', {
        templateUrl: 'views/print.html',
        controller: 'PrintController',
    })
    .otherwise({
        redirectTo: '/'
    });
});

countryApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    // .primaryPalette('pink')
    // .accentPalette('orange');
});
