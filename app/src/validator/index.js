/**
 * Job request validator
 *
 * @param body
 * @returns {Array}
 */
let createJobValidator = (body) => {

  let validationErrors = [];

  if (!body.hasOwnProperty('title') || 0 >= body.title.length) {
    validationErrors.push(
      '`title` is required'
    );
  }
  if (!body.hasOwnProperty('description') || 0 >= body.description.length) {
    validationErrors.push(
      '`description` is required'
    );
  }
  if (!body.hasOwnProperty('type') || 0 >= body.type.length) {
    validationErrors.push(
      '`type` is required'
    );
  }
  if (!body.hasOwnProperty('status') || 0 >= body.status.length) {
    validationErrors.push(
      '`status` is required'
    );
  }
  return validationErrors;
};
let updateJobValidator = (body) => {

  let validationErrors = [];

  if (!body.hasOwnProperty('title')
    && !body.hasOwnProperty('description')
    && !body.hasOwnProperty('type')
    && !body.hasOwnProperty('status')
  ) {
    validationErrors.push(
      'Empty update. Please setup data'
    );
  }
  if (body.hasOwnProperty('title')) {
    if (0 >= body.title.length)
      validationErrors.push(
        '`title` can not be empty'
      );
  }
  if (body.hasOwnProperty('description')) {
    if (0 >= body.description.length)
      validationErrors.push(
        '`description` can not be empty'
      );
  }
  if (body.hasOwnProperty('type')) {
    if (0 >= body.type.length)
      validationErrors.push(
        '`type` can not be empty'
      );
  }
  if (body.hasOwnProperty('status')) {
    if (0 >= body.status.length)
      validationErrors.push(
        '`status` can not be empty'
      );
  }
  return validationErrors;
};

module.exports = {createJobValidator, updateJobValidator};