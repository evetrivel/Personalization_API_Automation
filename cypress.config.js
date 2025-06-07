// // cypress.config.js (for Cypress v10+)
// const { defineConfig } = require("cypress");
// const XLSX = require("xlsx");
// const fs = require("fs");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       on("task", {
//         readExcel({ filePath, sheetName }) {
//           const workbook = XLSX.readFile(filePath);
//           const worksheet = workbook.Sheets[sheetName];
//           const jsonData = XLSX.utils.sheet_to_json(worksheet);
//           return jsonData; // returns an array of JSON objects
//         },
//       });
//     },
//   },
// });




// const { defineConfig } = require("cypress");
// module.exports = defineConfig({
//   e2e: {
//     "reporter": "mochawesome",
//     "reporterOptions": {
//       "reportDir": "cypress/results",
//       "overwrite": false,
//       "html": true,
//       "json": true,
//       "charts": true
//     }
//   },
// });

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
  },
});
