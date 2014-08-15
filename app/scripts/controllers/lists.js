'use strict';

app.controller('ListsController', function($scope, $location, List, Store){
    if ($location.path() === '/') {
        $scope.lists = List.all;
    }

    if ($location.path() === '/createList') {
        $scope.stores = Store.all;
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
