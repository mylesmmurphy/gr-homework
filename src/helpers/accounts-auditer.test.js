const accountsAuditer = require('./accounts-auditer');

describe('accountsArrayToObject', () => {
  it('should map an array of accounts records into a flattened object', () => {
    // Arrange
    const accountsArray = [
      { id: '1', name: 'name', email: 'email' },
      { id: '2', name: 'name2', email: 'email2' },
    ];

    // Act
    const response = accountsAuditer.accountsArrayToObject(accountsArray);

    // Assert
    const expectedResponse = {
      1: { name: 'name', email: 'email' },
      2: { name: 'name2', email: 'email2' },
    };

    expect(response).toEqual(expectedResponse);
  });
});

describe('isAccountsEqual', () => {
  it('should assert that two account records are equal', () => {
    // Arrange
    const oldAccount = { name: 'name', email: 'email' };
    const sameNewAccount = { name: 'name', email: 'email' };
    const differentNewAccount = { name: 'name2', email: 'email2' };

    // Act
    const responseSame = accountsAuditer.isAccountsEqual(oldAccount, sameNewAccount);
    const responseDifferent = accountsAuditer.isAccountsEqual(oldAccount, differentNewAccount);

    // Assert
    expect(responseSame).toEqual(true);
    expect(responseDifferent).toEqual(false);
  });
});

describe('findMissedAndCorruptedAccounts', () => {
  it('should find missing or corrupt records and return an array of IDs for each', () => {
    // Arrange
    const oldAccounts = {
      1: { name: 'name', email: 'email' }, // Good
      2: { name: 'name2', email: 'email2' }, // Corrupt
      3: { name: 'name3', email: 'email3' }, // Missing
    };

    const newAccounts = {
      1: { name: 'name', email: 'email' }, // Good
      2: { name: 'CORRUPTED', email: 'CORRUPTED' }, // Corrupt
    };

    // Act
    const { missedAccounts, corruptedAccounts } = accountsAuditer.findMissedAndCorruptedAccounts(oldAccounts, newAccounts);

    // Assert
    const expectedCorrupt = ['2'];
    const expectedMissed = ['3'];

    expect(missedAccounts).toEqual(expectedMissed);
    expect(expectedCorrupt).toEqual(corruptedAccounts);
  });
});

describe('findNewAccounts', () => {
  it('should find new accounts and return an array of IDs', () => {
    // Arrange
    const oldAccounts = {
      1: { name: 'name', email: 'email' },
      2: { name: 'name2', email: 'email2' },
    };

    const newAccounts = {
      1: { name: 'name', email: 'email' },
      2: { name: 'name2', email: 'email2' },
      3: { name: 'name3', email: 'email3' },
    };

    // Act
    const response = accountsAuditer.findNewAccounts(oldAccounts, newAccounts);

    // Assert
    const expectedResponse = ['3']; // The id of the row not in the old accounts
    expect(response).toEqual(expectedResponse);
  });
});
