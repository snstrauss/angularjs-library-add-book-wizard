
APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook/addBook.template.html',
    controller: ['$scope', 'genreService', 'booksService', addBookController]
}));

const STEPS = [
    {
        display: 'Genre'
    },
    {
        display: 'Subgenre'
    },
    {
        display: 'Information'
    }
];

function addBookController($scope, genreService, booksService){

    $scope.currentStep = 0;
    $scope.steps = STEPS;

    $scope.passedSteps = 0;

    $scope.allGenres = [];

    $scope.newBook = {};

    function init(){

        console.log('INITIALIZE LINKED LIST');
        debugger;

        genreService.getAllGenres().then(allGenresResponse => {
            $scope.allGenres = allGenresResponse;
        });
    }

    $scope.lastRealStep;
    $scope.moveStep = moveStep;
    function moveStep(delta){


        if(!Number.isInteger($scope.currentStep)){
            $scope.currentStep = $scope.lastRealStep;
        }

        $scope.$broadcast('send-step-data');
        debugger;
        $scope.currentStep += delta;
        $scope.passedSteps += delta;

        if(Number.isInteger($scope.currentStep)){
            $scope.lastRealStep = $scope.currentStep;
        }
    }

    $scope.addToSelection = addToSelection;
    function addToSelection(type, value){
        $scope.newBook[type] = value;
        moveStep(1);
    }

    $scope.openNewSubGenre = openNewSubGenre;
    function openNewSubGenre(){
        addNewSubgenreStep();
        $scope.currentStep = 'add';
    }

    function addNewSubgenreStep(){

        debugger;

        $scope.passedSteps++;
        $scope.steps.splice($scope.currentStep + 1, 0, {
            display: 'Add new subgenre'
        });
    }

    init();
}