const fs = require('fs');
const csvGenerator = require('./csv-generator');

jest.useFakeTimers();
jest.mock('fs');

describe('generateReport', () => {
  it('should convert an array of IDs into a CSV and write to a new file', () => {
    // Arrange
    const ids = ['1', '2'];
    fs.writeFileSync = jest.fn();

    // Act
    csvGenerator.generateReport('missed', ids);

    // Assert
    expect(fs.writeFileSync).toBeCalledWith(
      `./reports/missed-${new Date().toISOString()}.csv`,
      'IDs\n1\n2\n', // Stringified CSV
    );
  });
});
