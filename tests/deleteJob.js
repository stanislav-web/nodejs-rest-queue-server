const chakram = require('chakram');
const expect = chakram.expect;

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

describe(`Delete Job: GET ${requestUri}/:id`, () => {

  let jobId, body;

  before(() => {
    apiResponse = chakram.post(requestUri, {
      'title': 'Create job: title',
      'description': 'Create job: Description',
      'type': 'feature',
      'status': 'waiting'
    });
    return apiResponse.then((response) => {
      jobId = response.body.rows[0].job_id;
    })
  });

  it("should return 204 on success and empty body", () => {
    let apiResponse = chakram.delete(`${requestUri}/${jobId}`);
    apiResponse.then((response) => {
      return expect(response.body).deep.equal([1]);
    });
    expect(apiResponse).to.have.status(204);
    return chakram.wait();
  });

});