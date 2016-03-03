module.exports = {
    translate: function (load) {
        return 'module.exports = \'' + load.source.replace(/(\r\n|\n|\r)/gm, '') + '\'';
    }
};