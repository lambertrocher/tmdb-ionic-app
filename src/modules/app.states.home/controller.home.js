/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController(
    $scope,
    statesService,
    shakeService,
    popupService
  ) {
    var controller = this;

    /**
     * Search model object storing query and results.
     * @type {Object}
     */
    $scope.search = { query: '', results: [] };

    /**
     * Search for movies matching the `$scope.search.query` value.
     */
    controller.search = function () {
      // Use `statesService.search` which makes an asynchronous
      // call to the TMDB API and returns a promise...
      statesService.search($scope.search.query).then(function (results) {
        // Then, if the call was successful, update `$scope.search.results`.
        $scope.search.results = results;
      });
    };

    controller.discoverMovie = function () {
      if (popupService.isOpen()) { return; }
      statesService.discoverMovie().then(function (movie) {
        popupService.isOpen(module, 'smartphone/popup.discover', movie);
      });
    };

    $scope.$on('$ionivView.enter', function () {
      shakeService.listen(controller.discoverMovie);
    });

    $scope.$on('$ionivView.leave', function () {
      shakeService.stopListening();
    });
  }

  module.controller('homeController', [
    '$scope',
    'statesService',
    'shakeService',
    'popupService',
    HomeController
  ]);

}(angular.module('app.states.home')));
