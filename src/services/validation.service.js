angular.module('library-add-book')
.factory('validationService', ['stepsService', validationService]);

function validationService(stepsService){

    const validations = {};
    const getStep = stepsService.getCurrentStep;

    function updateValidation(isValid){
        validations[getStep().name] = isValid;
    }

    function isCurrentStepValid(){
        return validations[getStep().name];
    }

    return {
        updateValidation,
        isCurrentStepValid
    }
}