
debugger;

APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook.template.html',
    controller: ['$scope', addBookController]
}));

debugger;

function addBookController($scope){

    debugger;

    console.log($scope);
    debugger;

    $scope.samp = 12;

}