var request = require('request'),
  Promise = require('bluebird'),
  util = require('./util');

var Metric = module.exports = function(base){
  this.base = base;
};

Metric.prototype.startDate = function(date){
  this.params.startDate = util.formatDate(date);
  return this;
};

Metric.prototype.start = Metric.prototype.startDate;

Metric.prototype.endDate = function(date){
  this.params.endDate = util.formatDate(date);
  return this;
};

Metric.prototype.end = Metric.prototype.endDate;

Metric.prototype.country = function(country){
  this.params.country = country;
  return this;
};

Metric.prototype.versionName = function(versionName){
  this.params.versionName = country;
  return this;
};

Metric.prototype.version = Metric.prototype.versionName;

Metric.prototype.groupBy = function(group){
  this.params.groupBy = group;
  return this;
};

Metric.prototype.group = Metric.prototype.groupBy;

Metric.prototype.exec = function(callback){
  return new Promise(function(resolve, reject){
    request.get(this.base, {
      headers: {
        'Content-Type': 'application/json'
      },
      qs: this.params
    }, function(err, res, body){
      if (err) return reject(err);

      var data = JSON.parse(body);
      if (res.statusCode !== 200) return reject(util.formatError(data));

      resolve(data);
    });
  }).nodeify(callback);
};