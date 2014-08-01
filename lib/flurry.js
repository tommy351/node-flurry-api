var request = require('request'),
  Promise = require('bluebird'),
  util = require('./util'),
  Metric = require('./metric');

var Flurry = module.exports = function(options){
  if (!options.apiAccess) throw new Error('options.apiAccess is required!');
  if (!options.apiKey) throw new Error('options.apiKey is required!');

  this.options = options;

  var _Metric = this.Metric = function(){
    Metric.apply(this, arguments);
  };

  util.inherits(_Metric, Metric);

  _Metric.prototype.options = options;
  _Metric.prototype.params = {
    apiAccessCode: options.apiAccess,
    apiKey: options.apiKey
  };
};

['getApplication', 'getAllApplications'].forEach(function(i){
  Flurry.prototype[i] = function(callback){
    if (typeof callback !== 'function') callback = function(){};

    return new Promise(function(resolve, reject){
      request.get('http://api.flurry.com/appInfo/' + i, {
        headers: {
          'Content-Type': 'application/json'
        },
        qs: {
          apiAccessCode: this.options.apiAccess,
          apiKey: this.options.apiKey
        }
      }, function(err, res, body){
        if (err) return reject(err);

        var data = JSON.parse(body);
        if (res.statusCode !== 200) return reject(util.formatError(data));

        resolve(data);
      });
    }).nodeify(callback);
  };
});

Flurry.prototype.appMetric = function(metric){
  return new this.Metric('https://api.flurry.com/appMetrics/' + metric);
};

Flurry.prototype.eventMetric = function(event){
  if (event){
    var metric = new this.Metric('https://api.flurry.com/eventMetrics/Event');
    metric.params.eventName = event;
    return metric;
  } else {
    return new this.Metric('https://api.flurry.com/eventMetrics/Summary');
  }
};