let config = {
  app: {
    name: 'NodeJS Queue',
    version: '0.0.1',
    debug : 'cli'
  },
  server: {
    port: 8081
  },
  error: {
    notFound : 404,
    serverError : 500,
    serverErrorMessage : 'InternalServerError',
    notFoundErrorMessage : 'Not Found'
  },
  db: {
    host: 'localhost',
    port: 5432,
    database: 'queue',
    username: 'test',
    password: 'qwerty'
  }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = config;
else
  window.config = config;