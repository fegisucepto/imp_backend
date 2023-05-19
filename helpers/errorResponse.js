/** @module helpers/errorResponse */

/**
 *
 *
 * @export
 * @param {string} message
 * @param {array} [errors=[]]
 * @return {*}
 */
function errorResponse(message, errors = []) {
    if (errors.length === 0) {
      return {
        message,
      }
    }
  
    return {
      message,
      errors,
    }
  }
  

  module.exports = errorResponse