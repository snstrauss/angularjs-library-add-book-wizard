angular.module('library-add-book')
.factory('backendService', ['$http', backendService]);

const BASE_URL = "https://jsonbox.io";
const JSON_BOX_ID = "box_30a9248ec8b716588c4f";
const COLLECTIONS = ['books', 'genres', 'authors', 'publishers'];


const NO_COLLECTION_ERROR = 'No such collection exists';
const isCollection = (collection) => COLLECTIONS.includes(collection);

function backendService($http){

    function buildUrl(collection){
        return `${BASE_URL}/${JSON_BOX_ID}/${collection}`;
    }

    function get(collection){

        if(!isCollection(collection)){
            return Promise.reject(NO_COLLECTION_ERROR);
        }

        return $http.get(buildUrl(collection)).then(res => res.data);

    }

    function post(collection, data){
        console.log('CALL TO ADD NEW BOOK WITH: ');
        console.log(data);
        console.log('- - - - - - - - - - - - -');
        if(!isCollection(collection)){
            return Promise.reject(NO_COLLECTION_ERROR);
        }

        return $http.post(buildUrl(collection), data).then(res => res.data)
    }

    function update(collection, newGenre){
        console.log('CALL TO UPDATE SUBGENRES WITH: ');
        console.log(newGenre);
        console.log('- - - - - - - - - - - - -');

        return $http.put(`${buildUrl(collection)}/${newGenre._id}`, newGenre);
    }

    return {
        get,
        post,
        update
    }
}