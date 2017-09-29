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

describe(`Get Jobs: GET ${requestUri}`, () => {

  before(() => {
    apiResponse = chakram.post(requestUri, {
      'title': 'Create job: title 1',
      'description': 'Create job: Description 1',
      'type': 'feature',
      'status': 'waiting'
    });
  });

  it("should return 200 on success", () => {
    apiResponse = chakram.get(`${requestUri}`);
    return expect(apiResponse).to.have.status(200);
  });

  it("should return JSON content type and utf8 charset", () => {
    expect(apiResponse).to.have.header("content-type", /application\/json/);
    expect(apiResponse).to.have.header("content-type", /charset=utf-8/);
    return chakram.wait();
  });

  it("should return count key",  () => {
    expect(apiResponse)
      .to.have.json('count', 1);
    return chakram.wait();
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