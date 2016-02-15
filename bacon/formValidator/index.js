$(function () {
    const createValidators = (validators, bus)=> {
        const props = Array.from(validators).map(([fieldSelector,validatorFunc]) => {
            const prop = Bacon.$.textFieldValue($(fieldSelector)).map(validatorFunc);
            bus.plug(prop.map(value => {
                return {message: fieldSelector, value: value}
            }));
            return prop;
        });
        return props.reduce((acc, cur) => acc.and(cur), Bacon.constant(true));
    };

    const validators = new Map();
    validators.set('#name input', x => {
        return x.length > 0
    });
    validators.set('#age input', x => x.length > 0);
    const bus = new Bacon.Bus();

    const validatorProp = createValidators(validators, bus);
    bus.plug(validatorProp.map(value => {
        return {message: '#submitButton', value: value}
    }));
    validatorProp.not().assign($('#submitButton').find('button'), 'attr', 'disabled');

    bus.ofType = function (type) {
        return bus.filter(function (message) {
            return message.message == type;
        })
    };
    bus.ofType('#name input')
        .merge(bus.ofType('#age input'))
        .onValue(function(value){
            $('#fields')
                .append(value.message + '=' + value.value + '<br/>');
        });

    bus.ofType('#submitButton').onValue(function(value){
        $('#validations').append(value.value + '<br/>')
    })
});
