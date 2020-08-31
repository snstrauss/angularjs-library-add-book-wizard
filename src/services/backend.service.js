angular.module('library-add-book')
.factory('backendService', ['$http', backendService]);

const BASE_URL = "https://jsonbox.io";
const JSON_BOX_ID = "box_30a9248ec8b716588c4f";
const COLLECTIONS = ['books', 'genres'];

function backendService($http){

    function get(collection){

        if(!COLLECTIONS.includes(collection)){
            return Promise.reject('NO SUCH COLLECTION ON BACKEND');
        }

        return $http.get(`${BASE_URL}/${JSON_BOX_ID}/${collection}`).then(res => {
            return res.data;
        });

    }

    function update(collection, newGenre){
        console.log('CALL TO UPDATE SUBGENRES WITH: ');
        console.log(newGenre);
        console.log('- - - - - - - - - - - - -');

        return $http.put(`${BASE_URL}/${JSON_BOX_ID}/${collection}/${newGenre._id}`, newGenre);
    }

    return {
        get,
        update
    }
}