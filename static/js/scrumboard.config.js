(function(){
    'use strict';

    angular.module('scrumboard.demo')
        .config(['$routeProvider', config]) // to configure routes for angular applications
        .run(['$http',run]); // when module is loaded run method is executed

    function config($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: '/static/html/scrumboard.html',
                controller: 'ScrumboardController'
            })
            .when('/login',{
                templateUrl: 'static/html/login.html',
                controller: 'LoginController'
            })
            .otherwise('/'); // redirect to home if any other page request is made

            // use the HTML5 History API
           // $locationProvider.html5Mode(true);
    }
    function run($http){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken'; // sent back to browser token name
        $http.defaults.xsrfCookieName = 'csrftoken'; // cookie name
    }
})();