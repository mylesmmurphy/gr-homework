const dao = require('./db/dao');
const { oldDBConfig, newDBConfig } = require('./db/config');
const { analyzeAndGenerateReport } = require('./report-service');

jest.mock('./db/dao');

describe('analyzeAndGenerateReport', () => {
  it('should connect to databases, run queries', async () => {
    // Arrange
    const oldClient = 'oldClient'; // Fake instance of a client
    const newClient = 'newClient';
    dao.getDBClient
      .mockResolvedValueOnce(oldClient)
      .mockResolvedValueOnce(newClient);

    const oldRecords = ['oldRecords'];
    const newRecords = ['newRecords'];
    dao.getAllAccounts
      .mockResolvedValueOnce(oldRecords)
      .mockResolvedValueOnce(newRecords);

    // Act
    await analyzeAndGenerateReport();

    // Assert
    expect(dao.getDBClient).toBeCalledWith(oldDBConfig);
    expect(dao.getDBClient).toBeCalledWith(newDBConfig);

    expect(dao.getAllAccounts).toBeCalledWith(oldClient);
    expect(dao.getAllAccounts).toBeCalledWith(newClient);
  });
});
