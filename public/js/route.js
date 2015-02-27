//ROUTING CONTENT

var todo = angular.module('todo', ['ngRoute']);

todo.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
    when('/', {
        templateUrl: 'views/content.html',
        controller: "todoCtrl"
    }).
    otherwise({
    	templateUrl: 'views/form.html',
        controller: "todoCtrl"
    });
});
