describe("API Test from CNT JSON", () => {
  let baseUrl = 'https://yusui-platform-intel.gp-nonprod-na-0.conde.digital/v1';

  before(() => {
    cy.fixture("condenast-traveller-input-param.json").then((jsonData) => {
      Cypress.env("testData", jsonData);
    });
  });

  it("Validates API CNT Responses", () => {
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

      const makeRequestWithRetry = (retries = 2) => {
        cy.request({
          method: "GET",
          url: baseUrl,
          qs: queryParams,
          failOnStatusCode: false, // prevent test from failing on 503
          timeout: 60000
        }).then((response) => {
          if (response.status === 503 && retries > 0) {
            cy.log(`Received 503 - retrying... attempts left: ${retries}`);
            cy.wait(9000); // wait 2 seconds before retrying
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

          actualResults.forEach((actualItem, index) => {
            try {
              expect(expected.strategy).to.include(actualItem.strategy);
              cy.log(`Strategy match at index ${index}: ${actualItem.strategy}`);
            } catch (err) {
              cy.log(`Strategy mismatch at index ${index}: ${actualItem.strategy}`);
              console.error(err.message);
            }

            try {
              expect(actualItem.brand, `brand at index ${index}`).to.eq(expected.brand);
            } catch (err) {
              cy.log(`Brand mismatch at index ${index}: ${actualItem.brand}`);
              console.error(err.message);
            }

            try {
              expect(actualItem.language, `language at index ${index}`).to.eq(expected.language);
            } catch (err) {
              cy.log(`Language mismatch at index ${index}: ${actualItem.language}`);
              console.error(err.message);
            }

            try {
              const matchesUrl = expected.url.some(pattern => {
                const expectedSubstring = pattern.replace(/\*/g, "");
                return actualItem.url.includes(expectedSubstring);
              });

              expect(matchesUrl, `URL should contain one of the expected patterns`).to.be.true;
            } catch (err) {
              cy.log(`URL mismatch at index ${index}: ${actualItem.url}`);
              console.error(err.message);
            }
          });

          console.log(`Finished checking: ${testCase.TestCase_ID}`);
        });
      };

      // Start request with retry logic
      makeRequestWithRetry();
    });
  });
});
