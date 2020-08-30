angular.module('library-add-book')
.factory('genreService', ['backendService', genreService]);

function genreService(backendService){
    let allGenres = [];

    function getAllGenres(){
        return allGenres.length ? allGenres : backendService.get('genres').then(allGenresResponse => {
            allGenres = allGenresResponse[0].genres;
            return allGenres;
        });
    }

    return {
        getAllGenres
    }
}