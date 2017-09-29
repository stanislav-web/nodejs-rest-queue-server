/**
 * Application config
 *
 * @type {{app: {name: string, error: {notFound: number, serverError: number, serverErrorMessage: string, notFoundErrorMessage: string}}, cli: {waiting: string, pending: string, queue: {interval: number, concurency: number}}}}
 */
module.exports = {
  app: {
    name: 'NodeJS Rest Queue Server',
    error: {
      notFound: 404,
      serverError: 500,
      serverErrorMessage: 'InternalServerError',
      notFoundErrorMessage: 'Not Found'
    },
  },
  cli: {
    waiting: 'http://localhost:8081/jobs/status/waiting/limit/1',
    pending: 'http://localhost:8081/jobs/status/pending/limit/1',
    queue: {
      interval: 1000,
    }
  }
};