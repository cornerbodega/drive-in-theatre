(function(){
    angular
    .module('countryApp')
    .controller('ProductController', ['$location', '$scope','Product',
    ProductController
])

function ProductController($location, $scope, Product) {
    // var PATHS = window.PATHS
    if (!Product.view_detail_product) $location.path('/market')
    // console.log(Product.view_detail_product);
    $scope.product = Product.view_detail_product
};

})();
