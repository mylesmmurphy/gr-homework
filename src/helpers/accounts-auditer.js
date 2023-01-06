/**
 * Converts an array of account records into a flattened object
 * The object will have keys of the account id, and the fields are the accounts columns
 * @param {account[]} accountsArray Array of accounts
 * @returns {{ [id]: Object }} account object
 */
function accountsArrayToObject(accountsArray) {
  const accountsObject = {};

  accountsArray.forEach((account) => {
    const { id, ...fields } = account;
    accountsObject[id] = fields;
  });

  return accountsObject;
}

/**
 * Determines if two records are equal
 * @param {*} oldAccount Old Record
 * @param {*} newAccount New Record
 * @returns {boolean} Whether they are equal or not
 */
function isAccountsEqual(oldAccount, newAccount) {
  return oldAccount.name === newAccount.name && oldAccount.email === newAccount.email;
}

/**
 * Finds missed or corrupted accounts
 * Checks new accounts object for ID, if not found, add to missing array
 * Otherwise, checks if the fields are equal, if not, add to corrupted array
 * @param {*} oldAccounts Response object from accountsArrayToObject for old accounts
 * @param {*} newAccounts Response object from accountsArrayToObject for new accounts
 * @returns {{ missedAccounts: string[], corruptedAccounts: string[] }} Missing or corrupted IDs
 */
function findMissedAndCorruptedAccounts(oldAccounts, newAccounts) {
  const missedAccounts = [];
  const corruptedAccounts = [];

  // Loop over each old account record
  Object.keys(oldAccounts).forEach((id) => {
    // Check if it is in the new DB
    if (!newAccounts[id]) {
      // If not, add to missing accounts
      missedAccounts.push(id);
      return;
    }

    // Otherwise, check equality. If the records are not equal, they are corrupted
    if (!isAccountsEqual(oldAccounts[id], newAccounts[id])) {
      corruptedAccounts.push(id);
    }
  });

  return { missedAccounts, corruptedAccounts };
}

/**
 * Finds which accounts are in the new accounts but not the old accounts
 * @param {*} oldAccounts Response object from accountsArrayToObject for old accounts
 * @param {*} newAccounts Response object from accountsArrayToObject for new accounts
 * @returns {string[]} New Account IDs
 */
function findNewAccounts(oldAccounts, newAccounts) {
  const accounts = [];

  Object.keys(newAccounts).forEach((id) => {
    if (!oldAccounts[id]) {
      accounts.push(id);
    }
  });

  return accounts;
}

module.exports = {
  accountsArrayToObject,
  findMissedAndCorruptedAccounts,
  findNewAccounts,
  isAccountsEqual,
};
