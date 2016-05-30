'use strict';

var Promise = require('bluebird');
var firebase = require('../lib/data/firebase');

var common = require('../lib');
var util = require('../lib/util');

module.exports.handler = function(event, context, cb) {
  return Promise.all([firebase.getFoosers(), firebase.getTeams(), firebase.getGames()]).then(function(data) {
    var fooserMap = data[0];
    var teamMap = data[1];
    var games = util.mapToArray(data[2]);

    var injectedGames = common.injectTeamsToGames(teamMap, games);
    var scoredFoosers = common.scoreFoosers(fooserMap, injectedGames);

    return cb(null, {
      message: 'Foos indices have been updated'
    });
  });
};
