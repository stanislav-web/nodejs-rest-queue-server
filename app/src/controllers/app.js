const config = require('../../config').app;
const {fetchOne, fetchAll, fetchOneByStatus, add, update, remove} = require('../models/job');
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
};

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
};

/**
 * Get job by status
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
getJobByStatus = async (ctx, next) => {

  let response = await fetchOneByStatus(ctx.params.status, ctx.params.limit);

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
};

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
};

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

module.exports = {getJobId, getJobs, getJobByStatus, createJob, updateJob, removeJob};