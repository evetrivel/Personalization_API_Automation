# Cypress API Automation - Personalization Project

## Project Overview

This Cypress automation project is designed to perform REST API testing for the Personalization Platform across 14 brands (e.g., Allure, Self, Them, TNY, etc.).

- **Total test cases:** 695  
- **HTTP Method:** GET  
- **Purpose:** Validate API responses against expected values for various brands and input parameters.

## Technology Stack

- Cypress (JavaScript)  
- Note: Currently, we perform GET method requests for all brands to retrieve and validate output responses.

### Requirments :

| # Environment | #Launage | #Open Source Tool for Automation | #FrameWork | #Tools | 
| :---: | :---: | :---: | :---: | :---: | 
| stage/Prod | JavaScript | Cypress | Cypress | Git, VS Code, npm | 

**##Time management**

| # Total test case | #Manual Execution Time | #Automation Execution Time | 
| :---: | :---: | :---: | 
| 695 | More than 1 day | 7min | 

---

## Table of Contents

- [Pre-requisites](#pre-requisites)  
- [Installation](#installation)  
- [Project Structure](#project-structure)  
- [Running the Tests](#running-the-tests)  
- [Where to Check Results](#where-to-check-results)  
- [Verifying Test Results in Cypress](#verifying-test-results-in-cypress)  
- [Code Walkthrough](#code-walkthrough)  
- [Conclusion](#conclusion)  

---

## Pre-requisites

- Node.js (v16 or higher recommended)  
- npm (Node Package Manager)  
- Git (optional, for version control)  

---

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   
**##Install the dependencies:**
npm install

**##Install Cypress:**
npm install cypress

## Project structure 
├── cypress
│   └── e2e
│       └── api_test.cy.js         # Main test file
├── fixtures
│   └── them-input-param.json      # Input test data for brands
├── package.json
└── cypress.config.js              # Cypress configuration file

**##Running the Tests**
**Run the test cases in headless mode:**
npx cypress run --spec "cypress/e2e/api_test.cy.js"
**Or open Cypress Test Runner GUI:**
npx cypress open

**Where to Check Results**
Cypress CLI/GUI Logs: Results and logs appear in the terminal or GUI.
Test Console Output: Console logs include each test case status, input, and assertion messages.

**Verifying Test Results in Cypress**
When using the Cypress Test Runner GUI (npx cypress open):
You will see a list of test cases run dynamically.
Each test case displays real-time logs including:
Request parameters
API response body
Assertions made for each field
Pass/Fail status is shown in green or red.
You can click on each test to drill into detailed logs.
Errors and mismatches are clearly logged with console messages.

**##Code Walkthrough**
**Define Base URL and Load JSON Input**
```let baseUrl = 'https://yusui-platform-intel.gp-nonprod-na-0.conde.digital/v1';

before(() => {
  cy.fixture("them-input-param.json").then((jsonData) => {
    Cypress.env("testData", jsonData);
  });
});
```
Note : This loads the JSON test cases from fixtures/them-input-param.json into Cypress environment.

**##Iterate Over Test Cases and Send GET Requests**
```it("Validates API Responses", () => {
  const testData = Cypress.env("testData");
  testData.forEach((testCase) => {
    const queryParams = { ... };
    cy.request({ method: "GET", url: baseUrl, qs: queryParams, timeout: 60000 })
```
Note : Each test case is constructed using parameters from the JSON input and sent as a GET request.

**Validate Response Fields**
```.then((response) => {
  expect(response.status).to.eq(200);
  const actualResults = response.body.data.map(item => ({ strategy, url, brand, language }));
```
**Perform Field-Level Assertions**
```expect(expected.strategy).to.include(actualItem.strategy);
expect(actualItem.brand).to.eq(expected.brand);
expect(actualItem.language).to.eq(expected.language);
```
**Includes validation for:**
Strategy
Brand
Language
URL pattern (supports wildcards)
Mismatches are logged in the Cypress UI and console.

**Conclusion**
This Cypress automation performs GET requests for all supported brands to retrieve personalization data.
Validates key fields such as strategy, URL, brand, and language against expected results.
Uses them-input-param.json as the single source of truth for test input and expected outcomes.
Logs pass/fail with detailed feedback via Cypress console and GUI.

