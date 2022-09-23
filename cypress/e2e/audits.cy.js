describe('Audits', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should pass the audits', () => {
    cy.lighthouse()
    // cy.pa11y()
  })
})
