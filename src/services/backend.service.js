angular.module('library-add-book')
.factory('backendService', ['$http', backendService]);

const BASE_URL = "https://jsonbox.io";

const ENDPOINTS = {
    books: 'box_14927da9b840814951db',
    genres: 'box_c0bb9c6b3ad5dcaad561'
};
// const BASE_URL = "https://api.jsonbin.io/b";

// const ENDPOINTS = {
//     books: '5f4baff04d8ce4111383f880',
//     genres: '5f4baf77514ec5112d117537'
// }

function backendService($http){

    function get(type){

        if(!type in ENDPOINTS){
            return Promise.reject('NO SUCH TYPE ON BACKEND');
        }

        return $http.get(`${BASE_URL}/${ENDPOINTS[type]}`).then(res => {
            return res.data;
        });

    }

    function update(type, newGenre){
        console.log('CALL TO UPDATE SUBGENRES WITH: ');
        console.log(newGenre);
        console.log('- - - - - - - - - - - - -');

        return $http.put(`${BASE_URL}/${ENDPOINTS[type]}/${newGenre._id}`, newGenre);
    }

    return {
        get,
        update
    }
}