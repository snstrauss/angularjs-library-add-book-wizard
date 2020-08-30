
APP.directive('selectionList', () => ({
    restrict: 'E',
    templateUrl: 'src/components/selection-list/selection-list.template.html',
    scope: {
        list: '=',
        onSelect: '=',
        displayProp: '@',
        selectionType: '@'
    },
    controller: ['$scope', selectionListController]
}));

function selectionListController($scope){

    debugger;

    const typedSelection = $scope.onSelect.bind(null, $scope.selectionType);

    debugger;

    $scope.selected = function selected(thing){
        console.log(thing);
        debugger;

        typedSelection(thing);
    }
    console.log($scope.list);
    console.log($scope.onSelect);
    console.log($scope.selectionType);

    debugger;


}