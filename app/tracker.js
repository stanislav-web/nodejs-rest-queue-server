const config = require('./config').cli;
const debug = require('debug')(process.env.DEBUG);
const request = require('async-request');
const PQueue = require('p-queue');

const queue = new PQueue({concurrency: config.queue.concurency});
const {createJob, processJob} = require('./src/controllers/cli');
const status = (process.argv.slice(2)[1] || 'waiting');

let Job = () => createJob(request, config[status]).then((response) => {

  let body = JSON.parse(response.body);

  if (0 < body.count) {
    debug(`
      Url:   ${config[status]}
      For update: PUT ${body.links.update}
      Status: ${response && response.statusCode}
      Response: ${response.body}
  `);

    queue.add(() => Promise.resolve(processJob(request, body.links.update))).then((response) => {

    debug(`
      Url:   ${body.links.update}
      Status: ${response && response.statusCode}
      Response: ${response.body}
    `);
      }
    );
  }
  queue.onIdle().then(() => {
    debug(`Tasks idle...`);
  });
}).catch((error) => {
  debug(`Error ${error}`);
});
queue.onEmpty().then(() => {
  debug(`Queue is empty`);
});

setInterval(function () {
  Job();
}, config.queue.interval);