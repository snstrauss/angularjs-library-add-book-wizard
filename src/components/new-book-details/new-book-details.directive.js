
APP.directive('newBookDetails', () => ({
    restrict: 'E',
    templateUrl: 'src/components/new-book-details/new-book-details.template.html',
    controller: ['$scope', '$timeout', 'booksService', 'stepsService', 'camelCaseFilter', 'validationService',
                    newBookDetailsController]
}));

const mapJustName = (item) => item.name;

function newBookDetailsController($scope, $timeout, booksService, stepsService, camelCaseFilter, validationService){

    $scope.camelCase = camelCaseFilter;

    function init(){

        $scope.book = booksService.getNewBook();

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
    }

    let typingTimeout;
    $scope.$watch('book', () => {
        $timeout.cancel(typingTimeout);
        typingTimeout = $timeout(() => {
            validationService.updateValidation($scope.newBookDetails.every(detail => {
                const detailName = camelCaseFilter(detail.label);
                const existingValue = $scope.book[detailName];

                return (detailName === 'description' && !$scope.needDescription())
                        ? true
                        : existingValue && existingValue.length;
            }))
        }, 750)
    }, true);

    $scope.$on(stepsService.EVENTS.ON_NEXT, () => {
        $scope.book.genre = $scope.book.genre.name;
        $scope.book.subgenre = $scope.book.subgenre.name;

        booksService.postNewBook();
    });

    $scope.needDescription = function needDescription(){
        return booksService.getNewBook().subgenre.isDescriptionRequired;
    };

    init();
}