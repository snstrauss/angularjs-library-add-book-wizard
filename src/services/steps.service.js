angular.module('library-add-book')
.factory('stepsService', ['$rootScope', stepsService]);

function stepsService($rootScope){

    const EVENTS = {
        "ON_STEP": 'on-step',
        "ON_NEXT": 'on-next',
        "ON_PREV": 'on-prev'
    };

    function moveStep(direction, specific){

        const from = steps[currentStep.name];
        const to = steps[specific || from[direction]];

        assignCurrentStep(to);

        notify({ from, to, direction });
    }

    function notify(stepData){
        $rootScope.$broadcast(EVENTS.ON_STEP, stepData);
        if(stepData.direction){
            $rootScope.$broadcast(EVENTS[`ON_${stepData.direction.toUpperCase()}`], stepData);
        }
    }

    let steps = {};
    let currentStep = {};

    const next = moveStep.bind(null, 'next');
    const prev = moveStep.bind(null, 'prev');
    const getCurrentStep = () => currentStep;
    const getSteps = () => steps;

    function init(stepsDefinition){
        assignSteps(stepsDefinition);
        assignCurrentStep(getStartStep(steps));
    }

    function assignSteps(stepsDefinition){
        steps = Object.assign({}, stepsDefinition);
    }

    function assignCurrentStep(nextStep){
        currentStep = nextStep;
    }

    function assignStepNames(entry){
        entry[1].name = entry[0];
        return entry;
    }

    function getStartStep(steps){
        return Object.entries(steps)
                        .map(assignStepNames)
                        .filter(startStepOnly)
                        .map(cleanEntry)[0];
    }

    const startStepOnly = ([_, step]) => step.start;
    const cleanEntry = ([_, startStep]) => startStep;

    function goToStep(nextStepName){
        moveStep(null, nextStepName);
    }

    return {
        init,
        next,
        prev,
        getSteps,
        getCurrentStep,
        goToStep,
        EVENTS,
    };
}