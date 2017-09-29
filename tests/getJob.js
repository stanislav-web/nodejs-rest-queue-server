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

describe(`Get Job: GET ${requestUri}/:id`, () => {

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
    })
  });

  it("should return 200 on success", () => {
    apiResponse = chakram.get(`${requestUri}/${jobId}`);
    return expect(apiResponse).to.have.status(200);
  });

  it("should return JSON content type and utf8 charset", () => {
    expect(apiResponse).to.have.header("content-type", /application\/json/);
    expect(apiResponse).to.have.header("content-type", /charset=utf-8/);
    return chakram.wait();
  });

  it("should return a single row",  () => {
    return expect(apiResponse).to.have.schema('rows', {minItems: 1, maxItems: 1});
  });

  it("should  required: job_id,title,description,created,modified,type,status", () => {
      return expect(apiResponse).to.have.schema('rows[0]', {
        "required": [
          "job_id",
          "title",
          "description",
          "created",
          "modified",
          "type",
          "status"
        ]
      });
  });

  after(() =>  {
    return chakram.delete(requestUri);
  });
});