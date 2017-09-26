module.exports = async (ctx, io, debug) => {
  if(200 === ctx.response.status // for success
    && 'PUT' === ctx.request.method) { // for update
    if(ctx.request.body.hasOwnProperty('status')) {
      // check only for status changes
      let data = {
        jobId : ctx.params.id,
        jobStatus:  ctx.request.body.status
      };

      io.emit('updateJobStatus', data);
      debug('Client notified: Job#%d / Status: %s', data.jobId, data.jobStatus);
    }
  }
};
