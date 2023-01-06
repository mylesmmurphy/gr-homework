require('dotenv').config();

const { analyzeAndGenerateReport } = require('./src/report-service');

async function main() {
  try {
    console.time('Execution time');

    // Run the main process for generating a report
    await analyzeAndGenerateReport();

    console.timeEnd('Execution time');
    process.exit();
  } catch (err) {
    // Catch and log any errors at top level
    console.log(err);
  }
}

main();
