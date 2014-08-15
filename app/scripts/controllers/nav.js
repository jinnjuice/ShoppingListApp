'use strict';

app.controller('NavController', function($scope, $location, List, Auth){

    $scope.logout = function(){
        Auth.logout();
    };
});