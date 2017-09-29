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

describe(`Get Job by status: GET ${requestUri}/status/waiting/limit/1`, () => {

  before(() => {
    apiResponse = chakram.post(requestUri, {
      'title': 'Create job: title',
      'description': 'Create job: Description',
      'type': 'feature',
      'status': 'waiting'
    });
    return apiResponse;
  });

  it("should return 200 on success", () => {
    apiResponse = chakram.get(`${requestUri}/status/waiting/limit/1`);
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

  it("should have hateoas link for PUT update", () => {
    return expect(apiResponse).to.have.json((json) =>  {
      expect(json.links.update).to.equal(requestUri + '/' + json.rows[0].job_id);
    });
  });

  it("should return count key",  () => {
    expect(apiResponse)
      .to.have.json('count', 1);
    return chakram.wait();
  });

  after(() =>  {
    return chakram.delete(requestUri);
  });
});