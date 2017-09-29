const SERVER_ERROR = 500;

/**
 * HateOAS middelware
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports = async (ctx, next) => {
  try {

    if(ctx.body.rows.length) {

      let jobId = ctx.body.rows[0].job_id;
      ctx.body['links'] = {
        'update': `${process.env.HTTP_PROTOCOL}${ctx.request.header.host}/jobs/${jobId}`
      };
    }
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || SERVER_ERROR;
    ctx.body = {
      message: err.message
    };
  }
};