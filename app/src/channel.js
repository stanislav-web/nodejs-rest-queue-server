const debug = require('debug')(process.env.DEBUG);
const io = require('socket.io').listen(process.env.SOCKET_PORT);

/**
 * Channel listener
 * @type {{watch_status: (function(*))}}
 */
let channelListener = {

  /**
   * Watch Status channel
   * @param message
   */
  watch_status: (message) => {

    let response = JSON.parse(message.payload);
    if (response.id && response.status) {
      io.emit('updateJobStatus', {
        id: response.id,
        status: response.status
      });
      debug('Client notified: Job#%d / Status: %s', response.id, response.status);
    }
  }
};

module.exports = {channelListener};