const { Client } = require('pg');

/**
 * Creates and returns a pg client
 * @param {Object} config Config object to create
 * @param {string} config.host Host url
 * @param {string} config.port DB port
 * @param {string} config.database DB name
 * @param {string} config.user Username
 * @param {string} config.password Password
 * @returns A PG client for the DB provided in config
 */
async function getDBClient(config) {
  const client = new Client(config);

  await client.connect();
  return client;
}

/**
 * Returns all Account records
 * @param {Client} client PG Client
 * @returns Account[]
 */
async function getAllAccounts(client) {
  const query = 'SELECT * FROM accounts';
  const { rows } = await client.query(query);
  return rows;
}

module.exports = {
  getDBClient,
  getAllAccounts,
};
