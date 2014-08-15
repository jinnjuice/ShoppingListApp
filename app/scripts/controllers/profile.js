'use strict';

app.controller('ProfileController',
    function($scope, $routeParams, List, User){
        $scope.user = User.findByUsername($routeParams.username);

        $scope.commentedLists = {};

        $scope.user.$on('loaded', function() {
            populateLists();
            populateComments();
        });

        function populateLists() {
            $scope.lists = {};

            angular.forEach($scope.user.lists, function(listId){
                $scope.lists[listId] = List.find(listId);
            });
        }

        function populateComments() {
            $scope.comments = {};

            angular.forEach($scope.user.comments, function(comment) {
                var list = List.find(comment.listId);

                list.$on('loaded', function() {
                    $scope.comments[comment.id] = list.$child('comments').$child(comment.id);

                    $scope.commentedLists[comment.listId] = list;
                });
            });
        }
    }
);