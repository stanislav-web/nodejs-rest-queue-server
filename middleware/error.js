/**
 * Allowed Methods
 *
 * @type {[string,string,string,string]}
 */
const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE'];

const NOT_ALLOWED = 405;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

/**
 * Error middleware interceptor
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports = async (ctx, next) => {
  try {

    if (false === allowedMethods.includes(ctx.request.method)) {
      ctx.status = NOT_ALLOWED;
    }
    else {
      if (ctx.hasOwnProperty('body')) {
        if (ctx.body.hasOwnProperty('count')) {
          ctx.status = (0 >= ctx.body.count) ? NOT_FOUND : ctx.status;
        } else {
          ctx.status = BAD_REQUEST;
        }
      }
    }

    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || SERVER_ERROR;
    ctx.body = {
      status: ctx.status,
      message: err.message
    };
  }
};