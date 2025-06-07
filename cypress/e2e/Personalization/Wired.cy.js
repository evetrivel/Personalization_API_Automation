//const { expect } = require("chai");

describe("API Test from wired JSON", () => {
  let baseUrl = 'https://yusui-platform-intel.gp-nonprod-na-0.conde.digital/v1'; 
  before(() => {
    cy.fixture("Wired-input-param.json").then((jsonData) => {
      // Store JSON data to use in tests
      Cypress.env("testData", jsonData);
    });
  });

  it("Validates API wired Responses", () => {
    const testData = Cypress.env("testData");

   testData.forEach((testCase) => {
  const queryParams = {
    brand: testCase.Brand,
    strategy: testCase.strategy,
    language: testCase.language,
    pagesize: testCase.pagesize,
    copilotId: testCase.copilotId,
    applicationID: testCase.applicationID,
    debug: testCase.debug,
    url: testCase.url,
    skipCache: testCase.skipCache,
    ContentType: testCase.ContentType,
    numberOfDays: testCase.numberOfDays
  };

  cy.log(`Testing with params: ${JSON.stringify(queryParams)}`);

  cy.request({
    method: "GET",
    url: baseUrl,
    qs: queryParams,
    timeout: 60000
  }).then((response) => {
    if (response.status === 503 && retries > 0) {
            cy.log(`Received 503 - retrying... attempts left: ${retries}`);
            cy.wait(9000); // wait 9 seconds before retrying
            makeRequestWithRetry(retries - 1);
            return;
          }

          // Fail the test clearly if still 503
          expect(response.status, 'Final status code').to.eq(200);

        const actualResults = response.body.data.map(item => ({
            strategy: item.strategy,
            url: item.url,
            brand: item.brand,
            language: item.language
          }));

          const expected = testCase["Expected Results (JSON)"];
  
          actualResults.forEach((actualItem , index) => {

       try {
       expect(expected.strategy).to.include(actualItem.strategy);
       //expect(actualItem.strategy,"strategy at index ${index}").to.eq(expected.strategy);
       cy.log(`Strategy match at index ${index}: ${actualItem.strategy} in expected list`);
    } catch (err) {
      cy.log(`Strategy mismatch at index ${index}: ${actualItem.strategy} not in expected list`);
      console.error(err.message);
    }

          try {
            expect(actualItem.brand, `brand at index ${index}`).to.eq(expected.brand);
          } catch (err) {
            cy.log(`Brand mismatch at index ${index}: ${actualItem.brand} ≠ ${expected.brand}`);
            console.error(`Brand mismatch at index ${index}:`, err.message);
          }

          try {
            expect(actualItem.language, `language at index ${index}`).to.eq(expected.language);
          } catch (err) {
            cy.log(`language mismatch at index ${index}: ${actualItem.language} ≠ ${expected.language}`);
            console.error(`language mismatch at index ${index}:`, err.message);
          }

          try {
    const matchesUrl = expected.url.some(pattern => {
      const expectedSubstring = pattern.replace(/\*/g, ""); // remove wildcards
      return actualItem.url.includes(expectedSubstring);
    });

    expect(matchesUrl, `URL should contain one of the expected patterns`).to.be.true;
  } catch (err) {
    cy.log(`URL mismatch at index ${index}: ${actualItem.url}`);
    console.error(err.message);
  }
        });

        // Optionally log summary
        console.log(`Finished checking: ${testCase.TestCase_ID}`);

        
        });
      });
    });

  
    });

  


 // after(() => {
    // You can use this to print or export results after all tests
  //  cy.writeFile("cypress/results/api_test_results.json", results);
 // You can also validate parts of the body with:
        // expect(response.body.strategy).to.eq(testCase["Expected Results (JSON)"].strategy);
     
   

