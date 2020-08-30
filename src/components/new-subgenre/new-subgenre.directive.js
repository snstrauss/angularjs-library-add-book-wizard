
APP.directive('newSubgenre', () => ({
    restrict: 'E',
    templateUrl: '../../../src/components/new-subgenre/new-subgenre.template.html',
    scope: {
        parentGenre: '='
    },
    controller: ['$scope', 'genreService', newSubgenreController]
}));

function newSubgenreController($scope, genreService){

    $scope.$on('send-step-data', setNewSubgenre);
    function setNewSubgenre(){
        genreService.setSubgenre({
            name: $scope.newSubgenre,
            isDescriptionRequired: $scope.description || false
        }, $scope.parentGenre);
    }

}