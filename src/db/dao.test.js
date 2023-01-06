const pg = require('pg');
const { getDBClient, getAllAccounts } = require('./dao');

jest.mock('pg');

describe('getDBClient', () => {
  it('should create and return a PG client', async () => {
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
  it('should call the correct query and return all Account records', async () => {
    // Arrange
    const mockClient = new pg.Client();
    const mockData = { rows: [{ id: '1' }] };
    mockClient.query = jest.fn().mockResolvedValue(mockData);

    // Act
    const accounts = await getAllAccounts(mockClient);

    // Assert
    expect(mockClient.query).toBeCalledWith('SELECT * FROM accounts');
    expect(accounts).toEqual(mockData.rows);
  });
});
