/* global app: true */

'use strict';

/**
 * @ngdoc overview
 * @name angularFirebaseAppApp
 * @description
 * # angularFirebaseAppApp
 *
 * Main module of the application.
 */

var app = angular.module('angularFirebaseAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
])

.constant('FIREBASE_URL', 'https://ng-shopping-list.firebaseio.com/');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/lists.html',
            controller : 'ListsController'
        })
        .when('/lists/:listId', {
            templateUrl: 'views/showlist.html',
            controller : 'ListViewController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller : 'AuthController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller : 'AuthController'
        })
        .when('/users/:username',{
            templateUrl: 'views/profile.html',
            controller : 'ProfileController'
        })
        .when('/createList', {
            templateUrl: 'views/newList.html',
            controller : 'ListsController'
        })
        .when('/addStore', {
            templateUrl: 'views/newStore.html',
            controller : 'StoresController'
        })
        .otherwise({
            redirectTo : '/'
        });
  });
