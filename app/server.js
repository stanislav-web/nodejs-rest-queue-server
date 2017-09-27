const http = require('http');
const koa = require('koa');
const debug = require('debug')(process.env.DEBUG);
const json = require('koa-json');
const config = require('./config');
const error = require('./middleware/error');
const {routes, allowedMethods} = require('./src/routes');
debug('Booting %s', config.app.name);

app = new koa();

const server = http.createServer(app.callback()).listen(process.env.HTTP_PORT, function () {
  debug('%s is available at http://%s:%d',
    config.app.name,
    process.env.HTTP_HOST,
    process.env.HTTP_PORT);
});
app.use(allowedMethods());
app.use(routes());
app.use(error);
app.use(json);

module.exports = {
  closeServer () {
    server.close();
  }
};