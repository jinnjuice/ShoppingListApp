'use strict';

app.controller('ListViewController', function($scope, $routeParams, List){
    $scope.list = List.find($routeParams.listId);

    $scope.addComment = function(){
        List.addComment($routeParams.listId, $scope.comment);
        $scope.comment = '';
    };

    $scope.removeComment = function(comment, commentId){
        List.deleteComment($scope.list, comment, commentId);
    };

});