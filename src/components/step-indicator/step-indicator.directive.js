
APP.directive('stepIndicator', () => ({
    restrict: 'E',
    templateUrl: '../../../src/components/step-indicator/step-indicator.template.html',
    scope: {
        steps: '=',
        currentStep: '='
    },
    controller: ['$scope', stepIndicatorController]
}));

function stepIndicatorController($scope){
    $scope.$watch('currentStep', (newStep) => {

    });
}