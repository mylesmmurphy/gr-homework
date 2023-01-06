const dao = require('./db/dao');
const { oldDBConfig, newDBConfig } = require('./db/config');
const { accountsArrayToObject, findMissedAndCorruptedAccounts, findNewAccounts } = require('./helpers/accounts-auditer');

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
  // Note: Could be ran in parallel using Promise.all to increase performance
  const oldDBAccountsArray = await dao.getAllAccounts(oldClient);
  const newDBAccountsArray = await dao.getAllAccounts(newClient);

  // Convert array objects to objects for faster lookups
  const oldDBAccounts = accountsArrayToObject(oldDBAccountsArray);
  const newDBAccounts = accountsArrayToObject(newDBAccountsArray);

  const { missedAccounts, corruptedAccounts } = findMissedAndCorruptedAccounts(oldDBAccounts, newDBAccounts);
  const newAccounts = findNewAccounts(oldDBAccounts, newDBAccounts);

  console.log('Missed account', missedAccounts[0]);
  console.log('Corrupted account', corruptedAccounts[0]);
  console.log('New account', newAccounts[0]);
}

module.exports = {
  analyzeAndGenerateReport,
};
