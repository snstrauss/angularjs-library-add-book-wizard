
APP.directive('newBookDetails', () => ({
    restrict: 'E',
    templateUrl: 'src/components/new-book-details/new-book-details.template.html',
    controller: ['$scope', '$q', 'booksService', 'stepsService', 'camelCaseFilter', newBookDetailsController]
}));

function newBookDetailsController($scope, $q, booksService, stepsService, camelCaseFilter){

    $scope.camelCase = camelCaseFilter;

    function init(){

        $scope.book = booksService.getNewBook();

        $q.all([booksService.getPublishers(), booksService.getAuthors()]).then(([publishers, authors]) => {
            $scope.newBookDetails = [{
                label: 'book title',
            },{
                label: 'author',
                type: 'select',
                collection: authors
            },{
                label: 'ISBN',
            },{
                label: 'publisher',
                type: 'select',
                collection: publishers
            },{
                label: 'date published',
                type: 'date'
            },{
                label: 'number of pages',
                type: 'number'
            },{
                label: 'format',
                type: 'select',
                collection: ['Hard cover', 'Soft cover']
            },{
                label: 'edition',
                type: 'number'
            },{
                label: 'edition language',
                type: 'select',
                collection: ["Dutch", "Amharic", "Hebrew", "Hindi", "French", "Bosnian", "Dzongkha"]
            },{
                label: 'description',
                type: 'textarea'
            }];
        });
    }

    $scope.$on(stepsService.EVENTS.ON_NEXT, () => {
        $scope.book.genre = $scope.book.genre.name;
        $scope.book.subgenre = $scope.book.subgenre.name;

        booksService.postNewBook();
    });

    init();
}