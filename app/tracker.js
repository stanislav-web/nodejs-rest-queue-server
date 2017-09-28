const {cli: config} = require('./config');
const request = require('async-request');
const {jobRequest} = require('./src/controllers/cli');
const status = (process.argv.slice(2)[1] || 'waiting');

try {
  setInterval(() => {
    jobRequest(request, config[status]);
  }, config.queue.interval);
} catch (e) {
  console.error(e.toString());
}