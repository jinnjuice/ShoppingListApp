'use strict';

app.controller('ListViewController', function($scope, $routeParams, List){
    $scope.list = List.find($routeParams.listId);

    $scope.addRequest = function(){
        List.addRequest($routeParams.listId, $scope.request);
        $scope.request = '';
    };

    $scope.removeRequest = function(request, requestId){
        List.deleteRequest($scope.list, request, requestId);
    };

});