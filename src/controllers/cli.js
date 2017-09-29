const debug = require('debug')(process.env.DEBUG);

/**
 * Create job (make request for update)
 *
 * @param request
 * @param url
 * @returns {Promise.<*>}
 */
jobRequest = async (request, url) => {

  try {
    let response = await request(url);

    let body = JSON.parse(response.body);

    if (0 < body.count) {

      debug(`
        Url:   ${url}
        For update: PUT ${body.links.update}
        Status: ${response && response.statusCode}
        Response: ${response.body}
      `);

      await jobProcess(request, body.links.update);
    } else {
      debug(`Tasks idle...`);
    }
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Process job (update status)
 * @param request
 * @param url
 * @returns {Promise.<*>}
 */
jobProcess = async (request, url) => {

  try {

    let response = await request(url, {
      method: 'PUT',
      data: {status: 'complete'},
      headers: {Accept: 'application/json'}
    });

    let body = JSON.parse(response.body);
    if (0 < body.count) {

      debug(`
        Url:   ${url}
        Status: ${response && response.statusCode}
        Response: ${response.body}
      `);
    }
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {jobRequest};