
APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook/addBook.template.html',
    scope: {
        close: '='
    },
    controller: ['$scope', '$timeout', 'genreService', 'booksService',
                    'stepsService', 'validationService', addBookController]
}));

function addBookController($scope, $timeout, genreService, booksService, stepsService, validationService){

    $scope.steps = {
        genre: {
            start: true,
            prev: false,
            next: 'subgenre'
        },
        subgenre: {
            prev: 'genre',
            next: 'information',
            alt: 'add'
        },
        add: {
            display: 'Add new subgenre',
            prev: 'subgenre',
            next: 'information'
        },
        information: {
            prev: 'subgenre',
            next: 'done'
        },
        done: {
            prev: false,
            next: 'genre'
        }
    };

    $scope.allGenres = [];
    $scope.newBook = {};
    $scope.getStep = stepsService.getCurrentStep;
    $scope.isStepValid = validationService.isCurrentStepValid;

    $scope.$watch($scope.getStep, (newStep, prevStep) => {
        if(newStep.name === 'genre' && prevStep.name === 'done'){
            initializeNewBook();
        }
    });

    function initializeNewBook(){
        validationService.resetValidations();
        $scope.newBook = booksService.getNewBook(true);
    }

    function init(){
        initializeNewBook();
        stepsService.init($scope.steps);
        $scope.currentStep = $scope.getStep();

        $scope.doneLoading = false;
        genreService.getAllGenres().then(allGenresResponse => {
            $scope.doneLoading = true;
            $scope.allGenres = allGenresResponse;
        });
    }

    $scope.next = stepsService.next;
    $scope.prev = stepsService.prev;

    $scope.move = function move(direction){
        $scope[direction]();
    }

    $scope.addToSelection = function addToSelection(type, value){
        booksService.appendToNewBook(type, value);
        $scope.move('next');
    };

    $scope.openNewSubGenre = function openNewSubGenre(){
        $scope.clickedAddSubgenre = true;
        $timeout(() => {
            stepsService.goToStep('add');
            $scope.clickedAddSubgenre = false;
        }, 500)
    };

    $scope.shouldDisable = function shouldDisable(direction){
        return $scope.getStep().name !== 'done'
                && direction === 'next'
                && !validationService.isCurrentStepValid();
    }

    init();
}