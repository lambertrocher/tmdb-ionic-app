/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q, httpService, i18nService, API_IMAGES_URL, API_KEY) {
    var service = this;

    /**
     * Build a movie image url given a path and a width.
     * @param {String|null} path - Should be part a other TMDB API calls.
     * @param {Number} width - Valid image width.
     *   See https://developers.themoviedb.org/3/configuration.
     * @return {String|null}
     */
    service.getImageUrl = function (path, width) {
      return path && 'http://image.tmdb.org/t/p/w' + width + path;
    };

    /**
     * Get search results matching a given query.
     * @param {String} query
     * @return {Promise} Passing an array of results, may be empty.
     */
    service.search = function (query) {
      return httpService.get('/3/search/movie', {
        languages: i18nService.getLocale(),
        api_key: API_KEY,
        query: query
      }).then(function (data) {
        return data.results;
      });
    };

    /**
     * Get movie details for a given movie id.
     * @param {String} id
     * @return {Promise} Passing an object.
     */
    service.getMovie = function (id) {
      return httpService.fet('/3/movie/' + id, {
        language: i18nService.getLocale(),
        api_key: API_KEY
      });
    };

    service.discoverMovie = function () {
      return httpService.get('/3/discover/movie', {
        'release_date.lte': moment().add(3, 'months').format('YYYY-MM-DD'),
        'release_date.gte': moment().format('YYYY-MM-DD'),
        language: i18nService.getLocale(),
        api_key: API_KEY
      }).then(function (data) {
        return _.sample(data.results) || $q.reject();
      });
    };

    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    '$q',
    'httpService',
    'i18nService',
    'API_IMAGES_URL',
    'API_KEY',
    StatesService
  ]);

}(angular.module('app.states')));
