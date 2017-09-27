let config = {
  app: {
    name: 'NodeJS Rest Queue Server',
    error: {
      notFound : 404,
      serverError : 500,
      serverErrorMessage : 'InternalServerError',
      notFoundErrorMessage : 'Not Found'
    },
  },
  cli: {
    waiting : 'http://localhost:8081/jobs/status/waiting/limit/1',
    pending : 'http://localhost:8081/jobs/status/pending/limit/1',
    queue: {
      interval : 1000,
      concurency: 1
    }
  }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = config;
else
  window.config = config;