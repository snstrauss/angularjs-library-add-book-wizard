
APP.directive('newBookDetails', () => ({
    restrict: 'E',
    templateUrl: 'src/components/new-book-details/new-book-details.template.html',
    controller: ['$scope', '$q', 'booksService', 'stepsService', 'camelCaseFilter', newBookDetailsController]
}));

const mapJustName = (item) => item.name;

function newBookDetailsController($scope, $q, booksService, stepsService, camelCaseFilter){

    $scope.camelCase = camelCaseFilter;

    function init(){

        $scope.book = booksService.getNewBook();

        $q.all([booksService.getPublishers(), booksService.getAuthors()]).then(([publishers, authors]) => {
            $scope.newBookDetails = [{
                label: 'book title'
            },{
                label: 'author'
            },{
                label: 'ISBN',
            },{
                label: 'publisher'
            },{
                label: 'date published'
            },{
                label: 'number of pages',
                type: 'number'
            },{
                label: 'format'
            },{
                label: 'edition',
                type: 'number'
            },{
                label: 'edition language'
            },{
                label: 'description',
                type: 'textarea'
            }];
        });
    }

    $scope.selectionClicked = function selectionClicked(type, value){
        $scope.book[type] = value;
    };

    $scope.$on(stepsService.EVENTS.ON_NEXT, () => {
        $scope.book.genre = $scope.book.genre.name;
        $scope.book.subgenre = $scope.book.subgenre.name;

        booksService.postNewBook();
    });

    init();
}