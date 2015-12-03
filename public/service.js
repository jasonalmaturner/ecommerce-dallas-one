angular.module('ecommerce').service('mainService', function($http) {

  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/api/products',
    });
  };

  this.postProduct = function(product) {
    return $http({
      method: 'POST',
      url: '/api/products',
      data: product,
    });
  };

  this.updateProduct = function(product) {
    return $http({
      method: 'PUT',
      url: '/api/products/' + product._id,
      data: product,
    });
  };

  this.removeProduct = function(id) {
    return $http({
      method: 'DELETE',
      url: '/api/products/' + id,
    });
  };

});
