
APP.directive('addBook', () => ({
    restrict: 'E',
    templateUrl: 'src/components/addBook/addBook.template.html',
    controller: ['$scope', 'genreService', 'booksService', addBookController]
}));

function addBookController($scope, genreService, booksService){

    $scope.steps = {
        genre: {
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
            prev: 'subgenre'
        }
    };

    $scope.currentStep = 'genre';

    $scope.allGenres = [];
    $scope.newBook = {};

    function init(){
        genreService.getAllGenres().then(allGenresResponse => {
            $scope.allGenres = allGenresResponse;
        });
    }

    $scope.moveStep = function moveStep(direction){
        $scope.currentStep = $scope.steps[$scope.currentStep][direction];
        if(direction === 'next'){
            $scope.$broadcast('send-step-data');
        }
    };

    $scope.addToSelection = function addToSelection(type, value){
        $scope.newBook[type] = value;
        $scope.moveStep('next');
    };

    $scope.openNewSubGenre = function openNewSubGenre(){
        $scope.currentStep = 'add';
    };

    init();
}