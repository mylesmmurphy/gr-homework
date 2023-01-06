// eslint-disable-next-line import/no-unresolved
const { stringify } = require('csv-stringify/sync');
const fs = require('fs');

const path = './reports';

/**
 * Writes an array of IDs to a CSV file to be easily read
 * @param {*} type The type of report we're writing, ex. Missed, corrupted, or new accounts
 * @param {*} ids Array of IDs to be written
 */
function generateReport(type, ids) {
  // Each value needs to be it's own array to be a new row entry
  const wrappedValues = ids.map((id) => [id]);

  const params = [
    ['IDs'],
    ...wrappedValues,
  ];

  const csv = stringify(params);

  fs.writeFileSync(`${path}/${type}-${new Date().toISOString()}.csv`, csv);
}

module.exports = {
  generateReport,
};
