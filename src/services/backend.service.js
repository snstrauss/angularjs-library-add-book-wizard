angular.module('library-add-book')
.factory('backendService', ['$http', backendService]);

const BASE_URL = "https://jsonbox.io";

const ENDPOINTS = {
    books: 'box_14927da9b840814951db',
    genres: 'box_bdb99c456a61166a9020'
};

function backendService($http){

    function get(type){

        if(!type in ENDPOINTS){
            return Promise.reject('NO SUCH TYPE ON BACKEND');
        }

        return $http.get(`${BASE_URL}/${ENDPOINTS[type]}`).then(res => {
            return res.data;
        });

    }

    return {
        get
    }
}