
APP.directive('booksList', () => ({
    restrict: 'E',
    templateUrl: 'src/components/books-list/booksList.template.html',
    controller: ['$scope', 'booksService', booksListController]
}));

function booksListController($scope, booksService){

    $scope.list = [];

    $scope.showAddBookWizard = false;

    function init(){
        refreshBooks();
    }

    $scope.$on(booksService.EVENTS.ON_NEW_BOOK, refreshBooks);

    function refreshBooks(){
        booksService.getAllBooks().then(allBooks => {
            $scope.list = allBooks;
        });
    }

    $scope.addBook = function addBook(){
        $scope.showAddBookWizard = true;
    }

    init();
}