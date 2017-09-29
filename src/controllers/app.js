const {fetchOne, fetchAll, fetchOneByStatus, add, update, remove, removeAll} = require('../models/job');
const {jobValidatorForCreate, jobValidatorForUpdate} = require('../validator');

/**
 * Get all jobs
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
getJobs = async (ctx, next) => {

  let response = await fetchAll();

  if (response) {

    ctx.body = {
      status: ctx.statusCode,
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

  if (response) {
    ctx.body = {
      status: ctx.statusCode,
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

  if(typeof ctx.params.limit === 'undefined') {
    ctx.params.limit = 1;
  }

  let response = await fetchOneByStatus(ctx.params.status, ctx.params.limit);

  if (response) {
    ctx.body = {
      status: ctx.statusCode,
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

  let errors = jobValidatorForCreate(ctx.request.body);
  if (!errors.length) {

    let response = await add(
      ctx.request.body.title,
      ctx.request.body.description,
      ctx.request.body.type,
      ctx.request.body.status,
    );

    ctx.status = 201;
    ctx.body = {
      status: ctx.status,
      count: response.rowCount,
      rows: response.rows
    };
  } else {
    ctx.status = 400;
    ctx.body = {
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
  let errors = jobValidatorForUpdate(ctx.request.body);
  if (!errors.length) {

    let response = await update(
      ctx.params.id,
      ctx.request.body
    );

    ctx.status = 200;

    if (response) {
      ctx.body = {
        status: ctx.status,
        count: response.rowCount,
        rows: response.rows
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
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

  let response;

  if(typeof ctx.params.id === 'undefined') {
    response = await removeAll();
  } else {
    response = await remove(ctx.params.id);
  }

  if (0 < response.rowCount) {
    ctx.status = 204;
    ctx.body = {};
  } else {
    ctx.body = {
      count: 0,
      rows: []
    };
  }

  await next();
};

module.exports = {getJobId, getJobs, getJobByStatus, createJob, updateJob, removeJob};