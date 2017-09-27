const debug = require('debug')(process.env.DEBUG);
const {db} = require('./connect');
const {channelListener} = require('./channel');

//noinspection Annotator
/**
 * Channel Listener
 */
db.on('notification', function(message) {
  channelListener[message.channel](message);
});

/**
 * Query
 *
 * @param text
 * @param params
 * @returns {Promise.<*>}
 */
async function query (text, params) {

  const start = Date.now();

  try {

    const res = db.query(text, params);
    const duration = Date.now() - start;
    debug('Query: %s / %fms', text, duration);
    return res;

  } catch (err) {
    debug('Database error: %s', err.code || err.toString());
    await db.end();
  }
}

module.exports = {query};