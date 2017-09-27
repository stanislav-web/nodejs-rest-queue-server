const router = require('koa-router')();
const body = require('koa-body');
const hateoas = require('../../middleware/hateoas');
const {getJobId, getJobs, getJobByStatus, createJob, updateJob, removeJob} = require('../controllers/app');

router
  .get('/jobs', getJobs)
  .get('/jobs/:id', getJobId)
  .get('/jobs/status/:status/limit/:limit', getJobByStatus, function (ctx, next) {
    hateoas(ctx, next);
  })
  .post('/jobs/', body(), createJob)
  .put('/jobs/:id', body(), updateJob)
  .delete('/jobs/:id', removeJob);

module.exports = {
  routes () {
    return router.routes();
  },
  allowedMethods () {
    return router.allowedMethods();
  }
};