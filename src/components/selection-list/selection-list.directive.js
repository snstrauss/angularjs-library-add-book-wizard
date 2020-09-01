
APP.directive('selectionList', () => ({
    restrict: 'E',
    templateUrl: 'src/components/selection-list/selection-list.template.html',
    scope: {
        list: '=',
        onSelect: '=',
        displayProp: '@',
        selectionType: '@',
        extraSelection: '='
    },
    controller: ['$scope', '$timeout', 'booksService', 'validationService', selectionListController]
}));

function selectionListController($scope, $timeout, booksService, validationService){

    $scope.typedSelection = function typedSelection(item, idx){
        $scope.selected = idx;
        $timeout(() => {
            validationService.updateValidation(true);
            $scope.onSelect($scope.selectionType, item);
        }, 500);
    }

    $scope.$watch(() => booksService.getNewBook(), (newBook) => {
        $scope.selectedData = newBook[$scope.selectionType] && newBook[$scope.selectionType].name;
    }, true);

}