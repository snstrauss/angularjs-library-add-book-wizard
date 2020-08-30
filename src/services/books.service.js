angular.module('library-add-book')
.factory('booksService', ['backendService', booksService]);

function booksService(backendService){
    let allBooks = [];

    function getAllBooks(){
        return backendService.get('books').then(allBooksResponse => {
            allBooks = allBooksResponse;
            return allBooks;
        });
    }

    return {
        getAllBooks
    }
}