/**
 *
 * @param {*} resolve Resolve of current promise
 * @param {*} reject Reject of current promise
 * @param {*} error Query error (results in 500)
 * @param {*} results Query results
 */
const handleQueryFindAll = (resolve, reject, error, results) => {
  if (error) {
    reject(error);
  } else if (results.rowCount == 0) {
    reject();
  } else {
    resolve(results.rows);
  }
};

/**
 *
 * @param {*} resolve Resolve of current promise
 * @param {*} reject Reject of current promise
 * @param {*} error Query error (results in 500)
 * @param {*} results Query results
 */
const handleQueryFindOne = (resolve, reject, error, results) => {
  if (error) {
    reject(error);
  } else if (results.rowCount == 0) {
    reject();
  } else {
    resolve(results.rows[0]);
  }
};

/**
 *
 * @param {*} resolve Resolve of current promise
 * @param {*} reject Reject of current promise
 * @param {*} error Query error (results in 500)
 * @param {*} object Current object you are working with
 */
const handleQueryAdd = (resolve, reject, error, object) => {
  if (error) {
    reject(error);
  } else {
    resolve(`${object} created.`);
  }
};

/**
 *
 * @param {*} resolve Resolve of current promise
 * @param {*} reject Reject of current promise
 * @param {*} error Query error (esults in 500)
 * @param {*} object Current object you are working with
 */
const handleQueryUpdate = (resolve, reject, error, object) => {
  if (error) {
    reject(error);
  } else {
    resolve(`${object} updated.`);
  }
};

/**
 *
 * @param {*} resolve Resolve of current promise
 * @param {*} reject Reject of current promise
 * @param {*} error Query error (esults in 500)
 * @param {*} object Current object you are working with
 */
const handleQueryDelete = (resolve, reject, error, object) => {
  if (error) {
    reject(error);
  } else {
    resolve(`${object} deleted.`);
  }
};

module.exports = {
  handleQuery: handleQueryFindAll,
  handleQueryOne: handleQueryFindOne,
  handleQueryAdd,
  handleQueryUpdate,
  handleQueryDelete,
};
