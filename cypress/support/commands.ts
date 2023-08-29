export {}
declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Extends the standard visit command to wait for the page to load
			 *
			 * @returns {typeof visitAndCheck}
			 * @memberof Chainable
			 * @example
			 *    cy.visitAndCheck('/')
			 *  @example
			 *    cy.visitAndCheck('/', 500)
			 */
			visitAndCheck: typeof visitAndCheck

			/**
			 * Extends the standard visit command to wait for the page to load
			 *
			 * @returns {typeof validateInputErrorByLabel}
			 * @params {RegExp} label
			 * @params {string} value
			 * @params {RegExp} error
			 * @params {boolean} errorExist
			 * @memberof Chainable
			 * @example
			 *    validateInputErrorByLabel(/phone/i, "1", /invalid phone number/i);
			 *  @example
			 *    validateInputErrorByLabel(/phone/i, "9", /invalid phone number/i, false);
			 */
			validateInputErrorByLabel: typeof validateInputErrorByLabel
		}
	}
}

// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url: string, waitTime = 1000) {
	cy.visit(url)
	cy.location('pathname').should('contain', url).wait(waitTime)
}

Cypress.Commands.add('visitAndCheck', visitAndCheck)

function validateInputErrorByLabel(
	label: RegExp,
	value: string,
	error: RegExp,
	errorExist = true,
) {
	cy.findByLabelText(label).type(value)
	cy.findByRole('button', { name: /book/i }).click()
	cy.findByText(error).should(errorExist ? 'be.visible' : 'not.exist')
}

Cypress.Commands.add('validateInputErrorByLabel', validateInputErrorByLabel)

/*
eslint
  @typescript-eslint/no-namespace: "off",
*/
