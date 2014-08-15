'use strict';

app.controller('StoresController', function($scope, $location, $routeParams, Store){

    $scope.store = { name: '', address: '', number: '' };

    $scope.submitStore = function(){
        Store.create($scope.store).then(function(){
            $scope.store = { name: '', address: '', number: '' };
        });
    };

    $scope.deleteStore = function(storeId){
        Store.delete(storeId);
    };

});