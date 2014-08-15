'use strict';

app.factory('Store',
    function($firebase, $location, FIREBASE_URL, User) {
        var ref = new Firebase(FIREBASE_URL + 'stores');

        var stores = $firebase(ref);

        var Store = {
            all: stores,
            create: function (store) {
                if (User.signedIn()){
                    var user = User.getCurrent();

                    store.owner = user.username;

                    return stores.$add(store).then(function(ref){

                        var storeId = ref.name();

                        user.$child('stores').$child(storeId).$set(storeId);
                        $location.path('/createList');

                        return storeId;
                    });

                }

            },

            find: function (storeId) {
                return stores.$child(storeId);
            },

            delete: function (storeId) {
                if (User.signedIn()){
                    var store = Store.find(storeId);

                    store.$on('loaded', function(){
                        var user = User.findByUsername(store.owner);

                        stores.$remove(storeId).then(function(){
                            user.$child('stores').$remove(storeId);
                        });
                    });
                }
            }

        };
        return Store;
    }
);