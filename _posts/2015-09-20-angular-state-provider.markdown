---
layout: post
title:  "Angular ui-router, onEnter callback"
date:   2015-09-20 15:00:00
categories: angular ui-router onEnter
---
<p>
Working on our most recent project, <a href="http://ottolist.us/">Otto</a>, we decided that a user that has logged in should be immediately sent to the landing page if they tried to access the login page.  After some trial and error with a few different methods, the onEnter callback provided by Angular UI-Router seemed like a good solution, since it is called as soon as the state becomes active.
</p>

{% highlight js %}
$stateProvider
  .state('login', {
    url: "/",
    views: {
      "content1": { templateUrl: "user/login.html",
                    controller: "loginController"
                  },
      "title": { template: "Otto" }
    },
    onEnter: ['auth', '$location', function (auth, $location){
      if (auth.isAuthenticated){
        $location.path( "/landing" );
      }
    }]
  })
{% endhighlight %}

<p>
I inject auth and $location into the function, and then it is simply a matter of testing whether the user is authenticated or not. 
</p>
