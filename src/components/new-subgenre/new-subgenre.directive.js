
APP.directive('newSubgenre', () => ({
    restrict: 'E',
    templateUrl: '../../../src/components/new-subgenre/new-subgenre.template.html',
    scope: {
        parentGenre: '='
    },
    controller: ['$scope', '$timeout', 'booksService', 'genreService', 'stepsService', 'validationService', newSubgenreController]
}));

function newSubgenreController($scope, $timeout, booksService, genreService, stepsService, validationService){

    $scope.$on(stepsService.EVENTS.ON_NEXT, setNewSubgenre);
    $scope.newSubgenre = '';

    function setNewSubgenre(ev){
        booksService.appendToNewBook('subgenre', {
            name: $scope.newSubgenre,
            isDescriptionRequired: $scope.description
        });

        genreService.setSubgenre({
            name: $scope.newSubgenre,
            isDescriptionRequired: $scope.description || false
        }, $scope.parentGenre);
    }

    let typingTimeout;
    $scope.$watch('newSubgenre', () => {
        $timeout.cancel(typingTimeout);
        typingTimeout = $timeout(() => {
            validationService.updateValidation(!!$scope.newSubgenre.length);
        }, 750);
    })

}