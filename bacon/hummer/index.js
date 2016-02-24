$(() => {
    const box = document.getElementById('hammer');

    const tap = hammerStream(box, 'tap');

    tap.take(2).onValue(() => {
        $(box).addClass('tapped')
    });

    tap.delay(500).onValue(() => {
        $(box).removeClass('tapped');
    });
    tap.skip(2).take(1).onValue(() => {
        $(box).text('can\'t touch this');
    });
});

const hammerStream = (element, event) => {
    return Bacon.fromBinder((sink) => {
        const push = () => {
            sink('hammer time!')
        };
        Hammer(element).on(event, push);
        return () => {
            Hammer(element).off(event, push);
        }
    })
};