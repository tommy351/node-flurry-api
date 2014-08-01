# Flurry API

[![NPM version](https://badge.fury.io/js/flurry-api.svg)](http://badge.fury.io/js/flurry-api)

Flurry API for Node.js.

## Installation

``` bash
$ npm install flurry-api 
```

## Usage

Create a new flurry instance:

``` js
var flurry = new Flurry({
  apiAccess: '',
  apiKey: ''
});
```

## API

### getApplication(callback)

Returns information of an application. See [here][AppInfo] for more info.

### getAllApplications(callback)

Returns information of all applications. See [here][AppInfo] for more info.

### appMetric(metric)

Returns application metric of an application. See [here][AppMetrics] for more info.

**Metrics:**

- **ActiveUsers** - Total number of unique users who accessed the application per day.
- **ActiveUsersByWeek** - Total number of unique users who accessed the application per week. Only returns data for dates which specify at least a complete calendar week.
- **ActiveUsersByMonth** - Total number of unique users who accessed the application per month. Only returns info for dates which specify at least a complete calendar month.
- **NewUsers** - Total number of unique users who used the application for the first time per day.
- **MedianSessionLength** - Median length of a user session per day.
- **AvgSessionLength** - Average length of a user session per day.
- **Sessions** - The total number of times users accessed the application per day.
- **RetainedUsers** - Total number of users who remain active users of the application per day.
- **PageViews** - Total number of page views per day.
- **AvgPageViewsPerSession** - Average page views per session for each day.

### eventMetric([event])

Returns event metric of an application. Leave `event` argument blank for event summary. See [here][EventMetrics] for more info.

### Metric.startDate(date)

Sets start date. `date` should be a date object or a string in `YYYY-MM-DD` format.

**Alias:** start

### Metric.endDate(date)

Sets end date. `date` should be a date object or a string in `YYYY-MM-DD` format.

**Alias:** end

### Metric.country(country)

Filters by country or use `ALL` to break down data by countries. You can find abbreviation of all countries [here](http://support.flurry.com/index.php?title=Countries).

### Metric.versionName(versionName)

Filters by version name.

**Alias:** version

### Metric.groupBy(group)

Groups data into `DAYS` (default), `WEEKS` or `MONTHS`.

**Alias:** group

### Metric.exec(callback)

Executes a query and returns data.

## License

MIT

[AppMetrics]: http://support.flurry.com/index.php?title=API/Code
[AppInfo]: http://support.flurry.com/index.php?title=API/Code/AppInfo
[EventMetrics]: http://support.flurry.com/index.php?title=API/Code/EventMetrics