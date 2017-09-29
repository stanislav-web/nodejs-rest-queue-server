const http = require('http');
const koa = require('koa');
const debug = require('debug')(process.env.DEBUG);
const json = require('koa-json');
const {app : config} = require('./config');
const error = require('./middleware/error');
const {routes, allowedMethods} = require('./src/routes');
debug('Booting %s', config.name);

const app = new koa();

/**
 * Start server
 *
 * @type {Server|*}
 */
const server = http.createServer(app.callback())
  .listen(process.env.HTTP_PORT, () => {
  debug('%s is available at http://%s:%d',
    config.name,
    process.env.HTTP_HOST,
    process.env.HTTP_PORT);
}).on('close', () => {
    debug('Server shutdown.');
});

app.use(allowedMethods());
app.use(routes());
app.use(error);
app.use(json);

/**
 * Shutdown server eve
 */
process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});