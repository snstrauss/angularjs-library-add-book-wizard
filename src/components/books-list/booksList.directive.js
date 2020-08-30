
APP.directive('booksList', () => ({
    restrict: 'E',
    templateUrl: 'src/components/books-list/booksList.template.html',
    controller: ['$scope', 'booksService', booksListController]
}));

function booksListController($scope, booksService){

    $scope.list = [];

    $scope.showAddBookWizard = false;

    function init(){

        booksService.getAllBooks().then(allBooks => {
            $scope.list = allBooks;
        });
    }

    $scope.addBook = function addBook(){
        $scope.showAddBookWizard = true;
    }

    init();
}