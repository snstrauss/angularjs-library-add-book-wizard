
APP.directive('stepIndicator', () => ({
    restrict: 'E',
    templateUrl: '../../../src/components/step-indicator/step-indicator.template.html',
    scope: {
        steps: '=',
        currentStep: '='
    },
    controller: ['$scope', 'stepsService', stepIndicatorController]
}));

function stepIndicatorController($scope, stepsService){

    const steps = stepsService.getSteps();

    const getAlts = (step) => step.alt;
    const stepAlts = Object.values(steps).filter(getAlts).map(getAlts);

    $scope.stepsArr = Object.values(steps).map(step => {

        const { name } = step;

        return {
            name,
            display: step.display || name,
            isAlt: stepAlts.includes(name)
        }
    });


    $scope.isCurrentStep = function isCurrentStep(step){
        return step.name === stepsService.getCurrentStep().name;
    }
}