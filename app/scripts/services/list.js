'use strict';

app.factory('List',
    function($firebase, FIREBASE_URL, User, $location) {
        var ref = new Firebase(FIREBASE_URL + 'lists');

        var lists = $firebase(ref);

        var List = {
            all: lists,
            create: function (list) {
                if (User.signedIn()){
                    var user = User.getCurrent();

                    list.owner = user.username;

                    return lists.$add(list).then(function(ref){

                        var listId = ref.name();

                        user.$child('lists').$child(listId).$set(listId);
                        $location.path('/lists/' + ref.name());

                        return listId;
                    });

                }

            },

            find: function (listId) {
                return lists.$child(listId);
            },

            delete: function (listId) {
                if (User.signedIn()){
                    var list = List.find(listId);

                    list.$on('loaded', function(){
                        var user = User.findByUsername(list.owner);

                        lists.$remove(listId).then(function(){
                            user.$child('lists').$remove(listId);
                        });
                    });
                }
            },

            addRequest: function(listId, request){
                if (User.signedIn()){
                    var user = User.getCurrent();

                    request.username = user.username;
                    request.listId = listId;

                    lists.$child(listId).$child('requests').$add(request).then(function(ref){
                        user.$child('requests').$child(ref.name()).$set({ id: ref.name(), listId: listId});
                    });
                }
            },

            deleteRequest: function(list, request, requestId){
                if (User.signedIn()) {
                    var user = User.findByUsername(request.username);

                    list.$child('requests').$remove(requestId).then(function(){
                        user.$child('requests').$remove(requestId);
                    });
                }
            }
        };
        return List;
    }
);