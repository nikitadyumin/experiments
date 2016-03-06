/**
 * Created by ndyumin on 06.03.2016.
 */
const Koa = require('koa');
const app = new Koa();
const send = require('koa-send');
const fs = require('fs');

const isDependency = path => path.indexOf('node_modules') !== -1 || path.indexOf('package.json') !== -1;

const fromNodeCallback = function(fn) {
    return function () {
        return new Promise((res, rej) =>
            fn(...arguments, (err, data) =>
                err === null ? res(data) : rej(err)));
    }
};

const getFiddles = (path) => fromNodeCallback(fs.readdir)(__dirname + '/../static/' + path);

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = {message: err.message};
        ctx.status = err.status || 500
    }
});

app.use(async ctx => {
    if (isDependency(ctx.path)) {
        return await send(ctx, ctx.path, {root: __dirname + '/..'});
    } else if (ctx.path === '/' || ctx.path.startsWith('/list')) {
        const path = 'baconEx/'; //todo: generalize
        return ctx.body = (await getFiddles(path))
            .filter(name => name.indexOf('.') === -1)
            .map(name => `<li><a href="/index.html?folder=${path}${name}">${name}</a>`)
            .join('');
    }
    await send(ctx, 'static' + ctx.path);
});

module.exports = app;