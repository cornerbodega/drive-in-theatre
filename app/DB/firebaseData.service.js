(function() {
  'use strict';

  angular
    .module('countryApp')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['FIREBASE_URL'];

  function firebaseDataService(FIREBASE_URL) {
    var root = new Firebase(FIREBASE_URL);

    var service = {
      root: root,
      users: root.child('users'),
      wts: root.child('wts'),
    //   vendors: root.child('vendors')
    //   textMessages: root.child('textMessages')
    };

    return service;
  }

})();
