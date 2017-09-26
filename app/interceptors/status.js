/**
 * catchStatusInterval
 * setInterval
 */
let catchStatusInterval;

/**
 * Catch Postgres notifications
 *
 * @param ctx
 * @param io
 * @param debug
 * @param message
 * @returns {Promise.<void>}
 */
var catchStatus = function (ctx, io, debug, message) {

  if (message) {

    let response = JSON.parse(message.payload);
    if (response.id && response.status) {

      var interval = setInterval(function () {
        io.emit('updateJobStatus', {
          id: response.id,
          status: response.status
        });
        clearInterval(interval);
        debug('Client notified: Job#%d / Status: %s', response.id, response.status);
      }, 1000);
    }
  }
};
module.exports = {catchStatus};