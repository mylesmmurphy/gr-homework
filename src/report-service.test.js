const dao = require('./db/dao');
const { oldDBConfig, newDBConfig } = require('./db/config');
const { auditAccountsAndGenerateReport } = require('./report-service');
const csvGenerator = require('./helpers/csv-generator');

jest.mock('./db/dao');
jest.mock('./helpers/csv-generator');

describe('auditAccountsAndGenerateReport', () => {
  it('should connect to databases, run queries', async () => {
    // Arrange
    const oldClient = 'oldClient'; // Fake instance of a client
    const newClient = 'newClient';
    dao.getDBClient
      .mockResolvedValueOnce(oldClient)
      .mockResolvedValueOnce(newClient);

    const oldAccounts = [
      { id: '1', name: 'name', email: 'email' }, // Good
      { id: '2', name: 'name2', email: 'email2' }, // Corrupt
      { id: '3', name: 'name3', email: 'email3' }, // Missing
    ];

    const newAccounts = [
      { id: '1', name: 'name', email: 'email' }, // Good
      { id: '2', name: 'CORRUPT', email: 'CORRUPT' }, // Corrupt
      { id: '4', name: 'name4', email: 'email4' }, // New
    ];

    dao.getAllAccounts
      .mockResolvedValueOnce(oldAccounts)
      .mockResolvedValueOnce(newAccounts);

    // Act
    await auditAccountsAndGenerateReport();

    // Assert
    expect(dao.getDBClient).toBeCalledWith(oldDBConfig);
    expect(dao.getDBClient).toBeCalledWith(newDBConfig);

    expect(dao.getAllAccounts).toBeCalledWith(oldClient);
    expect(dao.getAllAccounts).toBeCalledWith(newClient);

    expect(csvGenerator.generateReport).toBeCalledWith('corrupted-accounts', ['2']);
    expect(csvGenerator.generateReport).toBeCalledWith('missed-accounts', ['3']);
    expect(csvGenerator.generateReport).toBeCalledWith('new-accounts', ['4']);
  });
});
