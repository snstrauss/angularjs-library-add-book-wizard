
APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook/addBook.template.html',
    controller: ['$scope', 'genreService', 'booksService', 'stepsService', addBookController]
}));

function addBookController($scope, genreService, booksService, stepsService){

    $scope.steps = {
        genre: {
            start: true,
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

    function init(){
        stepsService.init($scope.steps);
        $scope.currentStep = $scope.getStep();

        genreService.getAllGenres().then(allGenresResponse => {
            $scope.allGenres = allGenresResponse;
        });
    }

    $scope.next = stepsService.next;
    $scope.prev = stepsService.prev;

    $scope.move = function move(direction){
        $scope[direction]();
    }

    $scope.addToSelection = function addToSelection(type, value){
        $scope.newBook[type] = value;
        $scope.move('next');
    };

    $scope.openNewSubGenre = function openNewSubGenre(){
        stepsService.goToStep('add');
    };

    init();
}