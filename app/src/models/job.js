const db = require('../db');
const jsesc = require('jsesc');

/**
 * Fetch all jobs
 *
 * @returns {Promise.<*>}
 */
const fetchAll = () => {
  return db.query('SELECT ' +
    'job_id, title, description, created, modified, type, status ' +
    'FROM job');
};

/**
 * Fetch job by job_id
 *
 * @param job_id
 * @returns {Promise.<*>}
 */
let fetchOne = (job_id) => {
  return db.query('SELECT ' +
    'job_id, title, description, created, modified, type, status ' +
    'FROM job WHERE job_id = $1', [job_id]);
};

/**
 * Add job
 *
 * @param title
 * @param description
 * @param type
 * @param status
 * @returns {Promise.<*>}
 */
let add = (title, description, type = 'feature', status = 'waiting') => {

  return db.query('INSERT INTO job (' +
    'title, description, type, status' +
    ') VALUES($1, $2, $3, $4)' +
    'RETURNING *', [title.trim(), description.trim(), type.trim(), status.trim()]);
};

/**
 * Update job
 *
 * @param job_id
 * @param params
 * @returns {Promise.<*>}
 */
let update = (job_id, params) => {
  let query = 'UPDATE job SET ';

  if (params.title) {
    params.title = jsesc(params.title, {
      'quotes': 'single',
      'wrap': true
    });
    query += 'title = ' + params.title + ',';
  }
  if (params.description) {
    params.description = jsesc(params.description, {
      'quotes': 'single',
      'wrap': true
    });
    query += 'description = ' + params.description + ',';
  }
  if (params.type) {
    params.type = jsesc(params.type, {
      'quotes': 'single',
      'wrap': true
    });
    query += 'type = ' + params.type + ',';
  }
  if (params.status) {
    params.status = jsesc(params.status, {
      'quotes': 'single',
      'wrap': true
    });
    query += 'status = ' + params.status + ',';
  }
  query = query.replace(/,\s*$/, '');
  query += ' WHERE job_id=$1 returning job_id';

  return db.query(query, [job_id]);
};

/**
 * Remove job
 *
 * @param job_id
 * @returns {Promise.<*>}
 */
let remove = (job_id) => {

  return db.query('DELETE FROM job ' +
    'WHERE job_id = $1', [job_id]);
};

module.exports = {fetchOne, fetchAll, add, update, remove};