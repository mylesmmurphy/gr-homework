require('dotenv').config();

const { analyzeAndGenerateReport } = require('./src/report-service');

try {
  // Run the main process for generating a report
  analyzeAndGenerateReport();
} catch (err) {
  // Catch and log any errors at top level
  console.log(err);
}
