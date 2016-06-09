(function(){
    angular
    .module('countryApp')
    .controller('ProductController', ['$location', '$scope','Product',
    ProductController
])

function ProductController($location, $scope, Product) {
    if (!Product.view_detail_product) $location.path('/market')
    $scope.product = Product.view_detail_product
};

})();
