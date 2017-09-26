const config = require('../config');
const debug = require('debug')(config.app.debug);
const {Client} = require('pg');

/**
 * Client config
 * @type {PG.Client}
 */
const client = new Client({
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

//noinspection Annotator
client.connect();

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

    const res = client.query(text, params);
    const duration = Date.now() - start;
    debug('Query: %s / %fms', text, duration);
    return res;

  } catch (err) {
    debug('Database error: %s', err.code || err.toString());
    await client.end();
  }
}

module.exports = {query};