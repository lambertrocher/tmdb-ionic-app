/**
 * @module app.states.details
 */
(function (module) {
  'use strict';

  var STATE_DETAILS = 'states.details';

  function config($stateProvider) {
    $stateProvider.state(STATE_DETAILS, {
      data: { module: module, navBar: true },
      url: '/details',
      views: {
        'content-smartphone': {
          controller: 'detailsController as detailsController'
        }
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_DETAILS = STATE_DETAILS;}

  module.constant('STATE_DETAILS', STATE_DETAILS);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.details', ['app.states'])));
