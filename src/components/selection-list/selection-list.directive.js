
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
    controller: ['$scope', selectionListController]
}));

function selectionListController($scope){

    $scope.typedSelection = $scope.onSelect.bind(null, $scope.selectionType);

}