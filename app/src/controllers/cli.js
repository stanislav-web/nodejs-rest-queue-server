/**
 * Create job (make request for update)
 *
 * @param request
 * @param url
 * @returns {Promise.<*>}
 */
createJob = (request, url) => {

  try {
    return request(url);
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
processJob = async (request, url) => {

  try {
    return request(url, {
      method: 'PUT',
      data: {status: 'complete'},
      headers: {Accept: 'application/json'}
    });
  } catch (e) {
    throw Error(e);
  }
};

module.exports = {createJob, processJob};