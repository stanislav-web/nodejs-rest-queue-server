const chakram = require('chakram');
const expect = chakram.expect;

describe('Jobs rest API assertions', function () {

  const allJobsQueryString = `http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}/jobs`;

  it('should make HTTP 500 error', function () {
    let response = chakram.get(allJobsQueryString + '/sdsdsdsdsdsd');
    expect(response).to.have.status(500);
    expect(response).to.have.header('content-type', 'text/plain; charset=utf-8');
    expect(response).not.to.be.encoded.with.gzip;
    return chakram.wait();
  });

  it('should make HTTP 404 error', function () {
    let response = chakram.get(allJobsQueryString + 'sss/');
    expect(response).to.have.status(404);
    expect(response).to.have.header('content-type', 'text/plain; charset=utf-8');
    expect(response).not.to.be.encoded.with.gzip;
    return chakram.wait();
  });

  it('should make HTTP POST job create', function () {

    let response = chakram.post(allJobsQueryString, {
      'title': 'Test title',
      'description': 'Test Description',
      'type': 'feature',
      'status': 'waiting'
    });
    expect(response).to.have.status(201);
    expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
    expect(response).not.to.be.encoded.with.gzip;

    return chakram.wait();
  });

  it('should make HTTP DELETE for delete created job', function () {

    return chakram.post(allJobsQueryString, {
      'title': 'Test title',
      'description': 'Test Description',
      'type': 'feature',
      'status': 'waiting'
    }).then(function (resp) {
      let jobId = resp.body.rows[0].job_id;
      return chakram.delete(allJobsQueryString + '/' + jobId).then(function (resp) {
        expect(resp).to.have.status(204);
      });
    })
  });

  it('should make HTTP PUT for update created job', function () {
    return chakram.put(allJobsQueryString + '/1', {'status': 'pending'})
      .then(function (response) {
        expect(response).to.have.status(200);
        expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(response).not.to.be.encoded.with.gzip;
        expect(response).to.comprise.of.json({
          'status': 200
        });
      });
  });

  it('should make HTTP GET for created job', function () {
    chakram.get(allJobsQueryString + '/1').then(function (response) {
      expect(response).to.have.status(200);
      expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(response).not.to.be.encoded.with.gzip;
      expect(response).to.comprise.of.json({
        status: 200
      });
    });
  });

  it('should make HTTP GET for all jobs', function () {
    chakram.get(allJobsQueryString).then(function (response) {
      expect(response).to.have.status(200);
      expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(response).not.to.be.encoded.with.gzip;
      expect(response).to.comprise.of.json({
        status: 200
      });
    });
  });

  it('should make HTTP GET /jobs/status/:status/limit/:limit', function () {
    chakram.get(allJobsQueryString + '/status/waiting/limit/1').then(function (response) {
      expect(response).to.have.status(200);
      expect(response).to.have.header('content-type', 'application/json; charset=utf-8');
      expect(response).not.to.be.encoded.with.gzip;
      expect(response).to.comprise.of.json({
        status: 200,
        count: 1
      });
    });
  });
});