angular.module('library-add-book')
.factory('backendService', ['$http', 'mockDbService', backendService]);

const BASE_URL = "https://jsonbox.io";
const JSON_BOX_ID = "box_30a9248ec8b716588c4f";
const COLLECTIONS = ['books', 'genres'];


const NO_COLLECTION_ERROR = 'No such collection exists';
const isCollection = (collection) => COLLECTIONS.includes(collection);

/**
 * This service was originally using a jsonBox instance as a simplistic DB,
 * but this service is down for maintenance, the service will now use a mock DB service.
 */
function backendService($http, mockDbService){

    function buildUrl(collection){
        return `${BASE_URL}/${JSON_BOX_ID}/${collection}`;
    }

    function get(collection){

        if(!isCollection(collection)){
            return Promise.reject(NO_COLLECTION_ERROR);
        }

        return mockDbService.get(collection).then(res => {
            return res;
        });

    }

    function post(collection, data){
        console.log('CALL TO ADD NEW BOOK WITH: ');
        console.log(data);
        console.log('- - - - - - - - - - - - -');
        if(!isCollection(collection)){
            return Promise.reject(NO_COLLECTION_ERROR);
        }

        return mockDbService.add(collection, data);
    }

    function update(collection, newGenre){
        console.log('CALL TO UPDATE SUBGENRES WITH: ');
        console.log(newGenre);
        console.log('- - - - - - - - - - - - -');

        return mockDbService.update(collection, newGenre.id, newGenre);
    }

    return {
        get,
        post,
        update
    }
}