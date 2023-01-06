const pg = require('pg');
const { getDBClient, getAllAccounts } = require('./dao');

jest.mock('pg');

describe('getDBClient', () => {
  it('should create and returns a PG client', async () => {
    // Arrange
    const config = {
      host: 'localhost',
      port: '5432',
      database: 'testdb',
      user: 'testuser',
      password: 'testpass',
    };

    // Act
    const client = await getDBClient(config);

    // Assert
    expect(pg.Client).toBeCalledWith(config);
    expect(client).toBeInstanceOf(pg.Client);
  });
});

describe('getAllAccounts', () => {
  it('should return all Account records', async () => {
    // Arrange
    const mockData = { rows: [] };
    const queryMock = jest.fn(() => Promise.resolve(mockData));
    const client = { query: queryMock }; // Client dependency injection for testing

    // Act
    const accounts = await getAllAccounts(client);

    // Assert
    expect(queryMock).toBeCalledWith('SELECT * FROM accounts');
    expect(accounts).toEqual(mockData.rows);
  });
});
