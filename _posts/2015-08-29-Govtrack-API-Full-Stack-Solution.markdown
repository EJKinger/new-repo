---
layout: post
title:  "The Govtrack API: A full stack solution"
date:   2015-08-29 15:00:00
categories: govtrack api full stack Node.js, Express.js, Angular.js
---
<p>
I was recently working on an application called the 'Political Profiler', which uses the GovTrack.us API to get a ton of different information on the members of the US Congress.  The application brought together a ton of useful information about members, but had little about the various bills that members were working on.  What follows are a series of simplified code snippets that represent a solution for querying the Govtrack.us API. 
</p>

<p>
The first step is some user interaction that begins the serach process.  In this scenario, we're going to assume that the query has already been built and we are simply initializing the API call.
{% highlight html %}
<button ng-click="getAllBills()"> Search </button>
{% endhighlight %}
This simple button uses the ngClick directive to invoke our getAllBills function.
</p>
<p>
The code below represents a basic angular controller.  We have just invoked our getAllBills function, and we can see that this function now invokes another function Home.getAllBills and passes along the query.    
{% highlight js %}
module.exports = function billController($scope, Home){ //the Home factory is injected
  $scope.query = {q: 'User Input'};  //assume the query has already been built, the 'q' property represents a text search to the govTrack API
  $scope.bills = [];

  $scope.getAllBills = function(){
    Home.getAllBills($scope.query)
    .then(function(response){
      angular.forEach(res, function(bill){
        $scope.bills.push(bill);
      });
    }).catch(function(err){
      throw err;
    });
  };
};
{% endhighlight %}
<p>
Now within our Home factory, we can see that the getAllBills function is making a GET request to our internal API at the '/billSearch' endpoint, and again passing along our query, this time attached to the params property.
{% highlight js %}
module.exports = function homeFactory($http){

  function getAllBills(query){
    return $http({
      method: 'GET',
      url: '/billSearch',
      params: query
    })
    .then(function(res){
      return res.data;
    });
  }

  return({
    getAllBills: getAllBills,
  });
};
{% endhighlight %}
</p>
<p>
Here, we define our basic express server and also require a billController which we will use to actually query the GovTrack.us API.  We route our query to the controller from here.
{% highlight js %}
var express = require('express');
var bills = require('./billController');

var app = express();

app.get('/billSearch', function(request, response){
  bills.getBillsBySearch(request.query, function(listing){
    response.send(listing); // sends back JSON object to client
  });
});

module.exports = app;
{% endhighlight %}
</p>
<p>
Finally, within our controller we actually query the API.  I say this, but the actual query is abstracted away using 
[GovTrack Node]: https://github.com/markgx/govtrack-node
We promisify the govTrack node library to eliminate any synchronicity issues.  Then, once the response is received we begin the long journy back up the stack to the user.
{% highlight js %}
var govTrack = require('govtrack-node');
var Promise = require('bluebird');
var utils = require('./utilController');

var promiseGov = Promise.promisifyAll(govTrack);

module.exports = {
  //query should be an object with key value pairs representing the search field and query
  getBillsBySearch: function(query, callback) {
    promiseGov.findBillAsync(query)
      .then(function(response){
        callback(response.objects);
      })
      .catch(function(err){
        console.log('Error in getBillsBySearch:', err);
    });
  }

};
{% endhighlight %}
</p>

















