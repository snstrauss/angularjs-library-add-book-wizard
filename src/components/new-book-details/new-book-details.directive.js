
APP.directive('newBookDetails', () => ({
    restrict: 'E',
    templateUrl: 'src/components/new-book-details/new-book-details.template.html',
    scope: {
        book: '='
    },
    controller: ['$scope', newBookDetailsController]
}));

function newBookDetailsController($scope){

    console.log($scope.book);

    debugger;

}