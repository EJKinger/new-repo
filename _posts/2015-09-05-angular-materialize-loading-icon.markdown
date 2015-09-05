---
layout: post
title:  "A quick little loading icon with Angular and Materialize"
date:   2015-09-05 15:00:00
categories: Angular.js, MaterializeCSS, loading icon
---
<p>
When designing a site to feel responsive on mobile, it's important to consider the varying connection speeds that your users are likely to have.  It's easy to forget that API interactions don't generally occur instantly, though they might seem instantaneous during internal testing.  Here's how I made small loading icon to let users know that "the thing I just did worked".
</p>

<p>
Here's the first bit of code, the HTML that displays a button and a loading icon.  It uses the angular ng-if directive to decide which element to display.  All of the CSS classes are native to the Materialize CSS library.
</p>
{% highlight html %}
  <!-- Begin Submit Button (displays if form not submitted)-->
  <div ng-if="!s.submitted" class="row">
    <div class="col s4 offset-s4">
      <button ng-click="s.submitForm()" class="btn-large waves-effect green" name="action">Submit
      </button>
    </div>
  </div>
  <!-- Begin Loading Icon (displays if form submitted) -->
  <div ng-if="s.submitted" class="row">
    <div class="col s2 offset-s5">
      <div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
{% endhighlight %}
<p>
Notice that I've attached my `submitForm()` function to an object `s`.  The ng-if directive actually removes the elements from the DOM and creates a new $scope.  Attaching it to this `s` object means that you maintain access to any stored variables even if the $scope changes.
</p>
<p>
Now here's a simplified version of the Angular controller.  We initialize a variable `$scope.s.submitted` to `false`.  This way, our ng-if directive from the HTML above will begin displaying the button and not the loading icon.  When the button is clicked, our ng-click directive calls our `$scope.s.submit` function, which changes `$scope.s.submitted` to true.  Angular then updates our DOM to reflect this change, displaying the loading icon and removing the button.  Then, `sendData()` is called, which sends a post request to our internal API.  On success, this function will re-route the user to another page.  On failure, it will reactivate the button and display a 'toast', which is an awesome materialize notification feature.
</p>    
{% highlight js %}
  $scope.s.submitted = false;

  $scope.s.submit = function(){
    $scope.s.submitted = true;
    sendData();
  };

  var sendData = function(){
    $http.post('/internal-API-route', $scope.s.inputs)
      .then(function(res){
        $location.path( "/angular-route" );
      }, function(err){
        console.log('ERROR in householdController sendHousehold()', err);
        $scope.s.submitted = false;
        Materialize.toast('Ooops, check your connection and try again.', 10000);
    });
  };
{% endhighlight %}