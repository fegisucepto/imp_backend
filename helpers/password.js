const bcrypt = require('bcryptjs');

/**
 * This function generates a hash string from a given string.
 *
 * @param {string} password - The string to be hashed.
 * @returns {string} - Hashed string.
 */
function getHash(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * This function compares a raw string with a hashed string.
 *
 * @param {string} password - The raw string to be compared.
 * @param {string} hash - The hashed string to be compared.
 * @returns {boolean} - True if the raw string matches the hashed string, false otherwise.
 */
function checkHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  getHash,
  checkHash,
};
