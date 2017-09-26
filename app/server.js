const http = require('http');
const koa = require('koa');
const config = require('./config');
const debug = require('debug')(config.app.debug);
const json = require('koa-json');
const error = require('./middleware/error');
const catchStatus = require('./interceptors/status');
const {routes, allowedMethods} = require('./src/routes');

debug('Booting %s', config.app.name);

app = new koa();

const server = http.createServer(app.callback()).listen(config.server.port, function () {
  debug('%s listening at port %d', config.app.name, config.server.port);
});

const io = require('socket.io').listen(server);
io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);

io.on('disconnect', function () {
  debug('...Disconnected from socket');
});

app.use(allowedMethods());
app.use(routes());
app.use(error);
app.use(async (ctx, next) => {
  catchStatus(ctx, io, debug);
  await next();
});
app.use(json);


module.exports = {
  closeServer () {
    server.close();
  }
};