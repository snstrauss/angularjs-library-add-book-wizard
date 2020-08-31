
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

    const getAlts = (step) => step.alt;
    const stepAlts = Object.values($scope.steps).filter(getAlts).map(getAlts);

    $scope.stepsArr = Object.entries($scope.steps).map(([name, data]) => {
        return {
            name,
            display: data.display || name,
            isAlt: stepAlts.includes(name)
        }
    });

    $scope.isCurrentStep = function isCurrentStep(step){
        return step.name === $scope.currentStep;
    }
}