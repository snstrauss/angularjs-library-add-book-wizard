
APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook/addBook.template.html',
    controller: ['$scope', 'genreService', 'booksService', addBookController]
}));

function addBookController($scope, genreService, booksService){

    $scope.currentStep = 0;
    $scope.allGenres = [];

    $scope.newBook = {};

    function init(){
        genreService.getAllGenres().then(allGenresResponse => {
            $scope.allGenres = allGenresResponse;
        });
    }

    let lastRealStep;
    $scope.moveStep = moveStep;
    function moveStep(delta){
        if(!Number.isInteger($scope.currentStep)){
            $scope.currentStep = lastRealStep;
        }

        $scope.$broadcast('send-step-data');
        $scope.currentStep += delta;

        if(Number.isInteger($scope.currentStep)){
            lastRealStep = $scope.currentStep;
        }
    }

    $scope.addToSelection = addToSelection;
    function addToSelection(type, value){
        $scope.newBook[type] = value;
        moveStep(1);
    }

    $scope.openNewSubGenre = openNewSubGenre;
    function openNewSubGenre(){
        $scope.currentStep = 'add';
    }

    init();
}