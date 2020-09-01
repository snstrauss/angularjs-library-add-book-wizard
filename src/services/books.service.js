angular.module('library-add-book')
.factory('booksService', ['$rootScope', 'backendService', booksService]);

function booksService($rootScope, backendService){
    let allBooks = [];
    let newBook = {};

    const EVENTS = {
        'ON_NEW_BOOK': 'on-new-book'
    };

    function getAllBooks(){
        return backendService.get('books').then(allBooksResponse => {
            allBooks = allBooksResponse;
            return allBooks;
        });
    }

    function postNewBook(){
        return backendService.post('books', newBook).then(res => {
            $rootScope.$broadcast(EVENTS.ON_NEW_BOOK, newBook)
        });
    }

    const getPublishers = backendService.get.bind(null, 'publishers');
    const getAuthors = backendService.get.bind(null, 'authors');

    function appendToNewBook(prop, value){
        newBook[prop] = value;
    }

    function getNewBook(shouldReset){

        if(shouldReset){
            newBook = {};
        }

        return newBook;
    }

    return {
        getAllBooks,
        postNewBook,
        getPublishers,
        getAuthors,
        appendToNewBook,
        getNewBook,
        EVENTS
    }
}