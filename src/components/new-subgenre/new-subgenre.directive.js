
APP.directive('newSubgenre', () => ({
    restrict: 'E',
    templateUrl: '../../../src/components/new-subgenre/new-subgenre.template.html',
    scope: {
        parentGenre: '='
    },
    controller: ['$scope', 'genreService', 'stepsService', newSubgenreController]
}));

function newSubgenreController($scope, genreService, stepsService){

    $scope.$on(stepsService.EVENTS.ON_NEXT, setNewSubgenre);
    function setNewSubgenre(ev){
        genreService.setSubgenre({
            name: $scope.newSubgenre,
            isDescriptionRequired: $scope.description || false
        }, $scope.parentGenre);
    }

}