require('dotenv').config();

const { auditAccountsAndGenerateReport } = require('./src/report-service');

async function main() {
  try {
    console.time('Execution time');

    // Run the main process for generating a report
    await auditAccountsAndGenerateReport();

    // Program execution time
    console.timeEnd('Execution time');

    // Memory usage in megabytes(MB)
    const memoryUsage = process.memoryUsage();
    Object.entries(memoryUsage).forEach((entry) => {
      const [key, value] = entry;
      console.log(`Memory usage by ${key}, ${value / 1000000}MB `);
    });

    process.exit();
  } catch (err) {
    // Catch and log any errors at top level
    console.log(err);
  }
}

main();
