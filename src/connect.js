const pg = require('pg');

const db = new pg.Client('postgres://'+
  process.env.DB_USER+':'+
  process.env.DB_PASS+'@'+
  process.env.DB_HOST+':'+
  process.env.DB_PORT+'/'+
  process.env.DB_NAME);

db.connect();
db.query('LISTEN watch_status');

/**
 * Export db resource
 *
 * @type {{db: *}}
 */
module.exports = {db};
