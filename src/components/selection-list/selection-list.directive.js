
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
    controller: ['$scope', '$timeout',selectionListController]
}));

function selectionListController($scope, $timeout){

    $scope.typedSelection = function typedSelection(item, idx){
        $scope.selected = idx;
        $timeout(() => {
            $scope.onSelect($scope.selectionType, item);
        }, 500);
    }


}