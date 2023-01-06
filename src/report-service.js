const dao = require('./db/dao');
const { oldDBConfig, newDBConfig } = require('./db/config');
const {
  accountsArrayToObject,
  findMissedAndCorruptedAccounts,
  findNewAccounts,
} = require('./helpers/accounts-auditer');
const { generateReport } = require('./helpers/csv-generator');

/**
 * Main service for generating a report
 * Establishes a database connection, then
 * Gets all records from each DB, then
 * Flattens array of records into objects,
 */
async function auditAccountsAndGenerateReport() {
  // Connect to databases
  const oldClient = await dao.getDBClient(oldDBConfig);
  const newClient = await dao.getDBClient(newDBConfig);

  // Grab all of the records from each database
  // Note: Could be ran in parallel using Promise.all to increase performance
  const oldDBAccountsArray = await dao.getAllAccounts(oldClient);
  const newDBAccountsArray = await dao.getAllAccounts(newClient);

  // Convert array objects to objects for faster lookups
  // { [id]: { ...fields } }
  const oldDBAccounts = accountsArrayToObject(oldDBAccountsArray);
  const newDBAccounts = accountsArrayToObject(newDBAccountsArray);

  // Array of IDs of missed, corrupted, or new records
  const { missedAccounts, corruptedAccounts } = findMissedAndCorruptedAccounts(oldDBAccounts, newDBAccounts);
  const newAccounts = findNewAccounts(oldDBAccounts, newDBAccounts);

  generateReport('missed-accounts', missedAccounts);
  generateReport('corrupted-accounts', corruptedAccounts);
  generateReport('new-accounts', newAccounts);
}

module.exports = {
  auditAccountsAndGenerateReport,
};
