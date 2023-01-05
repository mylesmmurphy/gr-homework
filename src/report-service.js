const dao = require('./db/dao');
const { oldDBConfig, newDBConfig } = require('./db/config');

/**
 * Main service for generating a report
 * Establishes a database connection, then
 * Gets all records from each DB, then... TBD
 */
async function analyzeAndGenerateReport() {
  // Connect to databases
  const oldClient = await dao.getDBClient(oldDBConfig);
  const newClient = await dao.getDBClient(newDBConfig);

  // Grab all of the records from each database
  // Note: Could be ran in paralle using Promise.all to increase performance
  const oldAccounts = await dao.getAllAccounts(oldClient);
  const newAccounts = await dao.getAllAccounts(newClient);

  console.log(oldAccounts[0]);
  console.log(newAccounts[0]);
}

module.exports = {
  analyzeAndGenerateReport,
};
