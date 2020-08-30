
APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook/addBook.template.html',
    controller: ['$scope', 'genreService', addBookController]
}));

function addBookController($scope, genreService){

    $scope.currentStep = 0;
    $scope.allGenres = [];

    $scope.newBook = {};

    function init(){
        genreService.getAllGenres().then(allGenresResponse => {
            $scope.allGenres = allGenresResponse;
        });
    }

    $scope.moveStep = function moveStep(delta){
        $scope.currentStep += delta;
    }

    $scope.addToSelection = function addToSelection(type, value){

        debugger;
        newBook[type] = value;

        debugger;


    }

    $scope.getSubGenres = function getSubGenres(){

        debugger;

    }

    init();
}