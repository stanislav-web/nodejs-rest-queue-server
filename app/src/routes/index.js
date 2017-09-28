const router = require('koa-router')();
const body = require('koa-body');
const hateoas = require('../../middleware/hateoas');
const {getJobId, getJobs, getJobByStatus, createJob, updateJob, removeJob} = require('../controllers/app');

/**
 * Get a list of jobs
 *
 * @section REST API
 * @type get
 * @url /jobs
 */
router.get('/jobs', getJobs);

/**
 * Get job by id
 *
 * @section REST API
 * @type get
 * @url /jobs/:id
 * @param {int} id
 */
router.get('/jobs/:id', getJobId);

/**
 * Get least of one availabe job by status
 *
 * @section REST API
 * @type get
 * @url /jobs/status/:status/limit/:limit
 * @param {string} status
 * @param {int =} limit
 */
router.get('/jobs/status/:status/limit/:limit?', getJobByStatus, (ctx, next) => {
    hateoas(ctx, next);
});

/**
 * Create job
 *
 * @section REST API
 * @type post
 * @url /jobs
 * @param {string} body
 */
router.post('/jobs', body(), createJob);

/**
 * Update job
 *
 * @section REST API
 * @type put
 * @url /jobs/:id
 * @param {string} body
 */
router.put('/jobs/:id', body(), updateJob);

/**
 * Delete job
 *
 * @section REST API
 * @type delete
 * @url /jobs/:id
 * @param {int =} id
 */
router.delete('/jobs/:id?', removeJob);

/**
 * Export modules to -> server to use as middleware
 * @type {{routes: (function()), allowedMethods: (function())}}
 */
module.exports = {
  routes () {
    return router.routes();
  },
  allowedMethods () {
    return router.allowedMethods();
  }
};