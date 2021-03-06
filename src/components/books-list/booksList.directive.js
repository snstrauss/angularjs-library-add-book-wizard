
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
        $scope.doneLoading = false;
        booksService.getAllBooks().then(allBooks => {
            $scope.list = allBooks;
            $scope.doneLoading = true;
        });
    }

    $scope.addBook = function addBook(){
        $scope.showAddBookWizard = true;
    };

    $scope.close = function close(){
        $scope.showAddBookWizard = false;
    };

    init();
}