APP.directive('noBooks', () => ({
    restrict: 'E',
    templateUrl: '../../../src/components/no-books/no-books.template.html',
    scope: {
        addBook: '='
    }
}));