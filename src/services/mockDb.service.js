angular.module('library-add-book')
.factory('mockDbService', ['$q', mockDbService]);

function mockDbService($q){

    const DBReady = $q.defer();

    const DB = {
        genres: [],
        books: []
    };

    fetch('../../src/DATA.json').then(res => res.json()).then(genresData => {
        DB.genres = genresData.genres;
        DBReady.resolve();
    });

    function get(collection){
        return DBReady.promise.then(() => {
            return DB[collection];
        });
    }

    function add(collection, data){
        DB[collection].push(data);
        return $q.resolve(DB[collection]);
    }

    function update(collection, id, newData){
        const idx = DB[collection].findIndex((item) => {
            return item.id === id;
        });

        DB[collection][idx] = newData;

        return $q.resolve(DB[collection][idx]);
    }

    return {
        get,
        add,
        update
    };
}