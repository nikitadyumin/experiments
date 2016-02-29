$(() => {
    const key = $(document).asEventStream('keydown');
    key.map(1).scan(0, (a, b) => a + b).assign($('#result'),'text');
});
