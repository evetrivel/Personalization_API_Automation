//const { expect } = require("chai");

describe("API Test from recsys JSON", () => {
  let baseUrl = 'https://recsys.gp-nonprod.conde.digital/recsys/v1/similar-items'; // Replace with your actual base URL
  let failCount = 0; 

  before(() => {
    cy.fixture("recsys.json").then((jsonData) => {
      // Store JSON data to use in tests
      Cypress.env("testData", jsonData);
    });
  });

  it("Validates API recsys Responses", () => {
    const testData = Cypress.env("testData");

   testData.forEach((testCase) => {
  const queryParams = {
    brand: testCase.brand,
    copilotId: testCase.copilotId
    
  };

  cy.log(`Testing with params: ${JSON.stringify(queryParams)}`);

  cy.request({
    method: "GET",
    url: baseUrl,
    qs: queryParams,
    timeout: 60000,
    failOnStatusCode: false,
    headers: {
        "x-api-key": "44c9d8a8-bb5f-4eb7-a41d-55344fc9e427"
      }
  }).then((response) => {
      cy.log(`Status: ${response.status}`);
    if (response.status === 200) {
      cy.log("✅ Passed (Status 200)");
    } else {
      cy.log(`❌ Failed - Brand: ${queryParams.brand} | Copilot ID: ${queryParams.copilotId} | Status: ${response.status}`);

       failCount++;
    }

  
        
        });
      });
      cy.then(() => {
      cy.log(`🔴 Total Failed Cases: ${failCount}`);
    });
    });

  
    });

  


 // after(() => {
    // You can use this to print or export results after all tests
  //  cy.writeFile("cypress/results/api_test_results.json", results);
 // You can also validate parts of the body with:
        // expect(response.body.strategy).to.eq(testCase["Expected Results (JSON)"].strategy);
     
   

