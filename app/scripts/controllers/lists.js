'use strict';

app.controller('ListsController', function($scope, $location, List){
    if ($location.path() === '/') {
        $scope.lists = List.all;
    }

    $scope.submitList = function(){
        List.create($scope.list).then(function(){
            $scope.list = { date: '', title: '' };
        });
    };

    $scope.deleteList = function(listId){
       List.delete(listId);
    };

    $scope.list = { date: '', title: '' };

});
