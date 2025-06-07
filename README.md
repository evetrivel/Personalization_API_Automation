# Personalization_API_Automation
Cypress API Automation - Personalization Project
Project Overview
This Cypress automation project is designed to perform REST API testing for the Personalization Platform across 14 brands (e.g., Allure, Self, Them, TNY, etc.).
Total test cases: 476
HTTP Method: GET
Purpose: Validate API responses against expected values for various brands and input parameters.
Technology Stack:
Cypress (JavaScript)
 Note: Currently, we perform GET method requests for all brands to retrieve and validate output responses.
Table of Contents
Pre-requisites
Installation
Project Structure
Running the Tests
Where to Check Results
Verifying Test Results in Cypress
Code Walkthrough
Conclusion

Pre-requisites
Node.js (v16 or higher recommended)
npm (Node Package Manager)
Git (optional, for version control)
Installation
Clone the repository:

git clone <your-repo-url>
cd <your-project-folder>

Install the dependencies:

npm install

Install Cypress:

npm install cypress

Project Structure
├── cypress
│   └── e2e
│       └── allure.cy.js         # Main test file
├── fixtures
│   └── allure-input-param.json      # Input test data for brands
├── package.json
└── cypress.config.js              # Cypress configuration file

Running the Tests
Run the test cases in headless mode:
npx cypress run --spec "cypress/e2e/api_test.cy.js"
Or open Cypress Test Runner GUI:
npx cypress open
Select api_test.cy.js from the list.

Where to Check Results
Cypress CLI/GUI Logs: Results and logs appear in the terminal or GUI.
Test Console Output: Console logs include each test case status, input, and assertion messages.

Verifying Test Results in Cypress
When using the Cypress Test Runner GUI (npx cypress open):
You will see a list of test cases run dynamically.
Each test case displays real-time logs:
Request parameters
API response body
Assertions made for each field
Pass/Fail status in green or red
Click on each test to drill into the logs.
Errors and mismatches are logged clearly with console messages.

Code Walkthrough
Here's a step-by-step breakdown of api_test.cy.js:
1. Define Base URL and Load JSON Input
let baseUrl = 'https://yusui-platform-intel.gp-nonprod-na-0.conde.digital/v1';

before(() => {
  cy.fixture("them-input-param.json").then((jsonData) => {
    Cypress.env("testData", jsonData);
  });
});
This loads the JSON test cases from fixtures/them-input-param.json into Cypress environment.
2. Iterate Over Test Cases and Send GET Requests
it("Validates API Responses", () => {
  const testData = Cypress.env("testData");
  testData.forEach((testCase) => {
    const queryParams = { ... };
    cy.request({ method: "GET", url: baseUrl, qs: queryParams, timeout: 60000 })
Each test case is constructed using parameters from the JSON input and sent as a GET request.
3. Validate Response Fields
.then((response) => {
  expect(response.status).to.eq(200);
  const actualResults = response.body.data.map(item => ({ strategy, url, brand, language }));
Parses and maps relevant fields from response data.
4. Perform Field-Level Assertions
expect(expected.strategy).to.include(actualItem.strategy);
expect(actualItem.brand).to.eq(expected.brand);
expect(actualItem.language).to.eq(expected.language);
Includes validation for:
Strategy
Brand
Language
URL pattern (supports wildcards)
Mismatches are logged in the Cypress UI and console.

Conclusion
This Cypress automation performs GET requests for all supported brands to retrieve personalization data.
Validates key fields such as strategy, url, brand, and language against expected results.
Uses them-input-param.json as the single source of truth for test input and expected outcomes.
Logs pass/fail with detailed feedback via Cypress console and GUI.


