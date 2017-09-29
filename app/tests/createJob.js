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

describe(`Create Job: POST ${requestUri}`, () => {

  before(() =>  {
    apiResponse = chakram.post(requestUri, {
      'title': 'Create job: title',
      'description': 'Create job: Description',
      'type': 'feature',
      'status': 'waiting'
    });

    return apiResponse;
  });

  it("should return 201 on success", () => {
    return expect(apiResponse).to.have.status(201);
  });

  it("should return JSON content type and utf8 charset", () => {
    expect(apiResponse).to.have.header("content-type", /application\/json/);
    expect(apiResponse).to.have.header("content-type", /charset=utf-8/);
    return chakram.wait();
  });

  it("should required: job_id,title,description,created,modified,type,status", () => {
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

  it("should return a single row", () => {
    return expect(apiResponse).to.have.schema('rows', {minItems: 1, maxItems: 1});
  });

  it("should return 400 Bad Request", () => {
    apiResponse = chakram.post(`${requestUri}`,{
      'title': '',
      'description': '',
      'type': '',
      'status': ''
    });
    expect(apiResponse).to.have.status(400);
    expect(apiResponse).to.have.json((json) =>  {
      expect(json.hasOwnProperty('message')).to.equal(true);
    });
    return chakram.wait();
  });

  it("should return 405 Not Allowed", () => {
    apiResponse = chakram.patch(`${requestUri}`);
    expect(apiResponse).to.have.status(405);
    return chakram.wait();
  });

  after(() =>  {
    return chakram.delete(requestUri);
  });
});