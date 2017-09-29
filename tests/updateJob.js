const chakram = require('chakram');
const expect = chakram.expect;
const io = require('socket.io-client');

/**
 * Testing hostname
 *
 * @type {string}
 */
const host = `${process.env.HTTP_PROTOCOL}${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`;

/**
 * Request uri
 * @type {string}
 */
const requestUri = `${host}/jobs`;

let apiResponse;

describe(`Update Job: PUT ${requestUri}/:id`, () => {

  let jobId;

  before(() => {
    apiResponse = chakram.post(requestUri, {
      'title': 'Create job: title',
      'description': 'Create job: Description',
      'type': 'feature',
      'status': 'waiting'
    });
    return apiResponse.then((response) => {
      jobId = response.body.rows[0].job_id;
    });
  });

  it('should return notify from DB trigger', () => {
    const socket = io.connect(`ws://${process.env.HTTP_HOST}:${process.env.SOCKET_PORT}`);
    socket.on('connect', () => {
      socket.once('updateJobStatus', (data) => {
        expect(data.id).to.equal(jobId);
        expect(data.status).to.equal('complete');
        socket.disconnect();
      });
    });
    return chakram.wait();
  });

  it('should return 200 on success', () => {
    apiResponse = chakram.put(`${requestUri}/${jobId}`, {
      'title': 'updated',
      'description': 'updated',
      'type': 'hotfix',
      'status': 'complete'
    });
    return expect(apiResponse).to.have.status(200);
  });

  it('should return JSON content type and utf8 charset', () => {
    expect(apiResponse).to.have.header('content-type', /application\/json/);
    expect(apiResponse).to.have.header('content-type', /charset=utf-8/);
    return chakram.wait();
  });

  it('should return a single row', () => {
    return expect(apiResponse).to.have.schema('rows', {minItems: 1, maxItems: 1});
  });

  it('should required: job_id', () => {
    return expect(apiResponse).to.have.schema('rows[0]', {
      'required': [
        'job_id',
      ]
    });
  });

  it('should job_id to be equal for update result', () => {
    return expect(apiResponse).to.have.json((json) => {
      expect(json.rows[0].job_id).to.equal(jobId);
    });
  });

  it('should return 400 Bad Request', () => {
    apiResponse = chakram.put(`${requestUri}/${jobId}`, {
      'title': '',
      'description': '',
      'type': '',
      'status': ''
    });
    expect(apiResponse).to.have.status(400);
    expect(apiResponse).to.have.json((json) => {
      expect(json.hasOwnProperty('message')).to.equal(true);
    });
    return chakram.wait();
  });

  after(() => {
    return chakram.delete(requestUri);
  });

});