const debug = require('debug')(process.env.DEBUG);
const fs = require('fs');
const readline = require('readline');
const {db:db} = require('./src/connect');

const rl = readline.createInterface({
  input: fs.createReadStream('./dump/schema.sql')
});

const totalQueries = 12;
let counter = 0;

/**
 * Execute query
 *
 * @param query
 * @returns {Promise.<void>}
 */
execute = async (query) => {
  await db.query(query, (error) => {
    if (error) {
      debug(error.toString());
      process.exit(1);
    } else {
      debug(`OK - ${query}`);
    }
  });
};

/**
 * Read schema by lines
 */
rl.on('line', (line) => {
  (async () => {
    await execute(line.trim());
    counter++;
    if(totalQueries === counter) {
      debug('Schema created!');
      process.exit(0);
    }
  })();
});






