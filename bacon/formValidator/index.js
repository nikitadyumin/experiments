$(function () {
    const createValidators = validators =>
        Bacon.combineWith((...props) => props.every(x => x === true),
            Array.from(validators).map(([fieldSelector,validatorFunc]) =>
                Bacon.$.textFieldValue($(fieldSelector)).map(validatorFunc)
            ));

    const validators = new Map();
    validators.set('#name input', x => {
        return x.length > 0
    });
    validators.set('#age input', x => x.length > 0);

    const validatorProp = createValidators(validators);

    validatorProp.not().assign($('#submitButton').find('button'), 'attr', 'disabled');

    validatorProp.onValue(function (value) {
        $('#validations').append(value + '<br/>')
    })
});
