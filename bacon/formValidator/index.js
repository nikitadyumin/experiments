$(function () {
    const createValidators = validations =>
        Bacon.combineWith((...props) => props.every(x => x === true),
            Array.from(validations).map(([fieldSelector,validators]) =>
                Bacon.$.textFieldValue($(fieldSelector)).map(val => validators.every(fn => fn(val) === true))
            ));

    const validators = new Map();
    validators.set('#name input', [x => x.length > 0]);
    validators.set('#age input', [x => !isNaN(+x), x => x > 0]);

    const validatorProp = createValidators(validators);

    validatorProp.not().assign($('#submitButton').find('button'), 'attr', 'disabled');

    validatorProp.onValue(function (value) {
        $('#validations').append(value + '<br/>')
    })
});
