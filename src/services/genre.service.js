angular.module('library-add-book')
.factory('genreService', ['$q', 'backendService', genreService]);

function cleanGenreName(genre){
    return parseInt(genre.name.replace('Genre ', ''));
}

function byGenreName(a, b){
    return cleanGenreName(a) - cleanGenreName(b);
}

function genreService($q, backendService){

    const RESOURCE_TYPE = 'genres';

    let allGenres = [];

    function getAllGenres(){
        return allGenres.length ? $q.resolve(allGenres) : backendService.get(RESOURCE_TYPE).then(allGenresResponse => {
            allGenres = allGenresResponse.sort(byGenreName);
            return allGenres;
        });
    }

    function setSubgenre(subgenre, parentGenre){

        const genreToUpdate = allGenres.find(genre => genre.id === parentGenre.id);
        genreToUpdate.subgenres.push(subgenre);

        return backendService.update(RESOURCE_TYPE, genreToUpdate);

    }

    return {
        getAllGenres,
        setSubgenre
    }
}