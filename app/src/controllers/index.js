const config = require('../../config');
const {fetchOne, fetchAll, add, update, notify, remove} = require('../models/job');
const {createJobValidator, updateJobValidator} = require('../validator');

/**
 * Get all jobs
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
getJobs = async (ctx, next) => {

  let response = await fetchAll();

  if (!response) {
    ctx.status = config.error.serverError;
    ctx.body = {
      status: ctx.status,
      message: config.error.serverErrorMessage,
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      count: response.rowCount,
      rows: response.rows
    };
  }

  await next();
}

/**
 * Get job by id
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
getJobId = async (ctx, next) => {

  let response = await fetchOne(ctx.params.id);

  if (!response) {
    ctx.status = config.error.notFound;
    ctx.body = {
      status: ctx.status,
      message: config.error.notFoundErrorMessage,
    };
  } else {
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      count: response.rowCount,
      rows: response.rows
    };
  }

  await next();
}

/**
 * Create job
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
createJob = async (ctx, next) => {

  let errors = createJobValidator(ctx.request.body);
  if (!errors.length) {

    let response = await add(
      ctx.request.body.title,
      ctx.request.body.description,
      ctx.request.body.type,
      ctx.request.body.status,
    );

    if (!response) {
      ctx.status = config.error.serverError;
      ctx.body = {
        status: ctx.status,
        message: config.error.serverErrorMessage,
      };
    } else {
      ctx.status = 201;
      ctx.body = {
        status: ctx.status,
        count: response.rowCount,
        rows: response.rows
      };
    }
  } else {
    ctx.status = config.error.serverError;
    ctx.body = {
      status: ctx.status,
      message: errors.join('\n')
    };
  }

  await next();
}

/**
 * Update job
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
updateJob = async (ctx, next) => {

  let errors = updateJobValidator(ctx.request.body);
  if (!errors.length) {

    let response = await update(
      ctx.params.id,
      ctx.request.body
    );

    if (!response) {
      ctx.status = config.error.notFound;
      ctx.body = {
        status: ctx.status,
        message: config.error.notFoundErrorMessage,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        status: ctx.status,
        count: response.rowCount,
        rows: response.rows
      };
    }
  } else {
    ctx.status = config.error.serverError;
    ctx.body = {
      status: ctx.status,
      message: errors.join('\n')
    };
  }

  await next();
};

/**
 * Remove job
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
removeJob = async (ctx, next) => {
  let response = await remove(ctx.params.id);

  if (!response) {
    ctx.status = config.error.notFound;
    ctx.body = {
      status: ctx.status,
      message: config.error.serverErrorMessage,
    };
  } else {
    ctx.status = 204;
    ctx.body = {};
  }

  await next();
};



/**
 * Listen Notifications
 * @param listener
 * @returns {Promise.<void>}
 */
function listenNotifications (listener) {

  notify('watch_status', function(message) {
    listener(message);
  });
}

module.exports = {getJobId, getJobs, createJob, updateJob, removeJob, listenNotifications};