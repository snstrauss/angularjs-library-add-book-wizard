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

    function postNewBook(newBookData){
        return backendService.post('books', newBookData);
    }

    const getPublishers = backendService.get.bind(null, 'publishers');
    const getAuthors = backendService.get.bind(null, 'authors');

    return {
        getAllBooks,
        postNewBook,
        getPublishers,
        getAuthors
    }
}