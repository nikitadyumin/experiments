$(function () {
    const timer = Bacon.fromBinder(sink => {
        const id = setInterval(()=> {
            sink(new Date().getTime())
        }, 1000);
        return () => {
            clearInterval(id);
        }
    });
    timer.take(5).onValue((value) => {
        $("#events").append($("<li>").text(value))
    })
});
