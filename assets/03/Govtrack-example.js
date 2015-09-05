/*
  <button ng-click="getAllBills()"> Search </button>
*/


/************************************
in the billController
*************************************/

module.exports = function billController($scope, Home){ //the Home factory is injected
  $scope.query = {q: 'User Input'};  //items added by user interactions
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


/************************************
in our home factory
*************************************/
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


/************************************
inside node server
*************************************/
var express = require('express');
var bills = require('./billController');

var app = express();

//bill search route for more advanced queries than 'bills/*' offers
app.get('/billSearch', function(request, response){
  bills.getBillsBySearch(request.query, function(listing){ // populates billInfo object with bill data
    //billInfo = utils.makeBillSearch(listing);  //use to clean up and omit unessecary data before sending
    response.send(listing); // sends back JSON object to client
  });
});

module.exports = app;


/************************************
inside our node controller
*************************************/
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











